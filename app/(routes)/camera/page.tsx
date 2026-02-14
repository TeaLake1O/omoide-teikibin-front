import CameraIcon from "@/app/_share/components/UI/Icon/CameraIcon";

export default function Camera() {
    return (
        <div className="h-full w-full flex justify-center items-center">
            <button className="h-[25%] w-[25%]">
                <CameraIcon />
            </button>
            <input type="file" accept="image/*" capture />
        </div>
    );
}
