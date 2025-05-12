import React from "react";

const Header = () => {
  return (
    <nav className="navbar position-absolute w-100  navbar-expand-lg custom-navbar py-4">
      <div className="container-fluid px-5">
        <a className="navbar-brand text-white d-flex align-items-center" href="#" style={{width:300}}>
          <div>
            <strong>AaaMovies</strong>
          </div>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse d-flex align-items-center justify-content-between" 
          id="mainNav"
        >
          <div>
          
          </div>
          <ul className="navbar-nav gap-4">
            <li className="nav-item ">
              <a className="nav-link text-white custom-txt" href="#">
                HOME
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white custom-txt" href="#">
                MOVIE
              </a>
            </li>
             <li className="nav-item">
              <a className="nav-link text-white custom-txt" href="#">
                SERIES
              </a>
            </li>

             <li className="nav-item">
              <a className="nav-link text-white custom-txt" href="#">
                PREMIUM
              </a>
            </li>
        
          </ul>
          <div className="justify-content-end d-flex" style={{width:300}}>
 <button className="btn custom-btn rounded-pill btn-sm px-3" >
            <i className="bi bi-person"></i>
            <a className="text-decoration-none fs-6 fw-light text-white px-1"  href="/auth">Login</a>
          </button>
          </div>
         
        </div>
      </div>
    </nav>
  );
};

export default Header;
