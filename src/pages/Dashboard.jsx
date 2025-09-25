import { Outlet, Routes, Route } from "react-router-dom";
import Sidebar from "../components/sidebar";

function DashBoard() {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 p-6">
                <Outlet />
            </div>

        </div>
    )
}
export default DashBoard
