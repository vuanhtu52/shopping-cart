import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";
import ErrorPage from "../../src/pages/ErrorPage";

const renderComponent = () => {
    return render(
        <MemoryRouter>
            <ErrorPage />
        </MemoryRouter>
    );
};

describe("ErrorPage component", () => {
    it("Displays the error message correctly", () => {
        renderComponent();
        expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    });

    it("Displays the Back to home link correctly", () => {
        renderComponent();
        expect(screen.getByRole("link", {name: "Back to home"})).toHaveAttribute("href", "/");
    });
});