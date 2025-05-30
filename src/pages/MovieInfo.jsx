import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import EpisodesGrid from "../components/MovieInfo/EpisodesGrid";
import MovieHero from "../components/MovieInfo/MovieHero";
import MovieInfoTab from "../components/MovieInfo/MovieInfoTab";
import TabNavigation from "../components/MovieInfo/TabNavigation";
import CommentsSection from "../components/Comment/CommentsSection";
import LoadingSpinner from "../components/LoadingSpinner";
import VideoPlayer from "../components/VideoPlayer/VideoPlayer";
import { getMovieById } from "../apis/movie.api";

const MovieInfo = () => {
  const location = useLocation();
  const movieId  = location.state?.movieId;
  const [movie, setMovie] = useState();
  const [loading, setLoading] = useState(!location.state?.movie);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("info");
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [isWatching, setIsWatching] = useState(
    location.state?.isWatching || false
  );

  // Fetch movie data
  useEffect(() => {
    const controller = new AbortController();

    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getMovieById(movieId);
        setMovie(data);
        if (data.episodes?.length > 0) {
          setSelectedEpisode(data.episodes[0]);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Error fetching movie:", err);
          setError("Unable to load movie details. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    // Nếu movie chưa có hoặc movieId thay đổi -> gọi lại API
    if (!movie || movie._id !== movieId) {
      fetchMovie();
    }

    return () => controller.abort();
  }, [movieId]);

  const handleEpisodeSelect = useCallback((episode) => {
    setSelectedEpisode(episode);
    setIsWatching(true);
  }, []);

  const handleBackToInfo = useCallback(() => {
    setIsWatching(false);
  }, []);

  const renderTabContent = useCallback(() => {
    switch (activeTab) {
      case "info":
        return <MovieInfoTab movie={movie} />;
      case "episodes":
        return (
          <EpisodesGrid
            episodes={movie?.episodes || []}
            onEpisodeSelect={handleEpisodeSelect}
            selectedEpisodeId={selectedEpisode?.episodeId}
          />
        );
      case "comments":
        return <CommentsSection movie={movie} />;
      default:
        return null;
    }
  }, [activeTab, movie, selectedEpisode, handleEpisodeSelect]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div className="text-white text-center py-20 bg-black">{error}</div>;
  }

  if (!movie) {
    return (
      <div className="text-white text-center py-20 bg-black">
        No movie found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {isWatching && selectedEpisode ? (
        <>
          <VideoPlayer
            episode={selectedEpisode}
            onBack={handleBackToInfo}
            onEpisodeSelect={handleEpisodeSelect}
            allEpisodes={movie.episodes || []}
          />
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="container mx-auto px-4 py-8">
            {renderTabContent()}
          </div>
        </>
      ) : (
        <>
          <MovieHero movie={movie} onEpisodeSelect={handleEpisodeSelect} />
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="container mx-auto px-4 py-8">
            {renderTabContent()}
          </div>
        </>
      )}
    </div>
  );
};

export default MovieInfo;
