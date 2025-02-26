import { BrowserRouter } from "react-router-dom";
import ShopContext from "../../src/context/ShopContext";
import { describe, vi } from "vitest";
import ItemCard from "../../src/components/ItemCard";
import { fireEvent, render, screen } from "@testing-library/react";

const mockItem = {
    id: 1,
    title: "Test Product",
    image: "assets/jpg/electronics.png",
    price: 29.99
};

const mockContext = {
    products: [mockItem],
    cartItems: {},
    addToCart: vi.fn(),
    addMultipleToCart: vi.fn(),
    removeOneFromCart: vi.fn(),
    removeFromCart: vi.fn(),
    updateCart: vi.fn(),
    getTotalCartItems: vi.fn(),
    getTotalCartPrice: vi.fn(),
};

const renderComponent = () => {
    render(
        <BrowserRouter>
            <ShopContext.Provider value={mockContext}>
                <ItemCard item={mockItem} />
            </ShopContext.Provider>
        </BrowserRouter>
    );
};

describe("ItemCard component", () => {
    it("Renders with correct data", () => {
        renderComponent();

        expect(screen.getByText("Test Product")).toBeInTheDocument();
        expect(screen.getByText("$29.99")).toBeInTheDocument();
        expect(screen.getByRole("img", {name: "Test Product"})).toHaveAttribute("src", "assets/jpg/electronics.png");
        expect(screen.getByRole("button", {name: "Add to cart"})).toBeInTheDocument();
    });

    it("Clicking on the title or image should redirect to the product page", () => {
        renderComponent();

        const productImage = screen.getByRole("img", {name: "Test Product"});
        expect(productImage.closest("a")).toHaveAttribute("href", "/product/1");

        const productTitle = screen.getByText("Test Product");
        expect(productTitle.closest("a")).toHaveAttribute("href", "/product/1");
    });

    it("Clicking 'Add to cart' button calls addToCart and updates the button", () => {
        renderComponent();

        const addToCartButton = screen.getByText("Add to cart");

        fireEvent.click(addToCartButton);

        // addToCart is called 
        expect(mockContext.addToCart).toHaveBeenCalledWith(mockItem.id);

        // Add to cart button is hidden
        expect(addToCartButton).not.toBeInTheDocument();

        // The new buttons appear
        const deleteButton = screen.getByTestId("delete-button");
        expect(deleteButton).toBeInTheDocument();

        const incrementButton = screen.getByTestId("increment-button");
        expect(incrementButton).toBeInTheDocument();

        const quantityDisplay = screen.getByTestId("quantity-display");
        expect(quantityDisplay).toHaveTextContent("1");
    });

    it("Clicking the increment button", () => {
        renderComponent();

        // Add item to cart
        const addToCartButton = screen.getByText("Add to cart");
        fireEvent.click(addToCartButton);

        // Click the increment button
        const incrementButton = screen.getByTestId("increment-button");
        fireEvent.click(incrementButton);

        // Quantity should be 2
        const quantityDisplay = screen.getByTestId("quantity-display");
        expect(quantityDisplay).toHaveTextContent("2");
    });

    it("Clicking the decrement button", () => {
        renderComponent();

        // Add item to cart
        const addToCartButton = screen.getByText("Add to cart");
        fireEvent.click(addToCartButton);

        // Click the increment button
        const incrementButton = screen.getByTestId("increment-button");
        fireEvent.click(incrementButton);

        // Click the decrement button
        const decrementButton = screen.getByTestId("decrement-button");
        fireEvent.click(decrementButton);

        // Quantity should be 1
        const quantityDisplay = screen.getByTestId("quantity-display");
        expect(quantityDisplay).toHaveTextContent("1");
    });

    it("Clicking the delete button", () => {
        renderComponent();

        // Add item to cart
        const addToCartButton = screen.getByText("Add to cart");
        fireEvent.click(addToCartButton);

        // Click the delete button
        const deleteButton = screen.getByTestId("delete-button");
        fireEvent.click(deleteButton);

        expect(mockContext.removeOneFromCart).toHaveBeenCalledWith(1);
    });
});