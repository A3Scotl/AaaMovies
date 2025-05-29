import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import LoadingSpinner from "./LoadingSpinner";
import { getCategoryById } from "../apis/category.api";
const Banner = ({ movies }) => {
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentGenres, setCurrentGenres] = useState([]);

  const intervalRef = useRef(null);
  const currentMovie = movies?.[currentMovieIndex];

  // Caching category calls
  const categoryCache = useRef({});

  useEffect(() => {
    if (!movies || movies.length === 0) return;
    // Setup interval for banner switch
    intervalRef.current = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentMovieIndex((prevIndex) =>
          prevIndex === movies.length - 1 ? 0 : prevIndex + 1
        );
        setIsTransitioning(false);
      }, 50);
    }, 5000);

    return () => clearInterval(intervalRef.current);
  }, [movies]);

  useEffect(() => {
    if (currentMovie) {
      fetchGenres(currentMovie);
    }
  }, [currentMovie]);

  const fetchGenres = async (movie) => {
    if (!movie?.categoryIds) {
      setCurrentGenres(["Unknown"]);
      return;
    }

    const genreNames = await Promise.all(
      movie.categoryIds.map(async (id) => {
        if (categoryCache.current[id]) return categoryCache.current[id];
        const res = await getCategoryById(id);
        categoryCache.current[id] = res.name;
        return res.name;
      })
    );

    setCurrentGenres(genreNames);
  };

  if (!movies || movies.length === 0 || !currentMovie) {
    return (
      <div
        className="w-full bg-black flex items-center justify-center"
        style={{ height: "100vh", minHeight: "600px" }}
      >
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div
      className="w-full relative overflow-hidden"
      style={{ height: "100vh", minHeight: "600px" }}
    >
      {/* Background */}
      <div
        className={`absolute inset-0 bg-black bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-out ${
          isTransitioning
            ? "transform translate-x-full opacity-0"
            : "transform translate-x-0 opacity-100"
        }`}
        style={{
          backgroundImage: `url(${currentMovie.poster})`,
        }}
      >
        <div className="w-full h-full bg-black/60 absolute inset-0" />
      </div>

      {/* Main Content Container - Properly Centered */}
      <div className="absolute inset-0 flex items-center justify-center px-4 lg:px-10 z-20">
        <div
          className={`w-full max-w-7xl mx-auto transition-all duration-1000 ease-out ${
            isTransitioning
              ? "transform translate-x-full opacity-0"
              : "transform translate-x-0 opacity-100"
          }`}
        >
          {/* Content Layout */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            {/* Text Content - Left Side */}
            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="space-y-6">
                {/* Title Section */}
                <div className="space-y-4">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                    <p className="text-red-500 text-2xl md:text-3xl lg:text-4xl mb-2">
                      AaaMovies
                    </p>
                    <span className="text-white block">
                      {currentMovie.title}
                    </span>
                  </h1>

                  {/* Movie Info Tags */}
                  <div className="flex items-center justify-center lg:justify-start space-x-3 flex-wrap gap-2">
                    {currentMovie.releaseYear && (
                      <span className=" text-white font-bold border-4 border-white bg-white/30 px-4 py-2 text-sm font-semibold rounded-full transform transition-all duration-300 hover:scale-105">
                        {currentMovie.releaseYear}
                      </span>
                    )}
                    <span className=" border-4 font-bold border-white bg-white/30 text-white px-4 py-2 text-sm font-semibold rounded-full transform transition-all duration-300 hover:scale-105">
                      {currentMovie.quality}
                    </span>
                    <span className="text-white text-sm font-bold border-4 border-white bg-white/30 px-4 py-2 rounded-full backdrop-blur-sm">
                      {currentGenres.join(", ")}
                    </span>
                  </div>
                </div>

                {/* Play Button */}
                <div className="flex justify-center lg:justify-start gap-4">
                  <button className="flex items-center p-5 border-2 bg-red-500 text-white hover:bg-white hover:text-red-900 cursor-pointer transition-all duration-300 rounded-full text-base lg:text-lg font-semibold transform hover:scale-105 hover:shadow-xl">
                    <svg
                      className="w-6 h-6 transition-transform duration-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                  <button className="flex items-center p-5 border-2 bg-black text-white hover:bg-white hover:text-red-900 cursor-pointer transition-all duration-300 rounded-full text-base lg:text-lg font-semibold transform hover:scale-105 hover:shadow-xl">
                    <svg
                      className="w-6 h-6 transition-transform duration-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10
             10-4.48 10-10S17.52 2 12 2zm0 17
             c-.55 0-1-.45-1-1v-6c0-.55.45-1
             1-1s1 .45 1 1v6c0 .55-.45 1-1 1zm0-10
             c-.83 0-1.5-.67-1.5-1.5S11.17 6
             12 6s1.5.67 1.5 1.5S12.83 9
             12 9z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Movie Poster - Right Side - Hidden on mobile/tablet, visible only on laptop+ */}
            <div className="hidden lg:flex w-full lg:w-1/2 items-center justify-center">
              <div className="w-[280px] h-[380px] lg:w-[320px] lg:h-[420px] relative group">
                {/* Play button overlay */}
                <button className="w-full h-full absolute top-0 left-0 p-2 flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out rounded-xl z-10 cursor-pointer">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 bg-red-600 rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 shadow-2xl">
                    <svg
                      className="w-8 h-8 lg:w-10 lg:h-10 text-white ml-1 transition-transform duration-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </button>

                {/* Movie thumbnail */}
                <img
                  src={currentMovie.thumbnail}
                  alt={currentMovie.title}
                  className="object-cover w-full h-full rounded-xl shadow-2xl transform transition-all duration-500 group-hover:scale-105 group-hover:shadow-3xl"
                />

                {/* Decorative border */}
                {/* <div className="absolute -inset-2 bg-gradient-to-r from-red-500 to-purple-600 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10"></div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Movie indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (index !== currentMovieIndex) {
                setIsTransitioning(true);
                setTimeout(() => {
                  setCurrentMovieIndex(index);
                  setIsTransitioning(false);
                }, 50);
              }
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentMovieIndex
                ? "bg-red-500 scale-125"
                : "bg-white/50 hover:bg-white/80 hover:scale-110"
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
