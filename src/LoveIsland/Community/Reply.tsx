import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

type ReplyType = {
  _id: string;
  username: string;
  message: string;
  datetime: string;
};

type PostType = {
  _id: string;
  username: string;
  message: string;
  datetime: string;
  replies: ReplyType[];
  likes?: number;
};

export default function Reply() {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<PostType | null>(null);
  const [replies, setReplies] = useState<ReplyType[]>([]);
  const [replyMessage, setReplyMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPostAndReplies = async () => {
      try {
        const postRes = await fetch(`http://localhost:4000/api/posts/${postId}`);
        if (!postRes.ok) throw new Error("Failed to fetch post");
        const postData: PostType = await postRes.json();
        setPost(postData);
        setReplies(postData.replies || []);
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPostAndReplies();
  }, [postId]);

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      alert("Please log in to reply.");
      return;
    }
    if (!replyMessage.trim()) {
      alert("Reply message cannot be empty.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:4000/api/posts/${postId}/replies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: replyMessage }),
      });
      if (!res.ok) throw new Error("Failed to submit reply");
      const newReply: ReplyType = await res.json();
      setReplies((prev) => [...prev, newReply]);
      setReplyMessage("");
    } catch {
      alert("Failed to submit reply.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <div className="reply-page">
      <PostWithReactions
        _id={post._id}
        username={post.username}
        message={post.message}
        datetime={post.datetime}
        initialLikes={post.likes || 0}
      />

      <h3>Replies</h3>
      {replies.length === 0 ? (
        <p>No replies yet.</p>
      ) : (
        replies.map((reply) => (
          <div key={reply._id} className="reply-card">
            <p>
              <strong>{reply.username}</strong>{" "}
              <span>{new Date(reply.datetime).toLocaleString()}</span>
            </p>
            <p>{reply.message}</p>
          </div>
        ))
      )}

      {token ? (
        <form onSubmit={handleReplySubmit}>
          <textarea
            placeholder="Write your reply..."
            value={replyMessage}
            onChange={(e) => setReplyMessage(e.target.value)}
            required
          />
          <button type="submit">Submit Reply</button>
        </form>
      ) : (
        <p>Please log in to reply.</p>
      )}
    </div>
  );
}

type PostWithReactionsProps = {
  _id: string;
  username: string;
  message: string;
  datetime: string;
  initialLikes?: number;
};

function PostWithReactions({
  username,
  message,
  datetime,
  initialLikes = 0,
}: PostWithReactionsProps) {
  const [reaction, setReaction] = useState<"up" | "down" | null>(null);
  const [likesCount, setLikesCount] = useState<number>(initialLikes);

  const handleThumbsUp = () => {
    if (reaction === "up") {
      setReaction(null);
      setLikesCount((count) => Math.max(0, count - 1));
    } else if (reaction === "down") {
      setReaction("up");
      setLikesCount((count) => count + 2);
    } else {
      setReaction("up");
      setLikesCount((count) => count + 1);
    }
  };

  const handleThumbsDown = () => {
    if (reaction === "down") {
      setReaction(null);
      setLikesCount((count) => count + 1);
    } else if (reaction === "up") {
      setReaction("down");
      setLikesCount((count) => Math.max(0, count - 2));
    } else {
      setReaction("down");
      setLikesCount((count) => Math.max(0, count - 1));
    }
  };

  return (
    <div className="post-card" style={{ position: "relative", paddingBottom: "3rem" }}>
      <p>
        <strong>{username}</strong>{" "}
        <span className="post-datetime">{new Date(datetime).toLocaleString()}</span>
      </p>
      <p>{message}</p>

      <div className="reaction-bar">
        <span className="likes-count">{likesCount}</span>
        <button
          onClick={handleThumbsUp}
          className={`reaction-button`}
          type="button"
          aria-label="Thumbs up"
        >
          <FaThumbsUp
            size={20}
            color={reaction === "up" ? "#007bff" : "black"} // blue when active, black when not
          />
        </button>
        <button
          onClick={handleThumbsDown}
          className={`reaction-button`}
          type="button"
          aria-label="Thumbs down"
        >
          <FaThumbsDown
            size={20}
            color={reaction === "down" ? "#007bff" : "black"} // blue when active, black when not
          />
        </button>
      </div>
    </div>
  );
}
