import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import MovieList from "../components/MovieList";
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
        console.log("hotMoviesData", hotMoviesData);

        // Fetch new movies
        const newMoviesData = await getAllNewMovies();
        setNewMovies(newMoviesData); 
        console.log("newMoviesData", newMoviesData);

      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };

    fetchMovies();
  }, []);


  return (
    <div className="bg-black">
      <Banner />
      <MovieList title="Hot Movies" movies={hotMovies} />
      <MovieList title="New Movies" movies={newMovies} />
    </div>
  );
}

export default Home;