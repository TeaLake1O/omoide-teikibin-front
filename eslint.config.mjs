import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,
    // Override default ignores of eslint-config-next.
    globalIgnores([
        // Default ignores of eslint-config-next:
        ".next/**",
        "out/**",
        "build/**",
        "next-env.d.ts",
    ]),
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        rules: {
            //==を警告
            eqeqeq: ["error", "always"],

            //var禁止
            "no-var": "error",

            //基本const
            "prefer-const": ["error", { destructuring: "all" }],

            //switchでbreakを必須にする
            "no-fallthrough": "error",

            /*"no-restricted-syntax": [
                "error",
                {
                    selector:
                        "CallExpression[callee.name=/^(useEffect|useLayoutEffect|useMemo|useCallback)$/][arguments.1.type='ArrayExpression'] > ArrayExpression Identifier[name=/^(apiKey|apiCacheKey|apiCacheKeys|queryKey)$/]",
                    message:
                        "ApiCacheKey cannot be included in any dependency array",
                },
            ],*/
        },
    },
]);

export default eslintConfig;
