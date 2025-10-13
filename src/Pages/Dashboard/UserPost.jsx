import React, { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Components/LoadingSpinner";
import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../@/components/ui/table";
import { Button } from "../../../@/components/ui/button";
import { GrNext, GrPrevious } from "react-icons/gr";
import moment from "moment";
import toast from "react-hot-toast";

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

  const handleDelete = async (id) => {
    toast(
      (t) => (
        <div className="flex gap-3 items-center">
          <div>
            <p>
              Are you <b>sure? </b> you want to <b>Delete </b> this post?
            </p>
          </div>
          <div className="gap-2 flex">
            <button
              className="bg-red-400 text-white px-3 py-1 rounded-md"
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  toast.loading("Deleting Post...", { position: "top-right" });
                  const { data } = await axiosSecure.delete(`/post/${id}`);
                  if (data.deletedCount > 0) {
                    refetch();
                    toast.dismiss();
                    toast.success("Post deleted successfully!", {
                      position: "top-right",
                    });
                  } else {
                    toast.dismiss();
                    toast.error("No post was deleted.", {
                      position: "top-right",
                    });
                  }
                } catch (error) {
                  toast.dismiss();
                  toast.error(error.message || "Failed to delete the post!", {
                    position: "top-right",
                  });
                }
              }}
            >
              Yes
            </button>
            <button
              className="bg-green-400 text-white px-3 py-1 rounded-md"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { position: "top-right" }
    );
  };

  // Pagination logic
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

  // if (!posts.length) {
  //   return (
  //     <div className="text-center mt-10 min-h-screen">
  //       <Helmet>
  //         <title>PostPad | UserPost</title>
  //       </Helmet>
  //       <h2 className="text-2xl font-semibold mb-4">No Posts Found</h2>
  //       <p className="text-gray-600 dark:text-white">
  //         You haven't created any posts yet. Start sharing your thoughts and
  //         ideas with the community!
  //       </p>
  //       <Button
  //         asChild
  //         className="mt-5 bg-[#005694] hover:bg-[#004a7c] text-white"
  //       >
  //         <Link to="/dashboard/addPost">Create Your First Post</Link>
  //       </Button>
  //     </div>
  //   );
  // }

  // Skeleton Loader Component
  const SkeletonRow = () => (
    <TableRow className="animate-pulse">
      <TableCell>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-8"></div>
      </TableCell>
      <TableCell>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
      </TableCell>
      <TableCell>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
      </TableCell>
      <TableCell>
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
      </TableCell>
      <TableCell>
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-12 mx-auto"></div>
      </TableCell>
      <TableCell>
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
      </TableCell>
      <TableCell>
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
      </TableCell>
    </TableRow>
  );

  return (
    <div className=" mx-auto min-h-screen ">
      <Helmet>
        <title>PostPad | UserPost</title>
      </Helmet>
      <div className="mb-8 text-center space-y-3">
        <h2 className="text-3xl font-bold">Hi! {user && user?.displayName}</h2>
        <p className="text-xl font-semibold text-gray-700 dark:text-gray-200">
          Welcome to your post dashboard. Here you can manage and view all of
          your posts.
        </p>
        <p className="text-xl font-semibold text-gray-700 dark:text-gray-200">
          You have total {posts.length} {posts.length === 1 ? "post" : "posts"}
        </p>
      </div>

      <div className="mx-auto overflow-x-auto bg-white dark:bg-[#20293d] dark:text-white shadow-md">
        <Table className="">
          <TableHeader>
            <TableRow className="bg-base-200 hover:bg-base-300 dark:bg-gray-700">
              <TableHead className="px-4 py-3 font-bold text-black dark:text-white text-left">
                #
              </TableHead>
              <TableHead className="px-4 py-3 font-bold text-black dark:text-white text-left">
                Post Title
              </TableHead>
              <TableHead className="px-4 py-3 font-bold text-black dark:text-white text-left">
                Posted At
              </TableHead>

              <TableHead className="px-4 py-3 font-bold text-black dark:text-white text-center">
                No of UpVotes
              </TableHead>
              <TableHead className="px-4 py-3 font-bold text-black dark:text-white text-center">
                No of Down Votes
              </TableHead>
              <TableHead className="px-4 py-3 font-bold text-black dark:text-white text-center">
                Comment
              </TableHead>
              <TableHead className="px-4 py-3 font-bold text-black dark:text-white text-center">
                Delete
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* for enmty posts  */}
            {posts.length === 0 ? (
              <TableRow className="text-center px-4 py-2 border ">
                <TableCell
                  colSpan={12}
                  className="text-center font-semibold py-10"
                >
                  <div className="text-center mt-10 ">
                    <h2 className="text-2xl font-semibold mb-4">
                      No Posts Found
                    </h2>
                    <p className="text-gray-600 dark:text-white">
                      You haven't created any posts yet. Start sharing your
                      thoughts and ideas with the community!
                    </p>
                    <Button
                      asChild
                      className="mt-5 bg-[#005694] hover:bg-[#004a7c] text-white"
                    >
                      <Link to="/dashboard/addPost">
                        Create Your First Post
                      </Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : // if loading
            isLoading ? (
              Array.from({ length: itemsPerPage }).map((_, index) => (
                <SkeletonRow key={index} />
              ))
            ) : (
              paginatedPosts.map((post, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-base-200 dark:hover:bg-gray-700 border-gray-300"
                >
                  <TableCell className="px-4 py-3 border">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </TableCell>
                  <TableCell className="px-4 py-3 border">
                    {post.title.substring(0, 30)}
                  </TableCell>
                  <TableCell className="px-4 py-3 border">
                    {(post.time && moment(post.time).fromNow()) || "Just Now"}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-center border">
                    {post.upVote}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-center border">
                    {post.dawnVote}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-center border">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="hover:text-white hover:bg-[#005694]"
                    >
                      <Link to={`/dashboard/comments/${post._id}`}>
                        All Comments
                      </Link>
                    </Button>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-center">
                    <Button
                      variant="destructive"
                      size="sm"
                      className="text-red-500"
                      onClick={() => handleDelete(post._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
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

export default UserPost;
