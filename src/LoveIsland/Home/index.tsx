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

// export default function Home() {
//   const [islanders, setIslanders] = useState<Islander[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     fetch("http://localhost:4000/api/islanders")
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch islanders");
//         return res.json();
//       })
//       .then((data: Islander[]) => {
//         const filtered = data.filter((islander) => islander.episode_left === null);
//         setIslanders(filtered);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <div className="home-container">
//       <div>
//       <h1 className="montserrat-heading">Time Until Next Love Island USA Episode:</h1>
//         </div>
//         <div>
//         <Countdown />
//       </div>
//       <div>
//         <Updates />
//       </div>

//       <h2 className="wd-updates-heading">Current Islanders:</h2>
//       {loading && <p>Loading current islanders...</p>}
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
//                 style={{ maxWidth: "150px", borderRadius: "8px", marginBottom: "8px" }}
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

interface Post {
  _id: string;
  username: string;
  message: string;
  datetime: string;
}

export default function Home() {
  const [islanders, setIslanders] = useState<Islander[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingIslanders, setLoadingIslanders] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token");
  const loggedInUsername = localStorage.getItem("username") || "";

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

  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:4000/api/posts")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch posts");
        return res.json();
      })
      .then((data: Post[]) => {
        const userPosts = data.filter(
          (post) => post.username.toLowerCase() === loggedInUsername.toLowerCase()
        );
        setPosts(userPosts);
        setLoadingPosts(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingPosts(false);
      });
  }, [token, loggedInUsername]);

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
                </div>
              ))}
            </div>
          )}
        </div>
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
