import { describe } from "vitest";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavBar from "../../src/components/Navbar";
import userEvent from "@testing-library/user-event";

const renderComponent = () => {
    render(
        <MemoryRouter>
            <NavBar />
        </MemoryRouter>
    );
};

describe("NavBar component", () => {
    it("NavBar has logo linking to home", () => {
        renderComponent();

        const logo = screen.getByText("Random Shop");
        
        expect(logo).toBeInTheDocument();
        expect(logo.closest("a")).toHaveAttribute("href", "/");
    });

    it("NavBar has navigation links redirecting to correct paths", () => {
        renderComponent();

        expect(screen.getByText("Men's Clothing")).toBeInTheDocument();
        expect(screen.getByText("Men's Clothing")).toHaveAttribute("href", "/men");

        expect(screen.getByText("Women's Clothing")).toBeInTheDocument();
        expect(screen.getByText("Women's Clothing")).toHaveAttribute("href", "/women");

        expect(screen.getByText("Jewellery")).toBeInTheDocument();
        expect(screen.getByText("Jewellery")).toHaveAttribute("href", "/jewellery");

        expect(screen.getByText("Electronics")).toBeInTheDocument();
        expect(screen.getByText("Electronics")).toHaveAttribute("href", "/electronics");
    });

    it("The active link is underlined", () => {
        renderComponent();

        const menLink = screen.getByText("Men's Clothing");
        fireEvent.click(menLink);

        expect(menLink.classList.contains("underline")).toBe(true);
    });

    it("NavBar has the mobile menu button", () => {
        renderComponent();

        const menuButton = screen.getByTestId("menu-button");
        expect(menuButton).toBeInTheDocument();
    });

    it("Clicking the mobile menu button opens the menu", async () => {
        renderComponent();

        const menuButton = screen.getByTestId("menu-button");

        await userEvent.click(menuButton);

        expect(screen.getByTestId("men-mobile")).toBeVisible();
        expect(screen.getByTestId("women-mobile")).toBeVisible();
        expect(screen.getByTestId("jewellery-mobile")).toBeVisible();
        expect(screen.getByTestId("electronics-mobile")).toBeVisible();
    });

    it("Clicking the mobile menu button again closes the menu", async () => {
        renderComponent();

        const menuButton = screen.getByTestId("menu-button");
        await userEvent.click(menuButton);

        const closeButton = screen.getByTestId("close-button");
        await userEvent.click(closeButton);

        expect(screen.queryByTestId("men-mobile")).toBeNull();
        expect(screen.queryByTestId("women-mobile")).toBeNull();
        expect(screen.queryByTestId("jewellery-mobile")).toBeNull();
        expect(screen.queryByTestId("electronics-mobile")).toBeNull();
    });

    it("Shopping cart logo exists", () => {
        renderComponent();

        const cartLink = screen.getByTestId("cart-link");
        expect(cartLink).toHaveAttribute("href", "/checkout");
    });
});