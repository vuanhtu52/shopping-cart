import { MemoryRouter } from "react-router-dom";
import ShopContext from "../../src/context/ShopContext";
import ElectronicsPage from "../../src/pages/ElectronicsPage";
import { describe } from "vitest";
import { render, screen } from "@testing-library/react";

const renderComponent = products => {
    return render(
        <ShopContext.Provider value={{ products }}>
            <MemoryRouter>
                <ElectronicsPage />
            </MemoryRouter>
        </ShopContext.Provider>
    );
};

describe("ElectronicsPage component", () => {
    it("Renders the heading correctly", () => {
        renderComponent([]);
        expect(screen.getByText("Electronics")).toBeInTheDocument();
    });

    it("Renders only electronics products", () => {
        const products = [
            { id: 1, title: "Laptop", category: "electronics", price: 1000, image: "laptop.jpg" },
            { id: 2, title: "Shirt", category: "men's clothing", price: 50, image: "shirt.jpg" },
            { id: 3, title: "Smartphone", category: "electronics", price: 700, image: "phone.jpg" }
        ];

        renderComponent(products);

        expect(screen.getByText("Laptop")).toBeInTheDocument();
        expect(screen.queryByText("Shirt")).not.toBeInTheDocument();
        expect(screen.getByText("Smartphone")).toBeInTheDocument();
    });

    it("Renders no products when none are electronics", () => {
        const products = [
            { id: 1, title: "Shirt", category: "men's clothing", price: 50, image: "shirt.jpg" },
            { id: 2, title: "Dress", category: "women's clothing", price: 70, image: "dress.jpg" },
        ];

        renderComponent(products);

        expect(screen.queryByText("Shirt")).not.toBeInTheDocument();
        expect(screen.queryByText("Dress")).not.toBeInTheDocument();
    });
});