import { FaCircleArrowRight } from "react-icons/fa6";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Carousel = ({ slides }) => {
    let [current, setCurrent] = useState(0);

    const previousSlide = () => {
        if (current === 0) setCurrent(slides.length - 1);
        else setCurrent(current - 1);
    };

    const nextSlide = () => {
        if (current === slides.length - 1) setCurrent(0);
        else setCurrent(current + 1);
    };

    return (
        <div className="relative w-full h-[600px] overflow-hidden">
            {/* The images */}
            <div
                className="flex transition-transform duration-500 ease-out h-full w-full"
                style={{
                    transform: `translateX(-${current * 100}%)`,
                }}
            >
                {slides.map((slide) => (
                    <img
                        key={uuidv4()}
                        src={slide}
                        className="w-full h-full object-cover flex-shrink-0"
                        alt="Carousel Slide"
                    />
                ))}
            </div>

            {/* Navigation buttons */}
            <div className="absolute inset-0 flex justify-between items-center px-4 text-gray-400">
                <button onClick={previousSlide}>
                    <FaCircleArrowLeft size={30} />
                </button>
                <button onClick={nextSlide}>
                    <FaCircleArrowRight size={30} />
                </button>
            </div>

            {/* Indicators */}
            <div className="absolute bottom-4 flex justify-center gap-2 w-full">
                {slides.map((_, i) => (
                    <div
                        key={`indicator-${i}`}
                        className={`w-3 h-3 rounded-full cursor-pointer ${i === current ? "bg-black" : "bg-gray-400"
                            }`}
                        onClick={() => setCurrent(i)}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
