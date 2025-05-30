import PropTypes from "prop-types";
import Slider from "react-slick";

import MovieItem from "./MovieItem";

// Custom Arrow Components
const CustomPrevArrow = ({ onClick }) => (
  <button
    className="absolute cursor-pointer left-2 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white rounded-full p-3 transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/20"
    onClick={onClick}
    aria-label="Previous movies"
  >
    <svg 
      className="w-5 h-5" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M15 19l-7-7 7-7" 
      />
    </svg>
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button
    className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white rounded-full p-3 transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/20"
    onClick={onClick}
    aria-label="Next movies"
  >
    <svg 
      className="w-5 h-5" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M9 5l7 7-7 7" 
      />
    </svg>
    </button>
);

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
      
      <style jsx global>{`
        .movie-slider .slick-slide {
          padding: 0 4px;
          transition: all 0.3s ease;
        }
        
        .movie-slider .slick-track {
          display: flex;
          align-items: center;
        }
        
        .movie-slider .slick-slide > div {
          height: 100%;
        }
        
        .movie-slider .slick-prev,
        .movie-slider .slick-next {
          display: none !important;
        }
        
      `}</style>
      
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