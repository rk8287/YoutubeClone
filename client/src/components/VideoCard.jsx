import React from "react";
import { Link } from "react-router-dom";

export default function VideoCard({ video }) {
  return (
    <Link to={`/watch/${video._id}`} className="block">
      <div className="bg-black rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 shadow-lg cursor-pointer">
        
        {/* Thumbnail: Responsive */}
        <div className="relative w-full pb-[56.25%] bg-black">
          <img
            src={`http://localhost:5000${video.thumbnail}`}
            alt={video.title}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>

        {/* Video Info */}
        <div className="flex p-3 gap-3">
          <img
            src={video.channel.avatar}
            alt={video.channel.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <h2 className="font-semibold text-base mb-1 line-clamp-2 break-words">
              {video.title}
            </h2>
            <p className="text-gray-400 text-sm truncate">{video.channel.name}</p>
            <p className="text-gray-500 text-xs truncate">
              {new Date(video.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
