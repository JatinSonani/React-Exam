import React from "react";
import "../assets/MovieGenres.css";

const genres = [
  { name: "Action", img: "https://wallpapercat.com/w/full/c/1/2/457550-2880x1800-desktop-hd-john-wick-background-image.jpg" },
  { name: "Comedy", img: "https://i.ytimg.com/vi/6xdRuJoEMoU/hq720.jpg?sqp=-oaymwEXCK4FEIIDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLDGwnhggnrfJ78844m18wT60ncVQg" },
  { name: "Drama", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1hjPv4GHvTlsuKry_LrSnIxEJkfrggy4tTg&s" },
  { name: "Horror", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdNTz7fsuGbSd01fzF4bBFH7icZAG94YJx0w&s" },
  { name: "Sci-Fi", img: "https://res.cloudinary.com/jerrick/image/upload/v1740106317/67b7ea4d117ca8001d5cf17f.jpg" },
  { name: "Romance", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCOM_7m5zTqfOTaWOMVQPrfbH0u_MAygU-zQ&s" },
  { name: "Thriller", img: "https://hips.hearstapps.com/hmg-prod/images/the-weekend-away-2022-65174b902db56.png?crop=1xw:1xh;center,top&resize=980:*" },
  { name: "Documentary", img: "https://akamaividz2.zee5.com/image/upload/w_336,h_504,c_scale,f_webp,q_auto:eco/resources/0-0-6751/portrait/1920x7701308210827.jpg" }
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
