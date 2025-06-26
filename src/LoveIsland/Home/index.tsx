// // import { useEffect, useState } from "react";
// // import { Link } from "react-router-dom";
// // import Countdown from "./Countdown";
// // import Updates from "./Updates";
// // import "./styles.css";

// // interface Islander {
// //   _id: string;
// //   first_name: string;
// //   last_name: string;
// //   episode_left: number | null;
// //   image?: string;
// // }

// // interface Reply {
// //   _id?: string;
// //   username: string;
// //   message: string;
// //   datetime: string;
// // }

// // interface Post {
// //   _id: string;
// //   username: string;
// //   message: string;
// //   datetime: string;
// //   replies?: Reply[];
// // }

// // interface Bookmark {
// //   id: string;
// //   title: string;
// //   description: string;
// // }

// // export default function Home() {
// //   const [islanders, setIslanders] = useState<Islander[]>([]);
// //   const [posts, setPosts] = useState<Post[]>([]);
// //   const [bookmarkedVideos, setBookmarkedVideos] = useState<Bookmark[]>([]);
// //   const [loadingIslanders, setLoadingIslanders] = useState(true);
// //   const [loadingPosts, setLoadingPosts] = useState(true);
// //   const [loadingBookmarks, setLoadingBookmarks] = useState(true);
// //   const [error, setError] = useState<string | null>(null);

// //   const token = localStorage.getItem("token");
// //   const loggedInUsername = localStorage.getItem("username") || "";

// //   // Fetch islanders
// //   useEffect(() => {
// //     fetch("http://localhost:4000/api/islanders")
// //       .then((res) => {
// //         if (!res.ok) throw new Error("Failed to fetch islanders");
// //         return res.json();
// //       })
// //       .then((data: Islander[]) => {
// //         const filtered = data.filter((islander) => islander.episode_left === null);
// //         setIslanders(filtered);
// //         setLoadingIslanders(false);
// //       })
// //       .catch((err) => {
// //         setError(err.message);
// //         setLoadingIslanders(false);
// //       });
// //   }, []);

// //   // Fetch user posts
// //   useEffect(() => {
// //     if (!token) {
// //       setPosts([]);
// //       setLoadingPosts(false);
// //       return;
// //     }

// //     fetch("http://localhost:4000/api/posts")
// //       .then((res) => {
// //         if (!res.ok) throw new Error("Failed to fetch posts");
// //         return res.json();
// //       })
// //       .then((data: Post[]) => {
// //         const userPosts = data
// //           .filter((post) => post.username.toLowerCase() === loggedInUsername.toLowerCase())
// //           .map((post) => ({
// //             ...post,
// //             replies: post.replies || [],
// //           }));
// //         setPosts(userPosts);
// //         setLoadingPosts(false);
// //       })
// //       .catch((err) => {
// //         console.error(err);
// //         setLoadingPosts(false);
// //       });
// //   }, [token, loggedInUsername]);

// //   // Load bookmarked videos for logged-in user
// //   useEffect(() => {
// //     if (!loggedInUsername) {
// //       setBookmarkedVideos([]);
// //       setLoadingBookmarks(false);
// //       return;
// //     }
// //     const bookmarksKey = `bookmarkedVideos_${loggedInUsername}`;
// //     const bookmarks: Bookmark[] = JSON.parse(localStorage.getItem(bookmarksKey) || "[]");
// //     setBookmarkedVideos(bookmarks);
// //     setLoadingBookmarks(false);
// //   }, [loggedInUsername]);

// //   return (
// //     <div className="home-container">
// //       <div>
// //         <h1 className="montserrat-heading">Time Until Next Love Island USA Episode:</h1>
// //       </div>

// //       <div>
// //         <Countdown />
// //       </div>

// //       <div>
// //         <Updates />
// //       </div>

// //       {/* Your Posts (visible only if logged in) */}
// //       {token && loggedInUsername && (
// //         <div className="home-user-posts">
// //           <h3>Your Posts</h3>
// //           {loadingPosts ? (
// //             <p>Loading your posts...</p>
// //           ) : posts.length === 0 ? (
// //             <p>You haven't posted yet.</p>
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

// //                   {/* Replies under each post */}
// //                   {post.replies && post.replies.length > 0 && (
// //                     <div className="reply-section">
// //                       <h4>Replies:</h4>
// //                       {post.replies.map((reply, index) => (
// //                         <div key={index} className="reply-card">
// //                           <p>
// //                             <strong>{reply.username}</strong>{" "}
// //                             <span className="reply-datetime">
// //                               {new Date(reply.datetime).toLocaleString()}
// //                             </span>
// //                           </p>
// //                           <p>{reply.message}</p>
// //                         </div>
// //                       ))}
// //                     </div>
// //                   )}
// //                 </div>
// //               ))}
// //             </div>
// //           )}
// //         </div>
// //       )}

