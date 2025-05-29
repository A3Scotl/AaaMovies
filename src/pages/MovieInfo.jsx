import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import EpisodesGrid from '../components/MovieInfo/EpisodesGrid';
import MovieHero from '../components/MovieInfo/MovieHero';
import MovieInfoTab from '../components/MovieInfo/MovieInfoTab';
import TabNavigation from '../components/MovieInfo/TabNavigation';
import CommentsSection from '../components/Comment/CommentsSection';

const MovieInfo = () => {
  const location = useLocation();
  const movie = location.state?.movie;

  const [activeTab, setActiveTab] = useState('info');
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  const handleEpisodeSelect = (episode) => {
    setSelectedEpisode(episode);
    console.log('Selected episode:', episode.thumbnail);
  };

  const renderTabContent = () => {
    if (!movie) return <p className="text-white">Movie not found</p>;

    switch (activeTab) {
      case 'info':
        return <MovieInfoTab movie={movie} />;
      case 'episodes':
        return <EpisodesGrid episodes={movie.episodes} onEpisodeSelect={handleEpisodeSelect} />;
      case 'comments':
        return <CommentsSection movie={movie} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {movie ? (
        <>
          <MovieHero movie={movie} onEpisodeSelect={handleEpisodeSelect} />
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="container mx-auto px-4 py-8">{renderTabContent()}</div>
        </>
      ) : (
        <div className="text-white text-center py-20">Không tìm thấy thông tin phim.</div>
      )}
    </div>
  );
};

export default MovieInfo;
