import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "./HomePage";
import MensPage from "./MensPage";
import WomensPage from "./WomensPage";
import JewelleryPage from "./JewelleryPage";
import ElectronicsPage from "./ElectronicsPage";
import CheckoutPage from "./CheckoutPage";
import ErrorPage from "./ErrorPage";

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
            ],
        },
    ]);

    return <RouterProvider router={router} />;
};

export default Router;
