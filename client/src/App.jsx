import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import CategoryFilter from "./components/CategoryFilter";
import VideoGrid from "./components/VideoGrid";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VideoDetails from "./components/VideoDetails";
import CreateVideo from "./pages/CreateVideo";

const AppLayout = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const location = useLocation();

  const authRoutes = ["/login", "/register"];
  const isAuthPage = authRoutes.includes(location.pathname);

  return (
    <div className="flex bg-black text-white min-h-screen">
      {!isAuthPage && (
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      )}

      <div
        className={`flex-1 transition-all duration-300 ${
          !isAuthPage ? (collapsed ? "md:pl-20" : "md:pl-60") : ""
        }`}
      >
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <CategoryFilter />
                <VideoGrid />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/watch/:id" element={<VideoDetails />} />
          <Route path="/upload" element={<CreateVideo />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}
