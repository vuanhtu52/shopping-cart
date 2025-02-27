import { describe, expect, it, vi } from "vitest";
import ShopContext from "../../src/context/ShopContext";
import { BrowserRouter } from "react-router-dom";
import CheckoutPage from "../../src/pages/CheckoutPage";
import { render, screen } from "@testing-library/react";

// const renderComponent = (cartItems, totalCartPrice) => {
//     return render(
//         <ShopContext.Provider value={{cartItems, getTotalCartPrice: () => totalCartPrice}}>
//             <BrowserRouter>
//                 <CheckoutPage />
//             </BrowserRouter>
//         </ShopContext.Provider>
//     );
// };

const renderComponent = (mockContext) => {
    return render(
        <ShopContext.Provider value={mockContext}>
            <BrowserRouter>
                <CheckoutPage />
            </BrowserRouter>
        </ShopContext.Provider>
    );
};

describe("CheckoutPage component", () => {
    const mockContext = {
        products: [
            {id: 1, title: "Product 1", price: 10, image: "assets/jpg/men-wear.jpg"}
        ],
        cartItems: {1: 1},
        addToCart: vi.fn(),
        addMultipleToCart: vi.fn(),
        updateCart: vi.fn(),
        removeOneFromCart: vi.fn(),
        removeFromCart: vi.fn(),
        getTotalCartItems: vi.fn(),
        getTotalCartPrice: () => 10
    };

    it("Renders the page title correctly", () => {
        renderComponent(mockContext);
        expect(screen.getByText("Shopping Cart")).toBeInTheDocument();
    });

    it("Displays empty cart message when the cart is empty", () => {
        const mockContext = {
            products: [],
            cartItems: {},
            addToCart: vi.fn(),
            addMultipleToCart: vi.fn(),
            updateCart: vi.fn(),
            removeOneFromCart: vi.fn(),
            removeFromCart: vi.fn(),
            getTotalCartItems: vi.fn(),
            getTotalCartPrice: () => 0
        }

        renderComponent(mockContext);

        expect(screen.getByText("Your cart looks empty")).toBeInTheDocument();
        expect(screen.getByRole("link", {name: "Shop now"})).toHaveAttribute("href", "/");
    });

    it("Displays checkout item when cart has a single product", () => {
        const mockContext = {
            products: [
                {id: 1, title: "Product 1", price: 10, image: "assets/jpg/men-wear.jpg"}
            ],
            cartItems: {1: 1},
            addToCart: vi.fn(),
            addMultipleToCart: vi.fn(),
            updateCart: vi.fn(),
            removeOneFromCart: vi.fn(),
            removeFromCart: vi.fn(),
            getTotalCartItems: vi.fn(),
            getTotalCartPrice: () => 10
        };

        renderComponent(mockContext);
        expect(screen.getByText("Total: $10")).toBeInTheDocument();
    });

    it("Displays checkout items when cart has multiple products", () => {
        const mockContext = {
            products: [
                {id: 1, title: "Product 1", price: 10, image: "assets/jpg/men-wear.jpg"},
                {id: 2, title: "Product 2", price: 20, image: "assets/jpg/women-wear.jpg"}
            ],
            cartItems: {1: 1},
            addToCart: vi.fn(),
            addMultipleToCart: vi.fn(),
            updateCart: vi.fn(),
            removeOneFromCart: vi.fn(),
            removeFromCart: vi.fn(),
            getTotalCartItems: vi.fn(),
            getTotalCartPrice: () => 30
        };

        renderComponent(mockContext);
        expect(screen.getByText("Total: $30")).toBeInTheDocument();
    });

    it("Displays checkout button when cart is not empty", () => {
        const mockContext = {
            products: [
                {id: 1, title: "Product 1", price: 10, image: "assets/jpg/men-wear.jpg"}
            ],
            cartItems: {1: 1},
            addToCart: vi.fn(),
            addMultipleToCart: vi.fn(),
            updateCart: vi.fn(),
            removeOneFromCart: vi.fn(),
            removeFromCart: vi.fn(),
            getTotalCartItems: vi.fn(),
            getTotalCartPrice: () => 10
        };

        renderComponent(mockContext);

        expect(screen.getByRole("button", {name: "CHECKOUT"})).toBeInTheDocument();
    });

    it("Does not display checkout button when cart is empty", () => {
        const mockContext = {
            products: [],
            cartItems: {},
            addToCart: vi.fn(),
            addMultipleToCart: vi.fn(),
            updateCart: vi.fn(),
            removeOneFromCart: vi.fn(),
            removeFromCart: vi.fn(),
            getTotalCartItems: vi.fn(),
            getTotalCartPrice: () => 10
        };

        renderComponent(mockContext);

        expect(screen.queryByRole("button", {name: "CHECKOUT"})).not.toBeInTheDocument();
    });
});