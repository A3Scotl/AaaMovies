import React from "react";
import Banner from "../components/Banner";
import SectionMovieList from "../components/SectionMovieList";

function Home() {
  return (
    <>
      <div style={{ height: "100vh", backgroundColor: "black" }}>
        <Banner />
      </div>
      <div style={{ height: "100vh", backgroundColor: "black" }}>
         <SectionMovieList />
      </div>
    </>
  );
}

export default Home;
