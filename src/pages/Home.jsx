import { useEffect, useState, useCallback } from "react";
import Banner from "../components/Banner";
import HorizontalMovieList from "../components/Movie/HorizontalMovieList";
import {
  getAllNewMovies,
  getAllHotMovies,
  getAllSerieMovies,
  getAllSingleMovies,
} from "../apis/movie.api";
import LoadingSpinner from "../components/LoadingSpinner";
import { useToast } from "../components/Toast/ToastContext";

const Home = () => {
  const [hotMovies, setHotMovies] = useState([]);
  const [newMovies, setNewMovies] = useState([]);
  const [singleMovies, setSingleMovies] = useState([]);
  const [serieMovies, setSerieMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { showError, showSuccess, showInfo } = useToast();

  // Fetch all movie data
  useEffect(() => {
    const controller = new AbortController();
    const fetchAllMovieData = async () => {
      try {
        showInfo("Loading latest movies...", 3000);
        setIsLoading(true);
        setError(null);

        const [
          hotMoviesData,
          newMoviesData,
          singleMoviesData,
          serieMoviesData,
        ] = await Promise.all([
          getAllHotMovies({ signal: controller.signal }),
          getAllNewMovies({ signal: controller.signal }),
          getAllSingleMovies({ signal: controller.signal }),
          getAllSerieMovies({ signal: controller.signal }),
        ]);

        setHotMovies(hotMoviesData || []);
        setNewMovies(newMoviesData || []);
        setSingleMovies(singleMoviesData || []);
        setSerieMovies(serieMoviesData || []);

        // showSuccess("Movies loaded successfully!", 3000);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Error fetching movies for Home page:", err);
          const errorMessage =
            "We're sorry, our servers are currently unavailable. Please try again later.";
          setError(errorMessage);
          // showError("Loading failed!", 3000);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllMovieData();
    return () => controller.abort();
  }, [showError, showSuccess, showInfo]);

  const renderMovieLists = useCallback(() => {
    const hasData =
      hotMovies.length > 0 ||
      newMovies.length > 0 ||
      singleMovies.length > 0 ||
      serieMovies.length > 0;

    if (!hasData && !isLoading) {
      return (
        <div className="text-center text-white py-20">
          <h3 className="text-xl font-semibold text-gray-300 mb-2">
            No movies available
          </h3>
          <p className="text-gray-400">
            Please check back later for new content.
          </p>
        </div>
      );
    }

    return (
      <>
        {hotMovies.length > 0 && <Banner movies={hotMovies.slice(10, 15)} />}
        {newMovies.length > 0 && (
          <HorizontalMovieList
            title="New Movies"
            movies={newMovies.slice(0, 8)}
          />
        )}
        {hotMovies.length > 0 && (
          <HorizontalMovieList
            title="Hot Movies"
            movies={hotMovies.slice(0, 8)}
          />
        )}
        {singleMovies.length > 0 && (
          <HorizontalMovieList
            title="Single Movies"
            movies={singleMovies.slice(0, 8)}
          />
        )}
        {serieMovies.length > 0 && (
          <HorizontalMovieList
            title="Series Movies"
            movies={serieMovies.slice(0, 8)}
          />
        )}
      </>
    );
  }, [hotMovies, newMovies, singleMovies, serieMovies, isLoading]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-300 mb-2">
            Unable to Load Content
          </h3>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`
        bg-gradient-to-br from-gray-900 via-black to-gray-900 min-h-screen
        transition-all duration-500 ease-out
        ${isLoading ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}
      `}
    >
      {renderMovieLists()}
    </div>
  );
};

export default Home;
