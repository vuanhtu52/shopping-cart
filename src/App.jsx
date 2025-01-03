import { Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />
            <div className="flex-grow">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default App;
