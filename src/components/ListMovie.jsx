import { useState } from 'react';
import Movie from "./Movie.jsx";
import { Button } from 'react-bootstrap';

function ListMovie({ movies }) {
  const [startIndex, setStartIndex] = useState(0);
  const moviesPerView = 5;
  const maxStartIndex = movies.length - moviesPerView;

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleNext = () => {
    if (startIndex < maxStartIndex) {
      setStartIndex(startIndex + 1);
    }
  };

  const currentMovies = movies.slice(startIndex, startIndex + moviesPerView);

  return (
    <div className="d-flex w-100 justify-content-between align-items-center">
      <Button
        variant="outline-light"
        onClick={handlePrev}
        disabled={startIndex === 0}
        className="px-3 py-2"
      >
        <span>&lt;</span>
      </Button>
      <div className="row row-cols-1 row-cols-md-5 g-4 p-5 w-100">
        {currentMovies.map((movie, index) => (
          <div key={index} className="col">
            <Movie {...movie} />
          </div>
        ))}
      </div>
      <Button
        variant="outline-light"
        onClick={handleNext}
        disabled={startIndex >= maxStartIndex}
        className="px-3 py-2"
      >
        <span>&gt;</span>
      </Button>
    </div>
  );
}

export default ListMovie;