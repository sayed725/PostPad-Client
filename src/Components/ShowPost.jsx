import React, { useState } from 'react';
import PostCard from './Postcard';
import { useQuery } from '@tanstack/react-query';
import { FaSearch } from "react-icons/fa";
import useAxiosPublic from '../Hooks/useAxiosPublic';
import LoadingSpinner from './LoadingSpinner';

const ShowPost = () => {

    const axiosPublic = useAxiosPublic()
    const [search, setSearch] = useState('')
    console.log(search)

    const { data: posts = [], isLoading } = useQuery({
        queryKey: ['posts', search],
        queryFn: async() => {
            const res = await axiosPublic.get(`/posts?search=${search}`);
            return res.data;
        }
    })

    // console.log(posts)

   


    return (
        <div className=''>
             <div className="p-5 shadow-lg bg-white ">
                  <div className="flex flex-col items-center justify-center text-white">
                    <div className="relative w-full">
                      <input
                        type="text"
                        name='search'
                        onChange={e => setSearch(e.target.value)}
                        value={search}
                        placeholder="Search by tags without #...."
                        className="w-full bg-[#f5f5f5]  text-black rounded-full py-3 px-5 pl-12 outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <FaSearch className="absolute left-4 top-3 text-blue-500 text-xl" />
                    </div>
                    <div className="mt-4 text-sm flex">
                      <span className="text-gray-700">Most Popular tags: </span>
                      <p onClick={()=>setSearch('Helpdesk')}  className="text-blue-400 hover:underline mx-1">
                        Helpdesk
                      </p>
                      <p
                        
                        className="text-blue-400 hover:underline mx-1"
                      >
                        Introduction
                      </p>
                      <p  className="text-blue-400 hover:underline mx-1">
                        Payment
                      </p>
                    </div>
                  </div>
                </div>
           
            <div className='flex flex-col gap-5 py-10'>
                
                {
                    posts.map(post=><PostCard key={post._id} post={post}></PostCard>)
                }
            </div>
            
        </div>
    );
};

export default ShowPost;