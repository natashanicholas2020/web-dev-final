import React, { useState } from "react";
import { Link } from "react-router-dom";

type PostType = {
  id: number;
  name: string;
  message: string;
  datetime: string;
};

export default function Post() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [name, setName] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim() || !message.trim()) {
      alert("Please fill in both name and message.");
      return;
    }

    const newPost: PostType = {
      id: Date.now(),
      name: name.trim(),
      message: message.trim(),
      datetime: new Date().toLocaleString(),
    };

    setPosts([newPost, ...posts]);
    setName("");
    setMessage("");
  };

  return (
    <div>
      <h3>Create a Post</h3>

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:{" "}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Message:{" "}
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </label>
        </div>

        <button type="submit">Post</button>
      </form>

      <Link to="/">Back to Community</Link>

      <hr />

      <div>
        {posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              style={{ border: "1px solid #ccc", margin: "10px 0", padding: "10px" }}
            >
              <p>
                <strong>{post.name}</strong> - <em>{post.datetime}</em>
              </p>
              <p>{post.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}


