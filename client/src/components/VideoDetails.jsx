import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ThumbsUp, ThumbsDown, Share2, Download, Trash } from "lucide-react";
import { useSelector } from "react-redux";

const VideoDetails = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  const getAvatarUrl = (avatar) => {
    if (!avatar) return "/default-avatar.png";
    return avatar.startsWith("http") ? avatar : `http://localhost:5000${avatar}`;
  };

  useEffect(() => {
    const fetchVideo = async () => {
      const res = await fetch(`http://localhost:5000/api/videos/${id}`);
      const data = await res.json();
      setVideo(data);
    };

    const fetchRelated = async () => {
      const res = await fetch("http://localhost:5000/api/videos");
      const data = await res.json();
      setRelatedVideos(data.filter((v) => v._id !== id));
    };

    const fetchComments = async () => {
      const res = await fetch(`http://localhost:5000/api/comments/${id}`);
      const data = await res.json();
      setComments(data);
    };

    fetchVideo();
    fetchRelated();
    fetchComments();
  }, [id]);

  const handleLike = async () => {
    if (!token) return alert("You need to login to like");

    const res = await fetch(`http://localhost:5000/api/videos/like/${id}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    setVideo({ ...video, likes: data.likes });
  };

  const handleSubscribe = async () => {
    if (!token) return alert("You need to login to subscribe");

    await fetch(`http://localhost:5000/api/videos/subscribe/${video.channel.id}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    alert("Subscribed/Unsubscribed!");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  const handleComment = async () => {
    if (!token) return alert("You need to login to comment");
    if (!commentText.trim()) return;

    const res = await fetch("http://localhost:5000/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ videoId: id, text: commentText }),
    });

    const newComment = await res.json();
    setComments([newComment, ...comments]);
    setCommentText("");
  };

  const handleDeleteComment = async (commentId) => {
    if (!token) return alert("You need to login to delete comments");

    await fetch(`http://localhost:5000/api/comments/${commentId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    setComments(comments.filter((c) => c._id !== commentId));
  };

  if (!video) return <div className="text-center mt-20 text-white">Loading...</div>;

  return (
    <div className="flex flex-col lg:flex-row p-4 gap-6">
      <div className="flex-1">
        <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px] bg-black mb-4">
          <video
            src={`http://localhost:5000${video.videoUrl}`}
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
            <img
              src={getAvatarUrl(video.channel.avatar)}
              onError={(e) => (e.target.src = "/default-avatar.png")}
              alt={video.channel.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold">{video.channel.name}</p>
              <p className="text-gray-400 text-sm">Subscriber count not implemented</p>
            </div>
            <button
              onClick={handleSubscribe}
              className="ml-4 bg-white text-black px-4 py-1 rounded font-semibold hover:bg-gray-200"
            >
              Subscribe
            </button>
          </div>

          <div className="flex items-center gap-4 mt-4 lg:mt-0">
            <button onClick={handleLike} className="flex items-center gap-1 hover:text-gray-400">
              <ThumbsUp size={20} /> {video.likes || 0}
            </button>
            <button className="flex items-center gap-1 hover:text-gray-400">
              <ThumbsDown size={20} />
            </button>
            <button onClick={handleShare} className="flex items-center gap-1 hover:text-gray-400">
              <Share2 size={20} /> Share
            </button>
            <a
              href={`http://localhost:5000${video.videoUrl}`}
              download
              className="flex items-center gap-1 hover:text-gray-400"
            >
              <Download size={20} /> Download
            </a>
          </div>
        </div>

        <p className="text-gray-300 text-sm">{video.description}</p>

        <h2 className="mt-6 text-lg font-semibold">Comments</h2>

        {user && (
          <div className="flex gap-3 mt-3">
            <img
              src={getAvatarUrl(user.avatar)}
              onError={(e) => (e.target.src = "/default-avatar.png")}
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
            <input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 bg-gray-800 p-3 rounded outline-none"
            />
            <button onClick={handleComment} className="bg-red-600 px-4 py-2 rounded">
              Comment
            </button>
          </div>
        )}

        <div className="mt-4 space-y-4">
          {comments.map((c) => (
            <div key={c._id} className="flex gap-3 items-start">
              <img
                src={getAvatarUrl(c.userAvatar)}
                onError={(e) => (e.target.src = "/default-avatar.png")}
                className="w-8 h-8 rounded-full"
                alt="avatar"
              />
              <div className="flex-1">
                <p className="font-semibold text-sm">{c.userName}</p>
                <p className="text-gray-400 text-xs">{new Date(c.createdAt).toLocaleString()}</p>
                <p>{c.text}</p>
              </div>
              {user && c.userId === user._id && (
                <button onClick={() => handleDeleteComment(c._id)} className="text-red-500">
                  <Trash size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full lg:w-[350px] flex flex-col gap-4">
        {relatedVideos.map((related) => (
          <Link
            key={related._id}
            to={`/watch/${related._id}`}
            className="flex gap-2 cursor-pointer hover:bg-gray-800 p-2 rounded"
          >
            <img
              src={`http://localhost:5000${related.thumbnail}`}
              alt={related.title}
              className="w-32 h-20 object-cover rounded"
            />
            <div>
              <p className="font-semibold text-sm line-clamp-2">{related.title}</p>
              <p className="text-gray-400 text-xs">{related.channel.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default VideoDetails;
