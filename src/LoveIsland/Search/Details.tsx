import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Details() {
  const { id } = useParams();
  const location = useLocation();
  const { title, description } = location.state || {};

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loggedInUsername = localStorage.getItem("username") || "";

  useEffect(() => {
    const checkBookmark = () => {
      setIsLoggedIn(!!loggedInUsername);

      if (!loggedInUsername || !id) {
        setIsBookmarked(false);
        return;
      }

      const bookmarksKey = `bookmarkedVideos_${loggedInUsername}`;
      const bookmarks: { id: string; title: string; description: string }[] =
        JSON.parse(localStorage.getItem(bookmarksKey) || "[]");

      const alreadyBookmarked = bookmarks.some((video) => video.id === id);
      setIsBookmarked(alreadyBookmarked);
    };

    checkBookmark();
  }, [id, loggedInUsername]);

  const handleBookmark = () => {
    if (!isLoggedIn || !id || !title || !description) {
      alert("You must be logged in and have valid video data.");
      return;
    }

    const bookmarksKey = `bookmarkedVideos_${loggedInUsername}`;
    const existing: { id: string; title: string; description: string }[] =
      JSON.parse(localStorage.getItem(bookmarksKey) || "[]");

    if (isBookmarked) {
      const updated = existing.filter((video) => video.id !== id);
      localStorage.setItem(bookmarksKey, JSON.stringify(updated));
      setIsBookmarked(false);
    } else {
      const newBookmark = { id, title, description };
      localStorage.setItem(bookmarksKey, JSON.stringify([...existing, newBookmark]));
      setIsBookmarked(true);
    }
  };

  if (!id || !title) return <p>Invalid video or missing data.</p>;

  const youtubeUrl = `https://www.youtube.com/watch?v=${id}`;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>{title}</h2>
      <p>{description}</p>

      <button onClick={handleBookmark} style={{ marginBottom: "1rem" }} disabled={!isLoggedIn}>
        {isBookmarked ? "Remove Bookmark" : "Bookmark Video"}
      </button>

      {!isLoggedIn && (
        <p style={{ color: "red" }}>
          You must be logged in to bookmark videos.
        </p>
      )}

      <div
        style={{
          position: "relative",
          paddingTop: "56.25%",
          marginTop: "1rem",
          cursor: "pointer",
        }}
        onClick={() => window.open(youtubeUrl, "_blank")}
      >
        <iframe
          title={title}
          src={`https://www.youtube.com/embed/${id}`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
          frameBorder="0"
          allowFullScreen
        />
      </div>
    </div>
  );
}
