import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../slice/authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", avatar: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(registerUser(form));
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-black text-white px-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl mb-8 text-center font-semibold">Create Account</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="mb-4 p-4 rounded bg-gray-900 w-full outline-none focus:ring-2 focus:ring-red-600"
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mb-4 p-4 rounded bg-gray-900 w-full outline-none focus:ring-2 focus:ring-red-600"
          />
          <input
            type="password"
            placeholder="New Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="mb-4 p-4 rounded bg-gray-900 w-full outline-none focus:ring-2 focus:ring-red-600"
          />
          <input
            type="text"
            placeholder="Avatar URL"
            value={form.avatar}
            onChange={(e) => setForm({ ...form, avatar: e.target.value })}
            className="mb-6 p-4 rounded bg-gray-900 w-full outline-none focus:ring-2 focus:ring-red-600"
          />
          <button
            type="submit"
            className="bg-red-600 w-full py-4 rounded hover:bg-red-700 transition text-lg font-semibold"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
