import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaSearch, FaTrashAlt } from "react-icons/fa";
import { RiMedalFill } from "react-icons/ri";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import LoadingSpinner from "../../Components/LoadingSpinner";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: users = [], isLoading,refetch } = useQuery({
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

  

  return (
    <div className="rounded-md min-h-screen">
      <div className="flex flex-col sm:flex-row gap-5 sm:gap-0 justify-between items-center mb-5 px-4">
        <h2 className="text-3xl">All Users</h2>
       <div className="relative ">
                 <input
                   type="text"
                   name='search'
                   onChange={e => setSearchQuery(e.target.value)}
                   value={searchQuery}
                   placeholder="Search by UserName...."
                   className="w-full max-w-xs bg-white dark:bg-[#20293d] dark:text-white  text-black rounded-lg py-3 px-5 pl-12 outline-none focus:ring-2 focus:ring-blue-500"
                 />
                 <FaSearch className="absolute left-4 top-3 text-blue-500 text-xl" />
               </div>
        <h2 className="text-3xl">Total Users: {users.length}</h2>
      </div>
      {isLoading && <LoadingSpinner></LoadingSpinner>}

      <div className="overflow-x-auto w-full">
        <table className="table w-full bg-white dark:bg-[#20293d] dark:text-white">
          {/* head */}
          <thead className="text-xl font-semibold">
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Subscription Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user, index) => (
              <tr key={user._id}>
                <th>{(currentPage - 1) * itemsPerPage + index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    <button className="btn btn-sm hover:text-white hover:bg-[#005694]">
                      Admin Role
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn btn-sm hover:text-white hover:bg-[#005694]"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
                <td className="px-4 flex justify-center items-center py-4 text-sm text-gray-500 whitespace-nowrap">
                  <RiMedalFill
                    className={`${user.role === "bronze" && "text-4xl mt-3"} ${
                      user.role === "gold" && "text-4xl text-yellow-500 mt-3"
                    } ${
                      user.role === "admin" && "text-4xl text-blue-500 mt-3"
                    }`}
                  ></RiMedalFill>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="btn btn-ghost btn-md"
                  >
                    <FaTrashAlt size={20} className="text-red-600"></FaTrashAlt>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center items-center mt-5">
         <Helmet> <title>PostPad | Admin | UserManagement </title></Helmet>
        <div className="btn-group flex gap-5 sm:gap-10">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="btn text-white btn-sm bg-[#005694] hover:bg-[#005694]"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`btn ${currentPage === i + 1 ? "btn-active btn text-white btn-sm bg-[#005694] hover:bg-[#005694]" : "btn btn-sm"}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="btn text-white btn-sm bg-[#005694] hover:bg-[#005694]"
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
