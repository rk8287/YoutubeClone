import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ThumbsUp, ThumbsDown, Share2, Download } from "lucide-react";

const VideoDetails = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/videos/${id}`);
        const data = await res.json();
        setVideo(data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchRelated = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/videos");
        const data = await res.json();
        setRelatedVideos(data.filter((v) => v._id !== id));
      } catch (err) {
        console.error(err);
      }
    };

    fetchVideo();
    fetchRelated();
  }, [id]);

  if (!video)
    return <div className="text-center mt-20 text-white">Loading...</div>;

  return (
    <div className="flex flex-col lg:flex-row p-4 gap-6">
      <div className="flex-1">
        <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px] bg-black mb-4">
          <video
            src={`http://localhost:5000${video.videoUrl}`}
            className="w-full h-full rounded-lg object-cover"
            autoPlay
            muted
            playsInline
            controls
          />
        </div>

        <h1 className="text-xl font-bold mb-2">{video.title}</h1>

        <div className="flex justify-between items-center mb-4 flex-wrap">
          <div className="flex items-center gap-3">
            <img
              src={video.channel.avatar}
              alt={video.channel.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold">{video.channel.name}</p>
              <p className="text-gray-400 text-sm">
                Subscriber count not implemented
              </p>
            </div>
            <button className="ml-4 bg-white text-black px-4 py-1 rounded font-semibold hover:bg-gray-200">
              Subscribe
            </button>
          </div>

          <div className="flex items-center gap-4 mt-4 lg:mt-0">
            <button className="flex items-center gap-1 hover:text-gray-400">
              <ThumbsUp size={20} /> {video.likes || 0}
            </button>
            <button className="flex items-center gap-1 hover:text-gray-400">
              <ThumbsDown size={20} />
            </button>
            <button className="flex items-center gap-1 hover:text-gray-400">
              <Share2 size={20} /> Share
            </button>
            <button className="flex items-center gap-1 hover:text-gray-400">
              <Download size={20} /> Download
            </button>
          </div>
        </div>

        <p className="text-gray-300 text-sm">{video.description}</p>

        <h2 className="mt-6 text-lg font-semibold">
          Comments (Not implemented)
        </h2>
        <input
          placeholder="Add a comment..."
          className="w-full bg-gray-800 mt-2 p-3 rounded outline-none"
        />
      </div>

      {/* Right Sidebar - Related Videos */}
      <div className="w-full lg:w-[350px] flex flex-col gap-4">
        {relatedVideos.map((related) => (
          <div
            key={related._id}
            className="flex gap-2 cursor-pointer hover:bg-gray-800 p-2 rounded"
          >
            <img
              src={`http://localhost:5000/${related.thumbnail}`}
              alt={related.title}
              className="w-32 h-20 object-cover rounded"
            />
            <div>
              <p className="font-semibold text-sm line-clamp-2">
                {related.title}
              </p>
              <p className="text-gray-400 text-xs">{related.channel.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoDetails;
