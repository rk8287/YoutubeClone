import React from "react";
import { Search, Bell, PlusCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import CustomLogo from "./CustomLogo";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slice/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-700 sticky top-0 bg-black z-50">
      <Link to="/" className="flex items-center gap-4">
        <CustomLogo />
      </Link>
      <div className="flex items-center gap-2 w-full max-w-lg">
        <input
          placeholder="Search"
          className="bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-red-600 outline-none"
        />
        <button className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700">
          <Search className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <>
           <Link to={'/upload'}> <PlusCircle className="w-6 h-6 cursor-pointer" /></Link>
            <Bell className="w-6 h-6 cursor-pointer" />
            <img
              src={user.avatar}
              alt="Profile"
              className="w-8 h-8 rounded-full cursor-pointer"
              onClick={handleLogout}
              title="Logout"
            />
          </>
        ) : (
          <Link to="/login">
            <button className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700">
              Sign In
            </button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
