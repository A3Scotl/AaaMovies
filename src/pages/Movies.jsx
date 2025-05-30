import { useEffect, useState, useMemo, useRef, useCallback } from "react";
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
  const [error, setError] = useState(null);
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
  const loader = useRef(null);

  // Fetch initial data
  useEffect(() => {
    const controller = new AbortController();
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [moviesData, categoriesData, countriesData] = await Promise.all([
          getAllMovies({ signal: controller.signal }),
          getAllCategories({ signal: controller.signal }),
          getAllCountries({ signal: controller.signal }),
        ]);

        setGenresOptions(categoriesData.map((item) => item.name) || []);
        setCountriesOptions(countriesData.map((item) => item.name) || []);
        setGenreNameToIdMap(
          categoriesData.reduce((acc, genre) => ({ ...acc, [genre.name]: genre.id }), {})
        );
        setCountryNameToIdMap(
          countriesData.reduce((acc, country) => ({ ...acc, [country.name]: country.id }), {})
        );
        setMovies(moviesData || []);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching initial data:", error);
          setError("We’re sorry, our servers are currently unavailable. Please try again later.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
    return () => controller.abort();
  }, []);

  // Filter and sort movies
  const filteredMovies = useMemo(() => {
    const applyFilters = (movie) => {
      if (filters.year && movie.releaseYear?.toString() !== filters.year) return false;
      if (filters.type && movie.type !== filters.type) return false;
      if (filters.genre) {
        const genreId = genreNameToIdMap[filters.genre];
        if (genreId === undefined || !movie.categoryIds?.includes(genreId)) return false;
      }
      if (filters.country) {
        const countryId = countryNameToIdMap[filters.country];
        if (countryId === undefined || movie.countryId !== countryId) return false;
      }
      return true;
    };

    const sortMovies = (movies) => {
      const result = [...movies];
      switch (filters.sortOrder) {
        case "newest":
          return result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        case "oldest":
          return result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        case "mostViewed":
          return result.sort((a, b) => b.view - a.view);
        case "leastViewed":
          return result.sort((a, b) => a.view - b.view);
        case "latestRelease":
          return result.sort((a, b) => b.releaseYear - a.releaseYear);
        case "oldestRelease":
          return result.sort((a, b) => a.releaseYear - b.releaseYear);
        default:
          return result;
      }
    };

    return sortMovies(movies.filter(applyFilters));
  }, [movies, filters, genreNameToIdMap, countryNameToIdMap]);

  const currentMovies = useMemo(() => filteredMovies.slice(0, displayCount), [filteredMovies, displayCount]);

  const availableYears = useMemo(
    () => [...new Set(movies.map((movie) => movie.releaseYear).filter(Boolean))].sort((a, b) => b - a),
    [movies]
  );

  const handleFilterChange = useCallback((filterType, value) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
    setDisplayCount(INITIAL_MOVIES_TO_LOAD);
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters({
      year: "",
      type: "",
      genre: "",
      country: "",
      sortOrder: "newest",
    });
    setDisplayCount(INITIAL_MOVIES_TO_LOAD);
  }, []);

  const loadMore = useCallback(() => {
    if (isFetchingMore || displayCount >= filteredMovies.length) return;
    setIsFetchingMore(true);
    setDisplayCount((prev) => Math.min(prev + MOVIES_LOAD_CHUNK, filteredMovies.length));
    setIsFetchingMore(false);
  }, [isFetchingMore, displayCount, filteredMovies.length]);

  useEffect(() => {
    if (!loader.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && !isFetchingMore) {
          loadMore();
        }
      },
      { root: null, rootMargin: "200px", threshold: 0.1 }
    );

    observer.observe(loader.current);
    return () => loader.current && observer.unobserve(loader.current);
  }, [isLoading, isFetchingMore, loadMore]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-28 px-6 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-28 px-6 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-300 mb-2">Unable to Load Content</h3>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-20">
      <div className="w-[90vw] mx-auto">
        <MovieFilter
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          options={{ availableYears, movieTypes: MOVIE_TYPES, genresOptions, countriesOptions }}
        />
        <div className="mb-6 flex items-center justify-between transition-opacity duration-300 ease-in-out">
          <p className="text-gray-300">
            Showing <span className="text-white font-semibold">{currentMovies.length}</span> of{" "}
            <span className="text-white font-semibold">{filteredMovies.length}</span> movies
          </p>
        </div>
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
            <div className="col-span-full transition-opacity duration-300 ease-in-out opacity-100">
              <div className="text-center py-16">
                <Film className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">No Movies Found</h3>
                <p className="text-gray-500">Try adjusting your filters to see more results</p>
              </div>
            </div>
          )}
        </div>
        {currentMovies.length < filteredMovies.length && (
          <div ref={loader} className="py-8 text-center">
            {isFetchingMore ? (
              <LoadingSpinner />
            ) : (
              <p className="text-gray-400">Scroll to load more...</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Movies;