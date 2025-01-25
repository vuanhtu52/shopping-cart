import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import App from "../src/App";
import { describe, expect, it, vi } from "vitest";
import { BrowserRouter, MemoryRouter, Outlet, useLocation } from "react-router-dom";
import ShopContext from "../src/context/ShopContext";
import React from "react";

// describe("App component", () => {
//     it("renders correct heading", () => {
//         render(
//             <BrowserRouter>
//                 <App />
//             </BrowserRouter>,
//         );
//         // expect(screen.getByRole("heading").textContent).toMatch(
//         //     /our first test/i,
//         // );
//         expect(screen.getAllByRole("button")[0]).toBeInTheDocument();
//     });
// });

// Mock the outlet
// vi.mock("react-router-dom", () => ({
//     Outlet: () => <div data-testid="outlet" />,
//     Link: ({to, children}) => <a href={to} data-testid="link">{children}</a>,
//     useLocation: () => ({pathname: "/"}),
// }));

vi.mock("react-router-dom", async (importOriginal) => {
    const actual = await importOriginal(); // Import the actual implementation
    return {
        ...actual, // Keep all actual exports
        Outlet: () => <div data-testid="outlet" />, // Mock Outlet
        Link: ({ to, children }) => <a href={to} data-testid="link">{children}</a>, // Mock Link
        NavLink: ({ to, children, ...props }) => (
            <a href={to} data-testid="navlink" {...props}>
                {children}
            </a>
        ), // Mock NavLink
    };
});

// Test cases for the App component
describe("App component", () => {
    it("Outlet renders properly", () => {
        render(
            <MemoryRouter>
                <App />
            </MemoryRouter>
        )
        expect(screen.getByTestId("outlet")).toBeInTheDocument();
    });

    it("Fetches products on mount", async () => {
        const mockProducts = [
            { id: 1, price: 10 },
            { id: 2, price: 15 }
        ];
        global.fetch = vi.fn(
            () => Promise.resolve({ json: () => Promise.resolve(mockProducts) })
        );
    });

    it("addToCart", async () => {
        let contextValue;

        const TestConsumer = () => {
            const context = React.useContext(ShopContext);
            contextValue = context; // Expose the context for testing
            return null;
        };

        render(
            <BrowserRouter>
                <App />
                <TestConsumer />
            </BrowserRouter>
        );

        // Assert initial state
        expect(contextValue.cartItems).toEqual({}); // cartItems should be initially empty

        // Act to call addToCart
        await act(async () => {
            contextValue.addToCart(1);
        });

        // Assert cartItems after adding a product
        expect(contextValue.cartItems).toEqual({ 1: 1 });

        await act(async () => {
            contextValue.addToCart(1);
        });

        // Assert cartItems after adding the same product again
        expect(contextValue.cartItems).toEqual({ 1: 2 });

        await act(async () => {
            contextValue.addToCart(2);
        });

        // Assert cartItems after adding a different product
        expect(contextValue.cartItems).toEqual({ 1: 2, 2: 1 });

    });


    // it("addToCart", () => {
    //     const contextValueRef = React.useRef();

    //     const TestConsumer = () => {
    //         const context = React.useContext(ShopContext);
    //         contextValueRef.current = context; // Expose the context for testing
    //         return null;
    //     };

    //     render(
    //         <BrowserRouter>
    //             <App />
    //             <TestConsumer />
    //         </BrowserRouter>
    //     );

    //     const { addToCart, cartItems } = contextValueRef.current;

    //     // Assert initial state
    //     expect(cartItems).toEqual({}); // cartItems should be initially empty

    //     // Add product with ID 1
    //     addToCart(1);
    //     expect(contextValueRef.current.cartItems).toEqual({ 1: 1 });

    //     // Add product with ID 1 again
    //     addToCart(1);
    //     expect(contextValueRef.current.cartItems).toEqual({ 1: 2 });

    //     // Add a different product with ID 2
    //     addToCart(2);
    //     expect(contextValueRef.current.cartItems).toEqual({ 1: 2, 2: 1 });
    // });
});

