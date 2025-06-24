import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Add this line
import "./styles.css";

const YOUTUBE_API_KEY = "AIzaSyDkJGO-3xzD7qEh5sVAtvGlaYPBRiIX6vI";
const SEARCH_QUERY = "Love Island USA Season 7";
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
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Add this line

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
            SEARCH_QUERY
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

    fetchVideos();
  }, []);

  return (
    <div>
      <h2>Love Island Clips 🎥</h2>
      {loading ? (
        <p>Loading latest videos...</p>
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
                <img
                  src={snippet.thumbnails.medium.url}
                  alt={snippet.title}
                />
                <p>{snippet.title}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
