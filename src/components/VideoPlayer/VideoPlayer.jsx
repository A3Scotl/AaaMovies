import React from "react";
import VideoHeader from "./VideoHeader";
import VideoIframe from "./VideoIframe";

const VideoPlayer = ({ episode, onBack, onEpisodeSelect, allEpisodes }) => {
  const currentEpisodeIndex =
    allEpisodes?.findIndex((ep) => ep.episodeId === episode.episodeId) || 0;
  const nextEpisode = allEpisodes?.[currentEpisodeIndex + 1];
  const prevEpisode = allEpisodes?.[currentEpisodeIndex - 1];
  return (
    <div className="relative pt-20 bg-black min-h-screen">
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
    </div>
  );
};

export default VideoPlayer;
