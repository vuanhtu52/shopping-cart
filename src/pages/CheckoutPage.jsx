import { useContext } from "react";
import ShopContext from "../context/ShopContext";
import CheckoutItemCard from "../components/CheckoutItemCard";
import { Link } from "react-router-dom";

const CheckoutPage = () => {
    const { cartItems, getTotalCartPrice } = useContext(ShopContext);

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="text-center text-3xl font-bold p-8">Shopping Cart</div>
            {
                Object.keys(cartItems).length === 0 ?
                    <div className="flex flex-col justify-center items-center gap-4 text-lg">
                        <div>Your cart looks empty</div>
                        <Link to="/" className="underline underline-offset-2 hover:text-[#fb923c]">Shop now</Link>
                    </div> :
                    <div className="flex flex-col justify-center items-center w-3/4 gap-8">
                        {
                            Object.keys(cartItems).map(productId => (
                                <CheckoutItemCard key={productId} productId={productId} />
                            ))
                        }
                        <div className="self-end text-xl font-bold">Total: ${getTotalCartPrice()}</div>
                        <button className="self-end bg-[#fb923c] text-white border border-1 rounded-md p-4">CHECKOUT</button>
                    </div>
            }
        </div>
    );
};

export default CheckoutPage;
