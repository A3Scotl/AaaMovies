const MovieFilter = ({
  filters,
  onFilterChange,

  options
}) => {
  const {
    year,
    type,
    genre,
    country,
    sortOrder
  } = filters;

  const {
    availableYears,
    movieTypes,
    genresOptions,
    countriesOptions
  } = options;

  const handleFilterChange = (filterType, value) => {
    onFilterChange(filterType, value);
  };

  return (
    <div className="p-6 shadow-lg">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-4">
        {/* Release Year Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Release Year</label>
          <select
            className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            value={year}
            onChange={(e) => handleFilterChange('year', e.target.value)}
          >
            <option value="">All Years</option>
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Movie Type Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Movie Type</label>
          <select
            className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            value={type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
          >
            <option value="">All Types</option>
            {movieTypes.map((type) => (
              <option key={type} value={type}>
                {type === "SINGLE" ? "Movie" : "TV Series"}
              </option>
            ))}
          </select>
        </div>

        {/* Genre Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Genre</label>
          <select
            className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            value={genre}
            onChange={(e) => handleFilterChange('genre', e.target.value)}
          >
            <option value="">All Genres</option>
            {genresOptions.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        {/* Country Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Country</label>
          <select
            className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            value={country}
            onChange={(e) => handleFilterChange('country', e.target.value)}
          >
            <option value="">All Countries</option>
            {countriesOptions.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Order */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Sort By</label>
          <select
            className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            value={sortOrder}
            onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
          >
            <option value="newest">Newest Upload</option>
            <option value="oldest">Oldest Upload</option>
            <option value="mostViewed">Most Viewed</option>
            <option value="leastViewed">Least Viewed</option>
            <option value="latestRelease">Latest Release</option>
            <option value="oldestRelease">Oldest Release</option>
          </select>
        </div>
        
      </div>
    </div>
    
  );
};

export default MovieFilter;