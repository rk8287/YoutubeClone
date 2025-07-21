import React from "react";
import "./shimmer.css";

export default function VideoCardSkeleton() {
  return (
    <div className="bg-black rounded-lg overflow-hidden shadow-lg">
      <div className="shimmer-bg w-full h-48"></div>
      <div className="flex p-3 gap-3">
        <div className="shimmer-bg w-10 h-10 rounded-full"></div>
        <div className="flex-1 space-y-2">
          <div className="shimmer-bg h-4 w-3/4 rounded"></div>
          <div className="shimmer-bg h-3 w-1/2 rounded"></div>
        </div>
      </div>
    </div>
  );
}
