import { useNavigate } from "react-router-dom";

const ItemCard = ({ item }) => {
    const navigate = useNavigate();

    const handleClickImage = () => {
        navigate(`/product/${item.id}`)
    }

    return (
        <div className="flex flex-col min-w-60 w-60 gap-2 border border-gray-300 p-2 rounded-2xl">
            <img
                src={item["image"]}
                alt={item["title"]}
                className="object-contain w-full min-h-64 h-64 p-4"
                onClick={handleClickImage}
            />
            <div>{item["title"]}</div>
            <div className="font-bold text-lg">$100</div>
            <button className="self-start bg-amber-300 p-2 rounded-xl text-sm">Add to cart</button>
        </div>
    );
};

export default ItemCard;