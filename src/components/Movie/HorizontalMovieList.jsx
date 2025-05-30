// HorizontalMovieList.jsx
import React from "react";
import PropTypes from "prop-types";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// Assuming MovieItem is now imported from its dedicated file
import MovieItem from "./MovieItem"; // Adjust the path if MovieItem is in a different directory relative to HorizontalMovieList

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 6, // Adjusted to 6 for consistency with other breakpoints for movies
  },
  desktop: {
    breakpoint: { max: 3000, min: 1200 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 1200, min: 768 }, // Added a larger tablet breakpoint
    items: 4,
  },
  smallTablet: { // Added a smaller tablet breakpoint
    breakpoint: { max: 768, min: 480 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 480, min: 0 }, // Adjusted mobile breakpoint
    items: 2,
  },
};

const HorizontalMovieList = ({ title, movies }) => {
  return (
    <div className="my-10 px-4 sm:px-6 lg:px-10 max-w-full bg-black py-3"> {/* Adjusted padding */}
      <h2 className="text-2xl font-bold uppercase mb-6 text-white px-2"> {/* Increased font size and padding */}
        {title}
      </h2>
      <Carousel
        responsive={responsive}
        draggable={false}
        // Optional: Add more props for better carousel behavior
        infinite={true}
        autoPlay={false} // Set to true if you want auto-play
        keyBoardControl={true}
        customTransition="all .5s ease-in-out"
        transitionDuration={500}
        containerClass="carousel-container" // Add a class for custom styling if needed
        itemClass="carousel-item-padding-40-px" // For spacing between items
      >
        {movies.map((movie) => (
          <div key={movie.movieId} className="px-2"> {/* Added padding for spacing */}
            <MovieItem
              movie={movie}
              // Here, we provide specific sizing/layout for carousel items
              // The default MovieItem styling should be generic enough
              // that these additional classes adapt it for the carousel.
              // For example, if MovieItem has max-width, it will constrain itself.
              // If not, you might need to add specific width classes here.
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

HorizontalMovieList.propTypes = {
  title: PropTypes.string.isRequired,
  movies: PropTypes.array.isRequired,
};

export default HorizontalMovieList;