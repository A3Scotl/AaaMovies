import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function MovieItem({ movie }) {
  const navigate = useNavigate();

  const handleMovieClick = () => {
    if (!movie.movieId) {
      console.error("Movie ID is undefined:", movie);
      return;
    }
    navigate(`/movie/${movie.movieId}`, { state: { movieId:movie.movieId } });
  };

  return (
    <div
      onClick={handleMovieClick}
      className="relative group cursor-pointer  transform transition-all duration-300 hover:scale-105"
    >
      {/* Movie Poster Container */}
      <div className="relative overflow-hidden rounded-lg bg-gray-800 aspect-[2/3]">
        <img
          src={movie.thumbnail}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />  
        <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>

        {/* Quality badge */}
        {movie.quality && (
          <div className="absolute top-2 left-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded font-bold z-10"> {/* z-10 to ensure it's above overlay */}
            {movie.quality}
          </div>
        )}

        {/* Year badge */}
        {movie.releaseYear && (
          <div className="absolute top-2 font-bold right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded z-10"> {/* z-10 to ensure it's above overlay */}
            {movie.releaseYear}
          </div>
        )}
      </div>

      {/* Movie Info */}
      <div className="mt-2">
        <h3 className="text-sm font-medium text-white line-clamp-2 group-hover:text-red-400 transition-colors">
          {movie.title}
        </h3>
        <p className="text-xs text-gray-400 mt-1">
          {movie.originName || "N/A"}
        </p>
      </div>
    </div>
  );
}

MovieItem.propTypes = {
  movie: PropTypes.shape({
    movieId: PropTypes.string,
    thumbnail: PropTypes.string,
    title: PropTypes.string.isRequired,
    quality: PropTypes.string,
    releaseYear: PropTypes.number,
    originName: PropTypes.string,
  }).isRequired,
};

export default MovieItem;