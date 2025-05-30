import React from 'react';
import VideoHeader from './VideoHeader';
import VideoIframe from './VideoIframe';
import EpisodeSidebar from './EpisodeSidebar';

const VideoPlayer = ({ episode, onBack, onEpisodeSelect, allEpisodes }) => {
  const currentEpisodeIndex = allEpisodes?.findIndex(ep => ep.episodeId === episode.episodeId) || 0;
  const nextEpisode = allEpisodes?.[currentEpisodeIndex + 1];
  const prevEpisode = allEpisodes?.[currentEpisodeIndex - 1];

  return (
    <div className="relative pt-32 bg-black min-h-screen">
      {/* Header Controls */}
      <VideoHeader
        episode={episode}
        onBack={onBack}
        onEpisodeSelect={onEpisodeSelect}
        nextEpisode={nextEpisode}
        prevEpisode={prevEpisode}
      />

      {/* Video Iframe */}
      <VideoIframe episode={episode} />

      {/* Episode List Sidebar */}
      <EpisodeSidebar
        allEpisodes={allEpisodes}
        currentEpisode={episode}
        onEpisodeSelect={onEpisodeSelect}
        maxDisplay={10}
      />
    </div>
  );
};

export default VideoPlayer;