import MovieInfo from "../../pages/MovieInfo";

const MovieInfoTab = ({ movie }) => {
  const movieDetails = [
    { label: 'OriginName', value: movie.originName },
    { label: 'Release Year', value: movie.releaseYear },
    { label: 'Type', value: movie.type},
    { label: 'Status', value: movie.status },
    { label: 'Quality', value: movie.quality },
    { label: 'Lang', value: movie.lang },
    { label: 'Episode', value: movie.episodeTotal },
    { label: 'View', value: movie.view.toLocaleString() }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Content</h3>
        <p className="text-gray-300 leading-relaxed">{movie.description}</p>
      </div>
      
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Desciption</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {movieDetails.map((detail, index) => (
            <div key={index} className="flex justify-between py-2 border-b border-gray-700">
              <span className="text-gray-400">{detail.label}:</span>
              <span className="text-white font-medium">{detail.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default MovieInfoTab;