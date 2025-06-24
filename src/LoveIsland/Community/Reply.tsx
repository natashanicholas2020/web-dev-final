import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
  replies: ReplyType[];  // <-- replies included here
};

export default function ReplyPage() {
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
      <div className="post-card">
        <p>
          <strong>{post.username}</strong>{" "}
          <span>{new Date(post.datetime).toLocaleString()}</span>
        </p>
        <p>{post.message}</p>
      </div>

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
