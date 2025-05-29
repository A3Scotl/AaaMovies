import Instance from './instance';

export const getAllcategories = async () => {
    try {
        const response = await Instance.get('/categories');
        return response.data;
    } catch (error) {
        console.error('Error fetching all categories:', error);
        throw error;
    }
};
export const getCategoryById = async (id) => {
    try {
        const response = await Instance.get(`/categories/${id}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error(`Error fetching category by ${id}:`, error);
        throw error;
    }
};