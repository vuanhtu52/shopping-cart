import { render, screen } from "@testing-library/react";
import ShopContext from "../../src/context/ShopContext";
import { MemoryRouter } from "react-router-dom";
import JewelleryPage from "../../src/pages/JewelleryPage";
import { describe } from "vitest";

const renderComponent = products => {
    return render(
        <ShopContext.Provider value={{ products }}>
            <MemoryRouter>
                <JewelleryPage />
            </MemoryRouter>
        </ShopContext.Provider>
    );
};

describe("JewelleryPage component", () => {
    it("Renders heading correctly", () => {
        renderComponent([]);
        expect(screen.getByText("Jewellery")).toBeInTheDocument();
    });

    it("Renders only jewellery products", () => {
        const products = [
            { id: 1, title: "Necklace", category: "jewelery", price: 100, image: "necklace.jpg" },
            { id: 2, title: "Bracelet", category: "jewelery", price: 50, image: "bracelet.jpg" },
            { id: 3, title: "T-shirt", category: "men's clothing", price: 20, image: "tshirt.jpg" },
        ];

        renderComponent(products);

        expect(screen.getByText("Necklace")).toBeInTheDocument();
        expect(screen.getByText("Bracelet")).toBeInTheDocument();
        expect(screen.queryByText("T-shirt")).not.toBeInTheDocument();
    });

    it("Renders no products when none are jewellery", () => {
        const products = [
            { id: 1, title: "T-shirt", category: "men's clothing", price: 20, image: "tshirt.jpg" },
            { id: 2, title: "Dress", category: "women's clothing", price: 40, image: "dress.jpg" },
        ];

        renderComponent(products);

        expect(screen.queryByText("T-shirt")).not.toBeInTheDocument();
        expect(screen.queryByText("Dress")).not.toBeInTheDocument();
    });

    it("Snapshot testing", () => {
        const products = [
            { id: 1, title: "Necklace", category: "jewelery", price: 100, image: "necklace.jpg" },
            { id: 2, title: "Bracelet", category: "jewelery", price: 50, image: "bracelet.jpg" },
        ];

        const {container} = renderComponent(products);
        expect(container).toMatchSnapshot();
    });
});