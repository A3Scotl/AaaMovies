import React from "react";

export default function Footer() {
  return (
    <footer className="footer text-center bg-black py-5">
      <div className="container py-5">
        <div className="footer-disclaimer mb-4 fw-light text-white">
          <p>
            AaaMovies is an online movie streaming platform that offers content for entertainment purposes.
            We have a vast collection of movies and series for your viewing pleasure.
            Some content may not be available in certain regions, so you might need to use VPN services.
            Please ensure you comply with your local copyright laws when using our service.
          </p>
        </div>
        
        <div className="footer-links">
          <nav className="footer-nav">
            <ul className="nav justify-content-center fw-light">
              <li className="nav-item ">
                <a href="/" className="nav-link  text-white">About us</a>
              </li>
              <li className="nav-item">
                <a href="/" className="nav-link  text-white">Blog</a>
              </li>
              <li className="nav-item">
                <a href="/" className="nav-link  text-white">Contact</a>
              </li>

              <li className="nav-item">
                <a href="/" className="nav-link  text-white">Report broken links</a>
              </li>
              <li className="nav-item">
                <a href="/" className="nav-link  text-white">Disclaimer</a>
              </li>
            </ul>
          </nav>
        </div>
        
        <div className="copyright text-center mt-4 fw-light">
          <p>© {new Date().getFullYear()} AaaMovies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}