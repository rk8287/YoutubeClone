import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CreateVideo = () => {
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !videoFile || !thumbnailFile) {
      alert("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("video", videoFile);
    formData.append("thumbnail", thumbnailFile);

    try {
      const res = await fetch("http://localhost:5000/api/videos", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        alert("Video uploaded successfully!");
        navigate("/");
      } else {
        alert(data.error || "Upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen text-white bg-black">
        <h2 className="text-xl">Please login to upload a video.</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-black text-white px-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-xl">
        <h2 className="text-3xl mb-8 text-center font-semibold">Upload Video</h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            type="text"
            placeholder="Video Title"
            className="mb-4 p-4 rounded bg-gray-900 w-full outline-none focus:ring-2 focus:ring-red-600"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Description"
            className="mb-4 p-4 rounded bg-gray-900 w-full outline-none focus:ring-2 focus:ring-red-600"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label className="block mb-2">Choose Video File:</label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideoFile(e.target.files[0])}
            className="mb-4 p-2 bg-gray-900 w-full rounded"
          />
          <label className="block mb-2">Choose Thumbnail Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnailFile(e.target.files[0])}
            className="mb-6 p-2 bg-gray-900 w-full rounded"
          />

          <button
            type="submit"
            className="bg-red-600 w-full py-4 rounded hover:bg-red-700 transition text-lg font-semibold"
          >
            Upload Video
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateVideo;
