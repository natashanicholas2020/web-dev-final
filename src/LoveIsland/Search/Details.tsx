import { useLocation, useParams } from "react-router-dom";

export default function Details() {
  const { id } = useParams();
  const location = useLocation();
  const { title, description } = location.state || {};

  if (!id || !title) return <p>Invalid video or missing data.</p>;

  const youtubeUrl = `https://www.youtube.com/watch?v=${id}`;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>{title}</h2>
      <p>{description}</p>

      <div
        style={{ position: "relative", paddingTop: "56.25%", marginTop: "1rem", cursor: "pointer" }}
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
            pointerEvents: "none" // Makes iframe unclickable, so click triggers parent div
          }}
          frameBorder="0"
          allowFullScreen
        />
      </div>
    </div>
  );
}
