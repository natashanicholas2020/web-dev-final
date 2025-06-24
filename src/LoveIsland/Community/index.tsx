// // import { useEffect, useState } from "react";
// // import "./styles.css";

// // type PostType = {
// //   _id: string;
// //   username: string;
// //   message: string;
// //   datetime: string;
// // };

// // export default function Community() {
// //   const [posts, setPosts] = useState<PostType[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState<string>("");
// //   const [message, setMessage] = useState<string>("");

// //   const token = localStorage.getItem("token");
// //   const loggedInUsername = localStorage.getItem("username") || "Anonymous";

// //   useEffect(() => {
// //     const fetchPosts = async () => {
// //       try {
// //         const response = await fetch("http://localhost:4000/api/posts");
// //         if (!response.ok) throw new Error("Failed to fetch posts");
// //         const data: PostType[] = await response.json();
// //         setPosts(data.reverse()); // Show newest first
// //       } catch {
// //         setError("Failed to load posts. Please try again later.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchPosts();
// //   }, []);

// //   const userPosts = posts.filter(
// //     (post) => post.username.toLowerCase() === loggedInUsername.toLowerCase()
// //   );

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();

// //     if (!token) {
// //       alert("Please log in to post.");
// //       return;
// //     }
// //     if (!message.trim()) {
// //       alert("Post message cannot be empty.");
// //       return;
// //     }

// //     try {
// //       const res = await fetch("http://localhost:4000/api/posts", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //           Authorization: `Bearer ${token}`,
// //         },
// //         body: JSON.stringify({ message, name: loggedInUsername }),
// //       });

// //       if (!res.ok) throw new Error("Post failed");

// //       const newPost: PostType = await res.json();
// //       setPosts((prevPosts) => [newPost, ...prevPosts]);
// //       setMessage("");
// //     } catch {
// //       alert("Failed to submit post.");
// //     }
// //   };

// //   return (
// //     <div id="wd-community-screen" className="wd-content-layer">
// //       <div className="community-layout">
// //         {/* Left column: all posts */}
// //         <div className="post-column">
// //           {loading ? (
// //             <p>Loading posts...</p>
// //           ) : error ? (
// //             <p>{error}</p>
// //           ) : posts.length === 0 ? (
// //             <p>No posts yet.</p>
// //           ) : (
// //             <div className="post-list">
// //               {posts.map((post) => (
// //                 <div key={post._id} className="post-card">
// //                   <p>
// //                     <strong>{post.username}</strong>{" "}
// //                     <span className="post-datetime">
// //                       {new Date(post.datetime).toLocaleString()}
// //                     </span>
// //                   </p>
// //                   <p>{post.message}</p>
// //                 </div>
// //               ))}
// //             </div>
// //           )}
// //         </div>

// //         {/* Right column: visible only when logged in */}
// //         {token && (
// //           <div className="form-column">
// //             <h4>Your Posts</h4>
// //             {userPosts.length === 0 ? (
// //               <p>You haven't posted yet.</p>
// //             ) : (
// //               <div
// //                 className="post-list"
// //                 style={{ maxHeight: "200px", overflowY: "auto" }}
// //               >
// //                 {userPosts.map((post) => (
// //                   <div key={post._id} className="post-card">
// //                     <p>
// //                       <strong>{post.username}</strong>{" "}
// //                       <span className="post-datetime">
// //                         {new Date(post.datetime).toLocaleString()}
// //                       </span>
// //                     </p>
// //                     <p>{post.message}</p>
// //                   </div>
// //                 ))}
// //               </div>
// //             )}

// //             <h3>Create a Post</h3>
// //             <form onSubmit={handleSubmit}>
// //               <textarea
// //                 className="post-input"
// //                 placeholder="What's on your mind?"
// //                 value={message}
// //                 onChange={(e) => setMessage(e.target.value)}
// //                 required
// //               />
// //               <button type="submit" className="post-button">
// //                 Post
// //               </button>
// //             </form>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }








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
//   const [message, setMessage] = useState<string>("");

//   const token = localStorage.getItem("token");
//   const loggedInUsername = localStorage.getItem("username") || "Anonymous";

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await fetch("http://localhost:4000/api/posts");
//         if (!response.ok) throw new Error("Failed to fetch posts");
//         const data: PostType[] = await response.json();
//         setPosts(data.reverse()); // newest first
//       } catch {
//         setError("Failed to load posts. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, []);

//   // Filter posts created by logged-in user (case insensitive)
//   const userPosts = posts.filter(
//     (post) => post.username.toLowerCase() === loggedInUsername.toLowerCase()
//   );

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!token) {
//       alert("Please log in to post.");
//       return;
//     }
//     if (!message.trim()) {
//       alert("Post message cannot be empty.");
//       return;
//     }

//     try {
//       const res = await fetch("http://localhost:4000/api/posts", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ message, name: loggedInUsername }),
//       });

//       if (!res.ok) throw new Error("Post failed");

//       const newPost: PostType = await res.json();
//       setPosts((prevPosts) => [newPost, ...prevPosts]);
//       setMessage("");
//     } catch {
//       alert("Failed to submit post.");
//     }
//   };

//   return (
//     <div id="wd-community-screen" className="wd-content-layer">
//       <div className="community-layout">
//         {/* Left column: all posts */}
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

//         {/* Right column: visible only when logged in */}
//         {token && (
//           <div className="form-column">
//             {/* User's posts section, above the form */}
//             <h4>Your Posts</h4>
//             {userPosts.length === 0 ? (
//               <p>You haven't posted yet.</p>
//             ) : (
//               <div
//                 className="post-list"
//                 style={{ maxHeight: "200px", overflowY: "auto" }}
//               >
//                 {userPosts.map((post) => (
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
//             )}

//             {/* Create post form */}
//             <h3>Create a Post</h3>
//             <form onSubmit={handleSubmit}>
//               <textarea
//                 className="post-input"
//                 placeholder="What's on your mind?"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 required
//               />
//               <button type="submit" className="post-button">
//                 Post
//               </button>
//             </form>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }





import React, { useEffect, useState } from "react";
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

  // Grab token and username from localStorage
  const token = localStorage.getItem("token");
  const loggedInUsername = localStorage.getItem("username") || "";

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/posts");
        if (!response.ok) throw new Error("Failed to fetch posts");
        const data: PostType[] = await response.json();
        setPosts(data); // newest first, your backend sorts by datetime desc
      } catch {
        setError("Failed to load posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts created by logged-in user (case insensitive)
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
      setPosts((prevPosts) => [newPost, ...prevPosts]);
      setMessage("");
    } catch {
      alert("Failed to submit post.");
    }
  };

  return (
    <div id="wd-community-screen" className="wd-content-layer">
      <div className="community-layout">
        {/* Left column: all posts */}
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

        {/* Right column: show only if user is logged in */}
        {token && loggedInUsername ? (
          <div className="form-column">
            <h4>Your Posts</h4>
            {userPosts.length === 0 ? (
              <p>You haven't posted yet.</p>
            ) : (
              <div
                className="post-list"
                style={{ maxHeight: "200px", overflowY: "auto" }}
              >
                {userPosts.map((post) => (
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
        ) : (
          <div className="form-column">
            <p>Please log in to see your posts and create a new one.</p>
          </div>
        )}
      </div>
    </div>
  );
}
