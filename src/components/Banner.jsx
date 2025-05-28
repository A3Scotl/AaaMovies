const Banner = () => {
  const img =
    "https://images.unsplash.com/photo-1748383718257-f92ee93eac10?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div
      className="w-full bg-black bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url(${img})`,
        height: "100vh",
        minHeight: "600px",
      }}
    >
      <div className="w-full h-full bg-black/40 absolute inset-0" />

      <div className="flex flex-col lg:flex-row items-center justify-between absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl mx-auto px-4 lg:px-10">
        <div className="w-full lg:w-1/2 z-10">
          <div className="flex flex-col space-y-4 lg:space-y-6 items-start text-center lg:text-left">
            <div className="flex flex-col space-y-3 lg:space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                <p className="text-red-500 text-3xl">AaaMovies</p>
                <span className="text-white">Movie name </span>
              </h1>
              <div className="flex items-center justify-center lg:justify-start space-x-2 flex-wrap gap-2">
                <span className="bg-white text-black px-3 py-1 text-xs font-semibold">
                  HD
                </span>
                <span className="bg-white text-black px-3 py-1 text-xs font-semibold">
                  2019
                </span>
                <span className="text-white text-sm">Action, Drama</span>
              </div>
            </div>

            <div className="flex items-center space-x-3 lg:space-x-5">
              <button className="flex items-center space-x-2 py-3 px-6 border-2 bg-red-500 text-white hover:bg-white hover:text-red-900 cursor-pointer transition-colors rounded-full text-sm lg:text-base font-semibold">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span>PLAY NOW</span>
              </button>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center mt-8 lg:mt-0 z-10">
          <div className="w-[250px] h-[350px] lg:w-[300px] lg:h-[400px] relative group">
            <button className="w-full h-full absolute top-0 left-0 flex items-center justify-center backdrop-blur-sm bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out rounded-lg">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-red-600 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 lg:w-8 lg:h-8 text-white ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
            <img
              src={img}
              alt="banner"
              className="object-cover w-full h-full rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
