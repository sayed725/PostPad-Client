import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import AdminCommentState from './AdminCommentState';
import LoadingSpinner from './LoadingSpinner';

const AdminReport = () => {
    const axiosSecure = useAxiosSecure()


    const { refetch, data: reports = [] , isLoading  } = useQuery({
        queryKey: ['reports',],
        queryFn: async() => {
            const res = await axiosSecure.get(`/report`);
            return res.data;
        }
    })

  //  console.log(reports)

   if(isLoading){
    return <LoadingSpinner></LoadingSpinner>
   }

   if  (reports.length === 0){
       return <h1 className='text-2xl py-10 text-center'>No Reports Found</h1>
   }






    return (
        <div className='py-[50px] overflow-x-auto'>
            <table className="min-w-full bg-white border border-gray-300">
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
          {reports.map((report,index) => (
              <AdminCommentState key={index} report={report} index={index} refetch={refetch} />
            ))}
          </tbody>
        </table>
        </div>
    );
};

export default AdminReport;