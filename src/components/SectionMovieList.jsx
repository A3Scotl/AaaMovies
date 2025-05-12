import ListMovie from "./ListMovie.jsx";
import { moviesData } from "./Movie.jsx";

function SectionMovieList() {
  return (
    <section className="p-5">
      <nav className="navbar navbar-dark" >
        <div className="container-fluid ">
          {/* <p className="navbar-brand" style={{color:'#CCFF00'}} href="#">ONLINE STREAMING</p> */}
          <div className="navbar-nav ms-auto">
                  

            <a className="nav-link" href="#">See all</a>
          </div>
        </div>
           
      </nav>
      <ListMovie movies={moviesData} />
    </section>
  );
}

export default SectionMovieList;