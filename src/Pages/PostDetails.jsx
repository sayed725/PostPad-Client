import React from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import DetailsPostCard from '../Components/DetailsPostcard';


const PostDetails = () => {
    const { id } = useParams();

    const axiosPublic = useAxiosPublic()

    const { refetch, data: post = {}, isLoading } = useQuery({
        queryKey: ['specificPost'],
        queryFn: async() => {
            const res = await axiosPublic.get(`/posts/${id}`);
            return res.data;
        }
    })

   




    return (
        <div className='min-h-screen'>
            <h2 className='text-4xl font-bold text-center'>post details</h2>
            <div className='flex flex-col gap-5'>
               <DetailsPostCard post={post} refetch={refetch}></DetailsPostCard>
            </div>
        </div>
    );
};

export default PostDetails;