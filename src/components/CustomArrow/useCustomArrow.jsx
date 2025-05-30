export const CustomPrevArrow = ({ onClick }) => (
  <button
    className="absolute cursor-pointer left-2 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white rounded-full p-3 transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/20"
    onClick={onClick}
    aria-label="Previous movies"
  >
    <svg 
      className="w-5 h-5" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M15 19l-7-7 7-7" 
      />
    </svg>
  </button>
);
export const CustomNextArrow = ({ onClick }) => (
  <button
    className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white rounded-full p-3 transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/20"
    onClick={onClick}
    aria-label="Next movies"
  >
    <svg 
      className="w-5 h-5" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M9 5l7 7-7 7" 
      />
    </svg>
    </button>
);
