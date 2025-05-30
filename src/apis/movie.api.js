import Instance from './instance';

export const getAllMovies = async () => {
    try {
        const response = await Instance.get('/movies');
        return response.data;
    } catch (error) {
        console.error('Error fetching all movies:', error);
        throw error;
    }
};
export const getAllSingleMovies = async () => {
    try {
        const response = await Instance.get('/movies/singles');
        return response.data;
    } catch (error) {
        console.error('Error fetching all single movies:', error);
        throw error;
    }
};
export const getAllSerieMovies = async () => {
    try {
        const response = await Instance.get('/movies/series');
        return response.data;
    } catch (error) {
        console.error('Error fetching all serie movies:', error);
        throw error;
    }
};

export const getAllNewMovies = async () => {
    try {
        const response = await Instance.get('/movies/new');
        return response.data;
    } catch (error) {
        console.error('Error fetching all movies:', error);
        throw error;
    }
};

export const getAllHotMovies = async () => {
    try {
        const response = await Instance.get('/movies/hot');
        return response.data;
    } catch (error) {
        console.error('Error fetching hot movies:', error);
        throw error;
    }
};
export const getMovieById = async (id) => {
    try {
        const response = await Instance.get(`/movies/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching movie by ${id}:`, error);
        throw error;
    }
};