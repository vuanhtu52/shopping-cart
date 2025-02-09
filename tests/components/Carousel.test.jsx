import { fireEvent, render, screen } from "@testing-library/react";
import Carousel from "../../src/components/Carousel";
import { expect } from "vitest";

const slides = [
    "assets/jpg/men-wear.jpg",
    "assets/jpg/women-wear.jpg",
    "assets/jpg/jewellery.jpg",
    "assets/jpg/electronics"
];

describe("Carousel component", () => {
    it("Carousel renders correct number of slides", () => {
        render(<Carousel slides={slides}/>);
        expect(screen.getAllByRole("img", {name: "Carousel Slide"}).length).toBe(slides.length);
    });

    it("Displays only the first slide in the beginning", () => {
        render(<Carousel slides={slides}/>);
         
        const imgWrapper = screen.getByRole("wrapper");

        expect(imgWrapper).toHaveStyle("transform: translateX(-0%)");
    });

    it("Renders navigation buttons", () => {
        render(<Carousel slides={slides}/>);
        
        expect(screen.getByTestId("previous-button")).toBeInTheDocument();
        expect(screen.getByTestId("next-button")).toBeInTheDocument();
    });

    it("Click right button to move to next slide", () => {
        // Render the carousel
        render(<Carousel slides={slides}/>);

        // Get the next button and image wrapper
        const nextButton = screen.getByTestId("next-button");
        const imgWrapper = screen.getByRole("wrapper");

        // Click the next button
        fireEvent.click(nextButton);

        // Assertion
        expect(imgWrapper).toHaveStyle("transform: translateX(-100%)");
    });

    it("Clicking right button on last slide loops back to first slide", () => {
        render(<Carousel slides={slides}/>);

        const nextButton = screen.getByTestId("next-button");
        const imgWrapper = screen.getByRole("wrapper");

        for (let i = 0; i < slides.length; i++) {
            fireEvent.click(nextButton);
        }

        expect(imgWrapper).toHaveStyle("transform: translateX(-0%)");
    });

    it("Click left button to move to previous slide", () => {
        render(<Carousel slides={slides}/>);

        const previousButton = screen.getByTestId("previous-button");
        const nextButton = screen.getByTestId("next-button");
        const imgWrapper = screen.getByRole("wrapper");

        fireEvent.click(nextButton);
        fireEvent.click(nextButton);
        fireEvent.click(nextButton);
        fireEvent.click(previousButton);

        expect(imgWrapper).toHaveStyle("transform: translateX(-200%)");
    });

    it("Clicking left button on first slide loops back to last slide", () => {
        render(<Carousel slides={slides}/>);
        
        const previousButton = screen.getByTestId("previous-button");
        const imgWrapper = screen.getByRole("wrapper");

        fireEvent.click(previousButton);

        expect(imgWrapper).toHaveStyle("transform: translateX(-300%)");
    });

    it("Clicking an indicator moves to the corresponding slide", () => {
        render(<Carousel slides={slides}/>);

        const indicators = screen.getAllByRole("indicator");
        const imgWrapper = screen.getByRole("wrapper");

        for (let i = 0; i < slides.length; i++) {
            fireEvent.click(indicators[i]);
            expect(imgWrapper).toHaveStyle(`transform: translateX(-${i * 100}%)`);
        }
    });

    it("Carousel has no slides passed in", () => {
        render(<Carousel slides={[]}/>);
        expect(screen.queryByRole("img")).not.toBeInTheDocument();
    });

    it("Carousel has a single slide only", () => {
        render(<Carousel slides={["assets/jpg/men-wear.jpg"]}/>);
        expect(screen.queryAllByRole("img").length).toBe(1);
    });
});