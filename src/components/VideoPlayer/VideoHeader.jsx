import React from 'react';
import { ArrowLeft, SkipBack, SkipForward } from 'lucide-react';

const VideoHeader = ({ episode, onBack, onEpisodeSelect, nextEpisode, prevEpisode }) => {
  return (
    <div className="absolute top-16 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent p-4">
      <div className="flex items-center justify-between">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full transition-all duration-200 hover:scale-105"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="hidden sm:inline">Back to Movie</span>
        </button>

        {/* Episode Info */}
        {/* <div className="text-center text-white">
          <h3 className="font-bold text-lg">{episode.title}</h3>
          <p className="text-gray-300 text-sm">{episode.duration} minutes</p>
        </div> */}

        {/* Episode Navigation */}
        {/* <div className="flex items-center gap-2">
          {prevEpisode && (
            <button
              onClick={() => onEpisodeSelect(prevEpisode)}
              className="flex items-center gap-1 bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-full text-sm transition-colors"
            >
              <SkipBack className="w-4 h-4" />
              <span className="hidden sm:inline">Prev</span>
            </button>
          )}
          
          {nextEpisode && (
            <button
              onClick={() => onEpisodeSelect(nextEpisode)}
              className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-full text-sm transition-colors"
            >
              <span className="hidden sm:inline">Next</span>
              <SkipForward className="w-4 h-4" />
            </button>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default VideoHeader;