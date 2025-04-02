import React from "react";

const genres = [
  { name: "Action", img: "https://example.com/action-icon.png" },
  { name: "Comedy", img: "https://example.com/comedy-icon.png" },
  { name: "Drama", img: "https://example.com/drama-icon.png" },
  { name: "Horror", img: "https://example.com/horror-icon.png" },
  { name: "Sci-Fi", img: "https://example.com/scifi-icon.png" },
  { name: "Romance", img: "https://example.com/romance-icon.png" },
  { name: "Thriller", img: "https://example.com/thriller-icon.png" },
  { name: "Documentary", img: "https://example.com/documentary-icon.png" }
];

const MovieGenres = () => {
  return (
    <div className="genres-container">
      {genres.map((genre, index) => (
        <div className="genre-item" key={index}>
          <img src={genre.img} alt={genre.name} className="genre-icon" />
          <span className="genre-text">{genre.name}</span>
        </div>
      ))}
    </div>
  );
};

export default MovieGenres;
