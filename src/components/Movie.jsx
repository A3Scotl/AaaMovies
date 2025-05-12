const moviesData = [
  {
    title: "Free Guy",
    year: 2023,
    rating: 6.8,
    duration: "1h 55m",
    poster: "https://ophim17.cc/_next/image?url=https%3A%2F%2Fimg.ophim.live%2Fuploads%2Fmovies%2Ftrong-chung-ta-co-ke-noi-doi-phan-2-thumb.jpg&w=384&q=75",
  },
  {
    title: "Veerappan",
    year: 2023,
    rating: 7.0,
    duration: "1h 52m",
    poster: "https://ophim17.cc/_next/image?url=https%3A%2F%2Fimg.ophim.live%2Fuploads%2Fmovies%2Ftrong-chung-ta-co-ke-noi-doi-phan-2-thumb.jpg&w=384&q=75",
  },
  {
    title: "M.S. Dhoni: The Untold Story",
    year: 2023,
    rating: 7.0,
    duration: "1h 54m",
    poster: "https://ophim17.cc/_next/image?url=https%3A%2F%2Fimg.ophim.live%2Fuploads%2Fmovies%2Ftrong-chung-ta-co-ke-noi-doi-phan-2-thumb.jpg&w=384&q=75",
  },
  {
    title: "Liger",
    year: 2023,
    rating: 4.5,
    duration: "2h 19m",
    poster: "https://ophim17.cc/_next/image?url=https%3A%2F%2Fimg.ophim.live%2Fuploads%2Fmovies%2Ftrong-chung-ta-co-ke-noi-doi-phan-2-thumb.jpg&w=384&q=75",
  },
  {
    title: "Liger",
    year: 2023,
    rating: 4.5,
    duration: "2h 19m",
    poster: "https://ophim17.cc/_next/image?url=https%3A%2F%2Fimg.ophim.live%2Fuploads%2Fmovies%2Ftrong-chung-ta-co-ke-noi-doi-phan-2-thumb.jpg&w=384&q=75",
  },
  {
    title: "Liger",
    year: 2023,
    rating: 4.5,
    duration: "2h 19m",
    poster: "https://ophim17.cc/_next/image?url=https%3A%2F%2Fimg.ophim.live%2Fuploads%2Fmovies%2Ftrong-chung-ta-co-ke-noi-doi-phan-2-thumb.jpg&w=384&q=75",
  },
];

function Movie({ title, year, rating, duration, poster }) {
  return (
    <div
      className="card bg-dark text-light h-100 border-0 shadow-sm"
      style={{
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
        e.currentTarget.style.boxShadow = '0 8px 16px rgba(255, 255, 255, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <img
        src={poster}
        className="card-img-top"
        alt={title}
        style={{  objectFit: 'cover', borderRadius: '8px 8px 0 0' }}
      />
      <div className="card-body">
        <h5 className="card-title mb-2" style={{height:50}}>{title}</h5>
        <p className="card-text mb-1">{year}</p>
         <p className="card-text mb-1 border border-1 p-1" style={{color:'#CCFF00',width:'fit-content',fontSize:"12px"}}>HD</p>
        <p className="card-text mb-1">{duration} </p>
        <p className="card-text" style={{color:'#CCFF00'}}>★ {rating} </p>
      </div>
    </div>
  );
}

export default Movie;
export { moviesData };