import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import sharp from "sharp";
import { z } from "zod";

export const runtime = "nodejs";

const MAX_BYTES = 5 * 1024 * 1024;

async function imageResize(
    input: Buffer,
): Promise<{ buf: Buffer; mime: string }> {
    let width = 2000;
    let quality = 80;

    for (let i = 0; i < 8; i++) {
        const out = await sharp(input, { failOn: "none" })
            .rotate()
            .resize({ width, withoutEnlargement: true })
            .jpeg({ quality, mozjpeg: true })
            .toBuffer();

        if (out.length <= MAX_BYTES) return { buf: out, mime: "image/jpeg" };

        quality = Math.max(30, quality - 10);
        width = Math.max(600, Math.floor(width * 0.85));
    }

    const out = await sharp(input, { failOn: "none" })
        .rotate()
        .resize({ width: 600, withoutEnlargement: true })
        .jpeg({ quality: 30, mozjpeg: true })
        .toBuffer();

    return { buf: out, mime: "image/jpeg" };
}

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function toDataUrl(buf: Buffer, mime: string) {
    return `data:${mime};base64,${buf.toString("base64")}`;
}

const ShortText = z.object({
    text: z.string().min(10).max(50),
});

export async function POST(req: Request) {
    try {
        const form = await req.formData();
        const file = form.get("image");
        const text = String(form.get("text") ?? "");

        if (!(file instanceof File)) {
            return Response.json(
                { error: "image is required" },
                { status: 400 },
            );
        }

        const ab = await file.arrayBuffer();
        const inputBuf = Buffer.from(ab);
        const { buf, mime } =
            inputBuf.length > MAX_BYTES
                ? await imageResize(inputBuf)
                : { buf: inputBuf, mime: file.type || "image/png" };

        const dataUrl = toDataUrl(buf, mime);

        const res = await client.responses.parse({
            model: "gpt-5-mini",
            max_output_tokens: 200,
            reasoning: { effort: "minimal" },
            input: [
                {
                    role: "system",
                    content:
                        "SNS用の文章を画像から10文字以上、50文字以内で出力して。指示があった場合はSNS用の文章から逸脱しない範囲でしたがって",
                },
                {
                    role: "user",
                    content: [
                        { type: "input_text", text: `カスタム指示:\n${text}` },
                        {
                            type: "input_image",
                            image_url: dataUrl,
                            detail: "auto",
                        },
                    ],
                },
            ],
            text: {
                format: zodTextFormat(ShortText, "short_text"),
            },
        });

        if (!res.output_parsed) {
            return Response.json(
                { error: "model returned no parsed output" },
                { status: 502 },
            );
        }
        console.log(text);

        return Response.json({ text: res.output_parsed.text ?? "" });
    } catch {
        return Response.json({ text: `` });
    }
}
