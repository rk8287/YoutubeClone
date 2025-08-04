import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createChannel } from "../../slice/channelSlice";
import { useNavigate } from "react-router-dom";

function CreateChannel() {
  const [form, setForm] = useState({
    name: "",
    avatar: "",
    banner: "",
    description: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { channel, loading } = useSelector((state) => state.channel);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createChannel(form));
  };

  useEffect(() => {
    if (channel && channel._id) {
      navigate(`/channel/${channel._id}`);
    }
  }, [channel, navigate]);

  return (
    <div className="min-h-screen bg-black px-4 py-10 text-white flex justify-center items-start">
      <div className="w-full max-w-screen-md bg-gray-900 rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Create Your Channel</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Channel Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-md bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="text"
            name="avatar"
            placeholder="Avatar Image URL"
            value={form.avatar}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-md bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="text"
            name="banner"
            placeholder="Banner Image URL"
            value={form.banner}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-md bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <textarea
            name="description"
            placeholder="Channel Description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 rounded-md bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 transition-colors duration-200 py-3 rounded-md font-semibold text-white"
          >
            {loading ? "Creating..." : "Create Channel"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateChannel;
