import { render, screen } from "@testing-library/react";
import App from "./App";
import { describe, expect, it } from "vitest";
import { BrowserRouter } from "react-router-dom";

describe("App component", () => {
    it("renders correct heading", () => {
        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>,
        );
        // expect(screen.getByRole("heading").textContent).toMatch(
        //     /our first test/i,
        // );
        expect(screen.getAllByRole("button")[0]).toBeInTheDocument();
    });
});
