import React, { useEffect, useState, useMemo, useRef, useCallback } from "react";
import { getAllMovies } from "../apis/movie.api";
import { getAllCategories } from "../apis/category.api";
import { getAllCountries } from "../apis/country.api";
import LoadingSpinner from "../components/LoadingSpinner";
import MovieItem from "../components/Movie/MovieItem";
import MovieFilter from "../components/Movie/MovieFilter";
import { Film } from "lucide-react"; 

const INITIAL_MOVIES_TO_LOAD = 8; 
const MOVIES_LOAD_CHUNK = 8; 
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
  const [displayCount, setDisplayCount] = useState(INITIAL_MOVIES_TO_LOAD); 
  const [isFetchingMore, setIsFetchingMore] = useState(false); 

  // Filter states
  const [filters, setFilters] = useState({
    year: "",
    type: "",
    genre: "",
    country: "",
    sortOrder: "newest",
  });

  // Ref for the "loader" element to observe for infinite scrolling
  const loader = useRef(null);

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

  // Movies currently displayed based on displayCount
  const currentMovies = useMemo(() => {
    return filteredMovies.slice(0, displayCount);
  }, [filteredMovies, displayCount]);

  // Get available years for filters
  const availableYears = useMemo(() => {
    return [...new Set(movies.map((movie) => movie.releaseYear).filter(Boolean))]
      .sort((a, b) => b - a);
  }, [movies]);

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
    setDisplayCount(INITIAL_MOVIES_TO_LOAD);
  };

  // Clear all filters
  const handleClearFilters = () => {
    setFilters({
      year: "",
      type: "",
      genre: "",
      country: "",
      sortOrder: "newest",
    });
    setDisplayCount(INITIAL_MOVIES_TO_LOAD); 
  };

  // Callback for IntersectionObserver to load more movies
  const loadMore = useCallback(() => {
    if (isFetchingMore || displayCount >= filteredMovies.length) return; 

    setIsFetchingMore(true);
    // Simulate API call delay for smoother UX, then update displayCount
    setTimeout(() => {
      setDisplayCount((prevCount) =>
        Math.min(prevCount + MOVIES_LOAD_CHUNK, filteredMovies.length)
      );
      setIsFetchingMore(false);
    }, 500); // Adjust delay as needed
  }, [displayCount, filteredMovies.length, isFetchingMore]);


  // Set up Intersection Observer
  useEffect(() => {
    if (!loader.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          loadMore();
        }
      },
      {
        root: null,
        rootMargin: "200px", 
        threshold: 0.1,
      }
    );

    observer.observe(loader.current);

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [isLoading, loadMore]); 


  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-28 px-6 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-20 ">
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
            countriesOptions,
          }}
        />

        {/* Results Info - Added transition */}
        <div className="mb-6 flex items-center justify-between transition-opacity duration-300 ease-in-out">
          <p className="text-gray-300">
            Showing <span className="text-white font-semibold">{currentMovies.length}</span> of{" "}
            <span className="text-white font-semibold">{filteredMovies.length}</span> movies
          </p>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 mb-8">
          {currentMovies.length > 0 ? (
            <div
              key={`${filters.year}-${filters.type}-${filters.genre}-${filters.country}-${filters.sortOrder}`}
              className="contents transition-opacity duration-500 ease-in-out opacity-100"
            >
              {currentMovies.map((movie) => (
                <MovieItem
                  key={movie.id}
                  movie={movie}
                  className="transition-transform duration-300 ease-in-out hover:scale-105"
                />
              ))}
            </div>
          ) : (
            // "No movies found" message also gets a transition
            <div className="col-span-full transition-opacity duration-300 ease-in-out opacity-100">
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

        {/* Infinite Scroll Loader / Loading indicator */}
        {currentMovies.length < filteredMovies.length && (
          <div ref={loader} className="py-8 text-center">
            {isFetchingMore ? (
              <LoadingSpinner />
            ) : (
              <p className="text-gray-400">Scroll to load more...</p>
            )}
          </div>
        )}

        {/* Removed traditional pagination buttons */}
      </div>
    </div>
  );
};

export default Movies;