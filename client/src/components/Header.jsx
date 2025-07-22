import React, { useState } from "react";
import { Search, Bell, PlusCircle, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import CustomLogo from "./CustomLogo";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slice/authSlice";

const Header = ({ searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [showSearch, setShowSearch] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="flex items-center justify-between p-3 md:p-4 border-b border-gray-700 sticky top-0 bg-black z-50 w-full">
     
      <div className="flex items-center gap-3">
        <Menu className="md:hidden w-6 h-6 text-white cursor-pointer" />
        <Link to="/" className="flex items-center gap-2">
          <CustomLogo />
        </Link>
      </div>

    
      <div className="hidden md:flex items-center gap-2 w-full max-w-lg mx-4">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-gray-800 text-white border border-gray-600 rounded-full px-4 py-2 w-full focus:ring-2 focus:ring-red-600 outline-none text-sm md:text-base"
        />
        <button className="bg-gray-800 p-2 rounded-full hover:bg-gray-700">
          <Search className="w-5 h-5" />
        </button>
      </div>

      
      <div className="flex md:hidden items-center gap-3">
        <button
          onClick={() => setShowSearch(!showSearch)}
          className="bg-gray-800 p-2 rounded-full hover:bg-gray-700"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        {user ? (
          <>
            <Link to="/upload">
              <PlusCircle className="w-5 h-5 md:w-6 md:h-6 cursor-pointer" />
            </Link>
            <Bell className="w-5 h-5 md:w-6 md:h-6 cursor-pointer" />
            <img
              src={user.avatar}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover cursor-pointer"
              onClick={handleLogout}
              title="Logout"
            />
          </>
        ) : (
          <Link to="/login">
            <button className="bg-red-600 px-3 py-1.5 md:px-4 md:py-2 rounded-lg hover:bg-red-700 text-sm md:text-base">
              Sign In
            </button>
          </Link>
        )}
      </div>

     
      {showSearch && (
        <div className="absolute top-14 left-0 w-full px-4 pb-3 bg-black flex items-center gap-2 z-50 md:hidden">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-800 text-white border border-gray-600 rounded-full px-4 py-2 w-full focus:ring-2 focus:ring-red-600 outline-none text-sm"
          />
        </div>
      )}
    </header>
  );
};

export default Header;
