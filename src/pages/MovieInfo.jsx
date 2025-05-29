import  { useState } from 'react';
import EpisodesGrid from '../components/MovieInfo/EpisodesGrid'
import MovieHero from '../components/MovieInfo/MovieHero'
import MovieInfoTab from '../components/MovieInfo/MovieInfoTab'
import TabNavigation from '../components/MovieInfo/TabNavigation'

import CommentsSection from '../components/Comment/CommentsSection'

const MovieInfo = ({ movie: movieProp }) => {
  const [activeTab, setActiveTab] = useState('info');
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  const movie = movieProp || {
    movieId: 1,
    title: "Trường Học Xác Sống",
    originName: "All of Us Are Dead",
    type: "SERIES",
    description: "Câu chuyện xoay quanh nhóm học sinh bị mắc kẹt trong trường học khi xảy ra dịch zombie, chiến đấu không chỉ với xác sống mà còn với lòng tham và ghen tị của con người.",
    thumbnail: "https://img.ophim.live/uploads/movies/ngoi-truong-xac-song-thumb.jpg",
    poster: "https://img.ophim.live/uploads/movies/truong-hoc-xac-song-poster.jpg",
    quality: "HD",
    lang: "VIETSUB",
    status: "COMPLETED",
    view: 1000,
    countryId: 1,
    releaseYear: 2021,
    averageRating: 4.5,
    episodeTotal: 12,
    episodes: Array.from({ length: 12 }, (_, i) => ({
      episodeId: i + 1,
      episodeNumber: i + 1,
      title: `Ep ${i + 1}`,
      thumbnail: "https://img.ophim.live/uploads/movies/ngoi-truong-xac-song-thumb.jpg",
      duration: 60
    }))
  };

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
    <div className="min-h-screen bg-gray-900">
      <MovieHero movie={movie} onEpisodeSelect={handleEpisodeSelect} />
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="container mx-auto px-4 py-8">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default MovieInfo;