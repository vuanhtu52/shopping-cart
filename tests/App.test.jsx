import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import App from "../src/App";
import { describe, expect, it, vi } from "vitest";
import { BrowserRouter, MemoryRouter, Outlet, useLocation } from "react-router-dom";
import ShopContext from "../src/context/ShopContext";
import React, { useContext, useRef } from "react";


vi.mock("react-router-dom", async (importOriginal) => {
    const actual = await importOriginal(); // Import the actual implementation
    return {
        ...actual, // Keep all actual exports
        Outlet: () => <div data-testid="outlet" />, // Mock Outlet
        Link: ({ to, children }) => <a href={to} data-testid="link">{children}</a>, // Mock Link
        NavLink: ({ to, className, children, ...props }) => {
            const resolvedClassName = typeof className === "function" ? className({ isActive: false }) : className; // Mock `isActive`
            return (
                <a href={to} data-testid="navlink" className={resolvedClassName} {...props}>
                    {children}
                </a>
            );
        },
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
});

