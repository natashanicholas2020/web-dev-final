import { API_BASE_URL } from "../../config/api";
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

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/islanders`)
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
    if (!token) {
      setLoadingPosts(false);
      return;
    }

    fetch(`${API_BASE_URL}/api/posts`)
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

  useEffect(() => {
    if (!token || !loggedInUsername) {
      setBookmarkedVideos([]);
      setLoadingBookmarks(false);
      return;
    }

    const bookmarksKey = `bookmarkedVideos_${loggedInUsername}`;
    const bookmarksJSON = localStorage.getItem(bookmarksKey);
    const bookmarks: BookmarkedVideo[] = bookmarksJSON ? JSON.parse(bookmarksJSON) : [];
    setBookmarkedVideos(bookmarks);
    setLoadingBookmarks(false);
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
              minHeight: "150px",
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