import { useEffect, useState } from "react";
import { getAllMovies } from "../apis/movie.api";
import { getAllCategories } from "../apis/category.api";
import { getAllCountries } from "../apis/country.api";
import LoadingSpinner from "../components/LoadingSpinner";
import MovieItem from "../components/Movie/MovieItem";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [genresOptions, setGenresOptions] = useState([]); // Lưu tên thể loại để hiển thị
  const [countriesOptions, setCountriesOptions] = useState([]); // Lưu tên quốc gia để hiển thị

  // Maps để chuyển đổi tên <=> ID cho việc lọc
  const [genreNameToIdMap, setGenreNameToIdMap] = useState({});
  const [countryNameToIdMap, setCountryNameToIdMap] = useState({});

  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const moviesPerPage = 32;

  // State cho các bộ lọc
  const [filterYear, setFilterYear] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterGenre, setFilterGenre] = useState(""); // Tên thể loại được chọn
  const [filterCountry, setFilterCountry] = useState(""); // Tên quốc gia được chọn

  const movieTypes = ["SINGLE", "SERIES"]; // Giá trị thực tế từ API movie.type

  // Fetch movies and filter options on component mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);

        const [moviesData, categoriesData, countriesData] = await Promise.all([
          getAllMovies(),
          getAllCategories(), // Trả về mảng các object {id, name, active}
          getAllCountries(),   // Trả về mảng các object {id, name, active}
        ]);

        // Lưu trữ tên để hiển thị trong select
        setGenresOptions(categoriesData.map(item => item.name) || []);
        setCountriesOptions(countriesData.map(item => item.name) || []);

        // Tạo maps để chuyển đổi tên -> ID phục vụ việc lọc
        const genreMap = categoriesData.reduce((acc, genre) => {
            acc[genre.name] = genre.id;
            return acc;
        }, {});
        setGenreNameToIdMap(genreMap);

        const countryMap = countriesData.reduce((acc, country) => {
            acc[country.name] = country.id;
            return acc;
        }, {});
        setCountryNameToIdMap(countryMap);

        setMovies(moviesData);
        setFilteredMovies(moviesData);
        setTotalPages(Math.ceil(moviesData.length / moviesPerPage));
      } catch (err) {
        console.error("Error fetching initial data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Effect để áp dụng bộ lọc mỗi khi filter criteria hoặc movies thay đổi
  useEffect(() => {
    let tempMovies = [...movies]; // Bắt đầu với bản sao của tất cả phim

    // Lọc theo năm phát hành
    if (filterYear) {
      tempMovies = tempMovies.filter(
        (movie) =>
          movie.releaseYear && movie.releaseYear.toString() === filterYear
      );
    }

    // Lọc theo loại (SINGLE/SERIES)
    if (filterType) {
      tempMovies = tempMovies.filter((movie) => movie.type === filterType);
    }

    // Lọc theo thể loại (sử dụng categoryIds và filterGenre)
    if (filterGenre) {
      const selectedGenreId = genreNameToIdMap[filterGenre]; // Lấy ID từ tên đã chọn
      if (selectedGenreId !== undefined) { // Đảm bảo ID được tìm thấy
        tempMovies = tempMovies.filter(
          (movie) => movie.categoryIds && movie.categoryIds.includes(selectedGenreId)
        );
      } else {
        // Nếu tên thể loại không hợp lệ, không có phim nào khớp
        tempMovies = [];
      }
    }

    // Lọc theo quốc gia (sử dụng countryId và filterCountry)
    if (filterCountry) {
      const selectedCountryId = countryNameToIdMap[filterCountry]; // Lấy ID từ tên đã chọn
      if (selectedCountryId !== undefined) { // Đảm bảo ID được tìm thấy
        tempMovies = tempMovies.filter(
          (movie) => movie.countryId && movie.countryId === selectedCountryId
        );
      } else {
        // Nếu tên quốc gia không hợp lệ, không có phim nào khớp
        tempMovies = [];
      }
    }

    setFilteredMovies(tempMovies);
    setCurrentPage(1); // Đặt lại trang về 1 mỗi khi lọc thay đổi
    setTotalPages(Math.ceil(tempMovies.length / moviesPerPage));
  }, [
    movies, // Cần movies trong dependencies vì tempMovies bắt đầu từ movies
    filterYear,
    filterType,
    filterGenre,
    filterCountry,
    moviesPerPage,
    genreNameToIdMap,   // Cần để map tên -> ID
    countryNameToIdMap, // Cần để map tên -> ID
  ]);

  // Get current movies for pagination (sử dụng filteredMovies)
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Show loading spinner while fetching data
  if (isLoading) {
    return (
      <div className="min-h-screen text-white py-28 px-12 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Lấy danh sách các năm duy nhất từ dữ liệu phim (nếu có)
  const availableYears = [
    ...new Set(movies.map((movie) => movie.releaseYear).filter(Boolean)),
  ].sort((a, b) => b - a);

  return (
    <div className="min-h-screen text-white py-36 px-12">
      {/* Header */}
      <div className="mb-6">
        <p className="text-gray-400 text-sm mt-1">All movies</p>
      </div>

      {/* Filter Section */}
      <div className="mb-8 p-4 bg-gray-900 rounded-lg shadow-md flex flex-wrap gap-4 items-center">
        <h3 className="text-lg font-semibold text-white mr-4">Bộ lọc:</h3>

        {/* Filter by Year */}
        <select
          className="bg-gray-800 text-white p-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value)}
        >
          <option value="">Năm phát hành</option>
          {availableYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        {/* Filter by Type */}
        <select
          className="bg-gray-800 text-white p-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">Loại phim</option>
          {movieTypes.map((type) => (
            <option key={type} value={type}>
              {type === "SINGLE" ? "Phim lẻ" : "Phim bộ"}
            </option>
          ))}
        </select>

        {/* Filter by Genre */}
        <select
          className="bg-gray-800 text-white p-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          value={filterGenre}
          onChange={(e) => setFilterGenre(e.target.value)}
        >
          <option value="">Thể loại</option>
          {genresOptions.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>

        {/* Filter by Country */}
        <select
          className="bg-gray-800 text-white p-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          value={filterCountry}
          onChange={(e) => setFilterCountry(e.target.value)}
        >
          <option value="">Quốc gia</option>
          {countriesOptions.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>

        {/* Clear Filters Button */}
        {(filterYear || filterType || filterGenre || filterCountry) && (
          <button
            onClick={() => {
              setFilterYear("");
              setFilterType("");
              setFilterGenre("");
              setFilterCountry("");
            }}
            className="ml-auto px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Xóa bộ lọc
          </button>
        )}
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 mb-8">
        {currentMovies.length > 0 ? (
          currentMovies.map((movie, index) => (
            <MovieItem key={movie.id || index} movie={movie} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400 text-lg">
            Không tìm thấy phim phù hợp với bộ lọc.
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredMovies.length > moviesPerPage && (
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-white font-medium">{currentPage}</span>
            <span className="text-gray-400">:</span>
            <span className="text-white font-medium">{totalPages}</span>
          </div>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default Movies;