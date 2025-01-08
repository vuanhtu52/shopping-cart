import { useContext } from "react";
import ShopContext from "../context/ShopContext";
import ItemCard from "../components/ItemCard";

const JewelleryPage = () => {
    const { products } = useContext(ShopContext);

    return <div>
        <h2 className="text-center text-xl font-bold p-4">Jewellery</h2>
        <div className="grid gap-8 justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-4">
            {
                products
                    .filter(product => product.category === "jewelery")
                    .map(product => <ItemCard key={product.id} item={product} />)
            }
        </div>
    </div>;
};

export default JewelleryPage;