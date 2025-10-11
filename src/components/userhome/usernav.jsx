import { useEffect, useState } from "react";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { useCart, useSearch } from "../cart/context";
import api from "../../global/Axios";

const Usernavbar = () => {
    const { cartItems } = useCart();
    const { query, setQuery } = useSearch()
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [open, setOpen] = useState(false)


    const Quantity = cartItems.reduce((total, item) => total + item.quantity, 0)

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get('/api/user/getprofile')
                setProfile(res.data)
            }
            catch (err) {
                console.log("Error fetching profile", err)
            }
        }
        fetchProfile()
    }, [])

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            navigate(`/search?q=${query}`);
        }
    }



    const handleLogout = async () => {
        try {
            const res = await api.delete('/api/user/logout')

            if (res.status === 200) {

                localStorage.removeItem('userToken')
                sessionStorage.removeItem('userToken')

                navigate('/login')
            }
        }
        catch (err) {
            console.log("Error during logout", err)
            alert('Logout failed. Please try again.')
        }
    }

    return (
        <div>

            <div className="bg-black text-white text-xs flex gap-2 justify-center py-2">
                <p>Sign up and get 20% off to your first order.</p>
                <a href="#" className="underline">
                    Sign Up Now
                </a>
            </div>

            {/* Main navbar */}
            <div className="py-6">
                <div className="flex gap-6 justify-center items-center font-medium">

                    <Link to="/home" className="font-bold text-3xl">SHOP.CO</Link>


                    <ul className="flex gap-5 items-center">
                        <li className="relative inline-block group">
                            <div className="inline-flex items-center justify-center gap-x-1.5 px-3 py-2 font-medium ">
                                Shop
                                <ChevronDownIcon
                                    aria-hidden="true"
                                    className="-mr-1 h-5 w-5"
                                />
                            </div>
                            <div
                                className="absolute left-0 mt-2 hidden w-40 bg-white shadow-md rounded-md 
                           group-hover:block group-hover:opacity-100 group-hover:translate-y-0
                           opacity-0 translate-y-2 transition-all duration-300 ease-out z-10"
                            >
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Men
                                </a>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Women
                                </a>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Kids
                                </a>
                            </div>
                        </li>
                        <li>On Sale</li>
                        <li>New Arrivals</li>
                        <li>Brands</li>
                    </ul>

                    {/* Search bar */}
                    <div>
                        <input
                            type="search"
                            id="mySearchInput"
                            placeholder="Search your style"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="bg-[#ece9e9] w-[300px] h-[45px] px-4 rounded-3xl outline-none"
                        />
                    </div>

                    {/* Auth links */}
                    {/* <div className="flex items-center ml-6 gap-4 font-bold">
                        <Link to="/signup">Sign Up</Link>
                        <Link to="/login">Login</Link>
                    </div> */}

                    {/* Cart */}
                    <div className="flex items-center relative cursor-pointer">
                        <Link to='/cart'> <FaShoppingCart className="text-xl" /></Link>
                        {Quantity > 0 && (
                            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                {Quantity}
                            </span>
                        )}
                    </div>

                    {/* Profile */}
                    <div className="relative  ml-4 cursor-pointer"
                        onMouseEnter={() => setOpen(true)}
                        onMouseLeave={() => setOpen(false)}>
                        <div className="flex items-center gap-2">
                            <FaUserCircle className="text-2xl" />
                            {profile && <span className="text-sm font-medium">{profile.name}</span>}
                        </div>
                        {open &&
                            <div
                                className="absolute right-0 mt-2  bg-white shadow-lg rounded-md w-44 hover:b transition z-20"
                            >
                                <Link
                                    to="/profile"
                                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                                >
                                    Update Profile
                                </Link>


                                <Link
                                    to="/order"
                                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                                >
                                    My Orders
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                            </div>
                        }
                    </div>



                </div>
            </div>
        </div >
    );
};

export default Usernavbar;
