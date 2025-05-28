
import React, { useState, useEffect } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 p-4 flex justify-between items-center w-full px-4 lg:px-10 ${
      isScrolled ? 'bg-black' : 'bg-black/20'
    }`}>
      <h1 className="text-xl md:text-2xl lg:text-[30px] uppercase font-bold text-red-600">
        AaaMovies
      </h1>
      
      {/* Desktop Navigation */}
      <div className="hidden lg:flex text-[20px] gap-5 items-center space-x-4">
        <a href="" className="font-light uppercase text-white hover:text-red-900 transition-colors">
          Home
        </a>
        <a href="" className="font-light uppercase text-white hover:text-red-900  transition-colors">
          Movie
        </a>
        <a href="" className="font-light uppercase text-white hover:text-red-900 transition-colors">
          TV Show
        </a>
        <a href="" className="font-light uppercase text-white hover:text-red-900 transition-colors">
          Web Series
        </a>
      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden">
        <button className="text-white p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <div className="hidden lg:flex space-x-4 items-center">
        <button
          type="submit"
          className="p-2.5 text-sm font-bold text-white hover:text-red-500 transition-colors"
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Search</span>
        </button>
        <a href="" className="p-2 px-5 border-red-700 bg-red-700 text-white rounded-3xl border-2 hover:bg-red-900 transition-colors text-sm">
          SIGN-UP
        </a>
      </div>
    </div>
  );
};
export default Header;
