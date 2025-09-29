import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import AdminCommentState from './AdminCommentState';
import { Helmet } from 'react-helmet-async';

const AdminReport = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { refetch, data: reports = [], isLoading } = useQuery({
    queryKey: ['reports'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/report`);
      return res.data;
    },
  });

  // Pagination logic
  const totalPages = Math.ceil(reports.length / itemsPerPage);
  const paginatedReports = reports.slice(
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
    <tr className="border-b border-gray-200 dark:border-gray-700 animate-pulse">
      <td className="px-6 py-4">
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-64"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
      </td>
    </tr>
  );

  return (
    <div className="container mx-auto p-6 min-h-screen  dark:bg-black transition-colors duration-300">
      <Helmet>
        <title>PostPad | Admin | Report Management</title>
      </Helmet>

      <div className=" dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
        {isLoading ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-800 dark:text-gray-200">
              <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                <tr>
                  <th scope="col" className="px-6 py-4 font-semibold">#</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Email</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Comment</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Reason</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Remove Comment</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Remove User</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: itemsPerPage }).map((_, index) => (
                  <SkeletonRow key={index} />
                ))}
              </tbody>
            </table>
          </div>
        ) : reports.length === 0 ? (
          <div className="text-center py-12">
            <h1 className="text-xl font-medium text-gray-500 dark:text-gray-400">
              No Reports Found
            </h1>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-800 dark:text-gray-200">
              <thead className="text-xs uppercase bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 ">
                <tr className="">
                  <th scope="col" className="px-6 py-4 font-semibold">#</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Email</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Comment</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Reason</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Remove Comment</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Remove User</th>
                </tr>
              </thead>
              <tbody>
                {paginatedReports.map((report, index) => (
                  <AdminCommentState
                    key={report._id || index}
                    report={report}
                    index={(currentPage - 1) * itemsPerPage + index + 1}
                    refetch={refetch}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination controls */}
      {reports.length > 0 && (
        <div className="flex justify-center items-center mt-8 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                currentPage === i + 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminReport;