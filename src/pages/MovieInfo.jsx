import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import EpisodesGrid from '../components/MovieInfo/EpisodesGrid';
import MovieHero from '../components/MovieInfo/MovieHero';
import MovieInfoTab from '../components/MovieInfo/MovieInfoTab';
import TabNavigation from '../components/MovieInfo/TabNavigation';
import CommentsSection from '../components/Comment/CommentsSection';
import LoadingSpinner from '../components/LoadingSpinner'; // đảm bảo đường dẫn đúng

const MovieInfo = () => {
  const location = useLocation();
  const { movieId } = useParams();
  const [movie, setMovie] = useState(location.state?.movie || null);
  const [loading, setLoading] = useState(!location.state?.movie);
  const [activeTab, setActiveTab] = useState('info');
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  useEffect(() => {
    if (!movie) {
      // Giả sử có API /api/movies/:id
      const fetchMovie = async () => {
        try {
          setLoading(true);
          const res = await fetch(`/api/movies/${movieId}`);
          const data = await res.json();
          setMovie(data);
        } catch (err) {
          console.error('Error fetching movie:', err);
        } finally {
          setLoading(false);
        }
      };
      fetchMovie();
    }
  }, [movieId, movie]);

  const handleEpisodeSelect = (episode) => {
    setSelectedEpisode(episode);
    console.log('Selected episode:', episode.thumbnail);
  };

  const renderTabContent = () => {
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
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <LoadingSpinner />
        </div>
      ) : movie ? (
        <>
          <MovieHero movie={movie} onEpisodeSelect={handleEpisodeSelect} />
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="container mx-auto px-4 py-8">{renderTabContent()}</div>
        </>
      ) : (
        <div className="text-white text-center py-20">No</div>
      )}
    </div>
  );
};

export default MovieInfo;
