import React, { useEffect, useState, useMemo } from "react";
import { getAllMovies } from "../apis/movie.api";
import { getAllCategories } from "../apis/category.api";
import { getAllCountries } from "../apis/country.api";
import LoadingSpinner from "../components/LoadingSpinner";
import MovieItem from "../components/Movie/MovieItem";
import MovieFilter from "../components/Movie/MovieFilter";
import { ChevronLeft, ChevronRight, Film } from "lucide-react";

const MOVIES_PER_PAGE = 24;
const MOVIE_TYPES = ["SINGLE", "SERIES"];

const Movies = () => {
  // Data states
  const [movies, setMovies] = useState([]);
  const [genresOptions, setGenresOptions] = useState([]);
  const [countriesOptions, setCountriesOptions] = useState([]);
  const [genreNameToIdMap, setGenreNameToIdMap] = useState({});
  const [countryNameToIdMap, setCountryNameToIdMap] = useState({});
  
  // UI states
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Filter states
  const [filters, setFilters] = useState({
    year: "",
    type: "",
    genre: "",
    country: "",
    sortOrder: "newest"
  });

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);

        const [moviesData, categoriesData, countriesData] = await Promise.all([
          getAllMovies(),
          getAllCategories(),
          getAllCountries(),
        ]);

        // Set display options
        setGenresOptions(categoriesData.map((item) => item.name) || []);
        setCountriesOptions(countriesData.map((item) => item.name) || []);

        // Create name-to-ID mapping for filtering
        const genreMap = categoriesData.reduce((acc, genre) => {
          acc[genre.name] = genre.id;
          return acc;
        }, {});
        setGenreNameToIdMap(genreMap);

        const countryMap = countriesData.reduce((acc, country) => {
          acc[country.name] = country.id;
          return acc;
        }, {});
        setCountryNameToIdMap(countryMap);

        setMovies(moviesData);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Get filtered and sorted movies
  const filteredMovies = useMemo(() => {
    let result = [...movies];

    // Apply filters
    if (filters.year) {
      result = result.filter(
        (movie) => movie.releaseYear && movie.releaseYear.toString() === filters.year
      );
    }

    if (filters.type) {
      result = result.filter((movie) => movie.type === filters.type);
    }

    if (filters.genre) {
      const selectedGenreId = genreNameToIdMap[filters.genre];
      if (selectedGenreId !== undefined) {
        result = result.filter(
          (movie) => movie.categoryIds && movie.categoryIds.includes(selectedGenreId)
        );
      } else {
        result = [];
      }
    }

    if (filters.country) {
      const selectedCountryId = countryNameToIdMap[filters.country];
      if (selectedCountryId !== undefined) {
        result = result.filter(
          (movie) => movie.countryId && movie.countryId === selectedCountryId
        );
      } else {
        result = [];
      }
    }

    // Apply sorting
    switch (filters.sortOrder) {
      case "newest":
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "oldest":
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "mostViewed":
        result.sort((a, b) => b.view - a.view);
        break;
      case "leastViewed":
        result.sort((a, b) => a.view - b.view);
        break;
      case "latestRelease":
        result.sort((a, b) => b.releaseYear - a.releaseYear);
        break;
      case "oldestRelease":
        result.sort((a, b) => a.releaseYear - b.releaseYear);
        break;
      default:
        break;
    }

    return result;
  }, [movies, filters, genreNameToIdMap, countryNameToIdMap]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredMovies.length / MOVIES_PER_PAGE);
  const currentMovies = useMemo(() => {
    const startIndex = (currentPage - 1) * MOVIES_PER_PAGE;
    const endIndex = startIndex + MOVIES_PER_PAGE;
    return filteredMovies.slice(startIndex, endIndex);
  }, [filteredMovies, currentPage]);

  // Get available years
  const availableYears = useMemo(() => {
    return [...new Set(movies.map((movie) => movie.releaseYear).filter(Boolean))]
      .sort((a, b) => b - a);
  }, [movies]);

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Clear all filters
  const handleClearFilters = () => {
    setFilters({
      year: "",
      type: "",
      genre: "",
      country: "",
      sortOrder: "newest"
    });
    setCurrentPage(1);
  };

  // Pagination handlers
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

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-28 px-6 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-20">
      <div className="w-[90vw] mx-auto">

        {/* Filter Component */}
        <MovieFilter
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          options={{
            availableYears,
            movieTypes: MOVIE_TYPES,
            genresOptions,
            countriesOptions
          }}
        />

        {/* Results Info */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-300">
            Showing <span className="text-white font-semibold">{currentMovies.length}</span> of{" "}
            <span className="text-white font-semibold">{filteredMovies.length}</span> movies
          </p>
          {totalPages > 1 && (
            <p className="text-gray-400">
              Page {currentPage} of {totalPages}
            </p>
          )}
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 mb-8">
          {currentMovies.length > 0 ? (
            currentMovies.map((movie) => (
              <MovieItem key={movie.id} movie={movie} />
            ))
          ) : (
            <div className="col-span-full">
              <div className="text-center py-16">
                <Film className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">
                  No movies found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your filters to see more results
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-800 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 px-4 py-3 bg-gray-800 rounded-lg">
              <span className="text-white font-medium">{currentPage}</span>
              <span className="text-gray-400">/</span>
              <span className="text-white font-medium">{totalPages}</span>
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-800 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Movies;