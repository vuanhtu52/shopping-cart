import { useState } from "react";
import { useEffect } from "react";
import Carousel from "../components/Carousel";
import MenWearImage from "../assets/jpg/men-wear.jpg";
import WomenWearImage from "../assets/jpg/women-wear.jpg";
import JewelleryImage from "../assets/jpg/jewellery.jpg";
import ElectronicsImage from "../assets/jpg/electronics.png";
import ItemCard from "../components/ItemCard";

const HomePage = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            // .then(json=>console.log(json))
            // .then(json => setItems(json))
            .then(json => {
                setItems(json);
                console.log(json);
            })
    }, []);

    const getCarouselItems = () => {
        return Object.values(
            items.reduce((categoriesMap, currentItem) => {
                if (!categoriesMap[currentItem.category]) {
                    categoriesMap[currentItem.category] = currentItem;
                }
                return categoriesMap;
            }, {})
        );
    }

    const getCarouselSlides = () => {
        let selectedItems = Object.values(
            items.reduce((categoriesMap, currentItem) => {
                if (!categoriesMap[currentItem.category]) {
                    categoriesMap[currentItem.category] = currentItem;
                }
                return categoriesMap;
            }, {})
        );

        return selectedItems.map(item => item["image"]);
    }

    return (
        <div className="w-[100%] m-auto">
            <Carousel slides={[MenWearImage, WomenWearImage, JewelleryImage, ElectronicsImage]} />
            <div className="text-2xl font-bold p-8 text-center">NEW ARRIVALS</div>
            <div className="grid gap-8 justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-4">
                {
                    items.slice(0, 5).map(item => (
                        <ItemCard key={item["id"]} item={item}/>
                    ))
                }
            </div> 
        </div>
    );
};

export default HomePage;
