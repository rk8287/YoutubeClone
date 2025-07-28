import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();


  const user = {
    username: "Rounak Singh",
    email: "rounak@example.com",
    avatar: "https://i.pravatar.cc/150?img=3",
  };


  const videos = [
    {
      _id: "1",
      title: "My Travel Vlog",
      thumbnail: "https://i.ytimg.com/vi/abc123/default.jpg",
      createdAt: "2023-09-12",
    },
    {
      _id: "2",
      title: "React Tutorial",
      thumbnail: "https://i.ytimg.com/vi/xyz456/default.jpg",
      createdAt: "2023-10-05",
    },
    {
      _id: "3",
      title: "MERN Stack Guide",
      thumbnail: "https://i.ytimg.com/vi/abcd456/default.jpg",
      createdAt: "2024-02-20",
    },
  ];

  const handleLogout = () => {
    alert("You have been logged out.");
    navigate("/login");
  };

  if (!user) {
    return <div className="text-white text-center mt-10">Please login to view your profile.</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white py-10 px-4 md:px-10">
      <div className="max-w-8xl mx-auto rounded-xl p-6 shadow-lg">
        
        <div className="flex flex-col md:flex-row items-center gap-6 border-b border-gray-700 pb-6">
          <img
            src={user.avatar}
            alt="Avatar"
            className="w-28 h-28 rounded-full border-4 border-red-600 object-cover"
          />
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold">{user.username}</h1>
            <p className="text-gray-400 mt-1">{user.email}</p>
            <div className="flex gap-3 mt-4 justify-center md:justify-start">
              <button
                onClick={() => navigate("/edit-profile")}
                className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

      
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Your Videos</h2>
          {videos.length === 0 ? (
            <p className="text-gray-400">You haven't uploaded any videos yet.</p>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {videos.map((video) => (
                <div
                  key={video._id}
                  className="bg-gray-800 p-3 rounded-lg hover:shadow-lg transition"
                >
                  <img
                    src={video.thumbnail}
                    alt="Thumbnail"
                    className="w-full h-40 object-cover rounded-md mb-2"
                  />
                  <h3 className="text-lg font-semibold truncate">{video.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {new Date(video.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
