import { createContext } from "react";

const ShopContext = createContext({
    products: [],
    cartItems: [],
    addToCart: () => {},
    addMultipleToCart: () => {},
    removeOneFromCart: () => {},
    removeFromCart: () => {},
    getTotalCartItems: () => {},
    getTotalCartPrice: () => {},
});

export default ShopContext;