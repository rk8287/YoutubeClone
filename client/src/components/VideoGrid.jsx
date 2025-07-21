import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import VideoCard from "./VideoCard";
import { fetchVideos } from "../../slice/videoSlice";
import VideoCardSkeleton from "../pages/VideoCardSkeleton";

export default function VideoGrid() {
  const dispatch = useDispatch();
  const { videos, status, error } = useSelector((state) => state.video);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchVideos());
    }
  }, [dispatch, status]);

  if (status === "loading") {
  
    return (
      <main className="grid gap-6 p-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <VideoCardSkeleton key={i} />
          ))}
      </main>
    );
  }

  if (status === "failed") {
    return <p className="p-4 text-center text-red-500">Error: {error}</p>;
  }

  return (
    <main className="grid gap-6 p-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {videos.map((video, index) =>
        video && video._id ? (
          <motion.div
            key={video._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <VideoCard video={video} />
          </motion.div>
        ) : null
      )}
    </main>
  );
}
