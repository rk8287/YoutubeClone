import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import VideoCard from "./VideoCard";
import dummyVideos from "../data/videos";

export default function VideoGrid({ selectedCategory = "All", searchQuery = "" }) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    
    setTimeout(() => {
      setVideos(dummyVideos);
    }, 500); 
  }, []);

  const filteredVideos = videos.filter((video) => {
  const text = (video.title + " " + video.description).toLowerCase();
  const matchesCategory =
    selectedCategory === "All"
      ? true
      : video.category === selectedCategory; 
  const matchesSearch =
    searchQuery.trim() === ""
      ? true
      : text.includes(searchQuery.toLowerCase());
  return matchesCategory && matchesSearch;
});


  if (!videos.length) {
    return (
      <main className="grid gap-4 p-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="h-[200px] bg-gray-800 rounded-lg animate-pulse" />
          ))}
      </main>
    );
  }

  return (
    <main className="grid gap-4 p-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {filteredVideos.map((video, index) => (
        <motion.div
          key={video.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <VideoCard video={video} />
        </motion.div>
      ))}
    </main>
  );
}
