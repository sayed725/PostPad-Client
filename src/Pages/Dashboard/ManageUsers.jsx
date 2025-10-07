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
import {
  Avatar,
  AvatarImage,
} from "../../../@/components/ui/avatar";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchQuery, setSearchQuery] = useState("");
  const [sort, setSort] = useState("dsc"); // Default to descending
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", searchQuery, sort],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchQuery=${searchQuery}&sort=${sort}`);
      return res.data;
    },
  });

  // console.log(users);
//  make admin 
 const handleMakeAdmin = async (user) => {
  toast(
    (t) => (
      <div className="flex gap-3 items-center">
        <div>
          <p>
            Are you <b>sure</b> you want to make {user.name} an <b>Admin</b>?
          </p>
        </div>
        <div className="gap-2 flex">
          <button
            className="bg-blue-400 text-white px-3 py-1 rounded-md"
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                toast.loading("Making user admin...", { position: "top-right" });
                const { data } = await axiosSecure.patch(`/users/admin/${user._id}`);
                if (data.modifiedCount > 0) {
                  refetch();
                  toast.dismiss();
                  toast.success(`${user.name} is an Admin now!`, { position: "top-right" });
                } else {
                  toast.dismiss();
                  toast.error("No changes were made.", { position: "top-right" });
                }
              } catch (error) {
                toast.dismiss();
                toast.error(error.message || "Failed to make user admin!", { position: "top-right" });
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
// user delete 
 const handleDeleteUser = async (user) => {
  toast(
    (t) => (
      <div className="flex gap-3 items-center">
        <div>
          <p>
            Are you <b>sure? </b> you want to <b>Delete {user.name} </b>?
          </p>
        </div>
        <div className="gap-2 flex">
          <button
            className="bg-red-400 text-white px-3 py-1 rounded-md"
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                toast.loading("Deleting user...", { position: "top-right" });
                const { data } = await axiosSecure.delete(`/users/${user._id}`);
                if (data.deletedCount > 0) {
                  refetch();
                  toast.dismiss();
                  toast.success("User deleted successfully!", { position: "top-right" });
                } else {
                  toast.dismiss();
                  toast.error("No user was deleted.", { position: "top-right" });
                }
              } catch (error) {
                toast.dismiss();
                toast.error(error.message || "Failed to delete the user!", { position: "top-right" });
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
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const paginatedUsers = users.slice(
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
    <div className="mx-auto min-h-screen">
      <Helmet>
        <title>PostPad | Admin | User Management</title>
      </Helmet>
      {/* title  */}
      <div className="flex flex-col sm:flex-row gap-6 items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          All Users
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
          Total Users: {users.length}
        </h2>
      </div>

      <div className="mx-auto overflow-x-auto bg-white dark:bg-[#20293d] dark:text-white shadow-md">
        <Table className="">
          <TableHeader className=" ">
            <TableRow className="bg-base-200 hover:bg-base-300 dark:bg-gray-700">
              <TableHead className="font-bold text-black dark:text-white text-left">Photo</TableHead>
              <TableHead className="font-bold text-black dark:text-white text-left">Name</TableHead>
              <TableHead className="font-bold text-black dark:text-white text-left">Email</TableHead>
              <TableHead className=" font-bold text-black dark:text-white text-left">Register At</TableHead>
              <TableHead className=" font-bold text-black dark:text-white text-left">Assign Role</TableHead>
              <TableHead className=" font-bold text-black dark:text-white text-left">Current Role</TableHead>
              <TableHead className=" text-center font-bold dark:text-white text-black">Subscription</TableHead>
              <TableHead className="font-bold text-black dark:text-white text-left">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="">
            {isLoading
              ? Array.from({ length: itemsPerPage }).map((_, index) => (
                  <SkeletonRow key={index} />
                ))
              : paginatedUsers.map((user, index) => (
                  <TableRow
                    key={user._id}
                    className="hover:bg-base-200 dark:hover:bg-gray-700"
                  >
                    <TableCell className="">
                      <Avatar>
                        <AvatarImage src={user?.photo || "/random_user.jpg"} alt={user?.name} />
                      </Avatar>
                    </TableCell>

                    <TableCell className="">{user.name}</TableCell>
                    <TableCell className="">{user.email}</TableCell>
                    <TableCell className="text-blue-600">
                      {user.date && moment(user.date).fromNow() || "Just Now"}
                    </TableCell>
                    <TableCell className="">
                      {user.role === "admin" ? (
                        <Button size="sm" className=" bg-blue-300 text-gray-700 dark:text-black rounded-lg font-medium hover:bg-blue-200 transition-colors duration-200">
                          Admin Role
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleMakeAdmin(user)}
                          className=" bg-green-100 dark:bg-green-400 text-gray-700 rounded-lg font-medium hover:bg-green-200 transition-colors duration-200"
                          size="sm"
                        >
                          Make Admin
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>
                      {user.role === "bronze" && (
                        <Button size="sm" className=" bg-gray-300  text-gray-600 dark:text-black rounded-lg font-medium  transition-colors duration-200">
                          User
                        </Button>
                      )}
                      {user.role === "gold" && (
                        <Button size="sm" className=" bg-yellow-300 dark:bg-yellow-200  text-gray-700 dark:text-black rounded-lg font-medium  transition-colors duration-200">
                          Member
                        </Button>
                      )}

                      {user.role === "admin" && (
                        <Button size="sm" className=" bg-blue-300 text-gray-700 dark:text-black rounded-lg font-medium  transition-colors duration-200">
                          Admin
                        </Button>
                      )}
                    </TableCell>
                    <TableCell className="flex justify-center items-center">
                      <Button size="sm" variant="ghost">

                        <RiMedalFill
                        className={`text-3xl ${
                          user.role === "bronze"
                            ? "text-gray-600"
                            : user.role === "gold"
                            ? "text-yellow-300"
                            : user.role === "admin"
                            ? "text-blue-500"
                            : "text-gray-500"
                        }`}
                      />
                      </Button>
                    </TableCell>
                    <TableCell className="">
                      <Button
                      variant="destructive"
                    size="sm"
                    className="text-red-500"
                        
                        onClick={() => handleDeleteUser(user)}
                        
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
              key={i}
               size="sm"
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
            onClick={() => handlePageChange(currentPage + 1)}
             size="sm"
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

export default ManageUsers;
