import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import { getCategoryById } from "../apis/category.api";

const Banner = ({ movies = [] }) => {
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentGenres, setCurrentGenres] = useState([]);
  const [isBannerReady, setIsBannerReady] = useState(false);
  const navigate = useNavigate();
  const intervalRef = useRef(null);
  const categoryCache = useRef({});

  const currentMovie = movies[currentMovieIndex];

  // Handle auto-slide interval
  useEffect(() => {
    if (!movies.length) {
      setIsBannerReady(false);
      clearInterval(intervalRef.current);
      return;
    }

    setIsBannerReady(true);
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % movies.length);
        setIsTransitioning(false);
      }, 500);
    }, 5000);

    intervalRef.current = interval;
    return () => clearInterval(interval);
  }, [movies]);

  // Fetch genres for the current movie
  useEffect(() => {
    if (!currentMovie) return;

    const fetchGenres = async () => {
      const genreNames = await Promise.all(
        (currentMovie.categoryIds || []).map(async (id) => {
          if (categoryCache.current[id]) return categoryCache.current[id];
          try {
            const { name } = await getCategoryById(id);
            categoryCache.current[id] = name;
            return name;
          } catch (error) {
            console.error(`Failed to fetch category ID ${id}:`, error);
            return "Unknown";
          }
        })
      );
      setCurrentGenres(genreNames.length ? genreNames : ["Unknown"]);
    };

    fetchGenres();
  }, [currentMovie]);

  // Navigation handlers
  const navigateToMovie = (movie, isWatching) => {
    if (!movie?.movieId) {
      console.error("Movie ID is undefined:", movie);
      return;
    }
    navigate(`/movie/${movie.movieId}`, { state: { movieId:movie.movieId,isWatching } });
  };

  // Render loading state
  if (!isBannerReady || !currentMovie) {
    return (
      <div className="w-full h-screen min-h-[600px] bg-black flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Handle dot indicator click
  const handleDotClick = (index) => {
    clearInterval(intervalRef.current);
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentMovieIndex(index);
      setIsTransitioning(false);
      if (movies.length) {
        intervalRef.current = setInterval(() => {
          setIsTransitioning(true);
          setTimeout(() => {
            setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % movies.length);
            setIsTransitioning(false);
          }, 500);
        }, 5000);
      }
    }, 500);
  };

  return (
    <div className="w-full h-screen min-h-[600px] relative overflow-hidden">
      {/* Background */}
      <div
        className={`absolute inset-0 bg-black bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-out ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
        style={{ backgroundImage: `url(${currentMovie.poster})` }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Main Content */}
      <div className="absolute inset-0 flex items-center justify-center px-4 lg:px-10 z-20">
        <div
          className={`w-full max-w-7xl mx-auto transition-opacity duration-1000 ease-out ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            {/* Text Content */}
            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                  <p className="text-red-500 text-2xl md:text-3xl lg:text-4xl mb-2">AaaMovies</p>
                  <span className="text-white block">{currentMovie.title}</span>
                </h1>
                <div className="flex items-center justify-center lg:justify-start space-x-3 flex-wrap gap-2">
                  {currentMovie.releaseYear && (
                    <span className="text-white font-bold border-4 border-white bg-white/30 px-4 py-2 text-sm rounded-full hover:scale-105 transition-transform duration-300">
                      {currentMovie.releaseYear}
                    </span>
                  )}
                  <span className="text-white font-bold border-4 border-white bg-white/30 px-4 py-2 text-sm rounded-full hover:scale-105 transition-transform duration-300">
                    {currentMovie.quality}
                  </span>
                  <span className="text-white font-bold border-4 border-white bg-white/30 px-4 py-2 text-sm rounded-full backdrop-blur-sm">
                    {currentGenres.join(", ")}
                  </span>
                </div>
              </div>
              <div className="flex justify-center lg:justify-start gap-4">
                <button
                  onClick={() => navigateToMovie(currentMovie, true)}
                  className="flex items-center p-5 border-2 bg-red-500 text-white hover:bg-white hover:text-red-900 rounded-full text-base lg:text-lg font-semibold hover:scale-105 hover:shadow-xl transition-all duration-300"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
                <button
                  onClick={() => navigateToMovie(currentMovie, false)}
                  className="flex items-center p-5 border-2 bg-black text-white hover:bg-white hover:text-red-900 rounded-full text-base lg:text-lg font-semibold hover:scale-105 hover:shadow-xl transition-all duration-300"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 17c-.55 0-1-.45-1-1v-6c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1zm0-10c-.83 0-1.5-.67-1.5-1.5S11.17 6 12 6s1.5.67 1.5 1.5S12.83 9 12 9z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Movie Poster */}
            <div className="hidden lg:flex w-full lg:w-1/2 items-center justify-center">
              <div className="w-[280px] h-[380px] lg:w-[320px] lg:h-[420px] relative group">
                <button
                  onClick={() => navigateToMovie(currentMovie, true)}
                  className="absolute inset-0 p-2 flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 rounded-xl z-10 hover:scale-110 transition-all duration-500"
                >
                  <div className="w-16 h-16 lg:w-20 lg:h-20 bg-red-600 rounded-full flex items-center justify-center shadow-2xl">
                    <svg className="w-8 h-8 lg:w-10 lg:h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </button>
                <img
                  src={currentMovie.thumbnail}
                  alt={currentMovie.title}
                  className="object-cover w-full h-full rounded-xl shadow-2xl group-hover:scale-105 group-hover:shadow-3xl transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentMovieIndex ? "bg-red-500 scale-125" : "bg-white/50 hover:bg-white/80 hover:scale-110"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

Banner.propTypes = {
  movies: PropTypes.array,
};

export default Banner;