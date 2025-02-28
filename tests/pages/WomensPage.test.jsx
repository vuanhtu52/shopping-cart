import { render, screen } from "@testing-library/react";
import ShopContext from "../../src/context/ShopContext";
import { MemoryRouter } from "react-router-dom";
import WomensPage from "../../src/pages/WomensPage";
import { describe, expect } from "vitest";

const renderComponent = products => {
    return render(
        <ShopContext.Provider value={{products}}>
            <MemoryRouter>
                <WomensPage />
            </MemoryRouter>
        </ShopContext.Provider>
    );
};

describe("WomensPage component", () => {
    it("Renders heading correctly", () => {
        renderComponent([]);
        expect(screen.getByText("Women's Clothing")).toBeInTheDocument();
    });

    it("Renders only women's clothing", () => {
        const products = [
            { id: 1, title: "Dress", category: "women's clothing" },
            { id: 2, title: "Jeans", category: "men's clothing" }, // Should be ignored
            { id: 3, title: "Blouse", category: "women's clothing" }
        ];

        renderComponent(products);

        expect(screen.getByText("Dress")).toBeInTheDocument();
        expect(screen.queryByText("Jeans")).not.toBeInTheDocument();
        expect(screen.getByText("Blouse")).toBeInTheDocument();
    });

    it("Renders no products when none are women's clothing", () => {
        const products = [
            { id: 1, title: "Jeans", category: "men's clothing" },
            { id: 2, title: "T-Shirt", category: "electronics" }
        ];

        renderComponent(products);

        expect(screen.queryByText("Jeans")).not.toBeInTheDocument();
        expect(screen.queryByText("T-Shirt")).not.toBeInTheDocument();
    });

    it("Snapshot testing", () => {
        const products = [
            { id: 1, title: "Jeans", category: "men's clothing" },
            { id: 2, title: "T-Shirt", category: "electronics" }
        ];

        const {container} = renderComponent(products);
        expect(container).toMatchSnapshot();
    });
});