// //       {/* Bookmarked Videos (only for logged-in users) */}
// //       {token && loggedInUsername && (
// //         <div className="home-user-bookmarks" style={{ marginTop: "2rem" }}>
// //           <h3>Your Bookmarked Videos</h3>
// //           {loadingBookmarks ? (
// //             <p>Loading your bookmarks...</p>
// //           ) : bookmarkedVideos.length === 0 ? (
// //             <p>You have no bookmarked videos.</p>
// //           ) : (
// //             <ul className="bookmarked-videos-list">
// //               {bookmarkedVideos.map((video) => (
// //                 <li key={video.id} className="bookmark-item">
// //                   <Link
// //                     to={`/LoveIsland/Details/${video.id}`}
// //                     state={{ title: video.title, description: video.description }}
// //                     className="bookmark-link"
// //                   >
// //                     {video.title}
// //                   </Link>
// //                 </li>
// //               ))}
// //             </ul>
// //           )}
// //         </div>
// //       )}

// //       <h2 className="wd-updates-heading">Current Islanders:</h2>
// //       {loadingIslanders && <p>Loading current islanders...</p>}
// //       {error && <p>Error: {error}</p>}

// //       <div className="islander-cards-container">
// //         {islanders.map((islander) => (
// //           <Link
// //             to={`/LoveIsland/Islanders/${islander._id}`}
// //             key={islander._id}
// //             className="islander-card"
// //           >
// //             {islander.image && (
// //               <img
// //                 src={`/${islander.image}`}
// //                 alt={`${islander.first_name} ${islander.last_name}`}
// //                 className="islander-card-image"
// //                 style={{
// //                   maxWidth: "150px",
// //                   borderRadius: "8px",
// //                   marginBottom: "8px",
// //                 }}
// //               />
// //             )}
// //             <h3>
// //               {islander.first_name} {islander.last_name}
// //             </h3>
// //           </Link>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }


















// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Countdown from "./Countdown";
// import Updates from "./Updates";
// import "./styles.css";

// interface Islander {
//   _id: string;
//   first_name: string;
//   last_name: string;
//   episode_left: number | null;
//   image?: string;
// }

// interface Reply {
//   _id?: string;
//   username: string;
//   message: string;
//   datetime: string;
// }

// interface Post {
//   _id: string;
//   username: string;
//   message: string;
//   datetime: string;
//   replies?: Reply[];
// }

// interface BookmarkedVideo {
//   id: string;
//   title: string;
//   description: string;
// }

// export default function Home() {
//   const [islanders, setIslanders] = useState<Islander[]>([]);
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [loadingIslanders, setLoadingIslanders] = useState(true);
//   const [loadingPosts, setLoadingPosts] = useState(true);
//   const [loadingBookmarks, setLoadingBookmarks] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [bookmarkedVideos, setBookmarkedVideos] = useState<BookmarkedVideo[]>([]);

//   const token = localStorage.getItem("token");
//   const loggedInUsername = localStorage.getItem("username") || "";

//   // Fetch islanders
//   useEffect(() => {
//     fetch("http://localhost:4000/api/islanders")
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch islanders");
//         return res.json();
//       })
//       .then((data: Islander[]) => {
//         const filtered = data.filter((islander) => islander.episode_left === null);
//         setIslanders(filtered);
//         setLoadingIslanders(false);
//       })
//       .catch((err) => {
//         setError(err.message);
//         setLoadingIslanders(false);
//       });
//   }, []);

//   // Fetch posts (only if logged in)
//   useEffect(() => {
//     if (!token) {
//       setLoadingPosts(false);
//       return;
//     }

//     fetch("http://localhost:4000/api/posts")
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch posts");
//         return res.json();
//       })
//       .then((data: Post[]) => {
//         const userPosts = data
//           .filter((post) => post.username.toLowerCase() === loggedInUsername.toLowerCase())
//           .map((post) => ({
//             ...post,
//             replies: post.replies || [],
//           }));
//         setPosts(userPosts);
//         setLoadingPosts(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setLoadingPosts(false);
//       });
//   }, [token, loggedInUsername]);

//   // Load bookmarked videos from localStorage (only if logged in)
//   useEffect(() => {
//     if (!token) {
//       setBookmarkedVideos([]);
//       setLoadingBookmarks(false);
//       return;
//     }

