import React, { useEffect, useState } from "react";
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
  image?: string; // optional field for image
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!islander) return <div>Islander not found</div>;

  return (
    <div className="islander-details">
      {islander.image && (
        <img
        src={`/${islander.image}`}
          alt={`${islander.first_name} ${islander.last_name}`}
          className="islander-image"
          style={{ maxWidth: "300px", borderRadius: "8px" }}
        />
      )}
      <h2>
        {islander.first_name} {islander.last_name}
      </h2>
      <p><strong>Age:</strong> {islander.age}</p>
      <p><strong>Astrology Sign:</strong> {islander.astrology_sign}</p>
      <p><strong>Hometown:</strong> {islander.hometown}</p>
      <p><strong>Episode Entered:</strong> {islander.episode_entered}</p>
      <p><strong>Episode Left:</strong> {islander.episode_left ?? 'Still in competition'}</p>
    </div>
  );
}
