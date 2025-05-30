import PropTypes from "prop-types";
import Slider from "react-slick";
import { Play, Pause } from "lucide-react";

const EpisodesGrid = ({ episodes, onEpisodeSelect, selectedEpisodeId }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    autoplay: false,
    centerMode: true,
    centerPadding: '40px',
    initialSlide: 0,
    lazyLoad: 'ondemand',
    swipeToSlide: true,

    responsive: [
      {
        breakpoint: 4000,
        settings: {
          slidesToShow: 6,
          centerPadding: '60px',
        }
      },
      {
        breakpoint: 3000,
        settings: {
          slidesToShow: 5,
          centerPadding: '50px',
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          centerPadding: '40px',
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          centerPadding: '30px',
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerPadding: '20%',
        }
      }
    ]
  };

  return (
    <div className="space-y-4">
      <Slider {...settings}>
        {episodes.map((episode) => {
          const isSelected = episode.episodeId === selectedEpisodeId;

          return (
            <div key={episode.episodeId} className="px-2">
              <button
                onClick={() => onEpisodeSelect(episode)}
                className={`group rounded-lg overflow-hidden transition-all duration-300 w-full h-full block
                  ${
                    isSelected
                      ? "bg-gray-600 scale-100 ring-2 ring-red-500"
                      : "bg-gray-800 hover:bg-gray-700 hover:scale-[1.02]"
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
                    {episode.duration} phút
                  </p>
                </div>
              </button>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

EpisodesGrid.propTypes = {
  episodes: PropTypes.array.isRequired,
  onEpisodeSelect: PropTypes.func.isRequired,
  selectedEpisodeId: PropTypes.string,
};

export default EpisodesGrid;