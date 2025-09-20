import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { ChevronDownIcon } from "@heroicons/react/24/solid"; // ✅ Updated import
import axios from "axios"
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      {/* Top banner */}
      <div className="bg-black text-white text-xs flex gap-2 justify-center py-2">
        <p>Sign up and get 20% off to your first order.</p>
        <a href="#" className="underline">
          Sign Up Now
        </a>
      </div>

      {/* Main navbar */}
      <div className="py-6">
        <div className="flex gap-6 justify-center items-center font-medium">
          {/* Logo */}
          <Link to="/home" className="font-bold text-3xl">SHOP.CO</Link>

          {/* Links */}
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
              className="bg-[#ece9e9] w-[300px] h-[45px] px-4 rounded-3xl outline-none"
            />
          </div>

          {/* Auth links */}
          <div className="flex items-center ml-6 gap-4 font-bold">
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Login</Link>
          </div>

          {/* Cart */}
          <div className="flex items-center">
            <FaShoppingCart className="text-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
