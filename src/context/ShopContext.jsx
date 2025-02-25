import { createContext } from "react";

const ShopContext = createContext({
    products: [],
    cartItems: {},
    addToCart: () => {},
    addMultipleToCart: () => {},
    removeOneFromCart: () => {},
    removeFromCart: () => {},
    updateCart: () => {},
    getTotalCartItems: () => {},
    getTotalCartPrice: () => {},
});

export default ShopContext;