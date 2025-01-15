import { useContext } from "react";
import ShopContext from "../context/ShopContext";
import { Link } from "react-router-dom";

const CheckoutItemCard = ({productId}) => {
    const {products, cartItems} = useContext(ShopContext);

    const getProduct = () => {
        for (const product of products) {
            if (product.id === Number(productId)) {
                return product;
            }
        }

        return {};
    };

    const product = getProduct();

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
                <div className="flex gap-4">
                    <button>-</button>
                    <input 
                        className="min-w-24 text-center border border-[#d6d3d1] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        type="number"
                        min="0"
                        max="1000"
                        value={cartItems[productId]}
                    />
                    <button>+</button>
                </div>
                <button className="text-sm text-[#ef4444] hover:underline">Delete</button>
            </div>
            <div className="w-1/6 flex justify-center items-center">${product.price}</div>
        </div>
    );
}

export default CheckoutItemCard;