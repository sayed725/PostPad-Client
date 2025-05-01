import React from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import DetailsPostCard from "../Components/DetailsPostcard";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import LoadingSpinner from "../Components/LoadingSpinner";
import { Helmet } from "react-helmet-async";

const PostDetails = () => {
  const { id } = useParams();

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const {
    refetch,
    data: post = {},
    isLoading,
  } = useQuery({
    queryKey: ["specificPost", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/posts/${id}`);
      return res.data;
    },
  });

  const {
    refetch: cRefetch,
    data: comments = [],
    isLoading: isLoad,
  } = useQuery({
    queryKey: ["comments", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/comments?id=${id}`);
      return res.data;
    },
  });

  // console.log(comments)

  if (isLoading) {
    return (
      <div className="lg:w-7/12 mx-auto mb-10  min-h-screen bg-white dark:bg-[#20293d] rounded-lg hover:scale-[1.05] transition-all animate-pulse">
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
          {/* Comment Section */}
          <div className="my-10">
            {/* Comment Input */}
            <div className="flex items-center space-x-2 border-b pb-3 mb-3 px-5">
              <div className="w-11 h-11 bg-gray-300 dark:bg-gray-700 rounded-full" />
              <div className="flex items-center justify-between w-full gap-2">
                <div className="w-full h-10 bg-gray-300 dark:bg-gray-700 rounded-md" />
                <div className="w-24 h-10 bg-gray-300 dark:bg-gray-700 rounded-md" />
              </div>
            </div>

            {/* Comment List (Simulating 2 comments) */}
            {[1, 2].map((_, index) => (
              <div
                key={index}
                className="border-b pb-3 mb-3 flex flex-col space-y-2 px-5"
              >
               <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {/* icon  */}
                  <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full" />
                  {/* name  */}
                  <div className="flex  flex-col w-full gap-2">
                    <div className="w-24 h-5 bg-gray-300 dark:bg-gray-700 rounded-md" />
                    <div className="w-14 h-3 bg-gray-300 dark:bg-gray-700 rounded-md" />
                  </div>
                </div>
                <div>
                  <div className="w-5 h-5 bg-gray-300 dark:bg-gray-700 rounded-md" />
                </div>
               </div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  

  return (
    <div className="min-h-screen">
      <Helmet>
        {" "}
        <title>PostPad | Details </title>
      </Helmet>
      <div className="flex flex-col gap-5">
        <DetailsPostCard
          post={post}
          refetch={refetch}
          cRefetch={cRefetch}
          comments={comments}
        ></DetailsPostCard>
      </div>
      {/* <div>
                <DetailsComment comments={comments} cRefetch={cRefetch}></DetailsComment>
            </div> */}
    </div>
  );
};

export default PostDetails;
