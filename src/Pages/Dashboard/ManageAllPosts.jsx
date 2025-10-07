import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaSearch, FaTrashAlt } from "react-icons/fa";
import { RiMedalFill } from "react-icons/ri";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../@/components/ui/table";
import { Input } from "../../../@/components/ui/input";
import { Button } from "../../../@/components/ui/button";
import moment from "moment";
import { Avatar, AvatarImage } from "../../../@/components/ui/avatar";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";

const ManageAllPosts = () => {
  const axiosSecure = useAxiosSecure();
  const [searchQuery, setSearchQuery] = useState("");
  const [sort, setSort] = useState("dsc"); // Default to descending
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const {
    data: posts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allPosts", searchQuery, sort],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/allPosts?searchQuery=${searchQuery}&sort=${sort}`
      );
      return res.data;
    },
  });

  //    console.log(posts);
  //  make admin

  // user delete
  const handleDeletePost = async (id) => {
    toast(
      (t) => (
        <div className="flex gap-3 items-center">
          <div>
            <p>
              Are you <b>sure you want to delete this post?</b>
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
  const paginatedUsers = posts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleReset = () => {
    setSearchQuery("");
    setSort("dsc");
    setCurrentPage(1);
  };

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
    <div className=" mx-auto min-h-screen">
      <Helmet>
        <title>PostPad | Admin | Posts Management</title>
      </Helmet>
      {/* title  */}
      <div className="flex flex-col sm:flex-row gap-6 items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          All Posts
        </h2>

        {/* search, sort , reset  */}
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          {/* search  */}
          <div className="relative  ">
            <Input
              type="text"
              name="search"
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              placeholder="Search by UserName..."
              className="w-full dark:bg-gray-800 dark:text-white text-gray-800 rounded-lg py-2 px-5 pl-12 outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 text-lg" />
          </div>

          {/* sort  */}
          <div className="flex flex-row items-center gap-4">
            <div>
              <select
                name="sort"
                id="sort"
                onChange={(e) => setSort(e.target.value)}
                value={sort}
                className="border py-2 px-4 rounded-md dark:bg-gray-800 "
                aria-label="Sort by expiration date"
              >
                <option value="asc">Oldest</option>
                <option value="dsc">Newest (Default)</option>
              </select>
            </div>

            {/* reset  */}
            <Button
              onClick={handleReset}
              className=" bg-[#005694] text-white  dark:text-white"
              aria-label="Reset search and sort"
            >
              Reset
            </Button>
          </div>
        </div>

        {/* total count title  */}
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          Total Posts: {posts.length}
        </h2>
      </div>

      <div className="mx-auto overflow-x-auto bg-white dark:bg-[#20293d] dark:text-white shadow-md">
        <Table className="">
          <TableHeader className=" ">
            <TableRow className="bg-base-200 hover:bg-base-300 dark:bg-gray-700">
              <TableHead className="font-bold text-black dark:text-white text-left">
                Photo
              </TableHead>
              <TableHead className="font-bold text-black dark:text-white text-left">
                Name
              </TableHead>
              <TableHead className="font-bold text-black dark:text-white text-left">
                Email
              </TableHead>
              <TableHead className="font-bold text-black dark:text-white text-left">
                Title
              </TableHead>
              <TableHead className=" font-bold text-black dark:text-white text-left">
                Posted At
              </TableHead>
              <TableHead className=" font-bold text-black dark:text-white text-left">
                UpVote
              </TableHead>
              <TableHead className=" font-bold text-black dark:text-white text-left">
                DawnVote
              </TableHead>
              <TableHead className="font-bold text-black dark:text-white text-left">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="">
            {isLoading
              ? Array.from({ length: itemsPerPage }).map((_, index) => (
                  <SkeletonRow key={index} />
                ))
              : paginatedUsers.map((post, index) => (
                  <TableRow
                    key={post._id}
                    className="hover:bg-base-200 dark:hover:bg-gray-700"
                  >
                    <TableCell className="">
                      <Avatar>
                        <AvatarImage
                          src={post?.authorImage || "/random_user.jpg"}
                          alt={post?.authorName}
                        />
                      </Avatar>
                    </TableCell>

                    <TableCell className="">{post?.authorName}</TableCell>
                    <TableCell className="">{post?.authorEmail}</TableCell>
                    <TableCell className="">
                      {post?.title.substring(0, 20)}
                    </TableCell>
                    <TableCell className="text-blue-600">
                      {(post.time && moment(post.time).fromNow()) || "Just Now"}
                    </TableCell>
                    <TableCell> {post.upVote}</TableCell>
                    <TableCell> {post.dawnVote}</TableCell>
                    <TableCell className="">
                      <Button
                        variant="destructive"
                        size="sm"
                        className="text-red-500"
                        onClick={() => handleDeletePost(post._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination controls */}
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

export default ManageAllPosts;
