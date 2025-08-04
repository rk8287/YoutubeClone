import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dummyVideos from "../data/videos";

function ChannelProfile() {
  const { channelId } = useParams();
  const userChannel = useSelector((state) => state.channel.channel);
  const user = useSelector((state) => state.auth.user);


  const isUserChannel = userChannel?._id === channelId;

 
  const videos = dummyVideos.filter(
    (v) => v.channel?.id === channelId
  );

  const currentChannel = isUserChannel
    ? {
        name: userChannel.name,
        avatar: userChannel.avatar,
        banner: userChannel.banner,
        description: userChannel.description,
        videos: [], 
      }
    : videos.length > 0
    ? {
        name: videos[0].channel.name,
        avatar: videos[0].channel.avatar,
        banner: videos[0].channel.banner,
        description: videos[0].channel.description || "",
        videos,
      }
    : null;

  if (!currentChannel) {
    return (
      <div className="text-center text-white mt-20">
        Channel not found.
      </div>
    );
  }

  return (
    <div className="text-white">
      <div className="w-full h-48 bg-cover bg-center" style={{ backgroundImage: `url(${currentChannel.banner})` }} />
      <div className="flex items-center gap-4 px-4 mt-[-40px]">
        <img
          src={currentChannel.avatar}
          alt={currentChannel.name}
          className="w-20 h-20 rounded-full border-4 border-black"
        />
        <div>
          <h1 className="text-2xl font-bold">{currentChannel.name}</h1>
          <p className="text-gray-400">{currentChannel.description}</p>
        </div>
      </div>

      <div className="mt-6 px-4">
        <h2 className="text-xl font-semibold mb-4">Videos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(isUserChannel ? [] : currentChannel.videos).map((video) => (
            <div key={video.id} className="bg-gray-900 rounded shadow p-2">
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="w-full h-40 object-cover rounded"
              />
              <p className="mt-2 font-semibold line-clamp-2">{video.title}</p>
              <p className="text-gray-400 text-sm">{video.views || "0 views"}</p>
            </div>
          ))}
          {isUserChannel && (
            <p className="text-gray-500 col-span-full text-center">
              You haven’t uploaded any videos yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChannelProfile;
