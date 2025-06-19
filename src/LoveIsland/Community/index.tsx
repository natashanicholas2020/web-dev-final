// import { useEffect, useState } from "react";
// import { Routes, Route, Link } from "react-router-dom";
// import Post from "./Post";
// import "./styles.css"; // import the CSS for styling

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
//               <div className="post-cards-container">
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



import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Post from "./Post";
import "./styles.css"; // Make sure this CSS file includes post styles

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

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/posts");
        if (!response.ok) throw new Error("Failed to fetch posts");
        const data = await response.json();
        setPosts(data.reverse());
      } catch (err) {
        setError("Failed to load posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const token = localStorage.getItem("token");

  return (
    <div id="wd-community-screen" className="wd-content-layer">
      <h2 className="community-title">Community</h2>
      <p className="auth-status">{token ? "logged in" : "anon"}</p>

      <div className="text-center mb-3">
        <Link to="post" className="btn btn-primary">Create a Post</Link>
      </div>

      <Routes>
        <Route
          index
          element={
            loading ? (
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
            )
          }
        />
        <Route path="post" element={<Post />} />
      </Routes>
    </div>
  );
}
