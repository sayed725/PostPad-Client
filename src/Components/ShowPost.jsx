import React from 'react';
import PostCard from './Postcard';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import LoadingSpinner from './LoadingSpinner';

const ShowPost = () => {

    const axiosPublic = useAxiosPublic()

    const { data: posts = [], isLoading } = useQuery({
        queryKey: ['posts'],
        queryFn: async() => {
            const res = await axiosPublic.get('/posts');
            return res.data;
        }
    })

    // console.log(posts)

    if(isLoading){
        return <LoadingSpinner></LoadingSpinner>
    }



    return (
        <div className='my-10'>
            <h2 className='text-4xl font-bold text-center'>Show All POsts here</h2>
            <div className='flex flex-col gap-5'>
                {
                    posts.map(post=><PostCard key={post._id} post={post}></PostCard>)
                }
            </div>
            
        </div>
    );
};

export default ShowPost;