import React from 'react';
import { Play } from 'lucide-react';

const EpisodesGrid = ({ episodes, onEpisodeSelect }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
      {episodes.map((episode) => (
        <button
          key={episode.episodeId}
          onClick={() => onEpisodeSelect(episode)}
          className="group bg-gray-800 hover:bg-gray-700 rounded-lg overflow-hidden transition-colors"
        >
          <div className="relative aspect-video">
            <img 
              src={episode.thumbnail} 
              alt={episode.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-all">
              <Play className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          <div className="p-3">
            <h3 className="text-white font-medium text-sm">{episode.title}</h3>
            <p className="text-gray-400 text-xs">{episode.duration} minius</p>
          </div>
        </button>
      ))}
    </div>
  );
};
export default EpisodesGrid;