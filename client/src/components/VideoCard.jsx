import React from "react";
import { Link } from "react-router-dom";

export default function VideoCard({ video }) {
  return (
    <Link to={`/watch/${video._id}`} className="block">
      <div className="bg-black rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 shadow-lg cursor-pointer">
        <img
          src={`http://localhost:5000${video.thumbnail}`}
          alt={video.title}
          className="w-full h-48 object-cover"
        />
        <div className="flex p-3 gap-3">
          <img
            src={video.channel.avatar}
            alt={video.channel.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h2 className="font-semibold text-base mb-1 line-clamp-2">
              {video.title}
            </h2>
            <p className="text-gray-400 text-sm">{video.channel.name}</p>
            <p className="text-gray-500 text-xs">
              {new Date(video.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
