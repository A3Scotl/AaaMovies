import PropTypes from "prop-types";
import Slider from "react-slick";

import MovieItem from "./MovieItem";

const HorizontalMovieList = ({ title, movies }) => {
  // Cấu hình cho react-slick
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true,
    centerPadding: "60px",
    initialSlide: 0,
    lazyLoad: "ondemand",

    responsive: [
      {
        breakpoint: 4000,
        settings: {
          slidesToShow: 5,
          centerPadding: "80px",
        },
      },
      {
        breakpoint: 3000,
        settings: {
          slidesToShow: 5,
          centerPadding: "70px",
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          centerPadding: "50px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          centerPadding: "40px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerPadding: "20%",
        },
      },
    ],
  };

  return (
    <div className="my-10 px-4 sm:px-6 lg:px-10 max-w-full bg-black py-3">
      <h2 className="text-2xl font-bold uppercase mb-6 text-white px-2">
        {title}
      </h2>
      <Slider {...settings}>
        {movies.map((movie) => (
          <div key={movie.movieId} className="px-2">
            <MovieItem movie={movie} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

HorizontalMovieList.propTypes = {
  title: PropTypes.string.isRequired,
  movies: PropTypes.array.isRequired,
};

export default HorizontalMovieList;
