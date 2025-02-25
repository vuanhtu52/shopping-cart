import { MemoryRouter } from "react-router-dom";
import { describe, vi } from "vitest";
import ShopContext from "../../src/context/ShopContext";
import CheckoutItemCard from "../../src/components/CheckoutItemCard";
import { fireEvent, render, screen, within } from "@testing-library/react";

const mockProduct = {
    id: 1,
    title: "Test Product",
    price: 10,
    image: "assets/jpg/electronics.jpg"
};

const mockContext = {
    products: [mockProduct],
    cartItems: {1: 2},
    addToCart: vi.fn(),
    addMultipleToCart: vi.fn(),
    removeOneFromCart: vi.fn(),
    removeFromCart: vi.fn(),
    updateCart: vi.fn(),
    getTotalCartItems: vi.fn(),
    getTotalCartPrice: vi.fn(),
};

const renderComponent = () => {
    return render(
        <MemoryRouter>
            <ShopContext.Provider value={mockContext}>
                <CheckoutItemCard productId={1}></CheckoutItemCard>
            </ShopContext.Provider>
        </MemoryRouter>
    );
};

describe("CheckoutItemCard component", () => {
    it("Component renders correctly", () => {
        const {container} = renderComponent();
        expect(container).toMatchSnapshot();
    });

    it("Component renders product info correctly", () => {
        renderComponent();

        expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
        expect(screen.getByRole("img")).toHaveAttribute("src", "assets/jpg/electronics.jpg");   // Image
        expect(screen.getByRole("spinbutton")).toHaveValue(2);  // Quantity
        expect(screen.getByText("20")).toBeInTheDocument(); // Price
    });

    it("Clicking the increment button increases quantity and price", () => {
        renderComponent();

        const incrementButton = screen.getByText("+");
        const quantityInputField = screen.getByRole("spinbutton");
        const totalPriceDisplay = screen.getByTestId("total-price");

        expect(quantityInputField).toHaveValue(2);
        expect(within(totalPriceDisplay).getByText("20")).toBeInTheDocument();

        fireEvent.click(incrementButton);

        expect(mockContext.addToCart).toHaveBeenCalledTimes(1);
        expect(mockContext.addToCart).toHaveBeenCalledWith(1);
    });

    it("Clicking the decrement button decreases quantity and price", () => {
        renderComponent();

        const decrementButton = screen.getByText("-");
        const quantityInputField = screen.getByRole("spinbutton");
        const totalPriceDisplay = screen.getByTestId("total-price");

        expect(quantityInputField).toHaveValue(2);
        expect(within(totalPriceDisplay).getByText("20")).toBeInTheDocument();

        fireEvent.click(decrementButton);

        expect(mockContext.removeOneFromCart).toHaveBeenCalledTimes(1);
        expect(mockContext.removeOneFromCart).toHaveBeenCalledWith(1);
    });

    it("Clicking the decrement button when quantity is 1 removes the item", () => {
        mockContext.cartItems[1] = 1;
        renderComponent();

        const decrementButton = screen.getByTestId("decrement-button");

        fireEvent.click(decrementButton);

        expect(mockContext.removeFromCart).toHaveBeenCalledTimes(1);
        expect(mockContext.removeFromCart).toHaveBeenCalledWith(1);
    });

    it("Entering quantity value in the input field updates the quantity and price accordingly", () => {
        renderComponent();

        const input = screen.getByRole("spinbutton");

        fireEvent.change(input, {target: {value: "500"}});

        expect(mockContext.updateCart).toHaveBeenCalledTimes(1);
        expect(mockContext.updateCart).toHaveBeenCalledWith(1, 500);
    });

    it("Entering quantity value greater than 1000 sets the quantity to 1000", () => {
        renderComponent();

        const input = screen.getByRole("spinbutton");

        fireEvent.change(input, {target: {value: "1500"}});

        expect(mockContext.updateCart).toHaveBeenCalledWith(1, 1000);
    });

    it("Entering quantity value less than 0 sets the quantity to 0", () => {
        renderComponent();

        const input = screen.getByRole("spinbutton");

        fireEvent.change(input, {target: {value: "-100"}});

        expect(mockContext.updateCart).toHaveBeenCalledWith(1, 0);
    });

    it("Clicking delete button removes the item", () => {
        renderComponent();

        const deleteButton = screen.getByTestId("delete-button");

        fireEvent.click(deleteButton);

        expect(mockContext.removeFromCart).toHaveBeenCalledWith(1);
    });
});