import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div>
            <div className="text-center p-4">Something went wrong</div>
            <div className="text-center p-4 hover:text-[#fb923c]">
                <Link to="/">Back to home</Link>
            </div>
        </div>
    );
};

export default ErrorPage;
