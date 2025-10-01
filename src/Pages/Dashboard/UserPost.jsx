import React, { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Components/LoadingSpinner";
import { FaTrash } from "react-icons/fa6";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { GrNext, GrPrevious } from "react-icons/gr";
import { Helmet } from "react-helmet-async";

const UserPost = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const {
    refetch,
    data: posts = [],
    isLoading,
  } = useQuery({
    queryKey: ["userAllPosts", user],
    queryFn: async () => {
      const res = await axiosSecure.get(`/allpost/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/post/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your post has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  // Pagination fn
  const totalPages = Math.ceil(posts.length / itemsPerPage);
  const paginatedPosts = posts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

    
        if (!posts.length)
          return(
        <div className="text-center mt-10">
          <h2 className="text-2xl font-semibold mb-4">No Posts Found</h2>
          <p className="text-gray-600 dark:text-gray-300">
            You haven't created any posts yet. Start sharing your thoughts and
            ideas with the community!
          </p>
          <button className="mt-5 bg-[#005694] hover:bg-[#005694] text-white px-6 py-2 rounded-md">
            <Link
              to="/dashboard/addPost"
              className="mt-5 bg-[#005694] hover:bg-[#005694] text-white px-6 py-2 rounded-md"
            >
              Create Your First Post
            </Link>
          </button>
        </div>
         )
      

  return (
    <div className="">
       <Helmet> <title>PostPad | UserPost </title></Helmet>
      <div className="rounded-md min-h-screen">
        <div className="mb-5 text-center space-y-3">
          <h2 className="text-3xl text-center font-bold">
            Hi! {user && user?.displayName}
          </h2>
          <p className="text-xl font-semibold">
            Welcome to your post dashboard. Here you can manage and view all of
            your posts.
          </p>
          <p className="text-xl font-semibold">
            You have total {posts.length} {posts.length === 1 ? "post" : "posts"}
          </p>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="min-w-full bg-white border dark:bg-[#20293d] dark:text-white border-gray-300 shadow-lg">
            {/* head */}
            <thead className="text-xl font-semibold">
              <tr>
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">Post Title</th>
                <th className="px-4 py-2 border">No Of UpVotes</th>
                <th className="px-4 py-2 border">No Of Down Votes</th>
                <th className="px-4 py-2 border">Comment</th>
                <th className="px-4 py-2 border">Delete</th>
              </tr>
            </thead>
            <tbody >
              {paginatedPosts.map((post, index) => (
                <tr key={index}>
                  <th className="px-4 py-2 border">{(currentPage - 1) * itemsPerPage + index + 1}</th>
                  <td className="px-4 py-2 border text-center">{post.title}</td>
                  <td className="px-4 py-2 border text-center">{post.upVote}</td>
                  <td className="px-4 py-2 border text-center">{post.dawnVote}</td>
                  <td className="px-4 py-2 border text-center">
                    <Link to={`/dashboard/comments/${post._id}`}>
                      <button className="btn btn-sm   ml-5 ">
                        All Comments
                      </button>
                    </Link>
                  </td>

                  <td className="px-4 py-2  border text-center">
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="btn btn-sm text-xl text-red-500"
                    >
                      <FaTrash></FaTrash>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination button */}
        <div className="flex justify-center  items-center mt-5">
          <div className="btn-group flex gap-5 sm:gap-10">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="btn text-white btn-sm bg-[#005694] dark:hover:bg-[#005694]"
              disabled={currentPage === 1}
            >
              <GrPrevious/>Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`btn ${currentPage === i + 1 ? "btn text-white btn-sm dark:hover:bg-[#005694] bg-[#005694]" : "btn btn-sm"}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="btn text-white btn-sm bg-[#005694] dark:hover:bg-[#005694]"
              disabled={currentPage === totalPages}
            >
              Next<GrNext/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPost;
