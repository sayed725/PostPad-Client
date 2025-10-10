import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useTags = () => {
    const axiosSecure = useAxiosSecure();

    const { refetch, data: tags = [], isLoading } = useQuery({
        queryKey: ['tags'],
        queryFn: async () => {
            try {
                const res = await axiosSecure.get('/tags');
                return res.data;
            } catch (error) {
                console.error('Error fetching tags:', error);
                throw error; // Let Tanstack Query handle the error
            }
        },
    });

    return [tags, refetch, isLoading];
};

export default useTags;