import React from "react";
import Search from "./Search";

export default function Header() {
  return (
    <header className="fixed-top ">
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{
          backgroundColor: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(5px)",
        }}
      >
        <div className="container">
          <a className="navbar-brand d-flex d-flex align-items-center" href="/">
            <span className="ms-2 fw-bold fw-light">AaaMovies</span>
          </a>

          <div
            className="collapse navbar-collapse justify-content-center text-white "
            id="navbarNav"
          >
            <ul className="navbar-nav d-flex align-items-center ">
              <li className="nav-item px-2">
                <a className="nav-link text-white fw-light" href="/">
                  HOME
                </a>
              </li>
              <li className="nav-item px-2">
                <a className="nav-link text-white fw-light" href="/movie">
                  MOVIE
                </a>
              </li>
              <li className="nav-item px-2">
                <a className="nav-link text-white fw-light" href="/web-series">
                  WEB SERIES
                </a>
              </li>
              <li className="nav-item px-2">
                <a className="nav-link text-white fw-light" href="/premium">
                  PREMIUM
                </a>
              </li>
            </ul>
          </div>

          <div className="d-flex align-items-center">
            {/* <Search /> */}
            {/* Language */}
            {/* <button className="btn btn-sm m-3 fw-light custom-en-btn">
              EN
            </button> */}

            {/* Sign In */}
            <a href="/signin" className="btn btn-sm custom-signin-btn fw-light">
              SIGN IN
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
