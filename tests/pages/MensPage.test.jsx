import { render, screen } from "@testing-library/react";
import ShopContext from "../../src/context/ShopContext";
import { MemoryRouter } from "react-router-dom";
import { describe } from "vitest";
import MensPage from "../../src/pages/MensPage";

const renderComponent = products => {
    return render(
        <ShopContext.Provider value={{products}}>
            <MemoryRouter>
                <MensPage />
            </MemoryRouter>
        </ShopContext.Provider>
    );
};

describe("MensPage component", () => {
    it("Renders heading correctly", () => {
        renderComponent([]);
        expect(screen.getByText("Men's Clothing")).toBeInTheDocument();
    });

    it("Renders only men's clothing", () => {
        const products = [
            { id: 1, title: "Shirt", category: "men's clothing", price: 20, image: "shirt.jpg" },
            { id: 2, title: "Pants", category: "men's clothing", price: 40, image: "pants.jpg" },
            { id: 3, title: "Dress", category: "women's clothing", price: 30, image: "dress.jpg" },
        ];

        renderComponent(products);

        expect(screen.getByText("Shirt")).toBeInTheDocument();
        expect(screen.getByText("Pants")).toBeInTheDocument();
        expect(screen.queryByText("Dress")).not.toBeInTheDocument();
    });

    it("Renders no products when none are jewellery", () => {
        const products = [
            { id: 1, title: "Dress", category: "women's clothing", price: 30, image: "dress.jpg" },
            { id: 2, title: "Skirt", category: "women's clothing", price: 25, image: "skirt.jpg" },
        ];

        renderComponent(products);

        expect(screen.queryByText("Dress")).not.toBeInTheDocument();
        expect(screen.queryByText("Skirt")).not.toBeInTheDocument();
    });

    it("Snapshot testing", () => {
        const products = [
            { id: 1, title: "Shirt", category: "men's clothing", price: 20, image: "shirt.jpg" },
            { id: 2, title: "Pants", category: "men's clothing", price: 40, image: "pants.jpg" },
        ];

        const { container } = renderComponent(products);
        expect(container).toMatchSnapshot();
    });
});