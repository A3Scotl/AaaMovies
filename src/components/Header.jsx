import React from "react";
import Search from "./Search";

export default function Header() {
  return (
    <header className="fixed-top bg-transparent">
      <nav
        className="navbar navbar-expand-lg "
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
                <a className="nav-link text-white fw-light" href="/movies">
                  MOVIE
                </a>
              </li>
              <li className="nav-item px-2">
                <a className="nav-link text-white fw-light" href="/series">
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

            {/* Sign In */}
            <a href="/signin" className="btn btn-sm custom-btn fw-light">
              SIGN IN
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
