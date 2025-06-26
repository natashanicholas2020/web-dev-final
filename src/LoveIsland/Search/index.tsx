import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const YOUTUBE_API_KEY = "AIzaSyDkJGO-3xzD7qEh5sVAtvGlaYPBRiIX6vI";
const MAX_RESULTS = 30;

type YouTubeVideo = {
  id: { videoId: string };
  snippet: {
    title: string;
    description: string;
    thumbnails: { medium: { url: string } };
  };
};

export default function Search() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const fetchVideos = async (searchQuery: string) => {
    if (!searchQuery) return;
    setLoading(true);

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
          searchQuery
        )}&type=video&key=${YOUTUBE_API_KEY}&maxResults=${MAX_RESULTS}`
      );
      const data = await response.json();
      setVideos(data.items || []);
    } catch (error) {
      console.error("Error fetching YouTube videos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchVideos(query);
  };

  return (
    <div>
      <h2>YouTube Search</h2>

      <form onSubmit={handleSearch} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for videos..."
          style={{ padding: "0.5rem", width: "250px" }}
        />
        <button type="submit" style={{ padding: "0.5rem", marginLeft: "0.5rem" }}>
          Search
        </button>
      </form>

      {loading ? (
        <p>Loading videos...</p>
      ) : (
        <div className="video-grid">
          {videos.map((video) => {
            const videoId = video.id?.videoId;
            const snippet = video.snippet;
            if (!videoId || !snippet) return null;

            return (
              <div
                key={videoId}
                className="video-card"
                onClick={() =>
                  navigate(`/LoveIsland/Details/${videoId}`, {
                    state: {
                      title: snippet.title,
                      description: snippet.description
                    }
                  })
                }
                style={{ cursor: "pointer" }}
              >
                <img src={snippet.thumbnails.medium.url} alt={snippet.title} />
                <p>{snippet.title}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