//     const bookmarksJSON = localStorage.getItem("bookmarkedVideos");
//     const bookmarks: BookmarkedVideo[] = bookmarksJSON ? JSON.parse(bookmarksJSON) : [];
//     setBookmarkedVideos(bookmarks);
//     setLoadingBookmarks(false);
//   }, [token]);

//   return (
//     <div className="home-container">
//       <div>
//         <h1 className="montserrat-heading">Time Until Next Love Island USA Episode:</h1>
//       </div>

//       <div>
//         <Countdown />
//       </div>

//       <div>
//         <Updates />
//       </div>

//       {/* Your Posts (visible only if logged in) */}
//       {token && loggedInUsername && (
//         <div className="home-user-posts">
//           <h3>Your Posts</h3>
//           {loadingPosts ? (
//             <p>Loading your posts...</p>
//           ) : posts.length === 0 ? (
//             <p>You haven't posted yet.</p>
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

//                   {/* Replies under each post */}
//                   {post.replies && post.replies.length > 0 && (
//                     <div className="reply-section">
//                       <h4>Replies:</h4>
//                       {post.replies.map((reply, index) => (
//                         <div key={index} className="reply-card">
//                           <p>
//                             <strong>{reply.username}</strong>{" "}
//                             <span className="reply-datetime">
//                               {new Date(reply.datetime).toLocaleString()}
//                             </span>
//                           </p>
//                           <p>{reply.message}</p>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Bookmarked Videos */}
//           <div
//             className="home-user-bookmarks"
//             style={{
//               marginTop: "2rem",
//               backgroundColor: "white",
//               color: "black",
//               padding: "1rem",
//               borderRadius: "8px",
//               boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//               maxWidth: "600px",
//             }}
//           >
//             <h3>Your Bookmarked Videos</h3>
//             {loadingBookmarks ? (
//               <p>Loading your bookmarks...</p>
//             ) : bookmarkedVideos.length === 0 ? (
//               <p>You have no bookmarked videos.</p>
//             ) : (
//               <ul
//                 className="bookmarked-videos-list"
//                 style={{ listStyle: "none", padding: 0, margin: 0 }}
//               >
//                 {bookmarkedVideos.map((video, index) => (
//                   <li
//                     key={video.id}
//                     className="bookmark-item"
//                     style={{
//                       padding: "0.75rem 0",
//                       borderBottom:
//                         index !== bookmarkedVideos.length - 1 ? "1px solid #ccc" : "none",
//                     }}
//                   >
//                     <Link
//                       to={`/LoveIsland/Details/${video.id}`}
//                       state={{ title: video.title, description: video.description }}
//                       className="bookmark-link"
//                       style={{ color: "black", textDecoration: "none", fontWeight: "500" }}
//                     >
//                       {video.title}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>
//       )}

//       <h2 className="wd-updates-heading">Current Islanders:</h2>
//       {loadingIslanders && <p>Loading current islanders...</p>}
//       {error && <p>Error: {error}</p>}

//       <div className="islander-cards-container">
//         {islanders.map((islander) => (
//           <Link
//             to={`/LoveIsland/Islanders/${islander._id}`}
//             key={islander._id}
//             className="islander-card"
//           >
//             {islander.image && (
//               <img
//                 src={`/${islander.image}`}
//                 alt={`${islander.first_name} ${islander.last_name}`}
//                 className="islander-card-image"
//                 style={{
//                   maxWidth: "150px",
//                   borderRadius: "8px",
//                   marginBottom: "8px",
//                 }}
//               />
//             )}
//             <h3>
//               {islander.first_name} {islander.last_name}
//             </h3>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }


















import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Countdown from "./Countdown";
import Updates from "./Updates";
import "./styles.css";

interface Islander {
  _id: string;
  first_name: string;
  last_name: string;
  episode_left: number | null;
  image?: string;
}

interface Reply {
  _id?: string;
  username: string;
  message: string;
  datetime: string;
}

interface Post {
  _id: string;
  username: string;
  message: string;
  datetime: string;
  replies?: Reply[];
}

interface BookmarkedVideo {
  id: string;
  title: string;
  description: string;
}

