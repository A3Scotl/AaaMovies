import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import HorizontalMovieList from "../components/Movie/HorizontalMovieList";
import { getAllNewMovies, getAllHotMovies,getAllSerieMovies,getAllSingleMovies } from "../apis/movie.api";

function Home() {
  const [hotMovies, setHotMovies] = useState([]);
  const [newMovies, setNewMovies] = useState([]);
  const [singleMovies, setSingleMovies] = useState([]);
  const [serieMovies, setSerieMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Fetch hot movies
        const hotMoviesData = await getAllHotMovies();
        setHotMovies(hotMoviesData); 

        // Fetch new movies
        const newMoviesData = await getAllNewMovies();
        setNewMovies(newMoviesData); 

                // Fetch hot movies
        const singleMoviesData = await getAllSingleMovies();
        setSingleMovies(singleMoviesData); 

        // Fetch new movies
        const serieMoviesData = await getAllSerieMovies();
        setSerieMovies(serieMoviesData); 
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };

    fetchMovies();
  }, []);


  return (
    <div className="bg-black">
      <Banner movies={hotMovies.slice(10,15)} />
      <HorizontalMovieList title="New Movies" movies={newMovies.slice(0,10)} />
      <HorizontalMovieList title="Hot Movies" movies={hotMovies.slice(0,10)} />
      <HorizontalMovieList title="Single Movies" movies={singleMovies.slice(0,10)} />
      <HorizontalMovieList title="Serie Movies" movies={serieMovies.slice(0,10)} />
      
    </div>
  );
}

export default Home;