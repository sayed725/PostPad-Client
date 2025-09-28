import React, { useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import CommentState from "./CommentState";
import LoadingSpinner from "./LoadingSpinner";

const DetailsComment = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  // Pagination 
  const totalPages = Math.ceil(comments.length / itemsPerPage);
  const paginatedComments = comments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="mt-10 mx-auto bg-white min-h-screen dark:bg-black dark:text-white rounded-md shadow-lg">
      <div className="overflow-x-auto w-full">
        <table className="min-w-full bg-white border dark:bg-[#20293d] dark:text-white border-gray-300">
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
            {paginatedComments.map((comment, index) => (
              <CommentState
                key={index}
                comment={comment}
                index={(currentPage - 1) * itemsPerPage + index}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination button */}
      <div className="flex justify-center items-center mt-5">
        <div className="btn-group flex gap-5 sm:gap-10">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="btn text-white btn-sm bg-[#005694]"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`btn ${currentPage === i + 1 ? "btn-active btn text-white btn-sm bg-[#005694]" : "btn btn-sm"}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="btn text-white btn-sm bg-[#005694]"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsComment;
