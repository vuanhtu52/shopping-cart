import CartIcon from "../assets/svg/cart.svg";
import MenuIcon from "../assets/svg/menu.svg";
import { useState } from "react";
import ArrowUpIcon from "../assets/svg/arrow-up.svg";
import { Transition } from "@headlessui/react";
import { Link } from "react-router-dom";

const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <div>
            {/* Top nav bar */}
            <div className="flex min-w-96 items-center justify-between gap-16 bg-zinc-800 p-8 text-white">
                {/* Mobile menu button */}
                <button className="block lg:hidden" onClick={toggleMenu}>
                    <img src={MenuIcon} alt="menu icon" className="w-8" />
                </button>

                {/* Logo */}
                <Link
                    to="/"
                    className="cursor-pointer font-dancing-script text-3xl"
                >
                    Random Shop
                </Link>

                {/* Navigation links */}
                <div className="hidden items-center justify-between gap-16 lg:flex">
                    <Link
                        to="men"
                        className="font-noto-sans underline-offset-8 hover:underline"
                    >
                        Men's Clothing
                    </Link>
                    <Link
                        to="women"
                        className="font-noto-sans underline-offset-8 hover:underline"
                    >
                        Women's Clothing
                    </Link>
                    <Link
                        to="jewelery"
                        className="font-noto-sans underline-offset-8 hover:underline"
                    >
                        Jewelery
                    </Link>
                    <Link
                        to="electronics"
                        className="font-noto-sans underline-offset-8 hover:underline"
                    >
                        Electronics
                    </Link>
                </div>

                {/* Shopping cart button */}
                <Link to="checkout">
                    <img src={CartIcon} alt="cart icon" className="w-8" />
                </Link>
            </div>

            {/* Mobile menu - hidden by default */}
            <Transition
                show={menuOpen}
                enter="transition duration-150 origin-top ease-in-out"
                enterFrom="transform opacity-0 scale-y-0"
                enterTo="transfrom opacity-100 scale-y-100"
                leave="transition duration-150 origin-top ease-in-out"
                leaveFrom="transform opacity-100 scale-y-100"
                leaveTo="transform opacity-0 scale-y-0"
            >
                <div className="fixed flex w-full flex-col bg-zinc-800 p-8 text-white">
                    <Link
                        to="men"
                        className="border-b border-gray-500 py-4 font-noto-sans underline-offset-8 hover:underline"
                    >
                        Men's Clothing
                    </Link>
                    <Link
                        to="women"
                        className="border-b border-gray-500 py-4 font-noto-sans underline-offset-8 hover:underline"
                    >
                        Women's Clothing
                    </Link>
                    <Link
                        to="jewelery"
                        className="border-b border-gray-500 py-4 font-noto-sans underline-offset-8 hover:underline"
                    >
                        Jewelery
                    </Link>
                    <Link
                        to="electronics"
                        className="border-b border-gray-500 py-4 font-noto-sans underline-offset-8 hover:underline"
                    >
                        Electronics
                    </Link>
                    <button
                        className="mt-8 h-8 w-8 self-center p-0"
                        onClick={closeMenu}
                    >
                        <img src={ArrowUpIcon} alt="arrow up icon" />
                    </button>
                </div>
            </Transition>
        </div>
    );
};

export default NavBar;
