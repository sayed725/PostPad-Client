import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import AdminCommentState from './AdminCommentState';
import { Helmet } from 'react-helmet-async';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../@/components/ui/table";
import { Button } from '../../@/components/ui/button';

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
    <TableRow className="border-b border-gray-200 dark:border-gray-700 animate-pulse">
      <TableCell className="px-6 py-4">
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
      </TableCell>
      <TableCell className="px-6 py-4">
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
      </TableCell>
      <TableCell className="px-6 py-4">
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-64"></div>
      </TableCell>
      <TableCell className="px-6 py-4">
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
      </TableCell>
      <TableCell className="px-6 py-4">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
      </TableCell>
      <TableCell className="px-6 py-4">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
      </TableCell>
    </TableRow>
  );

  return (
    <div className="mx-auto min-h-screen transition-colors duration-300">
      <Helmet>
        <title>PostPad | Admin | Report Management</title>
      </Helmet>

      <div className="mx-auto overflow-x-auto bg-white dark:bg-[#20293d] dark:text-white ">
        {isLoading ? (
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                <TableHead className=" font-semibold text-xs uppercase">#</TableHead>
                <TableHead className=" font-semibold text-xs uppercase">Email</TableHead>
                <TableHead className=" font-semibold text-xs uppercase">Comment</TableHead>
                <TableHead className=" font-semibold text-xs uppercase">Reason</TableHead>
                <TableHead className=" font-semibold text-xs uppercase">Remove Comment</TableHead>
                <TableHead className=" font-semibold text-xs uppercase">Remove User</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: itemsPerPage }).map((_, index) => (
                <SkeletonRow key={index} />
              ))}
            </TableBody>
          </Table>
        ) : reports.length === 0 ? (
          <div className="text-center py-12">
            <h1 className="text-xl font-medium text-gray-500 dark:text-white">
              No Reports Found
            </h1>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-base-200 hover:bg-base-300 dark:bg-gray-700">
                <TableHead className=" font-bold text-black dark:text-white text-center ">#</TableHead>
                <TableHead className=" font-bold text-black dark:text-white text-center ">Email</TableHead>
                <TableHead className=" font-bold text-black dark:text-white text-center ">Comment</TableHead>
                <TableHead className=" font-bold text-black dark:text-white text-center ">Reason</TableHead>
                <TableHead className=" font-bold text-black dark:text-white text-center ">Remove Comment</TableHead>
                <TableHead className=" font-bold text-black dark:text-white text-center ">Remove User</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedReports.map((report, index) => (
                <AdminCommentState
                  key={report._id || index}
                  report={report}
                  index={(currentPage - 1) * itemsPerPage + index + 1}
                  refetch={refetch}
                />
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Pagination controls */}
      {reports.length > 0 && (
        <div className="flex justify-center items-center mt-8 space-x-2">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            className=" bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={` rounded-lg transition-colors duration-200 ${
                currentPage === i + 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            className=" bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default AdminReport;