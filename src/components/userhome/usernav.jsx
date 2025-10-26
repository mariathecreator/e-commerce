import { useEffect, useState } from "react";
import { FaShoppingCart, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useCart, useSearch } from "../cart/context";
import api from "../../global/Axios";

const Usernavbar = () => {
  const { cartItems } = useCart();
  const { query, setQuery } = useSearch();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const Quantity = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);

  // Fetch profile
  const fetchProfile = async () => {
    try {
      const res = await api.get("/api/user/getprofile", { withCredentials: true });
      setProfile(res.data);
    } catch (err) {
      console.log("Error fetching profile", err);
    }
  };

  useEffect(() => {
    fetchProfile();
     // ensure navbar stays in sync on load
  }, []);

  // Handle search
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate(`/search?q=${query}`);
      setMenuOpen(false);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      const res = await api.delete("/api/user/logout", { withCredentials: true });
      if (res.status === 200) {
        localStorage.removeItem("userToken");
        sessionStorage.removeItem("userToken");
        navigate("/login");
      }
    } catch (err) {
      console.log("Error during logout", err);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <div className="w-full shadow-md bg-white sticky top-0 z-50">
      {/* Banner */}
      <div className="bg-black text-white text-xs flex gap-2 justify-center py-2 text-center">
        <p>Sign up and get 20% off your first order.</p>
        <a href="#" className="underline">
          Sign Up Now
        </a>
      </div>

      {/* Navbar */}
      <div className="flex items-center justify-between px-4 md:px-10 py-4">
        <Link to="/home" className="font-bold text-3xl tracking-wide">
          SHOP.CO
        </Link>

        {/* Search (desktop) */}
        <div className="hidden md:block">
          <input
            type="search"
            placeholder="Search your style"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-gray-100 w-[320px] h-[40px] px-4 rounded-3xl outline-none"
          />
        </div>

        {/* Right section */}
        <div className="flex items-center gap-5">
          {/* Cart */}
          <div className="relative">
            <Link to="/cart">
              <FaShoppingCart className="text-xl cursor-pointer" />
            </Link>
            {Quantity > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {Quantity}
              </span>
            )}
          </div>

          {/* Profile */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <FaUserCircle className="text-2xl" />
              {profile && <span className="text-sm font-medium">{profile.name}</span>}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-44 border">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Update Profile
                </Link>
                <Link
                  to="/order"
                  className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
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
            )}
          </div>

          {/* Hamburger (mobile) */}
          <button
            className="text-2xl md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-50 border-t border-gray-200 p-4 space-y-4">
          <input
            type="search"
            placeholder="Search your style"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-gray-100 w-full h-[40px] px-4 rounded-3xl outline-none"
          />
          {profile && (
            <div className="flex items-center gap-2 mt-2">
              <FaUserCircle className="text-2xl" />
              <span className="font-medium">{profile.name}</span>
            </div>
          )}
          <Link
            to="/profile"
            className="block text-gray-800 hover:text-black"
            onClick={() => setMenuOpen(false)}
          >
            Update Profile
          </Link>
          <Link
            to="/order"
            className="block text-gray-800 hover:text-black"
            onClick={() => setMenuOpen(false)}
          >
            My Orders
          </Link>
          <button
            onClick={handleLogout}
            className="block text-red-500 hover:text-red-700 w-full text-left"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Usernavbar;
