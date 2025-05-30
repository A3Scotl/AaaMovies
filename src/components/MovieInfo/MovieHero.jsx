import React from 'react';
import { Play, Heart, Bookmark, Share2, Star, Calendar, Eye } from 'lucide-react';

const MovieHero = ({ movie, onEpisodeSelect }) => {

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${movie.poster})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-end">

            {/* Movie Poster */}
            <div className="flex-shrink-0 group">
              <div className="relative">
                <img
                  src={movie.thumbnail}
                  alt={movie.title}
                  className=" cursor-pointer w-72 md:w-80 lg:w-96 rounded-2xl shadow-2xl transform transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>

            {/* Movie Information */}
            <div className="flex-1 text-white space-y-6 text-center lg:text-left max-w-3xl">

              {/* Title */}
              <div className="space-y-3">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {movie.title}
                </h1>
                <h2 className="text-xl md:text-2xl lg:text-3xl text-gray-300 font-light">
                  {movie.originName}
                </h2>
              </div>

              {/* Movie Stats */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                <div className="flex items-center  cursor-pointer gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  <Star className="w-4 h-4 fill-current" />
                  {movie.averageRating || "5"}
                </div>
                <div className="flex items-center cursor-pointer gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  <Calendar className="w-4 h-4" />
                  {movie.releaseYear}
                </div>
                <div className="flex items-center  cursor-pointer gap-2 bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  <Eye className="w-4 h-4" />
                  {movie.view.toLocaleString()} view
                </div>
                <div className="bg-gradient-to-r  cursor-pointer from-red-500 to-pink-500 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  {movie.quality}
                </div>
                <div className="bg-gradient-to-r  cursor-pointer from-purple-500 to-indigo-500 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  {movie.lang}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
                <button
                  onClick={() => onEpisodeSelect?.(movie.episodes[0])}
                  className="group  cursor-pointer flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 px-8 py-4 rounded-xl font-bold text-lg shadow-xl transform transition-all duration-200 hover:scale-105 hover:shadow-2xl"
                >
                  <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  Watch Now
                </button>

                <button className="group  cursor-pointer flex items-center gap-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 px-6 py-4 rounded-xl font-semibold transition-all duration-200 hover:scale-105">
                  <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Like
                </button>

                <button className="group  cursor-pointer flex items-center gap-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 px-6 py-4 rounded-xl font-semibold transition-all duration-200 hover:scale-105">
                  <Bookmark className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Save
                </button>

                <button className="group  cursor-pointer flex items-center gap-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 px-6 py-4 rounded-xl font-semibold transition-all duration-200 hover:scale-105">
                  <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Animation Elements */}
      <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-2xl animate-pulse delay-1000" />
    </div>
  );
};

export default MovieHero;