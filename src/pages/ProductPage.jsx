import { useContext, useState } from "react";
import ShopContext from "../context/ShopContext";
import { Link, useNavigate, useParams } from "react-router-dom";

const ProductPage = () => {
    const { products, addMultipleToCart } = useContext(ShopContext);
    const { productId } = useParams();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(0);

    const getProduct = () => {
        for (const product of products) {
            if (product.id === Number(productId)) {
                return product;
            }
        }

        return {};
    };

    const product = getProduct();

    const handleClickBack = () => {
        navigate(-1);
    };

    const handleClickIncrement = () => {
        setQuantity(prev => prev + 1);
    };

    const handleClickDecrement = () => {
        setQuantity(prev => prev - 1);
    };

    const handleInputChange = e => {
        const value = Number(e.target.value);

        if (value > 1000) {
            setQuantity(1000);
        } else {
            setQuantity(value);
        }
    };

    const handleAddToCart = () => {
        addMultipleToCart(product.id, quantity);
        setQuantity(0);
    };

    return (
        <div className="p-8">
            {/* Back button */}
            <button className="hover:text-[#fb923c]" onClick={() => handleClickBack()}>&lt; Back</button>

            <div className="grid gap-16 md:gap-32 grid-cols-1 sm:grid-cols-2 mt-16">
                {/* Image on the left */}
                <div className="flex justify-center sm:justify-end items-center">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="object-contain min-w-24 max-w-80 h-auto"
                    />
                </div>

                {/* Content on the right */}
                <div className="flex flex-col gap-4 lg:px-32">
                    <div className="text-2xl font-bold text-[#f97316]">{product.title}</div>
                    <div className="text-xl font-bold border-b border-gray pb-4">${product.price}</div>
                    <div>{product.description}</div>
                    <div>QUANTITY</div>
                    <div className="flex gap-2">
                        <button
                            className={`${quantity === 0 ? "disabled:opacity-50 disabled:cursor-not-allowed" : "hover:bg-[#a8a29e]"} p-2`}
                            disabled={quantity === 0}
                            onClick={handleClickDecrement}
                        >
                            -
                        </button>
                        <input
                            className="min-w-24 text-center border border-[#d6d3d1] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            type="number"
                            min="0"
                            max="1000"
                            value={quantity}
                            onChange={handleInputChange}
                        />
                        <button
                            className={`${quantity === 1000 ? "disabled:opacity-50 disabled:cursor-not-allowed" : "hover:bg-[#a8a29e]"} p-2`}
                            disabled={quantity === 1000}
                            onClick={handleClickIncrement}
                        >
                            +
                        </button>
                    </div>
                    <button
                        className={`${quantity === 0 ? "disabled:opacity-50 disabled:cursor-not-allowed" : "hover:text-white hover:bg-[#f97316]"} border border-1 border-[#f97316] rounded-full p-2 text-[#f97316]`}
                        disabled={quantity === 0}
                        onClick={handleAddToCart}
                    >
                        Add to cart
                    </button>
                    <button className="border border-1 border-black rounded-full p-2 hover:text-white hover:bg-black" onClick={() => navigate("/checkout")}>
                        Check out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;