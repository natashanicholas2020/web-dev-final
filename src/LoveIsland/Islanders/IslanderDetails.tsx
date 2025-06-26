import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Islander {
  _id: string;
  first_name: string;
  last_name: string;
  age: number;
  astrology_sign: string;
  hometown: string;
  episode_entered: number;
  episode_left: number | null;
  image?: string;
}

export default function IslanderDetails() {
  const { id } = useParams<{ id: string }>();
  const [islander, setIslander] = useState<Islander | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`http://localhost:4000/api/islanders/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch islander");
        return res.json();
      })
      .then((data: Islander) => {
        setIslander(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading islander details...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;
  if (!islander) return <div>Islander not found</div>;

  return (
    <div className="islander-details-container">
      {islander.image && (
        <img
          src={`/${islander.image}`}
          alt={`${islander.first_name} ${islander.last_name}`}
          className="islander-image"
        />
      )}

      <h2 className="islander-name">
        {islander.first_name} {islander.last_name}
      </h2>


      <div className="islander-details-card">
        <p><strong>Age:</strong> {islander.age}</p>
        <p><strong>Astrology Sign:</strong> {islander.astrology_sign}</p>
        <p><strong>Hometown:</strong> {islander.hometown}</p>
        <p><strong>Episode Entered:</strong> {islander.episode_entered}</p>
        <p><strong>Episode Left:</strong> {islander.episode_left ?? 'Still in competition'}</p>
      </div>
    </div>
  );
}
