import { Calendar, Film, Monitor, Globe, Play, Eye, CheckCircle, Clock } from 'lucide-react';

const MovieInfoTab = ({ movie }) => {

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'from-green-500 to-emerald-500';
      case 'ongoing': return 'from-blue-500 to-cyan-500';
      case 'upcoming': return 'from-yellow-500 to-orange-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'movie':
      case 'single': return 'from-purple-500 to-indigo-500';
      case 'series': return 'from-red-500 to-pink-500';
      case 'ova': return 'from-cyan-500 to-blue-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const movieDetails = [
    { 
      label: 'Original Name', 
      value: movie.originName,
      icon: <Film className="w-4 h-4" />,
      color: 'text-blue-400'
    },
    { 
      label: 'Release Year', 
      value: movie.releaseYear,
      icon: <Calendar className="w-4 h-4" />,
      color: 'text-green-400'
    },
    { 
      label: 'Type', 
      value: movie.type,
      icon: <Monitor className="w-4 h-4" />,
      color: 'text-purple-400',
      badge: true,
      badgeColor: getTypeColor(movie.type)
    },
    { 
      label: 'Status', 
      value: movie.status,
      icon: <CheckCircle className="w-4 h-4" />,
      color: 'text-green-400',
      badge: true,
      badgeColor: getStatusColor(movie.status)
    },
    { 
      label: 'Quality', 
      value: movie.quality,
      icon: <Monitor className="w-4 h-4" />,
      color: 'text-red-400',
      badge: true,
      badgeColor: 'from-red-500 to-pink-500'
    },
    { 
      label: 'Language', 
      value: movie.lang,
      icon: <Globe className="w-4 h-4" />,
      color: 'text-cyan-400',
      badge: true,
      badgeColor: 'from-cyan-500 to-blue-500'
    },
    { 
      label: 'Episodes', 
      value: movie.episodeTotal,
      icon: <Play className="w-4 h-4" />,
      color: 'text-yellow-400'
    },
    { 
      label: 'Views', 
      value: movie.view?.toLocaleString() || '0',
      icon: <Eye className="w-4 h-4" />,
      color: 'text-orange-400'
    }
  ];

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl backdrop-blur-sm">
      
      {/* Description Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 bg-gradient-to-b from-red-500 to-pink-500 rounded-full"></div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Description
          </h3>
        </div>
        
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-purple-500/20 rounded-xl blur opacity-25"></div>
          <div className="relative bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
            <p className="text-gray-300 leading-relaxed text-lg">
              {movie.description}
            </p>
          </div>
        </div>
      </div>
      
      {/* Movie Details Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Movie Details
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {movieDetails.map((detail, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative bg-gray-800/40 backdrop-blur-sm p-4 rounded-xl border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300 hover:transform hover:scale-[1.02]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${detail.color.replace('text-', 'from-').replace('-400', '-500')} to-gray-600 bg-opacity-20`}>
                      <div className={detail.color}>
                        {detail.icon}
                      </div>
                    </div>
                    <span className="text-gray-400 font-medium">{detail.label}</span>
                  </div>
                  
                  <div className="flex items-center">
                    {detail.badge ? (
                      <span className={`px-3 py-1 rounded-full text-sm font-bold text-white bg-gradient-to-r ${detail.badgeColor} shadow-lg`}>
                        {detail.value}
                      </span>
                    ) : (
                      <span className="text-white font-semibold text-lg">
                        {detail.value}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Subtle animation line */}
                <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent w-0 group-hover:w-full transition-all duration-500"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-r from-red-500/5 to-purple-500/5 rounded-full blur-2xl"></div>
      <div className="absolute bottom-8 left-4 w-16 h-16 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-full blur-xl"></div>
    </div>
  );
};

export default MovieInfoTab;