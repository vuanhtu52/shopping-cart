import { useContext, useState } from "react";
import ShopContext from "../context/ShopContext";
import { useNavigate, useParams } from "react-router-dom";

const ProductPage = () => {
    const { products, cartItems } = useContext(ShopContext);
    const { productId } = useParams();
    const navigate = useNavigate();

    const getProduct = () => {
        for (const product of products) {
            if (product.id === Number(productId)) {
                return product;
            }
        }

        return {};
    }

    const product = getProduct();

    const getQuantity = id => {
        for (const product of products) {
            if (product.id === id) {
                return cartItems[id];
            }
        }

        return 0;
    }

    const handleClickBack = () => {
        navigate(-1);
    }

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
                        <button className="p-2 hover:bg-[#a8a29e]">-</button>
                        <input
                            className="text-center border border-[#d6d3d1]"
                            type="text"
                            value={getQuantity(productId)}
                        />
                        <button className="p-2 hover:bg-[#a8a29e]">+</button>
                    </div>
                    <button className="border border-1 border-[#f97316] rounded-full p-2 text-[#f97316]">Add to cart</button>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;