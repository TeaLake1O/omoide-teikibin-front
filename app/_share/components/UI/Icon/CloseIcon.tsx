export default function CloseIcon() {
    return (
        <div className="h-full w-full relative">
            <div
                className={`h-[70%] top-1/2 bg-[#FFA947] left-1/2 -translate-x-1/2 -translate-y-1/2 w-0.75  transition-colors rotate-45 duration-300 absolute rounded-full`}
            />
            <div
                className={`h-[70%] top-1/2 left-1/2 bg-[#FFA947] -translate-x-1/2 -translate-y-1/2 w-0.75  transition-colors duration-300 rotate-135 absolute rounded-full`}
            />
        </div>
    );
}
