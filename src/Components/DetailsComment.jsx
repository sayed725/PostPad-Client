import React, { useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import { FaEllipsisH } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import CommentState from "./CommentState";
import LoadingSpinner from "./LoadingSpinner";



const DetailsComment = () => {
  const { id } = useParams();

  

  console.log(id)

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    refetch,
    data: comments = [],
    isLoading,
  } = useQuery({
    queryKey: ["postComments", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/comments?id=${id}`);
      return res.data;
    },
  });

  if(isLoading){
    return <LoadingSpinner></LoadingSpinner>
  }


  

 
   

  return (
    <div className="mt-10 mx-auto bg-white  rounded-md p-5 shadow-lg">
      <div className="overflow-x-auto w-full">


      <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th></th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Comment</th>
              <th className="px-4 py-2 border">Feedback</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment,index) => (
              <CommentState key={index} comment={comment} index={index} />
            ))}
          </tbody>
        </table>











      </div>


    









      {/* Comments List */}
      {/* {comments.map(comment => ( */}
      {/* <div
                 key={comment._id}
                 className="border-b pb-3 mb-3 flex flex-col space-y-2"
               >
                 <div className="flex items-center justify-between">
                   <div className="flex items-center space-x-2">
                     <div className={'w-8 h-8 rounded-full text-white flex items-center justify-center'}>
                      
                       <img src={comment.commentImg} alt="" className="rounded-full" />
                     </div>
                     <div>
                       <p className="font-semibold">{comment.commentUser}</p>
                       <p className="text-xs text-gray-500">{new Date(comment.commentTime).toLocaleDateString()}</p>
                     </div>
                   </div>
                   <FaEllipsisH className="text-gray-500 cursor-pointer" />
                 </div>
       
                 <p className="text-gray-700">{comment.comment}</p>
                
               </div> */}
      {/* ))} */}
    </div>
  );
};

export default DetailsComment;
