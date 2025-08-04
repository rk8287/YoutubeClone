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
    <div className="max-w-xl mx-auto mt-10 text-white">
      <h2 className="text-2xl mb-4 font-bold">Create Channel</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Channel Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-gray-800 text-white"
        />
        <input
          type="text"
          name="avatar"
          placeholder="Avatar URL"
          value={form.avatar}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-gray-800 text-white"
        />
        <input
          type="text"
          name="banner"
          placeholder="Banner URL"
          value={form.banner}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-gray-800 text-white"
        />
        <textarea
          name="description"
          placeholder="Channel Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 text-white"
        />
        <button
          type="submit"
          className="bg-red-600 px-4 py-2 rounded text-white hover:bg-red-700"
        >
          {loading ? "Creating..." : "Create Channel"}
        </button>
      </form>
    </div>
  );
}

export default CreateChannel;
