
import useAxiosPublic from './useAxiosPublic';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useComments = ({id}) => {
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()

    const { user } = useAuth()
    const { refetch:cRefetch, data: comments , isLoading:isLoad  } = useQuery({
        queryKey: ['comments'],
        queryFn: async() => {
            const res = await axiosSecure.get(`/comments?id=${id}`);
            return res.data;
        }
    })
    return [ comments, cRefetch, isLoad ]
};

export default useComments;