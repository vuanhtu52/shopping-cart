import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect } from "vitest";
import ShopContext from "../../src/context/ShopContext";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ProductPage from "../../src/pages/ProductPage";
import { check } from "prettier";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

const mockContext = {
    cartItems: {},
    products: [
        { id: 1, title: "Test Product", price: 10, description: "A sample product.", image: "test.jpg" }
    ],
    addToCart: vi.fn(),
    addMultipleToCart: vi.fn(),
    updateCart: vi.fn(),
    removeOneFromCart: vi.fn(),
    removeFromCart: vi.fn(),
    getTotalCartItems: vi.fn(),
    getTotalCartPrice: vi.fn()
};

const renderComponent = productId => {
    return render(
        <ShopContext.Provider value={mockContext}>
            <MemoryRouter initialEntries={[`/product/${productId}`]}>
                <Routes>
                    <Route path="/product/:productId" element={<ProductPage />} />
                </Routes>
            </MemoryRouter>
        </ShopContext.Provider>
    );
};

describe("ProductPage Component", () => {
    it("Renders product details correctly", () => {
        renderComponent(1);

        expect(screen.getByText("Test Product")).toBeInTheDocument();
        expect(screen.getByText("$10")).toBeInTheDocument();
        expect(screen.getByText("A sample product.")).toBeInTheDocument();
        expect(screen.getByRole("img")).toHaveAttribute("src", "test.jpg");
    });

    it("Goes back to previous page when clicking the Back button", () => {
        renderComponent(1);
        fireEvent.click(screen.getByTestId("back-button"));
        expect(mockNavigate).toHaveBeenCalledWith(-1);
    });

    it("Clicking the increment button increases the quantity", () => {
        renderComponent(1);

        const incrementButton = screen.getByTestId("increment-button");
        const quantityInput = screen.getByRole("spinbutton");

        fireEvent.click(incrementButton);

        expect(quantityInput).toHaveValue(1);
    });

    it("Clicking the decrement button decreases the quantity", () => {
        renderComponent(1);

        const incrementButton = screen.getByTestId("increment-button");
        const decrementButton = screen.getByTestId("decrement-button");
        const quantityInput = screen.getByRole("spinbutton");

        fireEvent.click(incrementButton);
        fireEvent.click(incrementButton);
        fireEvent.click(incrementButton);
        fireEvent.click(decrementButton);

        expect(quantityInput).toHaveValue(2);
    });

    it("Navigates to checkout page when clicking the Check out button", () => {
        renderComponent(1);

        const checkoutButton = screen.getByTestId("checkout-button");

        fireEvent.click(checkoutButton);

        expect(mockNavigate).toHaveBeenCalledWith("/checkout");
    });
});