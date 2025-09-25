import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="w-64 bg-gray-900 text-white p-6">
            <h3 className="text-xl font-bold mb-6">Admin DashBoard</h3>
            <div className="space-y-4">


                <Link to="/dashboard/users" className="block hover:text-gray-300">Users</Link>
                <Link to='/dashboard/products' className="block hover:text-gray-300">Products</Link>
                <Link to='/dashboard/addproducts' className="block hover:text-gray-300">Add Products</Link>
                <Link to='/dashboard/category' className="block hover:text-gray-300">Category</Link>
                <Link to='/dashboard/addcategory' className="block hover:text-gray-300">Add Category</Link>



            </div>

        </div>
    )
}
export default Sidebar