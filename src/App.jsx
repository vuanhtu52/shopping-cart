import { Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import ShopContext from "./context/ShopContext";
import { useEffect, useState } from "react";

const App = () => {
    const [cartItems, setCartItems] = useState([]);

    const [products, setProducts] = useState([]);

    const addToCart = () => { };

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            // .then(json=>console.log(json))
            // .then(json => setItems(json))
            .then(json => {
                setProducts(json);
                console.log(json);
            })
    }, []);

    return (
        // <div className="flex flex-col min-h-screen">
        //     <NavBar />
        //     <div className="flex-grow">
        //         <Outlet />
        //     </div>
        //     <Footer />
        // </div>

        <ShopContext.Provider value={{ cartItems, products, addToCart }}>
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
