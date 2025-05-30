import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import HorizontalMovieList from "../components/Movie/HorizontalMovieList";
import { getAllNewMovies, getAllHotMovies, getAllSerieMovies, getAllSingleMovies } from "../apis/movie.api";
import LoadingSpinner from "../components/LoadingSpinner";
import toast, { Toaster } from 'react-hot-toast'; // Import toast and Toaster

function Home() {
  const [hotMovies, setHotMovies] = useState([]);
  const [newMovies, setNewMovies] = useState([]);
  const [singleMovies, setSingleMovies] = useState([]);
  const [serieMovies, setSerieMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllMovieData = async () => {
      try {
        setIsLoading(true);

        // Use Promise.all to fetch all movie types concurrently
        const [hotMoviesData, newMoviesData, singleMoviesData, serieMoviesData] =
          await Promise.all([
            getAllHotMovies(),
            getAllNewMovies(),
            getAllSingleMovies(),
            getAllSerieMovies(),
          ]);

        // Update states after all data is fetched
        setHotMovies(hotMoviesData);
        setNewMovies(newMoviesData);
        setSingleMovies(singleMoviesData);
        setSerieMovies(serieMoviesData);

      } catch (err) {
        console.error("Error fetching movies for Home page:", err);
        // --- Use react-hot-toast to report the error ---
        toast.error("Failed to load movie data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllMovieData();
  }, []);

  // --- Add a conditional class for content transition ---
  const contentClasses = `
    bg-black min-h-screen
    ${isLoading ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}
    transition-all duration-500 ease-out
  `;

  if (isLoading) {
    return (
      // When loading, just show the spinner. The main content will fade in once loaded.
      <div className="flex items-center justify-center min-h-screen bg-black">
        <LoadingSpinner />
        <Toaster /> {/* Toaster component should be rendered somewhere in your app */}
      </div>
    );
  }

  return (
    <div className={contentClasses}> {/* Apply transition classes here */}
      <Toaster /> {/* Toaster component should be rendered somewhere in your app, often at the root */}
      {hotMovies.length > 0 && <Banner movies={hotMovies.slice(10, 15)} />}
      {newMovies.length > 0 && <HorizontalMovieList title="New Movies" movies={newMovies.slice(0, 10)} />}
      {hotMovies.length > 0 && <HorizontalMovieList title="Hot Movies" movies={hotMovies.slice(0, 10)} />}
      {singleMovies.length > 0 && <HorizontalMovieList title="Single Movies" movies={singleMovies.slice(0, 10)} />}
      {serieMovies.length > 0 && <HorizontalMovieList title="Serie Movies" movies={serieMovies.slice(0, 10)} />}
    </div>
  );
}

export default Home;