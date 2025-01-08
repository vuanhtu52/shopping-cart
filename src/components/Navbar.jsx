import CartIcon from "../assets/svg/cart.svg";
import MenuIcon from "../assets/svg/menu.svg";
import { useContext, useState } from "react";
import ArrowUpIcon from "../assets/svg/arrow-up.svg";
import { Transition } from "@headlessui/react";
import { Link, NavLink, useLocation } from "react-router-dom";
import ShopContext from "../context/ShopContext";

const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { cartItems, getTotalCartItems } = useContext(ShopContext);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const location = useLocation();

    return (
        <div className="w-full z-50">
            {/* Top nav bar */}
            <div className="flex h-28 min-w-96 items-center justify-between gap-16 bg-zinc-800 p-8 text-white">
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
                    <NavLink
                        to="men"
                        className={
                            ({ isActive }) => `${isActive ? "underline" : ""} font-noto-sans underline-offset-8 hover:underline`
                        }
                    >
                        Men's Clothing
                    </NavLink>
                    <NavLink
                        to="women"
                        className={
                            ({ isActive }) => `${isActive ? "underline" : ""} font-noto-sans underline-offset-8 hover:underline`
                        }
                    >
                        Women's Clothing
                    </NavLink>
                    <NavLink
                        to="jewellery"
                        className={
                            ({ isActive }) => `${isActive ? "underline" : ""} font-noto-sans underline-offset-8 hover:underline`
                        }
                    >
                        Jewellery
                    </NavLink>
                    <NavLink
                        to="electronics"
                        className={
                            ({ isActive }) => `${isActive ? "underline" : ""} font-noto-sans underline-offset-8 hover:underline`
                        }
                    >
                        Electronics
                    </NavLink>
                </div>

                {/* Shopping cart button */}
                <Link to="checkout" className="relative">
                    <img src={CartIcon} alt="cart icon" className="w-8" />
                    {
                        getTotalCartItems() > 0 ?
                            <span className="absolute -top-4 -right-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center w-7 h-7">
                                {getTotalCartItems()}
                            </span> :
                            null
                    }
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
                <div className="flex flex-col bg-zinc-800 p-8 text-white">
                    <NavLink
                        to="men"
                        className={
                            ({ isActive }) => `${isActive ? "underline" : ""} border-b border-gray-500 py-4 font-noto-sans underline-offset-8 hover:underline`
                        }
                    >
                        Men's Clothing
                    </NavLink>
                    <NavLink
                        to="women"
                        className={
                            ({ isActive }) => `${isActive ? "underline" : ""} border-b border-gray-500 py-4 font-noto-sans underline-offset-8 hover:underline`
                        }
                    >
                        Women's Clothing
                    </NavLink>
                    <NavLink
                        to="jewellery"
                        className={
                            ({ isActive }) => `${isActive ? "underline" : ""} border-b border-gray-500 py-4 font-noto-sans underline-offset-8 hover:underline`
                        }
                    >
                        Jewellery
                    </NavLink>
                    <NavLink
                        to="electronics"
                        className={
                            ({ isActive }) => `${isActive ? "underline" : ""} border-b border-gray-500 py-4 font-noto-sans underline-offset-8 hover:underline`
                        }
                    >
                        Electronics
                    </NavLink>
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
