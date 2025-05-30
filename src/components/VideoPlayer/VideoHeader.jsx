import React from 'react';
import { ArrowLeft} from 'lucide-react';

const VideoHeader = ({ episode, onBack }) => {
  return (
    <div className="absolute top-16 left-4 right-12 z-50 bg-gradient-to-b from-black/80 to-transparent p-4">
      <div className="flex items-start justify-between">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex cursor-pointer items-center gap-2 bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full transition-all duration-200 hover:scale-105"
        >
          <ArrowLeft className="w-5 h-10" />
          <span className="hidden sm:inline">Back to Movie</span>
        </button>

        {/* Episode Info */}
        <div className="text-center text-white ">
          <h3 className="font-bold text-lg text-end w-50 ">{episode.title}</h3>
          <p className="text-gray-300 text-sm text-end">{episode.duration} minutes</p>
        </div>

      </div>
    </div>
  );
};

export default VideoHeader;