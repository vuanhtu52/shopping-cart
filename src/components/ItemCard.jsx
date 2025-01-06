import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import BinIcon from "../assets/svg/bin.svg";

const ItemCard = ({ item }) => {
    const [cartQuantity, setCartQuantity] = useState(0);

    const handleAddToCart = () => {
        setCartQuantity(prev => prev + 1);
    };

    const handleIncrement = () => {
        setCartQuantity(prev => prev + 1);
    };

    const handleDecrement = () => {
        setCartQuantity(prev => prev - 1);
    };

    const handleDeleteFromCart = () => {
        setCartQuantity(0);
    };

    return (
        <div className="flex flex-col min-w-60 w-60 gap-2 border border-gray-300 p-2 rounded-2xl">
            <Link
                to={`product/${item.id}`}
            >
                <img
                    src={item["image"]}
                    alt={item["title"]}
                    className="object-contain w-full min-h-64 h-64 p-4"
                />
            </Link>
            <Link
                to={`product/${item.id}`}
                className="hover:text-[#fb923c]"
            >{item["title"]}</Link>
            <div className="font-bold text-lg">$100</div>
            {
                cartQuantity === 0 ?
                    <button
                        className="self-start bg-amber-300 p-2 rounded-xl text-sm"
                        onClick={handleAddToCart}
                    >
                        Add to cart
                    </button> :
                    <div className="self-start flex justify-center items-center border-2 border-amber-300 rounded-xl p-1">
                        {
                            cartQuantity > 1 ?
                            <button className="w-5 h-5 flex justify-center items-center" onClick={handleDecrement}>-</button> :
                            <button className="w-5 h-5" onClick={handleDeleteFromCart}>
                                <img src={BinIcon} />
                            </button>
                        }
                        <div className="w-20 text-center">{cartQuantity}</div>
                        <button className="w-5 h-5 flex justify-center items-center" onClick={handleIncrement}>+</button>
                    </div>
            }
        </div>
    );
};

export default ItemCard;