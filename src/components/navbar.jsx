import { useState } from "react";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSearch } from "./cart/context";

const Navbar = () => {
  const { query, setQuery } = useSearch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate(`/search?q=${query}`);
    }
  };

  return (
    <div className="w-full">
      {/* Top offer bar */}
      <div className="bg-black text-white text-xs flex flex-col sm:flex-row gap-2 justify-center items-center py-2 text-center">
        <p>Sign up and get 20% off your first order.</p>
        <a href="#" className="underline hover:text-gray-300">
          Sign Up Now
        </a>
      </div>

      {/* Main navbar */}
      <nav className="py-4 px-6 flex justify-between items-center bg-white shadow-md relative">
        {/* Logo */}
        <Link to="/" className="font-bold text-2xl sm:text-3xl">
          SHOP.CO
        </Link>

        {/* Search bar (hidden on small screens) */}
        <div className="hidden md:block">
          <input
            type="search"
            id="mySearchInput"
            placeholder="Search your style"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-gray-100 w-[280px] h-[40px] px-4 rounded-3xl outline-none focus:ring-2 focus:ring-black transition"
          />
        </div>

        {/* Right section */}
        <div className="flex items-center gap-5">
          {/* Cart */}
          <div className="relative cursor-pointer">
            <FaShoppingCart className="text-xl" />
          </div>

          {/* Auth links (hidden on small screens) */}
          <div className="hidden md:flex items-center gap-4 font-semibold">
            <Link to="/signup" className="hover:text-gray-700">
              Sign Up
            </Link>
            <Link to="/login" className="hover:text-gray-700">
              Login
            </Link>
          </div>

          {/* Hamburger icon (visible only on mobile) */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile dropdown menu */}
        <div
          className={`absolute top-16 left-0 w-full bg-white shadow-lg flex flex-col items-center gap-4 py-4 transition-all duration-300 ${
            menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <input
            type="search"
            placeholder="Search your style"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-gray-100 w-[90%] h-[40px] px-4 rounded-3xl outline-none"
          />
          <Link to="/signup" className="hover:text-gray-700" onClick={() => setMenuOpen(false)}>
            Sign Up
          </Link>
          <Link to="/login" className="hover:text-gray-700" onClick={() => setMenuOpen(false)}>
            Login
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
