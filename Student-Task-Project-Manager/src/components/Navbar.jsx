import { Link } from "react-router-dom";
function Navbar() {
    return (
        <nav>
            <h2>Student Task Portal</h2>

            <div className="nav-links">
                <Link to={"/"}>Home</Link>
                <Link to={"/tasks"}>Tasks </Link>
            </div>
        </nav>
    );
}

export default Navbar;