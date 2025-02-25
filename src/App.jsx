import { Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import ShopContext from "./context/ShopContext";
import { useEffect, useState } from "react";

const App = () => {
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);

    const addToCart = productId => { 
        setCartItems(prevItems => {
            const updatedItems = {...prevItems};

            if (updatedItems.hasOwnProperty(productId)) {
                updatedItems[productId] += 1;
            } else {
                updatedItems[productId] = 1;
            }

            return updatedItems;
        });
    };

    const addMultipleToCart = (productId, quantity) => {
        setCartItems(prevItems => {
            const updatedItems = {...prevItems};

            if (updatedItems.hasOwnProperty(productId)) {
                updatedItems[productId] += quantity;
            } else {
                updatedItems[productId] = quantity;
            }

            return updatedItems;
        });
    };

    const updateCart = (productId, quantity) => {
        setCartItems(prevItems => {
            const updatedItems = {...prevItems};

            updatedItems[productId] = quantity;

            return updatedItems;
        });
    }

    const removeOneFromCart = productId => {
        console.log("hello");
        setCartItems(prevItems => {
            const updatedItems = {...prevItems};

            if (!updatedItems.hasOwnProperty(productId)) {
                return updatedItems;
            }

            if (updatedItems[productId] > 1) {
                updatedItems[productId] -= 1;
            } else {
                delete updatedItems[productId];
            }

            return updatedItems;
        });
    };

    const removeFromCart = productId => {
        setCartItems(prevItems => {
            const updatedItems = {...prevItems};
            delete updatedItems[productId];
            return updatedItems;
        });
    };

    const getTotalCartItems = () => {
        let total = 0;

        for (let key in cartItems) {
            total += cartItems[key];
        }

        return total;
    };

    const getTotalCartPrice = () => {
        let total = 0;
        for (const product of products) {
            if (cartItems.hasOwnProperty(product.id)) {
                total += product.price * cartItems[product.id];
            }
        }

        total = parseFloat(total.toFixed(2));

        return total;
    };

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => setProducts(json))
    }, []);

    return (
        <ShopContext.Provider value={{ cartItems, products, addToCart, addMultipleToCart, updateCart, removeOneFromCart, removeFromCart, getTotalCartItems, getTotalCartPrice }}>
            <div className="flex flex-col min-h-screen">
                <NavBar />
                <div className="flex-grow">
                    <Outlet />
                </div>
                <Footer />
            </div>
        </ShopContext.Provider>
    );
};

export default App;
