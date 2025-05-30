import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import HorizontalMovieList from "../components/HorizontalMovieList";
import { getAllNewMovies, getAllHotMovies } from "../apis/movie.api";

function Home() {
  const [hotMovies, setHotMovies] = useState([]);
  const [newMovies, setNewMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Fetch hot movies
        const hotMoviesData = await getAllHotMovies();
        setHotMovies(hotMoviesData); 

        // Fetch new movies
        const newMoviesData = await getAllNewMovies();
        setNewMovies(newMoviesData); 

      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };

    fetchMovies();
  }, []);


  return (
    <div className="bg-black">
      <Banner movies={newMovies} />
      <HorizontalMovieList title="Hot Movies" movies={hotMovies} />
      <HorizontalMovieList title="New Movies" movies={newMovies} />
    </div>
  );
}

export default Home;