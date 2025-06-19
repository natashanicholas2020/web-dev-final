
import { useEffect, useState } from "react";
import Countdown from "./Countdown";
import { Link } from "react-router-dom";
import Updates from "./Updates";

interface Islander {
  _id: string;
  first_name: string;
  last_name: string;
  episode_left: number | null;
  image?: string;
}

export default function Home() {
  const [islanders, setIslanders] = useState<Islander[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:4000/api/islanders")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch islanders");
        return res.json();
      })
      .then((data: Islander[]) => {
        const filtered = data.filter((islander) => islander.episode_left === null);
        setIslanders(filtered);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="wd-background-layer" />
      <div id="wd-home" className="wd-content-layer">
        <h1>Welcome to Love Island USA</h1>
        <Countdown />
        <div></div>
        <h2 className="wd-updates-heading">New Updates</h2>

        <Updates />

        <h2 className="wd-updates-heading">Current Islanders:</h2>
        {loading && <p>Loading current islanders...</p>}
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
                  src={`/${islander.image}`} // Leading slash for public folder images
                  alt={`${islander.first_name} ${islander.last_name}`}
                  className="islander-card-image"
                  style={{ maxWidth: "150px", borderRadius: "8px", marginBottom: "8px" }}
                />
              )}
              <h3>
                {islander.first_name} {islander.last_name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}