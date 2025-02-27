import { render, screen } from "@testing-library/react";
import ShopContext from "../../src/context/ShopContext";
import { MemoryRouter } from "react-router-dom";
import HomePage from "../../src/pages/HomePage";
import { describe, expect } from "vitest";

const renderComponent = products => {
    return render(
        <ShopContext.Provider value={{products}}>
            <MemoryRouter>
                <HomePage />
            </MemoryRouter>
        </ShopContext.Provider>
    );
};

describe("HomePage component", () => {
    it("Renders the heading correctly", () => {
        renderComponent([]);
        expect(screen.getByText("NEW ARRIVALS")).toBeInTheDocument();
    });

    it("Renders the carousel correctly", () => {
        renderComponent([]);

        const carouselImages = screen.getAllByRole("img", {name: "Carousel Slide"});
        expect(carouselImages.length).toBeGreaterThan(0);
    });

    it("Renders the first 5 products as new arrivals", () => {
        const products = [
            { id: 1, title: "Product 1", price: 10, image: "product1.jpg", category: "electronics" },
            { id: 2, title: "Product 2", price: 20, image: "product2.jpg", category: "electronics" },
            { id: 3, title: "Product 3", price: 30, image: "product3.jpg", category: "electronics" },
            { id: 4, title: "Product 4", price: 40, image: "product4.jpg", category: "electronics" },
            { id: 5, title: "Product 5", price: 50, image: "product5.jpg", category: "electronics" },
            { id: 6, title: "Product 6", price: 60, image: "product6.jpg", category: "electronics" },
        ];

        renderComponent(products);

        expect(screen.getByText("Product 1")).toBeInTheDocument();
        expect(screen.getByText("Product 2")).toBeInTheDocument();
        expect(screen.getByText("Product 3")).toBeInTheDocument();
        expect(screen.getByText("Product 4")).toBeInTheDocument();
        expect(screen.getByText("Product 5")).toBeInTheDocument();
        expect(screen.queryByText("Product 6")).not.toBeInTheDocument();
    });
});