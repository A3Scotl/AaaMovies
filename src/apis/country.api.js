import Instance from './instance';

export const getAllCountries = async () => {
    try {
        const response = await Instance.get('/countries');
        return response.data;
    } catch (error) {
        console.error('Error fetching all countries:', error);
        throw error;
    }
};
