import { Outlet, Link } from "react-router-dom";
import Navbar from "../components/navbar";
export default function Root() {
    return (
        <div className="app-container">
            <Navbar/>
            <Outlet />
        </div>
        );
}