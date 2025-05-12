import Movie from "./Movie.jsx";
import { Button } from 'react-bootstrap';

function ListMovie({ movies }) {

  return (
    <div className="d-flex justify-content-between align-items-center">
      <div className="row row-cols-1 row-cols-md-5 w-100 ">
        {movies.map((movie, index) => (
          <div key={index} className="col">
            <Movie {...movie} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListMovie;