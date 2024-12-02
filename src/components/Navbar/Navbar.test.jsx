import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";
import { describe, expect, it } from "vitest";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import App from "../../App";
import NavBar from "./Navbar";

describe("Navbar", () => {
    it("renders navbar", () => {
        const { container } = render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>,
        );
        expect(container).toMatchSnapshot();
    });

    // it("hover overs nav link", async () => {
    //     const user = userEvent.setup();

    //     render(
    //         <BrowserRouter>
    //             <App />
    //         </BrowserRouter>,
    //     );

    //     const navLinks = screen.getAllByRole("div");
    //     expect(navLinks[0]).toBeInTheDocument();
    // });
});
