import React from "react";
import Banner from "../components/Banner";
import MovieList from "../components/MovieList";

function Home() {
  return (
    <div className="bg-green-100">
        <Banner />
        <MovieList title={'Hot Movies'}/>
        <MovieList title={'New Movies'}/>
    </div>
  );
}

export default Home;
