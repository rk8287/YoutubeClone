import React, { useEffect, useState } from "react";
import { MdOutlineVerified } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { ThumbsUp, ThumbsDown, Share2, Download, Trash2 } from "lucide-react";
import dummyVideos from "../data/videos";
import { useSelector } from "react-redux";
import axios from "axios";

const VideoDetails = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const user = useSelector((state) => state.auth?.user || null);
  const token = useSelector((state) => state.auth?.token || null);

  useEffect(() => {
    const selected = dummyVideos.find((v) => v.id === id);
    setVideo(selected);
    setRelatedVideos(dummyVideos.filter((v) => v.id !== id));
  }, [id]);

  useEffect(() => {
    if (id) fetchComments();
  }, [id]);

  const fetchComments = async () => {
    try {
      const res = await axios.get(`/api/comments/${id}`);
      setComments(res.data.comments || []);
    } catch (err) {
      console.error("Failed to fetch comments", err);
      setComments([]);
    }
  };

  const handleLike = () => setIsLiked((prev) => !prev);
  const handleSubscribe = () => setIsSubscribed((prev) => !prev);
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      const res = await axios.post(
        "/api/comments",
        { videoId: id, text: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments((prev) => [res.data, ...prev]);
      setNewComment("");
    } catch (err) {
      console.error("Failed to add comment", err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`/api/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments(comments.filter((c) => c._id !== commentId));
    } catch (err) {
      console.error("Failed to delete comment", err);
    }
  };

  if (!video)
    return <div className="text-center mt-20 text-white">Loading...</div>;

  return (
    <div className="flex flex-col lg:flex-row p-4 gap-6">
      <div className="flex-1">
        <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px] bg-black mb-4">
          <video
            src={video.videoUrl}
            className="w-full h-full rounded-lg aspect-video"
            autoPlay
            muted={false}
            playsInline
            controls
          />
        </div>

        <h1 className="text-xl font-bold mb-2">{video.title}</h1>

        <div className="flex justify-between items-center mb-4 flex-wrap">
          <div className="flex items-center gap-3">
           <Link to={`/channel/${video.channel?.id}`}
              className="flex items-center gap-3 hover:opacity-90"
            >
              <img
                src={video?.channel?.avatar || "https://i.pravatar.cc/150"}
                alt={video?.channel?.name || video.author}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <div className="flex items-center">
                  <p className="font-semibold hover:underline">
                    {video?.channel?.name || video.author}
                  </p>
                  <span className="px-1 text-blue-500">
                    <MdOutlineVerified />
                  </span>
                </div>
                <p className="text-gray-400 text-sm">
                  {video?.subscriber || "1K subscribers"}
                </p>
              </div>
            </Link>

            <button
              onClick={handleSubscribe}
              className={`ml-4 px-4 py-1 rounded font-semibold ${
                isSubscribed
                  ? "bg-gray-700 text-white"
                  : "bg-white text-black hover:bg-gray-200"
              }`}
            >
              {isSubscribed ? "Subscribed" : "Subscribe"}
            </button>
          </div>

          <div className="flex items-center gap-4 mt-4 lg:mt-0">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 ${
                isLiked ? "text-red-500" : "hover:text-gray-400"
              }`}
            >
              <ThumbsUp size={20} /> {isLiked ? 1 : 0}
            </button>
            <button className="flex items-center gap-1 hover:text-gray-400">
              <ThumbsDown size={20} />
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-1 hover:text-gray-400"
            >
              <Share2 size={20} /> Share
            </button>
            <a
              href={video.videoUrl}
              download
              className="flex items-center gap-1 hover:text-gray-400"
            >
              <Download size={20} /> Download
            </a>
          </div>
        </div>

        <p className="text-gray-300 text-sm mb-4">{video.description}</p>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Comments</h2>
          {user ? (
            <form onSubmit={handleCommentSubmit} className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1 px-3 py-2 rounded bg-gray-800 text-white"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Comment
              </button>
            </form>
          ) : (
            <p className="text-gray-400 mb-4">Login to post comments</p>
          )}

          {Array.isArray(comments) && comments.length > 0 ? (
            comments.map((comment) => (
              <div
                key={comment._id}
                className="flex items-start gap-3 mb-3 border-b border-gray-700 pb-3"
              >
                <img
                  src={comment.userAvatar || "https://i.pravatar.cc/150"}
                  alt="avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-sm">{comment.userName}</p>
                    {user?._id === comment.userId && (
                      <button
                        onClick={() => handleDeleteComment(comment._id)}
                        className="text-red-400 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                  <p className="text-gray-300 text-sm mt-1">{comment.text}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No comments yet.</p>
          )}
        </div>
      </div>

      <div className="w-full lg:w-[350px] flex flex-col gap-4">
        {relatedVideos.map((related) => (
          <Link
            key={related.id}
            to={`/watch/${related.id}`}
            className="flex gap-2 cursor-pointer hover:bg-gray-800 p-2 rounded"
          >
            <img
              src={related.thumbnailUrl}
              alt={related.title}
              onError={(e) =>
                (e.target.src =
                  "https://via.placeholder.com/320x180?text=No+Image")
              }
              className="w-32 h-20 object-cover rounded"
            />
            <div>
              <p className="font-semibold text-sm line-clamp-2">
                {related.title}
              </p>
              <p className="text-gray-400 text-xs">{related.author}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default VideoDetails;
