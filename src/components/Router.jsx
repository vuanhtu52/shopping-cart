import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage";
import MensPage from "../pages/MensPage";
import WomensPage from "../pages/WomensPage";
import JewelleryPage from "../pages/JewelleryPage";
import ElectronicsPage from "../pages/ElectronicsPage";
import CheckoutPage from "../pages/CheckoutPage";
import ErrorPage from "../pages/ErrorPage";
import ProductPage from "../pages/ProductPage";

const Router = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <App />,
            errorElement: <ErrorPage />,
            children: [
                { index: true, element: <HomePage /> },
                { path: "men", element: <MensPage /> },
                { path: "women", element: <WomensPage /> },
                { path: "jewellery", element: <JewelleryPage /> },
                { path: "electronics", element: <ElectronicsPage /> },
                { path: "checkout", element: <CheckoutPage /> },
                {path: "product/:id", element: <ProductPage />}
            ],
        },
    ]);

    return <RouterProvider router={router} />;
};

export default Router;
