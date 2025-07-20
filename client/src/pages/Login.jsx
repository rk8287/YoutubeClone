import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../slice/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill in both email and password");
      return;
    }

    try {
      await dispatch(loginUser({ email, password })).unwrap();
      navigate("/");
    } catch (err) {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-black text-white px-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl mb-8 text-center font-semibold">Sign In</h2>

        <input
          type="email"
          placeholder="Enter Email"
          className="mb-4 p-4 rounded bg-gray-900 w-full outline-none focus:ring-2 focus:ring-red-600"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Password"
          className="mb-6 p-4 rounded bg-gray-900 w-full outline-none focus:ring-2 focus:ring-red-600"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-red-600 w-full py-4 rounded hover:bg-red-700 transition text-lg font-semibold"
        >
          Login
        </button>

        <p className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-400 underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
