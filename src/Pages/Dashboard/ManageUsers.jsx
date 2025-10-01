import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaSearch, FaTrashAlt } from "react-icons/fa";
import { RiMedalFill } from "react-icons/ri";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ["users", searchQuery],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchQuery=${searchQuery}`);
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is an Admin Now!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleDeleteUser = (user) => {
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
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
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

  // Skeleton Loader Component
  const SkeletonRow = () => (
    <tr className="animate-pulse">
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-8"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-12 mx-auto"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
      </td>
    </tr>
  );

  return (
    <div className="container mx-auto min-h-screen  dark:bg-[#171717]">
      <Helmet>
        <title>PostPad | Admin | User Management</title>
      </Helmet>
      <div className="flex flex-col sm:flex-row gap-6 items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">All Users</h2>
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            name="search"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            placeholder="Search by UserName..."
            className="w-full  dark:bg-gray-800 dark:text-white text-gray-800 rounded-lg py-3 px-5 pl-12 outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 text-lg" />
        </div>
        <h2 className="text-xl font-semibold text-gray-600 dark:text-gray-300">
          Total Users: {users.length}
        </h2>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white">
          <thead className="bg-gray-200 dark:bg-gray-700 text-lg font-semibold text-gray-700 dark:text-gray-200">
            <tr>
              <th className="px-6 py-4 text-left">#</th>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Role</th>
              <th className="px-6 py-4 text-center">Subscription</th>
              <th className="px-6 py-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: itemsPerPage }).map((_, index) => (
                <SkeletonRow key={index} />
              ))
            ) : (
              paginatedUsers.map((user, index) => (
                <tr
                  key={user._id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <td className="px-6 py-4">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">
                    {user.role === "admin" ? (
                      <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg font-medium hover:bg-blue-200 transition-colors duration-200">
                        Admin Role
                      </button>
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="px-4 py-2 bg-green-100 text-green-600 rounded-lg font-medium hover:bg-green-200 transition-colors duration-200"
                      >
                        Make Admin
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4 flex justify-center">
                    <RiMedalFill
                      className={`text-3xl ${
                        user.role === "bronze" ? "text-gray-600" :
                        user.role === "gold" ? "text-yellow-500" :
                        user.role === "admin" ? "text-blue-500" : "text-gray-500"
                      }`}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDeleteUser(user)}
                      className="p-2 rounded-full hover:bg-red-100 transition-colors duration-200"
                    >
                      <FaTrashAlt size={18} className="text-red-600" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center items-center mt-8">
        <div className="flex gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-400"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              } transition-colors duration-200`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-400"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;