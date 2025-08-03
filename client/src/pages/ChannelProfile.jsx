import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideosByChannelId } from "../../slice/videoSlice";

const ChannelProfile = () => {
  const { channelId } = useParams();
  const dispatch = useDispatch();

  const { channelVideos, channelStatus, channelError } = useSelector((state) => state.video);
  const channel = channelVideos[0]?.channel || null;

  useEffect(() => {
    dispatch(fetchVideosByChannelId(channelId));
  }, [dispatch, channelId]);

  if (channelStatus === "loading") {
    return <div className="text-center p-8 text-white">Loading...</div>;
  }

  if (channelStatus === "failed") {
    return <div className="text-center p-8 text-red-500">{channelError}</div>;
  }

  if (!channel) {
    return <div className="text-center p-8 text-white">Channel not found or no videos uploaded yet.</div>;
  }

  return (
    <div className="w-full bg-black min-h-screen text-white">
      
      <div className="w-full h-48 sm:h-64 relative">
        <img
          src="https://create.microsoft.com/_next/image?url=https%3A%2F%2Fcdn.create.microsoft.com%2Fcmsassets%2FyoutubeBanner-Hero.webp&w=1920&q=75"
          alt="Banner"
          className="w-full h-full object-cover"
        />
      </div>

     
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center space-x-4 mt-[-4rem] sm:mt-[-5rem] relative z-10">
        <img
          src={channel.avatar}
          alt="Avatar"
          className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-black bg-black"
        />
        <div className="mt-6">
          <h1 className="text-2xl sm:text-3xl font-bold">{channel.name}</h1>
          <p className="text-gray-400 text-sm sm:text-base">{channelVideos.length} videos uploaded</p>
        </div>
      </div>

      
      <div className="border-b border-gray-700 mt-6 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex space-x-6 text-sm sm:text-base font-medium text-white">
          <button className="py-2 border-b-2 border-white">Videos</button>
        </div>
      </div>

      
      <div className="max-w-6xl mx-auto p-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {channelVideos.map((video) => (
          <Link
            key={video._id}
            to={`/watch/${video._id}`}
            className="bg-[#1f1f1f] hover:bg-[#2c2c2c] transition rounded overflow-hidden"
          >
            <img
              src={`http://localhost:5000${video.thumbnail}`}
              alt={video.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-2">
              <h3 className="text-sm font-semibold line-clamp-2 text-white">{video.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChannelProfile;
