import React from "react";
import { Play, CheckCircle, Pause } from "lucide-react"; // Import CheckCircle icon
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import PropTypes from "prop-types";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 8,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1200 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 1200, min: 768 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 768, min: 480 },
    items: 3,
  },
  smallMobile: {
    breakpoint: { max: 480, min: 0 },
    items: 2,
  },
};

const EpisodesGrid = ({ episodes, onEpisodeSelect, selectedEpisodeId }) => {
  return (
    <div className="space-y-4">
      <Carousel
        responsive={responsive}
        draggable={false}
        itemClass="px-2"
        containerClass="pb-4"
        removeArrowOnDeviceType={["tablet", "mobile", "smallMobile"]}
      >
        {episodes.map((episode) => {
          const isSelected = episode.episodeId === selectedEpisodeId;

          return (
            <div key={episode.episodeId} className="h-full">
              <button
                onClick={() => onEpisodeSelect(episode)}
                className={`group rounded-lg overflow-hidden transition-all duration-300 w-full h-full
                  ${
                    isSelected
                      ? "bg-gray-600 scale-100 ring-2 ring-red-100" 
                      : "bg-gray-800 hover:bg-gray-700 hover:scale-105" 
                  }
                `}
              >
                <div className="relative aspect-video">
                  <img
                    src={episode.thumbnail}
                    alt={episode.title}
                    className={`w-full h-full object-cover ${
                      isSelected ? "opacity-70" : "" 
                    }`}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 flex items-center justify-center transition-all duration-300">
                    <div
                      className={`rounded-full p-2
                        ${
                          isSelected
                            ? "bg-red-600 opacity-100 scale-100" 
                            : "bg-red-600 opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100" 
                        }
                        transition-all duration-300
                      `}
                    >
                      {/* Conditional rendering for the icon */}
                      {isSelected ? (
                        <Pause className="w-6 h-6 text-white fill-current" />
                      ) : (
                        <Play className="w-6 h-6 text-white fill-current" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-3 text-left">
                  <h3
                    className={`font-medium text-sm mb-1 truncate ${
                      isSelected ? "text-red-400" : "text-white"
                    }`}
                  >
                    {episode.title}
                  </h3>
                  <p className="text-gray-400 text-xs">
                    {episode.duration} minutes
                  </p>
                </div>
              </button>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

EpisodesGrid.propTypes = {
  episodes: PropTypes.array.isRequired,
  onEpisodeSelect: PropTypes.func.isRequired,
  selectedEpisodeId: PropTypes.string,
};

export default EpisodesGrid;