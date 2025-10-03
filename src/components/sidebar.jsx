import { Link, useNavigate } from "react-router-dom";
import api from "../global/Axios";

const Sidebar = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await api.delete('/admin/logout')

            localStorage.removeItem('adminToken')
            sessionStorage.removeItem('adminToken')

            navigate('/adminlogin')

        }
        catch (err) {
            console.log("Error during logout", err)
            alert('Logout failed. Please try again.')
        }
    }
        return (
            <div className="w-64 bg-gray-900 text-white p-6">
                <h3 className="text-xl font-bold mb-6">Admin DashBoard</h3>
                <div className="space-y-4">


                    <Link to="/dashboard/users" className="block hover:text-gray-300">Users</Link>
                    <Link to='/dashboard/products' className="block hover:text-gray-300">Products</Link>
                    <Link to='/dashboard/addproducts' className="block hover:text-gray-300">Add Products</Link>
                    <Link to='/dashboard/category' className="block hover:text-gray-300">Category</Link>
                    <Link to='/dashboard/addcategory' className="block hover:text-gray-300">Add Category</Link>
                    <Link to='/dashboard/admin/order' className="block hover:text-gray-300">Order</Link>



                </div>
                <button
                    onClick={handleLogout}
                    className="mt-6 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded w-full"
                >
                    Logout
                </button>
            </div>
        )
    }
    export default Sidebar