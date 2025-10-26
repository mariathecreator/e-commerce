import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import api from "../global/Axios";
import { useEffect, useState } from "react";

function DashBoard() {
    const [admin, setAdmin] = useState('')
    const navigate = useNavigate()
    const fetchAdmin = async () => {
        try {
            const res = await api.get('/api/admin/getadmin')
            if (res.data) {
                setAdmin(res.data);
            } else {
                navigate("/adminlogin");
            }
        }
        catch (err) {
            console.log("Failed to fetch Admin:", err.response?.data || err.message);
            navigate('/adminlogin')

        }
    }

    useEffect(() => {
        fetchAdmin();
    },[])


    return (
        <div className="flex min-h-screen ">
            <Sidebar />

            <div className="flex-1 p-6">
                <Outlet />
            </div>

        </div>
    )
}
export default DashBoard
