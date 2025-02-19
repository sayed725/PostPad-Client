import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import AdminCommentState from './AdminCommentState';
import LoadingSpinner from './LoadingSpinner';

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

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (reports.length === 0) {
    return <h1 className="text-2xl py-10 text-center">No Reports Found</h1>;
  }

  // Pagination fn
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

  return (
    <div className="py-[50px] overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 dark:bg-[#20293d] dark:text-white">
        <thead>
          <tr>
            <th></th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Comment</th>
            <th className="px-4 py-2 border">Reason</th>
            <th className="px-4 py-2 border">Remove Comment</th>
            <th className="px-4 py-2 border">Remove User</th>
          </tr>
        </thead>
        <tbody>
          {paginatedReports.map((report, index) => (
            <AdminCommentState
              key={index}
              report={report}
              index={(currentPage - 1) * itemsPerPage + index}
              refetch={refetch}
            />
          ))}
        </tbody>
      </table>

      {/* Pagination  */}
      <div className="flex justify-center items-center mt-5">
        <div className="btn-group flex gap-5 sm:gap-10">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="btn-active btn text-white btn-sm bg-[#005694] hover:bg-[#005694]"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`btn ${currentPage === i + 1 ? ' btn-active btn text-white btn-sm bg-[#005694] hover:bg-[#005694]' : 'btn btn-sm'}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="btn-active btn text-white btn-sm bg-[#005694] hover:bg-[#005694]"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminReport;
