import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import LoadingSpinner from "./LoadingSpinner";
import {getMovieById} from "../apis/movie.api"
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 2,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1200 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 1200, min: 600 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 2,
  },
};

const MovieList = ({ title, movies }) => {
  const navigate = useNavigate();

  const handleMovieClick = async (movie) => {
    const data = await getMovieById(movie.movieId);
    navigate(`/movie/${movie.movieId}`, { 
      state: { movie : data.data } 
    });
  };

  return (
    <div className="my-10 px-10 max-w-full bg-black p-3">
      <h2 className="text-xl uppercase mb-4 text-white">{title}</h2>
      <Carousel responsive={responsive} draggable={false}>
        {movies.map((movie) => (
          <div
            key={movie.movieId}
            onClick={() => handleMovieClick(movie)} 
            className="bg-cover bg-no-repeat bg-center w-[200px] h-[300px] relative hover:scale-110 transition-transform duration-500 ease-in-out cursor-pointer mx-2"
            style={{
              backgroundImage: `url(${movie.thumbnail})`,
            }}
          >
            <div className="bg-black w-full h-full opacity-40 absolute top-0 left-0 z-0" />
            <div className="relative p-4 flex flex-col items-center justify-end h-full text-white">
              <h3 className="text-md font-bold uppercase text-center">
                {movie.title}
              </h3>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

MovieList.propTypes = {
  title: PropTypes.string.isRequired,
  movies: PropTypes.array.isRequired,
};

export default MovieList;