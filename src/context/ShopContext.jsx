import { createContext } from "react";

const ShopContext = createContext({
    products: [],
    cartItems: [],
    addToCart: () => {},
    addMultipleToCart: () => {},
    removeOneFromCart: () => {},
    getTotalCartItems: () => {},
});

export default ShopContext;