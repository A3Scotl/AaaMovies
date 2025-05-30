import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import EpisodesGrid from "../components/MovieInfo/EpisodesGrid";
import MovieHero from "../components/MovieInfo/MovieHero";
import MovieInfoTab from "../components/MovieInfo/MovieInfoTab";
import TabNavigation from "../components/MovieInfo/TabNavigation";
import CommentsSection from "../components/Comment/CommentsSection";
import LoadingSpinner from "../components/LoadingSpinner";
import VideoPlayer from "../components/VideoPlayer/VideoPlayer";

const MovieInfo = () => {
  const location = useLocation();
  const { movieId } = useParams();
  const [movie, setMovie] = useState(location.state?.movie || null);
  const [loading, setLoading] = useState(!location.state?.movie);
  const [activeTab, setActiveTab] = useState("info");
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [isWatching, setIsWatching] = useState(false);

  useEffect(() => {
    if (!movie) {
      const fetchMovie = async () => {
        try {
          setLoading(true);
          const res = await fetch(`/api/movies/${movieId}`);
          const data = await res.json();
          setMovie(data);
          if (data.episodes && data.episodes.length > 0) {
            setSelectedEpisode(data.episodes[0]);
          }
        } catch (err) {
          console.error("Error fetching movie:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchMovie();
    } else {

      if (!selectedEpisode && movie.episodes && movie.episodes.length > 0) {
        setSelectedEpisode(movie.episodes[0]);
      }
    }
  }, [movieId, movie, selectedEpisode]); 

  const handleEpisodeSelect = (episode) => {
    setSelectedEpisode(episode);
    setIsWatching(true);
    console.log("Selected episode:", episode);
  };

  const handleBackToInfo = () => {
    setIsWatching(false);

  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "info":
        return <MovieInfoTab movie={movie} />;
      case "episodes":
        return (
          <EpisodesGrid
            episodes={movie.episodes}
            onEpisodeSelect={handleEpisodeSelect}
            selectedEpisodeId={selectedEpisode?.episodeId} 
          />
        );
      case "comments":
        return <CommentsSection movie={movie} />;
      default:
        return null;
    }
  };

  if (isWatching && selectedEpisode) {
    return (
      <>
        <VideoPlayer
          episode={selectedEpisode}
          onBack={handleBackToInfo}
          onEpisodeSelect={handleEpisodeSelect}
          allEpisodes={movie.episodes}
        />
        {/* Only show tabs if there are other episodes or info to display */}
        {movie.episodes?.length > 1 || activeTab !== "episodes" ? (
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        ) : null}

        <div className="container mx-auto px-4 py-8">{renderTabContent()}</div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <LoadingSpinner />
        </div>
      ) : movie ? (
        <>
          <MovieHero movie={movie} onEpisodeSelect={handleEpisodeSelect} />
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="container mx-auto px-4 py-8">
            {renderTabContent()}
          </div>
        </>
      ) : (
        <div className="text-white text-center py-20">No movie found</div>
      )}
    </div>
  );
};

export default MovieInfo;