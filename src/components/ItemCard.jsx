import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import BinIcon from "../assets/svg/bin.svg";
import ShopContext from "../context/ShopContext";

const ItemCard = ({ item }) => {
    const {cartItems, addToCart, removeOneFromCart} = useContext(ShopContext);
    const [currentQuantity, setCurrentQuantity] = useState(0);

    const handleClickIncrement = () => {
        setCurrentQuantity(prev => prev + 1);
        addToCart(item.id);
    } 

    const handleClickDecrement = () => {
        setCurrentQuantity(prev => prev - 1);
        removeOneFromCart(item.id);
    }

    return (
        <div className="flex flex-col min-w-60 w-60 gap-2 border border-gray-300 p-2 rounded-2xl">
            {/* Image of the item */}
            <Link
                to={`product/${item.id}`}
            >
                <img
                    src={item["image"]}
                    alt={item["title"]}
                    className="object-contain w-full min-h-64 h-64 p-4"
                />
            </Link>

            {/* Title of the item */}
            <Link
                to={`product/${item.id}`}
                className="hover:text-[#fb923c]"
            >{item["title"]}</Link>

            {/* Price */}
            <div className="font-bold text-lg">${item.price}</div>

            {/* Buttons */}
            {
                currentQuantity === 0 ?
                    <button
                        className="self-start bg-amber-300 p-2 rounded-xl text-sm"
                        onClick={() => handleClickIncrement()}
                    >
                        Add to cart
                    </button> :
                    <div className="self-start flex justify-center items-center border-2 border-amber-300 rounded-xl p-1">
                        {
                            currentQuantity > 1 ?
                            <button className="w-5 h-5 flex justify-center items-center" onClick={() => handleClickDecrement()}>-</button> :
                            <button className="w-5 h-5" onClick={() => handleClickDecrement()}>
                                <img src={BinIcon} />
                            </button>
                        }
                        <div className="w-20 text-center">{currentQuantity}</div>
                        <button className="w-5 h-5 flex justify-center items-center" onClick={() => handleClickIncrement()}>+</button>
                    </div>
            }
        </div>
    );
};

export default ItemCard;