import { useEffect, useState } from "react";

function Test() {

    const [activeIndex, SetIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            SetIndex((prev) => (prev + 1) % 3);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="grid grid-cols-4 items-center">
            <div
                className={`h-20 w-20 bg-red-500 rounded-full transition-opacity duration-500 ${activeIndex === 0 ? "opacity-100" : "opacity-0"
                    }`}
            ></div>
            <div className={`h-20 w-20 bg-orange-500 rounded-full transition-opacity duration-500 ${activeIndex ===1 ? "opacity-100" :"opacity-0"}`}>
            </div>
            <div className={`h-20 w-20 bg-green-500 rounded-full transition-opacity duration-500 ${activeIndex ===2 ? "opacity-100" :"opacity-0"}`}>
            </div>
        </div>

    );
}
export default Test;