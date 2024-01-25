import { Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./components/Navbar";
import Router from "./components/Router";

const App = () => {
    return (
        <div className="pt-28">
            <NavBar />
            <Outlet />
        </div>
    );
};

export default App;
