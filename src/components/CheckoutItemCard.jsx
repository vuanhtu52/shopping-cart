import { useContext } from "react";
import ShopContext from "../context/ShopContext";
import { Link } from "react-router-dom";
import BinIcon from "../assets/svg/bin.svg";

const CheckoutItemCard = ({ productId }) => {
    const { products, cartItems, addToCart, removeOneFromCart, removeFromCart, updateCart } = useContext(ShopContext);

    const getProduct = () => {
        for (const product of products) {
            if (product.id === Number(productId)) {
                return product;
            }
        }

        return {};
    };

    const product = getProduct();

    const handleClickDecrement = () => {
        removeOneFromCart(productId);
    };

    const handleClickIncrement = () => {
        addToCart(productId);
    };

    const handleInputChange = e => {
        const newValue = Number(e.target.value);

        if (newValue > 1000) {
            updateCart(productId, 1000);
        } else if (newValue < 0) {
            updateCart(productId, 0);
        } else {
            updateCart(productId, newValue);
        }

    };

    const handleClickDelete = () => {
        removeFromCart(productId);
    };

    return (
        <div className="flex w-full gap-8 border-b border-gray-300">
            <Link to={`/product/${productId}`} className="w-1/6 flex justify-center items-center">
                <img
                    src={product.image}
                    alt={product.title}
                    className="object-contain min-w-32 w-32 p-4"
                />
            </Link>
            <div className="w-2/3 flex flex-col gap-4 items-start justify-center">
                <Link to={`/product/${productId}`} className="font-bold hover:text-[#fb923c]">{product.title}</Link>
                <div className="flex gap-4 justify-center items-center">
                    {
                        cartItems[productId] > 1 ?
                            <button className="w-5 h-5 flex justify-center items-center" onClick={handleClickDecrement}>-</button> :
                            <button data-testid="decrement-button" className="w-5 h-5" onClick={handleClickDelete}>
                                <img src={BinIcon} />
                            </button>
                    }
                    <input
                        className="min-w-24 text-center border border-[#d6d3d1] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        type="number"
                        min="0"
                        max="1000"
                        value={cartItems[productId]}
                        onChange={handleInputChange}
                    />
                    <button className="w-5 h-5 flex justify-center items-center" onClick={handleClickIncrement}>+</button>
                </div>
                <button data-testid="delete-button" className="text-sm text-[#ef4444] hover:underline" onClick={handleClickDelete}>Delete</button>
            </div>
            <div data-testid="total-price" className="w-1/6 flex justify-center items-center">{parseFloat((product.price * cartItems[productId]).toFixed(2))}</div>
        </div>
    );
}

export default CheckoutItemCard;