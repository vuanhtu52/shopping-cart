import { render, screen } from "@testing-library/react";
import Footer from "../../src/components/Footer";

describe("Footer component", () => {
    it("Renders the main sections correctly", () => {
        render(<Footer />);

        expect(screen.getByText("COMPANY")).toBeInTheDocument();
        expect(screen.getByText("BRAND")).toBeInTheDocument();
        expect(screen.getByText("HELP")).toBeInTheDocument();
        expect(screen.getByText("ASK A STAFF")).toBeInTheDocument();
    });

    it("Renders COMPANY section correctly", () => {
        render(<Footer />);

        const items = ["Our Story", "Shop Locations", "Virtual", "Eyecare", "Philanthropy"];
        items.forEach(item => expect(screen.getByText(item)).toBeInTheDocument());
    });

    it("Renders BRAND section correctly", () => {
        render(<Footer />);

        const items = ["Style & Fit", "Craftsmanship", "Reviews", "Blog", "Press"];
        items.forEach(item => expect(screen.getByText(item)).toBeInTheDocument());
    });

    it("Renders HELP section correctly", () => {
        render(<Footer />);

        const items = ["Shipping & Returns", "Repairs", "Warranty", "FAQ", "Contact Us"];
        items.forEach(item => expect(screen.getByText(item)).toBeInTheDocument());
    });

    it("Renders ASK A STAFF section correctly", () => {
        render(<Footer />);

        // All texts render correctly
        expect(screen.getByText("Whatever you want to buy, we are here to assist.")).toBeInTheDocument();
        expect(screen.getByText("0123456789")).toBeInTheDocument();
        expect(screen.getByText("randomshop@gmail.com")).toBeInTheDocument();
        expect(screen.getByText("Chat With Us")).toBeInTheDocument();

        // Image renders correctly
        expect(screen.getByAltText("phone icon")).toBeInTheDocument();
        expect(screen.getByAltText("mail icon")).toBeInTheDocument();
        expect(screen.getByAltText("chat icon")).toBeInTheDocument();
    });
});