import { FaCircleArrowRight } from "react-icons/fa6";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { useState } from "react";

const Carousel = ({ slides }) => {
    let [current, setCurrent] = useState(0);

    const previousSlide = () => {
        if (current === 0) setCurrent(slides.length - 1);
        else setCurrent(current - 1);
    }

    const nextSlide = () => {
        if (current === slides.length - 1) setCurrent(0);
        else setCurrent(current + 1);
    }

    return (
        <div className="overflow-hidden relative">
            {/* The images */}
            <div
                className="flex transition ease-out duration-40"
                style={{
                    transform: `translateX(-${current * 100}%)`,
                }}
            >
                {slides.map(slide => {
                    return <img src={slide} />;
                })}
            </div>

            {/* Next and previous buttons */}
            <div className="absolute top-0 h-full w-full justify-between items-center flex text-white px-10 text-3xl">
                <button onClick={previousSlide}>
                    <FaCircleArrowLeft />
                </button>
                <button onClick={nextSlide}>
                    <FaCircleArrowRight />
                </button>
            </div>

            {/* Circles at the bottom */}
            <div className="absolute bottom-0 py-4 flex justify-center gap-5 w-full">
                {slides.map((slide, i) => {
                    return <div
                        key={"circle " + i}
                        className={`rounded-full w-5 h-5 cursor-pointer ${i === current ? "bg-white" : "bg-gray-300"}`}
                        onClick={() => setCurrent(i)}
                        >
                    </div>
                })}
            </div>
        </div>
    )
};

export default Carousel;