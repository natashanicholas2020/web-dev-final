// import { useEffect, useState } from "react";
// import { Routes, Route, Link } from "react-router-dom";
// import Post from "./Post";
// import "./styles.css"; // Make sure this CSS file includes post styles

// type PostType = {
//   _id: string;
//   username: string;
//   message: string;
//   datetime: string;
// };

// export default function Community() {
//   const [posts, setPosts] = useState<PostType[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string>("");

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await fetch("http://localhost:4000/api/posts");
//         if (!response.ok) throw new Error("Failed to fetch posts");
//         const data = await response.json();
//         setPosts(data.reverse());
//       } catch (err) {
//         setError("Failed to load posts. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, []);

//   const token = localStorage.getItem("token");

//   return (
//     <div id="wd-community-screen" className="wd-content-layer">
//       <h2 className="community-title">Community</h2>
//       <p className="auth-status">{token ? "logged in" : "anon"}</p>

//       <div className="text-center mb-3">
//         <Link to="post" className="btn btn-primary">Create a Post</Link>
//       </div>

//       <Routes>
//         <Route
//           index
//           element={
//             loading ? (
//               <p>Loading posts...</p>
//             ) : error ? (
//               <p>{error}</p>
//             ) : posts.length === 0 ? (
//               <p>No posts yet.</p>
//             ) : (
//               <div className="post-list">
//                 {posts.map((post) => (
//                   <div key={post._id} className="post-card">
//                     <p>
//                       <strong>{post.username}</strong>{" "}
//                       <span className="post-datetime">
//                         {new Date(post.datetime).toLocaleString()}
//                       </span>
//                     </p>
//                     <p>{post.message}</p>
//                   </div>
//                 ))}
//               </div>
//             )
//           }
//         />
//         <Route path="post" element={<Post />} />
//       </Routes>
//     </div>
//   );
// }







// import { useEffect, useState } from "react";
// import "./styles.css";

// type PostType = {
//   _id: string;
//   username: string;
//   message: string;
//   datetime: string;
// };

// export default function Community() {
//   const [posts, setPosts] = useState<PostType[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string>("");
//   const [message, setMessage] = useState("");
//   const [postError, setPostError] = useState("");

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await fetch("http://localhost:4000/api/posts");
//         if (!response.ok) throw new Error("Failed to fetch posts");
//         const data = await response.json();
//         setPosts(data);
//       } catch (err) {
//         setError("Failed to load posts. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setPostError("");

//     if (!token) {
//       setPostError("You must be logged in to post.");
//       return;
//     }

//     try {
//       const res = await fetch("http://localhost:4000/api/posts", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ message, name: "Anonymous" }), // replace name if needed
//       });

//       if (!res.ok) throw new Error("Failed to post");

//       const newPost = await res.json();
//       setPosts([newPost, ...posts]);
//       setMessage("");
//     } catch (err) {
//       setPostError("Failed to post message.");
//     }
//   };

//   return (
//     <div id="wd-community-screen" className="wd-content-layer">
//       <h2 className="community-title">Community</h2>
//       <p className="auth-status">{token ? "logged in" : "anon"}</p>

//       <div className="community-layout">
//         {/* Left: Posts */}
//         <div className="post-column">
//           {loading ? (
//             <p>Loading posts...</p>
//           ) : error ? (
//             <p>{error}</p>
//           ) : posts.length === 0 ? (
//             <p>No posts yet.</p>
//           ) : (
//             <div className="post-list">
//               {posts.map((post) => (
//                 <div key={post._id} className="post-card">
//                   <p>
//                     <strong>{post.username}</strong>{" "}
//                     <span className="post-datetime">
//                       {new Date(post.datetime).toLocaleString()}
//                     </span>
//                   </p>
//                   <p>{post.message}</p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Right: Create Post */}
//         <div className="form-column">
//           <h4>Create a Post</h4>
//           {postError && <p style={{ color: "red" }}>{postError}</p>}
//           <form onSubmit={handleSubmit}>
//             <textarea
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               placeholder="What's on your mind?"
//               required
//               className="post-input"
//             />
//             <button type="submit" className="post-button">
//               Post
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import "./styles.css";

type PostType = {
  _id: string;
  username: string;
  message: string;
  datetime: string;
};

export default function Community() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/posts");
        if (!response.ok) throw new Error("Failed to fetch posts");
        const data = await response.json();
        setPosts(data.reverse());  // Keep your existing order
      } catch (err) {
        setError("Failed to load posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

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
        body: JSON.stringify({ message, name: "Anonymous" }), // Adjust name as needed
      });

      if (!res.ok) throw new Error("Post failed");

      const newPost = await res.json();
      setPosts([newPost, ...posts]);
      setMessage("");
    } catch (err) {
      alert("Failed to submit post.");
    }
  };

  return (
    <div id="wd-community-screen" className="wd-content-layer">
      {/* <h2 className="community-title">Community</h2>
      <p className="auth-status">{token ? "logged in" : "anon"}</p> */}

      <div className="community-layout">
        {/* Posts on the left */}
        <div className="post-column">
          {loading ? (
            <p>Loading posts...</p>
          ) : error ? (
            <p>{error}</p>
          ) : posts.length === 0 ? (
            <p>No posts yet.</p>
          ) : (
            <div className="post-list">
              {posts.map((post) => (
                <div key={post._id} className="post-card">
                  <p>
                    <strong>{post.username}</strong>{" "}
                    <span className="post-datetime">
                      {new Date(post.datetime).toLocaleString()}
                    </span>
                  </p>
                  <p>{post.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Post form on the right */}
        <div className="form-column">
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
    </div>
  );
}
