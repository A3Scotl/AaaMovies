import React, { useState, useRef, useEffect } from "react";

const SearchBar = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    setIsTyping(e.target.value.length > 0);
  };

  if (!isOpen) return null;

  return (
    <div>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-gradient-to-br from-black/70 via-gray-900/60 to-black/80 backdrop-blur-lg z-50 transition-all duration-500"
        onClick={onClose}
      />
      
      {/* Search Container */}
      <div className="fixed top-0 left-0 right-0 z-50 pt-16 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Search Card */}
          <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95 backdrop-blur-xl rounded-3xl border border-red-500/30 shadow-2xl shadow-red-500/10 p-8 transition-all duration-500 scale-100 opacity-100 hover:shadow-red-500/20">
            
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-blue-500/5 rounded-3xl pointer-events-none" />

            <div className="relative z-10">
              {/* Search Input */}
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-pink-500/10 to-red-500/20 rounded-2xl blur-sm opacity-50" />
                <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-white/10 focus-within:border-red-400/50 transition-all duration-300 hover:bg-gray-700/50">
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchQuery}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                      handleKeyDown(e);
                      if (e.key === 'Enter') {
                        handleSubmit(e);
                      }
                    }}
                    placeholder="Enter movie title, actor, or genre..."
                    className="w-full px-8 py-6 pr-20 bg-transparent text-white placeholder-gray-400 text-lg focus:outline-none"
                  />
                  
                  <button
                    type="submit"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-red-500/25"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>

                <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-red-500 to-pink-500 transition-all duration-300 ${isTyping ? 'w-full' : 'w-0'}`} />
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-3 bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/10 hover:border-red-500/30"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Keyboard Hint */}
          <div className="text-center mt-6 space-y-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900/50 backdrop-blur-sm rounded-full border border-white/10">
              <span className="text-gray-400 text-sm">Press</span>
              <kbd className="px-3 py-1 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-lg text-xs font-mono border border-gray-600 shadow-inner">ESC</kbd>
              <span className="text-gray-400 text-sm">to close</span>
            </div>
          </div>

          {/* Optional hint */}
          <div className="mt-4 text-center">
            <p className="text-gray-500 text-xs">
              💡 Tip: You can search by movie title, actor, director, or genre.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
