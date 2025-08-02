import React from "react";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { Home, PlaySquare, ListVideo, History, User } from "lucide-react";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const items = [
    { icon: <Home size={22} />, label: "Home", path: "/" },
    { icon: <PlaySquare size={22} />, label: "Shorts", path: "/shorts" },
    { icon: <ListVideo size={22} />, label: "Subscriptions", path: "/subscriptions" },
    { icon: <History size={22} />, label: "History", path: "/history" },
    { icon: <User size={22} />, label: "You", path: "/profile" },
  ];

  return (
    <aside
      className={`${
        collapsed ? "w-16" : "w-60"
      } bg-black text-white transition-all duration-300 h-screen hidden md:block fixed top-0 left-0 z-50`}
    >
      <div className="flex items-center justify-between p-4">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-white p-2 hover:bg-gray-800 rounded-full"
        >
          <RxHamburgerMenu size={24} />
        </button>
        {!collapsed && <h1 className="text-lg font-bold">YouTube</h1>}
      </div>

      <nav className="flex flex-col gap-2 mt-4">
        {items.map((item, idx) => (
          <Link
            key={idx}
            to={item.path}
            className={`flex items-center ${
              collapsed ? "justify-center" : "gap-4"
            } hover:bg-gray-800 p-3 rounded-lg cursor-pointer transition-colors`}
          >
            {item.icon}
            {!collapsed && <span className="text-sm">{item.label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
