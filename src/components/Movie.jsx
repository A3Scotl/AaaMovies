const moviesData = [
  {
    title: "Free Guy",
    year: 2023,
    rating: 6.8,
    duration: "1h 55m",
    poster:
      "https://ophim17.cc/_next/image?url=https%3A%2F%2Fimg.ophim.live%2Fuploads%2Fmovies%2Ftrong-chung-ta-co-ke-noi-doi-phan-2-thumb.jpg&w=384&q=75",
  },
  {
    title: "Veerappan",
    year: 2023,
    rating: 7.0,
    duration: "1h 52m",
    poster:
      "https://ophim17.cc/_next/image?url=https%3A%2F%2Fimg.ophim.live%2Fuploads%2Fmovies%2Ftrong-chung-ta-co-ke-noi-doi-phan-2-thumb.jpg&w=384&q=75",
  },
  {
    title: "M.S. Dhoni: The Untold Story",
    year: 2023,
    rating: 7.0,
    duration: "1h 54m",
    poster:
      "https://ophim17.cc/_next/image?url=https%3A%2F%2Fimg.ophim.live%2Fuploads%2Fmovies%2Ftrong-chung-ta-co-ke-noi-doi-phan-2-thumb.jpg&w=384&q=75",
  },
  {
    title: "M.S. Dhoni: The Untold Story",
    year: 2023,
    rating: 7.0,
    duration: "1h 54m",
    poster:
      "https://ophim17.cc/_next/image?url=https%3A%2F%2Fimg.ophim.live%2Fuploads%2Fmovies%2Ftrong-chung-ta-co-ke-noi-doi-phan-2-thumb.jpg&w=384&q=75",
  },
   {
    title: "M.S. Dhoni: The Untold Story",
    year: 2023,
    rating: 7.0,
    duration: "1h 54m",
    poster:
      "https://ophim17.cc/_next/image?url=https%3A%2F%2Fimg.ophim.live%2Fuploads%2Fmovies%2Ftrong-chung-ta-co-ke-noi-doi-phan-2-thumb.jpg&w=384&q=75",
  },
 
];

function Movie({ title, year, rating, duration, poster }) {
  return (
    <div
      className="card bg-dark text-light h-100 border-0 shadow-sm"
      style={{
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        cursor: "pointer",
        width: '100%', 
        maxWidth: '290px',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 8px 16px rgba(255, 255, 255, 0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <img
        src={poster}
        className="card-img-top"
        alt={title}
        style={{ height: "390px", objectFit: "cover", borderRadius: "8px 8px 0 0" }}
      />
      <div className="card-body p-2 d-flex flex-column gap-2 bg-black">
        <div className="d-flex justify-content-between align-items-center gap-2" style={{ height: 50 }}>
          <p
            className="d-flex align-items-center mb-0 text-white"
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {title}
          </p>
          <p className="d-flex align-items-center mb-0" style={{ color: "#CCFF00", fontSize: "12px" }}>
            {year}
          </p>
        </div>
        <div className="d-flex justify-content-between">
          <p
            className="card-text btn custom-btn border border-1 px-1 mb-0"
            style={{ width: "fit-content", fontSize: "10px", color: "#CCFF00" }}
          >
            HD
          </p>
          <div className="d-flex justify-content-evenly align-items-center gap-3">
            <p className="mb-0 text-white" style={{ fontSize: "12px" }}>
              {duration}
            </p>
            <p className="mb-0" style={{ color: "#CCFF00", fontSize: "12px" }}>
              ★ {rating}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Movie;
export { moviesData };