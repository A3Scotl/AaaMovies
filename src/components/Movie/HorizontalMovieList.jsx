import PropTypes from "prop-types";
import Slider from "react-slick";

import MovieItem from "./MovieItem";

import {CustomNextArrow,CustomPrevArrow }  from "../CustomArrow/useCustomArrow";

const HorizontalMovieList = ({ title, movies }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 4000,
    centerMode: true, 
    initialSlide: 0,
    lazyLoad: "ondemand",
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    
    responsive: [
      {
        breakpoint: 4000,
        settings: {
          slidesToShow: 9, 
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 3000,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="my-8 px-4 sm:px-6 lg:px-8 max-w-full bg-black py-6 relative">
      <h2 className="text-2xl font-bold uppercase mb-6 text-white px-2 tracking-wide">
        {title}
      </h2>
      
      <div className="movie-slider">
        <Slider {...settings}>
          {movies.map((movie) => (
            <div key={movie.movieId} className="px-1">
              <div className="movie-item-wrapper max-w-[200px] mx-auto transform transition-all duration-300 hover:scale-105">
                <MovieItem movie={movie} />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

HorizontalMovieList.propTypes = {
  title: PropTypes.string.isRequired,
  movies: PropTypes.array.isRequired,
};

CustomPrevArrow.propTypes = {
  onClick: PropTypes.func,
};

CustomNextArrow.propTypes = {
  onClick: PropTypes.func,
};

export default HorizontalMovieList;