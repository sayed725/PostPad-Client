import React, { useEffect, useState } from 'react';
import PostCard from './Postcard';
import { useQuery } from '@tanstack/react-query';
import { FaSearch } from "react-icons/fa";
import useAxiosPublic from '../Hooks/useAxiosPublic';
import LoadingSpinner from './LoadingSpinner';
import { GrNext, GrPrevious } from "react-icons/gr";
import { LuArrowUpDown } from "react-icons/lu";
import { BiReset } from "react-icons/bi";

const ShowPost = () => {

  const [count, setCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sort, setSort] = useState('')

  // console.log(sort)

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
        queryKey: ['posts', search, currentPage, itemsPerPage, sort],
        queryFn: async() => {
            const res = await axiosPublic.get(`/posts?search=${search}&sort=${sort}&page=${currentPage}&size=${itemsPerPage}`);
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

  const resetAll = () => {
    setSearch('')
    setSort('')
  }

    

   


    return (
        <div className=''>
             <div className="p-5 shadow-lg bg-white ">
                  <div className="flex flex-col items-center justify-center text-white">
                    {/* search by tags */}
                    <div className="relative w-full flex flex-col sm:flex-row gap-5 sm:gap-2 justify-center items-center">
                      <input
                        type="text"
                        name='search'
                        onChange={e => setSearch(e.target.value)}
                        value={search}
                        placeholder="Search by tags without #...."
                        className="w-full bg-[#f5f5f5]  text-black rounded-lg py-3 px-5 pl-12 outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <FaSearch className="absolute left-4 top-3 text-blue-500 text-xl" />
                     <div className='flex sm:flex-none gap-5 sm:gap-2'>
                       {/* Popularity sort button  */}
                       <h2 onClick={()=>setSort('popularity')}
                      className='text-black btn-sm sm:btn flex justify-center items-center gap-2 rounded-lg hover:bg-[#005694] hover:text-white'><LuArrowUpDown/> <span>Popularity</span></h2>
                      {/* reset button  */}
                      <h2 onClick={resetAll} 
                      className='text-black btn-sm sm:btn flex justify-center items-center gap-2 rounded-lg hover:bg-[#005694] hover:text-white'><BiReset/> <span>Reset</span></h2>
                     </div>
                    </div>
                    <div className="mt-4 text-sm flex">
                      <span className="text-gray-700">Most Popular tags: </span>
                      <p onClick={()=>setSearch('smartphone')}  className="text-blue-400 hover:underline mx-1">
                        #smartphone
                      </p>
                      <p
                        onClick={()=>setSearch('macbook')}
                        className="text-blue-400 hover:underline mx-1"
                      >
                        #macBook
                      </p>
                      <p onClick={()=>setSearch('bitcoin')}
                       className="text-blue-400 hover:underline mx-1">
                        #bitCoin
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