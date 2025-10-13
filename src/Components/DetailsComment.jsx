import React, { useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import CommentState from "./CommentState";
import LoadingSpinner from "./LoadingSpinner";
import { Button } from "../../@/components/ui/button";
import { Helmet } from "react-helmet-async";

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

  // console.log(comments)

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
    <div className="mx-auto  min-h-screen  dark:text-white rounded-md">
      <div className="mb-5 text-center space-y-3">
        <h2 className="text-3xl text-center font-bold">
          Hi! {user && user?.displayName}
        </h2>
        <p className="text-xl font-semibold">
          Welcome to your Comment dashboard. Here you can view or report all of
          your Comment.
        </p>
        <p className="text-xl font-semibold">
          You have total {comments.length}{" "}
          {comments.length === 1 ? "Comment" : "Comments"} on this post.
        </p>
      </div>

      <div className="mx-auto overflow-x-auto bg-white dark:bg-[#20293d] dark:text-white shadow-md">
        <table className="w-full">
          <thead>
            <tr className="bg-base-200 hover:bg-base-300 dark:bg-gray-700">
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Email From</th>
              <th className="px-4 py-2 border">Comment</th>
              <th className="px-4 py-2 border">Time</th>
              <th className="px-4 py-2 border">Feedback</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody className="">
            {comments.length === 0 ? (
              <tr className="text-center px-4 py-2 border ">
                  <td 
                    colSpan={12}
                    className="text-center font-semibold py-10"
                  >
                    There is no comments on this post.
                  </td>
                </tr>
            ) : (
              paginatedComments.map((comment, index) => (
                <CommentState
                  key={index}
                  comment={comment}
                  index={(currentPage - 1) * itemsPerPage + index}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

       {/* Pagination */}
            <div className="flex justify-center flex-wrap items-center mt-8">
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  className=" bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-400"
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <Button
                    size="sm"
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`rounded-lg ${
                      currentPage === i + 1
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    } transition-colors duration-200`}
                  >
                    {i + 1}
                  </Button>
                ))}
                <Button
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-400"
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
    </div>
  );
};

export default DetailsComment;
