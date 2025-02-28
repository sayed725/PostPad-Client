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
    queryKey: ["specificPost"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/posts/${id}`);
      return res.data;
    },
  });

  const {
    refetch: cRefetch,
    data: comments,
    isLoading: isLoad,
  } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/comments?id=${id}`);
      return res.data;
    },
  });

  // console.log(comments)

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  if (isLoad) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div className="min-h-screen">
         <Helmet> <title>PostPad | Details </title></Helmet>
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
