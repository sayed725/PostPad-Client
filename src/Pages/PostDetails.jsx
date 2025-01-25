import React from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import DetailsPostCard from '../Components/DetailsPostcard';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import LoadingSpinner from '../Components/LoadingSpinner';
import DetailsComment from '../Components/DetailsComment';


const PostDetails = () => {
    const { id } = useParams();

    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()

    const { refetch, data: post = {}, isLoading } = useQuery({
        queryKey: ['specificPost'],
        queryFn: async() => {
            const res = await axiosSecure.get(`/posts/${id}`);
            return res.data;
        }
    })


     const { refetch:cRefetch, data: comments , isLoading:isLoad  } = useQuery({
            queryKey: ['comments'],
            queryFn: async() => {
                const res = await axiosSecure.get(`/comments?id=${id}`);
                return res.data;
            }
        })
    
        // console.log(comments)


     if(isLoading){
        return <LoadingSpinner></LoadingSpinner>
     }
     if(isLoad){
        return <LoadingSpinner></LoadingSpinner>
     }
   




    return (
        <div className='min-h-screen'>
            <h2 className='text-4xl font-bold text-center'>post details</h2>
            <div className='flex flex-col gap-5'>
               <DetailsPostCard post={post} refetch={refetch} cRefetch={cRefetch} comments={comments}></DetailsPostCard>
            </div>
            {/* <div>
                <DetailsComment comments={comments} cRefetch={cRefetch}></DetailsComment>
            </div> */}
        </div>
    );
};

export default PostDetails;