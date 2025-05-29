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