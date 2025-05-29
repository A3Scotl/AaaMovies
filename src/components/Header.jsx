import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const openSearch = () => {
    setIsSearchOpen(true);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? "bg-black/95 backdrop-blur-md shadow-2xl border-b border-red-500/20"
            : "bg-gradient-to-b from-black/60 via-black/40 to-transparent backdrop-blur-sm"
        }`}
      >
        <div className="w-full px-4 lg:px-10 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-br from-red-500/50 to-red-700/50 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300 -z-10"></div>
            </div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-red-500 via-red-400 to-red-600 bg-clip-text text-transparent hover:from-red-400 hover:to-red-500 transition-all duration-300 cursor-pointer">
              AaaMovies
            </h1>
          </div>
          <nav className="hidden lg:flex items-center space-x-8">
            {[
              { label: "Home", href: "/" },
              { label: "Movies", href: "/movies" },
              { label: "TV Shows", href: "/tv-shows" },
              { label: "Web Series", href: "/web-series" },
            ].map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="relative text-white font-medium text-lg transition-all duration-300 hover:text-red-400 group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-red-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4 cursor-pointer">
            {/* Search Button */}
            <button
              onClick={openSearch}
              className="cursor-pointer hidden lg:flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-red-500/80 hover:border-red-400 transition-all duration-300 group"
            >
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* Sign Up Button */}
            <a
              href="#"
              className="hidden lg:flex items-center px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-full border-2 border-transparent hover:from-red-600 hover:to-red-700 hover:border-red-400 transition-all duration-300 shadow-lg hover:shadow-red-500/25 transform hover:scale-105"
            >
              SIGN UP
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden flex items-center justify-center w-10  h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-red-500/80 transition-all duration-300"
            >
              <svg
                className={`w-6 h-6 transition-transform duration-300 ${
                  isMobileMenuOpen ? "rotate-90" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={toggleMobileMenu}
        ></div>

        {/* Menu Content */}
        <div
          className={`absolute top-20 right-4 w-64 bg-gray-900/95 backdrop-blur-md rounded-2xl border border-red-500/20 shadow-2xl transform transition-all duration-500 ${
            isMobileMenuOpen
              ? "translate-x-0 scale-100"
              : "translate-x-full scale-95"
          }`}
        >
          <div className="p-6 space-y-4">
            {/* Mobile Navigation */}
            <nav className="space-y-3">
              {["Home", "Movies", "TV Shows", "Web Series"].map(
                (item, index) => (
                  <a
                    key={index}
                    href="#"
                    className="block text-white font-medium text-lg py-2 px-4 rounded-lg hover:bg-red-500/20 hover:text-red-400 transition-all duration-300"
                    onClick={toggleMobileMenu}
                  >
                    {item}
                  </a>
                )
              )}
            </nav>

            <hr className="border-gray-700" />

            {/* Mobile Actions */}
            <div className="space-y-3 cursor-pointer">
              <button
                onClick={() => {
                  toggleMobileMenu();
                  openSearch();
                }}
                className="cursor-pointer flex items-center justify-center w-full py-3 px-4 bg-white/10 rounded-lg text-white hover:bg-red-500/20 transition-all duration-300"
              >
                <svg
                  className="w-5 h-5 mr-2 cursor-pointer"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Search
              </button>

              <a
                href="#"
                className="flex items-center justify-center w-full py-3 px-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg"
                onClick={toggleMobileMenu}
              >
                SIGN UP
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar Component */}
      <SearchBar isOpen={isSearchOpen} onClose={closeSearch} />
    </>
  );
};

export default Header;
