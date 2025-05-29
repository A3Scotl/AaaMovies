import React from 'react';
import { Play, Heart, Bookmark, Share2, Star, Calendar, Eye } from 'lucide-react';

// Hero Section Component
const MovieHero = ({ movie, onEpisodeSelect }) => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${movie.poster})` }}
      />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Poster */}
          <div className="flex-shrink-0 mx-auto lg:mx-0">
            <img 
              src={movie.poster} 
              alt={movie.title}
              className="w-64 md:w-80 rounded-lg shadow-2xl"
            />
          </div>
          
          {/* Movie Info */}
          <div className="flex-1 text-white text-center lg:text-left">
            <h1 className="text-3xl md:text-5xl font-bold mb-2">{movie.title}</h1>
            <h2 className="text-xl md:text-2xl text-gray-300 mb-4">{movie.originName}</h2>
            
            {/* Movie Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-6">
              <span className="flex items-center gap-1 bg-yellow-600 px-3 py-1 rounded-full text-sm">
                <Star className="w-4 h-4" />
                {movie.averageRating || 'N/A'}
              </span>
              <span className="flex items-center gap-1 bg-blue-600 px-3 py-1 rounded-full text-sm">
                <Calendar className="w-4 h-4" />
                {movie.releaseYear}
              </span>
              <span className="flex items-center gap-1 bg-green-600 px-3 py-1 rounded-full text-sm">
                <Eye className="w-4 h-4" />
                {movie.view.toLocaleString()} view
              </span>
              <span className="bg-red-600 px-3 py-1 rounded-full text-sm">
                {movie.quality}
              </span>
              <span className="bg-purple-600 px-3 py-1 rounded-full text-sm">
                {movie.lang}
              </span>
            </div>
            
            {/* Description */}
            <p className="text-gray-300 text-sm md:text-base mb-8 max-w-2xl">
              {movie.description}
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
              <button 
                onClick={() => onEpisodeSelect(movie.episodes[0])}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                <Play className="w-5 h-5" />
                Watch Now
              </button>
              <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-semibold transition-colors">
                <Heart className="w-5 h-5" />
                Like
              </button>
              <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-semibold transition-colors">
                <Bookmark className="w-5 h-5" />
                Save
              </button>
              <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-semibold transition-colors">
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MovieHero;