export default function Home() {
  const [islanders, setIslanders] = useState<Islander[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingIslanders, setLoadingIslanders] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingBookmarks, setLoadingBookmarks] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookmarkedVideos, setBookmarkedVideos] = useState<BookmarkedVideo[]>([]);

  const token = localStorage.getItem("token");
  const loggedInUsername = localStorage.getItem("username") || "";

  // Fetch islanders
  useEffect(() => {
    fetch("http://localhost:4000/api/islanders")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch islanders");
        return res.json();
      })
      .then((data: Islander[]) => {
        const filtered = data.filter((islander) => islander.episode_left === null);
        setIslanders(filtered);
        setLoadingIslanders(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoadingIslanders(false);
      });
  }, []);

  // Fetch posts (only if logged in)
  useEffect(() => {
    if (!token) {
      setLoadingPosts(false);
      return;
    }

    fetch("http://localhost:4000/api/posts")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch posts");
        return res.json();
      })
      .then((data: Post[]) => {
        const userPosts = data
          .filter((post) => post.username.toLowerCase() === loggedInUsername.toLowerCase())
          .map((post) => ({
            ...post,
            replies: post.replies || [],
          }));
        setPosts(userPosts);
        setLoadingPosts(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingPosts(false);
      });
  }, [token, loggedInUsername]);

  // Load bookmarked videos from localStorage (only if logged in)
  useEffect(() => {
    if (!token) {
      setBookmarkedVideos([]);
      setLoadingBookmarks(false);
      return;
    }

    const bookmarksJSON = localStorage.getItem("bookmarkedVideos");
    const bookmarks: BookmarkedVideo[] = bookmarksJSON ? JSON.parse(bookmarksJSON) : [];
    setBookmarkedVideos(bookmarks);
    setLoadingBookmarks(false);
  }, [token]);

  return (
    <div className="home-container">
      <div>
        <h1 className="montserrat-heading">Time Until Next Love Island USA Episode:</h1>
      </div>

      <div>
        <Countdown />
      </div>

      <div>
        <Updates />
      </div>

      {/* Your Posts (visible only if logged in) */}
      {token && loggedInUsername && (
        <>
          <div className="home-user-posts">
            <h3>Your Posts</h3>
            {loadingPosts ? (
              <p>Loading your posts...</p>
            ) : posts.length === 0 ? (
              <p>You haven't posted yet.</p>
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

                    {/* Replies under each post */}
                    {post.replies && post.replies.length > 0 && (
                      <div className="reply-section">
                        <h4>Replies:</h4>
                        {post.replies.map((reply, index) => (
                          <div key={index} className="reply-card">
                            <p>
                              <strong>{reply.username}</strong>{" "}
                              <span className="reply-datetime">
                                {new Date(reply.datetime).toLocaleString()}
                              </span>
                            </p>
                            <p>{reply.message}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bookmarked Videos - Separate Scrollable Card */}
          <div
            className="home-user-bookmarks"
            style={{
              marginTop: "2rem",
              backgroundColor: "white",
              color: "black",
              padding: "1rem",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              maxWidth: "600px",
              maxHeight: "300px",
              overflowY: "auto",
            }}
          >
            <h3>Your Bookmarked Videos</h3>
            {loadingBookmarks ? (
              <p>Loading your bookmarks...</p>
            ) : bookmarkedVideos.length === 0 ? (
              <p>You have no bookmarked videos.</p>
            ) : (
              <ul
                className="bookmarked-videos-list"
                style={{ listStyle: "none", padding: 0, margin: 0 }}
              >
                {bookmarkedVideos.map((video, index) => (
                  <li
                    key={video.id}
                    className="bookmark-item"
                    style={{
                      padding: "0.75rem 0",
                      borderBottom:
                        index !== bookmarkedVideos.length - 1 ? "1px solid #ccc" : "none",
                    }}
                  >
                    <Link
                      to={`/LoveIsland/Details/${video.id}`}
                      state={{ title: video.title, description: video.description }}
                      className="bookmark-link"
                      style={{ color: "black", textDecoration: "none", fontWeight: "500" }}
                    >
                      {video.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}

      <h2 className="wd-updates-heading">Current Islanders:</h2>
      {loadingIslanders && <p>Loading current islanders...</p>}
      {error && <p>Error: {error}</p>}

      <div className="islander-cards-container">
        {islanders.map((islander) => (
          <Link
            to={`/LoveIsland/Islanders/${islander._id}`}
            key={islander._id}
            className="islander-card"
          >
            {islander.image && (
              <img
                src={`/${islander.image}`}
                alt={`${islander.first_name} ${islander.last_name}`}
                className="islander-card-image"
                style={{
                  maxWidth: "150px",
                  borderRadius: "8px",
                  marginBottom: "8px",
                }}
              />
            )}
            <h3>
              {islander.first_name} {islander.last_name}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
