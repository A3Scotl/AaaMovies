import React from 'react';

const VideoIframe = ({ episode }) => {
  return (
    <div className="w-full h-full flex justify-center items-center pt-4">
      <iframe
        src={episode.videoUrl}
        className="w-[95vw] h-[80vh] border-0"
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        title={episode.title}
        loading="lazy"
      />
    </div>
  );
};

export default VideoIframe;