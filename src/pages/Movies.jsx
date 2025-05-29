import { useEffect, useState } from "react";
import {  getAllMovies } from "../apis/movie.api";
import LoadingSpinner from "../components/LoadingSpinner";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const moviesPerPage = 32;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const moviesData = await getAllMovies();
        setMovies(moviesData);
        setTotalPages(Math.ceil(moviesData.length / moviesPerPage));
        console.log(moviesData);
      } catch (err) {
        console.error("Error fetching movies:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Get current movies for pagination
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Show loading spinner while fetching data
  if (isLoading) {
    return (
      <div className="min-h-screen text-white py-28 px-12 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white py-36 px-12">
      {/* Header */}
      <div className="mb-6">
        <p className="text-gray-400 text-sm mt-1">All movies</p>
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 mb-8">
        {currentMovies.map((movie, index) => (
          <div
            key={movie.id || index}
            className="relative group cursor-pointer transform transition-all duration-300 hover:scale-105"
          >
            {/* Movie Poster */}
            <div className="relative overflow-hidden rounded-lg bg-gray-800 aspect-[2/3]">
              <img
                src={movie.thumbnail}
                alt={movie.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />

              {/* Quality badge */}
              {movie.quality && (
                <div className="absolute top-2 left-2 bg-yellow-100 text-black text-xs px-2 py-1 rounded font-bold">
                  {movie.quality}
                </div>
                
              )}
              {/* episodeTotal badge
              {movie.episodeTotal >1 && (
                <div className="absolute top-2 left-10 bg-yellow-500 text-black text-xs px-2 py-1 rounded font-bold">
                  {movie.episodeTotal}
                </div>
                
              )} */}

              {/* Year badge */}
              {movie.year && (
                <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
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
                {movie.originName || 'N/A'}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-white font-medium">{currentPage}</span>
          <span className="text-gray-400">:</span>
          <span className="text-white font-medium">{totalPages}</span>
        </div>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Movies;