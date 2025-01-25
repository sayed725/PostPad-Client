import React, { useEffect, useState } from 'react';
import PostCard from './Postcard';
import { useQuery } from '@tanstack/react-query';
import { FaSearch } from "react-icons/fa";
import useAxiosPublic from '../Hooks/useAxiosPublic';
import LoadingSpinner from './LoadingSpinner';
import { GrNext, GrPrevious } from "react-icons/gr";

const ShowPost = () => {

  const [count, setCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

    const axiosPublic = useAxiosPublic()
    const [search, setSearch] = useState('')
    // console.log(search)

    const numberOfPages = Math.ceil(count / itemsPerPage);
    // console.log(numberOfPages)

    const pages = [...Array(numberOfPages).keys()];


    useEffect( () =>{
     axiosPublic.get('/postsCount')
      .then(res => res.data)
      .then(data => setCount(data.count))
  }, [])

    // console.log(count)




    
    const { data: posts = [], isLoading } = useQuery({
        queryKey: ['posts', search, currentPage, itemsPerPage],
        queryFn: async() => {
            const res = await axiosPublic.get(`/posts?search=${search}&page=${currentPage}&size=${itemsPerPage}`);
            return res.data;
        }
    })

    // console.log(posts)

   

  const handlePrevPage = () => {
      if (currentPage > 0) {
          setCurrentPage(currentPage - 1);
      }
  }

  const handleNextPage = () => {
      if (currentPage < pages.length - 1) {
          setCurrentPage(currentPage + 1);
      }
  }

    

   


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
                      <p onClick={()=>setSearch('smartphone')}  className="text-blue-400 hover:underline mx-1">
                        #Smartphone
                      </p>
                      <p
                        onClick={()=>setSearch('macbook')}
                        className="text-blue-400 hover:underline mx-1"
                      >
                        #MacBook
                      </p>
                      <p onClick={()=>setSearch('bitcoin')}
                       className="text-blue-400 hover:underline mx-1">
                        #BitCoin
                      </p>
                    </div>
                  </div>
                </div>
           
            <div className='flex flex-col gap-5 py-10'>
                {
                    isLoading&& <LoadingSpinner></LoadingSpinner>
                }
                {
                    posts.map(post=><PostCard key={post._id} post={post}></PostCard>)
                }
            </div>

            <div className='pagination text-center mb-10 flex justify-center items-center mt-4 gap-3 sm:gap-8'>
                <button onClick={handlePrevPage} className='btn btn-sm bg-[#005694] hover:bg-[#005694] text-white' > <GrPrevious/>Prev</button>
                {
                    pages.map(page => <button
                        className={currentPage === page ? 'btn text-white btn-sm bg-[#005694]' : undefined}
                        onClick={() => setCurrentPage(page)}
                        key={page}
                    >{page}</button>)
                }
                <button onClick={handleNextPage} className='btn btn-sm bg-[#005694] hover:bg-[#005694] text-white'>Next<GrNext/></button>
               
            </div>
            
        </div>
    );
};

export default ShowPost;