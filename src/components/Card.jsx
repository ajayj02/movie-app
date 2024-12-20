/* eslint-disable react/prop-types */
import "../index.css"; // Add your styles here

function Card({ poster_path, title, original_language, vote_average, overview }) {
  return (
    <div className="card">
      <img
        className="card-poster"
        src={poster_path}
        alt={title}
      />
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p><strong>Language:</strong> {original_language}</p>
        <p><strong>Vote Average:</strong> {vote_average}</p>
        <p className="card-overview">{overview}</p>
      </div>
    </div>
  );
}

export default Card;
