import { createContext } from "react";

const ShopContext = createContext({
    products: [],
    cartItems: [],
    addToCart: () => {},
    removeOneFromCart: () => {},
});

export default ShopContext;