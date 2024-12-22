/* eslint-disable react/prop-types */
import { useState } from "react";
import "../index.css"; // Add your styles here

function Card({
  poster_path,
  release_date,
  title,
  original_language,
  vote_average,
  overview,
}) {
  const [expand, setExpand] = useState(false)

  function toggleExpand() {
      setExpand(!expand)
  }

  return (
    <div className="card">
      <img
        className="card-poster"
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        alt={title}
      />
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p>
          <strong>Language:</strong> {original_language}
        </p>
        <p>
          <strong>Release Date:</strong> {release_date}
        </p>
        <p
          style={{
            border: "2px solid black",
            borderRadius: "4px",
            maxWidth: "180px",
            padding: "3px",
          }}
        >
          <strong>Vote Average:</strong> {vote_average}/10
        </p>
        <p className="card-overview">
            {
                expand ? overview : `${overview.slice(0,100)}...`
            }
            <span onClick={toggleExpand} className="read-more">
                {expand ? "Read Less" : "Read More"}
            </span>
        </p>
      </div>
    </div>
  );
}

export default Card;
