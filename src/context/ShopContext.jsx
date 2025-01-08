import { createContext } from "react";

const ShopContext = createContext({
    products: [],
    cartItems: [],
    addToCart: () => {},
    removeOneFromCart: () => {},
    getTotalCartItems: () => {},
});

export default ShopContext;