import React, { useEffect, useState } from "react";
import PostCard from "./Postcard";
import { useQuery } from "@tanstack/react-query";
import { FaSearch } from "react-icons/fa";
import useAxiosPublic from "../Hooks/useAxiosPublic";

import { GrNext, GrPrevious } from "react-icons/gr";
import { LuArrowUpDown } from "react-icons/lu";
import { BiReset } from "react-icons/bi";

const ShowPost = () => {
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sort, setSort] = useState("");

  // console.log(sort)

  const axiosPublic = useAxiosPublic();
  const [search, setSearch] = useState("");
  // console.log(search)

  const numberOfPages = Math.ceil(count / itemsPerPage);
  // console.log(numberOfPages)

  const pages = [...Array(numberOfPages).keys()];

  useEffect(() => {
    axiosPublic
      .get("/postsCount")
      .then((res) => res.data)
      .then((data) => setCount(data.count));
  }, []);

  // console.log(count)

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["posts", search, currentPage, itemsPerPage, sort],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/posts?search=${search}&sort=${sort}&page=${currentPage}&size=${itemsPerPage}`
      );
      return res.data;
    },
  });

  // console.log(posts)


  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const resetAll = () => {
    setSearch("");
    setSort("");
  };

  return (
    <div className=" mb-10">
      <div className="p-5 shadow-lg bg-white dark:bg-[#20293d] dark:text-white ">
        <div className="flex flex-col items-center justify-center text-white dark:bg-[#20293d]">
          {/* search by tags */}
          <div className="relative w-full flex flex-col sm:flex-row gap-5 sm:gap-2 justify-center items-center">
            <input
              type="text"
              name="search"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              placeholder="Search by tags without #...."
              className="w-full bg-[#f5f5f5] dark:bg-[#060817] dark:text-white text-black rounded-lg py-3 px-5 pl-12 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute left-4 top-3 text-blue-500 text-xl" />
            <div className="flex sm:flex-none gap-5 sm:gap-2">
              {/* Popularity sort button  */}
              <h2
                onClick={() => setSort("popularity")}
                className="text-black btn-sm sm:btn flex justify-center dark:bg-[#20293d] dark:text-white dark:hover:bg-[#005694] items-center gap-2 rounded-lg hover:bg-[#005694] hover:text-white"
              >
                <LuArrowUpDown /> <span>Popularity</span>
              </h2>
              {/* reset button  */}
              <h2
                onClick={resetAll}
                className="text-black btn-sm sm:btn flex justify-center items-center dark:bg-[#20293d] dark:text-white dark:hover:bg-[#005694] gap-2 rounded-lg hover:bg-[#005694] hover:text-white"
              >
                <BiReset /> <span>Reset</span>
              </h2>
            </div>
          </div>
          <div className="mt-4 text-sm flex">
            <span className="text-gray-700 dark:text-white">
              Most Popular tags:{" "}
            </span>
            <p
              onClick={() => setSearch("smartphone")}
              className="text-blue-400 hover:underline mx-1"
            >
              #smartphone
            </p>
            <p
              onClick={() => setSearch("macbook")}
              className="text-blue-400 hover:underline mx-1"
            >
              #macBook
            </p>
            <p
              onClick={() => setSearch("bitcoin")}
              className="text-blue-400 hover:underline mx-1"
            >
              #bitCoin
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 py-10">
        {isLoading ? (
          <div className="flex flex-col gap-5">
            {/* Render skeleton BedCards while loading */}
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="w-full bg-white dark:bg-[#20293d] rounded-lg hover:scale-[1.05] transition-all animate-pulse">
                  <div className="rounded-lg shadow-lg overflow-hidden bg-white dark:bg-[#20293d]">
                    {/* Author Section */}
                    <div className="p-5 flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full" />
                      <div className="flex-1">
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3" />
                        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mt-2" />
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="px-5">
                      <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
                      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mt-3" />
                      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mt-2" />
                      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mt-2" />
                    </div>

                    {/* Post Image */}
                    <div className="mt-4 px-5">
                      <div className="w-full h-[350px] bg-gray-300 dark:bg-gray-700 rounded-lg" />
                    </div>

                    {/* Likes, Comments, and Share */}
                    <div className="flex items-center justify-between mt-4 px-5 pb-5">
                      <div className="flex items-center space-x-2">
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-16" />
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-16" />
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-10" />
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-10" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          posts.map((post) => <PostCard key={post._id} post={post}></PostCard>)
        )}
      </div>

      { (search.length) ? (
        ""
      ) : (
        <div className="flex justify-center items-center gap-5">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            className="btn btn-sm"
          >
            <GrPrevious />
          </button>
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`btn btn-sm ${
                currentPage === page ? "bg-blue-500 text-white" : ""
              }`}
            >
              {page + 1}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            disabled={currentPage === pages.length - 1}
            className="btn btn-sm"
          >
            <GrNext />
          </button>
        </div>
      )}
    </div>
  );
};

export default ShowPost;
