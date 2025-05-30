import React from 'react';

const VideoIframe = ({ episode }) => {
  return (
    <div className="w-full h-screen">
      <iframe
        src={episode.videoUrl}
        className="w-full h-full border-0"
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        title={episode.title}
        loading="lazy"
      />
    </div>
  );
};

export default VideoIframe;