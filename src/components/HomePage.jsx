import { useState } from "react";
import { useEffect } from "react";
import Carousel from "./Carousel";
import MenWearImage from "../assets/jpg/men-wear.jpg";
import WomenWearImage from "../assets/jpg/women-wear.jpg";
import JewelleryImage from "../assets/jpg/jewellery.jpg";
import ElectronicsImage from "../assets/jpg/electronics.png";

const HomePage = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            // .then(json=>console.log(json))
            .then(json => setItems(json))
            // .then(console.log(items))
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
            <Carousel slides={[MenWearImage, WomenWearImage, JewelleryImage, ElectronicsImage]}/>
        </div>
    );
};

export default HomePage;
