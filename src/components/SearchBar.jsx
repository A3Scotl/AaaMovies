import React, { useState, useRef, useEffect } from "react";
import { searchMovies } from "../apis/movie.api";
import LoadingSpinner from "./LoadingSpinner";
import { useNavigate } from "react-router-dom";
const SearchBar = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const results = await searchMovies(query);
      setSearchResults(results);
    } catch (err) {
      console.error("Error during search:", err);
      setError("Failed to fetch search results. Please try again.");
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };
  const navigateToMovie = (movie, isWatching) => {
    if (!movie?.movieId) {
      console.error("Movie ID is undefined:", movie);
      return;
    }
    navigate(`/movie/${movie.movieId}`, { state: { movieId:movie.movieId,isWatching } });
    console.log(movie);
    onClose();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setIsTyping(query.length > 0);

    if (query.trim().length > 2) {
      handleSearch(query);
    } else {
      setSearchResults([]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 top-12">
      {/* Simple backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Search Container */}
      <div className="relative flex items-start justify-center min-h-screen pt-20 px-4">
        <div className="w-full max-w-3xl">
          {/* Search Card */}
          <div className="bg-gray-900 border border-red-500/30 rounded-lg shadow-2xl p-6 relative">
            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                Movie Search
              </h2>
            </div>

            {/* Search Input */}
            <div className="relative mb-6">
              <div className="relative bg-black/50 rounded-lg border border-gray-700 focus-within:border-red-500 transition-colors duration-200">
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter movie title, actor, or genre..."
                  className="w-full px-4 py-3 pr-14 bg-transparent text-white placeholder-gray-500 focus:outline-none"
                />

                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors duration-200"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>

              {/* Typing indicator */}
              <div
                className={`absolute bottom-0 left-0 h-0.5 bg-red-500 transition-all duration-300 ${
                  isTyping ? "w-full" : "w-0"
                }`}
              />
            </div>

            {/* Loading */}
            {isLoading && (
              <div className="text-center py-6">
                <LoadingSpinner />
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="text-center py-4">
                <p className="text-red-400 bg-red-500/10 border border-red-500/30 rounded px-4 py-2 inline-block">
                  {error}
                </p>
              </div>
            )}

            {/* Search Results */}
            {!isLoading && !error && searchResults.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-lg font-semibold text-white">
                    Search Results
                  </h3>
                  <span className="px-2 py-1 bg-red-600 text-white font-bold text-xs rounded">
                    {searchResults.length}
                  </span>
                </div>

                <div className="max-h-80 overflow-y-auto space-y-3">
                  {searchResults.map((movie) => (
                    <div
                      key={movie._id}
                      onClick={() => navigateToMovie(movie, false)}
                      className="flex items-center p-3 bg-black/30 border border-gray-800 rounded-lg hover:border-red-500/50 hover:bg-black/50 transition-all duration-200 cursor-pointer"
                    >
                      {movie.thumbnail && (
                        <img
                          src={movie.thumbnail}
                          alt={movie.title}
                          className="w-12 h-16 object-cover rounded mr-3"
                        />
                      )}
                      <div className="flex-1">
                        <h4 className="text-white font-medium hover:text-red-400 transition-colors">
                          {movie.title}
                        </h4>
                        {movie.releaseYear && (
                          <p className="text-white text-sm font-bold">{movie.releaseYear}</p>
                        )}
                        {movie.quality && (
                          <p className="text-white text-xs font-bold">
                            {movie.quality}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No results */}
            {!isLoading &&
              !error &&
              searchResults.length === 0 &&
              searchQuery.trim().length > 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-400">
                    No results found for "{searchQuery}"
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    Try different keywords
                  </p>
                </div>
              )}

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute cursor-pointer bg-black top-4 right-4 p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-all duration-200"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Simple Keyboard Hint */}
          <div className="text-center mt-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900/80 border border-gray-700 rounded-full">
              <span className="text-gray-400 text-sm">Press</span>
              <kbd className="px-2 py-1 bg-gray-800 text-white rounded text-xs border border-gray-600">
                ESC
              </kbd>
              <span className="text-gray-400 text-sm">to close</span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar */}
      <style jsx>{`
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #dc2626;
          border-radius: 3px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #b91c1c;
        }
      `}</style>
    </div>
  );
};

export default SearchBar;
