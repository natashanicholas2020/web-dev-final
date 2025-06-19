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








// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "./styles.css";

// type PostType = {
//   _id: string;
//   username: string;
//   message: string;
//   datetime: string;
// };

// export default function Post() {
//   const [posts, setPosts] = useState<PostType[]>([]);
//   const [message, setMessage] = useState<string>("");
//   const [error, setError] = useState<string>("");

//   const fetchPosts = async () => {
//     try {
//       const res = await fetch("http://localhost:4000/api/posts");
//       if (!res.ok) throw new Error("Failed to fetch posts");
//       const data = await res.json();
//       setPosts(data.reverse()); // show newest first
//     } catch (err) {
//       setError("Unable to load posts.");
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("Please log in to post.");
//       return;
//     }

//     try {
//       const res = await fetch("http://localhost:4000/api/posts", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ message }),
//       });

//       if (!res.ok) {
//         throw new Error("Failed to submit post");
//       }

//       setMessage("");
//       fetchPosts(); // refresh posts
//     } catch (err) {
//       setError("Failed to submit post.");
//     }
//   };

//   return (
//     <div id="wd-posts" className="wd-content-layer">
//       <h2 className="posts-title">Community Posts</h2>

//       {error && <p style={{ color: "red" }}>{error}</p>}

//       <form onSubmit={handleSubmit} className="post-form">
//         <textarea
//           placeholder="What's on your mind?"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           required
//           className="post-input"
//         />
//         <button type="submit" className="post-button">Post</button>
//       </form>

//       <div className="post-cards-container">
//         {posts.length === 0 ? (
//           <p>No posts yet.</p>
//         ) : (
//           posts.map((post) => (
//             <div key={post._id} className="post-card">
//               <p>
//                 <strong>{post.username}</strong>{" "}
//                 <span className="post-datetime">{new Date(post.datetime).toLocaleString()}</span>
//               </p>
//               <p>{post.message}</p>
//             </div>
//           ))
//         )}
//       </div>

//       <div className="text-center mt-3">
//         <Link to="/">Back to Community</Link>
//       </div>
//     </div>
//   );
// }
