import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import "./styles.css";

type PostType = {
  _id: string;
  username: string;
  message: string;
  datetime: string;
  likes: number;
  dislikes: number;
};

export default function Community() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const token = localStorage.getItem("token");
  const loggedInUsername = localStorage.getItem("username") || "";

  const [userReactions, setUserReactions] = useState<
    Record<string, "up" | "down" | undefined>
  >({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/posts");
        if (!response.ok) throw new Error("Failed to fetch posts");
        const data: PostType[] = await response.json();

        const postsWithReactions = data.map((post) => ({
          ...post,
          likes: post.likes ?? 0,
          dislikes: post.dislikes ?? 0,
        }));

        setPosts(postsWithReactions);
      } catch {
        setError("Failed to load posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const userPosts = posts.filter(
    (post) => post.username.toLowerCase() === loggedInUsername.toLowerCase()
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      alert("Please log in to post.");
      return;
    }
    if (!message.trim()) {
      alert("Post message cannot be empty.");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message, name: loggedInUsername }),
      });

      if (!res.ok) throw new Error("Post failed");

      const newPost: PostType = await res.json();
      newPost.likes = 0;
      newPost.dislikes = 0;

      setPosts((prevPosts) => [newPost, ...prevPosts]);
      setMessage("");
    } catch {
      alert("Failed to submit post.");
    }
  };

  const handleReply = (postId: string) => {
    navigate(`/LoveIsland/Community/reply/${postId}`);
  };

  const toggleReaction = async (
    postId: string,
    reaction: "up" | "down"
  ) => {
    if (!token) {
      alert("Please log in to react.");
      return;
    }

    const currentReaction = userReactions[postId];
    const newReaction = currentReaction === reaction ? null : reaction;

    try {
      const res = await fetch(
        `http://localhost:4000/api/posts/${postId}/like`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ reaction: newReaction }),
        }
      );

      if (!res.ok) throw new Error("Failed to update reaction");

      const data = await res.json();

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? { ...post, likes: data.likes, dislikes: data.dislikes }
            : post
        )
      );

      setUserReactions((prev) => {
        if (newReaction === null) {
          const { [postId]: _, ...rest } = prev;
          return rest;
        }
        return { ...prev, [postId]: newReaction };
      });
    } catch (error) {
      console.error("Error updating reaction:", error);
      alert("Failed to update reaction. Please try again.");
    }
  };

  return (
    <div id="wd-community-screen" className="wd-content-layer">
      <div className="community-layout">
        <div className="post-column">
          {loading ? (
            <p>Loading posts...</p>
          ) : error ? (
            <p>{error}</p>
          ) : posts.length === 0 ? (
            <p>No posts yet.</p>
          ) : (
            <div className="post-list">
              {posts.map((post) => {
                const userReaction = userReactions[post._id];
                return (
                  <div key={post._id} className="post-card">
                    <p>
                      <strong>{post.username}</strong>{" "}
                      <span className="post-datetime">
                        {new Date(post.datetime).toLocaleString()}
                      </span>
                    </p>
                    <p>{post.message}</p>

                    <div className="reaction-bar">
                      <button
                        className={`reaction-button ${
                          userReaction === "up" ? "active" : ""
                        }`}
                        onClick={() => toggleReaction(post._id, "up")}
                        aria-label="Upvote"
                        title="Up"
                      >
                        <FaThumbsUp />
                      </button>
                      <span className="likes-count">{post.likes}</span>

                      <button
                        className={`reaction-button ${
                          userReaction === "down" ? "active" : ""
                        }`}
                        onClick={() => toggleReaction(post._id, "down")}
                        aria-label="Downvote"
                        title="Down"
                      >
                        <FaThumbsDown />
                      </button>
                      <span className="likes-count">{post.dislikes}</span>
                    </div>

                    {token && (
                      <button
                        className="reply-button"
                        onClick={() => handleReply(post._id)}
                      >
                        Reply
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {token && loggedInUsername ? (
          <div className="form-column">
            <div className="card scrollable-card">
              <h4>Your Posts</h4>
              {userPosts.length === 0 ? (
                <p>You haven't posted yet.</p>
              ) : (
                <div className="post-list">
                  {userPosts.map((post) => {
                    const userReaction = userReactions[post._id];
                    return (
                      <div key={post._id} className="post-card">
                        <p>
                          <strong>{post.username}</strong>{" "}
                          <span className="post-datetime">
                            {new Date(post.datetime).toLocaleString()}
                          </span>
                        </p>
                        <p>{post.message}</p>

                        <div className="reaction-bar">
                          <button
                            className={`reaction-button ${
                              userReaction === "up" ? "active" : ""
                            }`}
                            onClick={() => toggleReaction(post._id, "up")}
                            aria-label="Upvote"
                            title="Up"
                          >
                            <FaThumbsUp />
                          </button>
                          <span className="likes-count">{post.likes}</span>

                          <button
                            className={`reaction-button ${
                              userReaction === "down" ? "active" : ""
                            }`}
                            onClick={() => toggleReaction(post._id, "down")}
                            aria-label="Downvote"
                            title="Down"
                          >
                            <FaThumbsDown />
                          </button>
                          <span className="likes-count">{post.dislikes}</span>
                        </div>

                        <button
                          className="reply-button"
                          onClick={() => handleReply(post._id)}
                        >
                          Reply
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="card scrollable-card">
              <h3>Create a Post</h3>
              <form onSubmit={handleSubmit}>
                <textarea
                  className="post-input"
                  placeholder="What's on your mind?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
                <button type="submit" className="post-button">
                  Post
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="form-column">
            <p>Please log in to see your posts.</p>
          </div>
        )}
      </div>
    </div>
  );
}
