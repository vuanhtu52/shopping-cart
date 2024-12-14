import { useState } from "react";
import { useEffect } from "react";
import Carousel from "./Carousel";

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
        <div className="w-[60%] m-auto pt-11">
            Home page
            <Carousel slides={getCarouselSlides()} />
        </div>
    );
};

export default HomePage;
