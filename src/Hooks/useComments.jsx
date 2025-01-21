
import useAxiosPublic from './useAxiosPublic';
import useAuth from './useAuth';

const useComments = ({id}) => {
    const axiosPublic = useAxiosPublic()
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