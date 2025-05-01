import React from 'react';
import { FaEllipsisH } from "react-icons/fa";
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import moment from 'moment';

const Notification = () => {
  const axiosPublic = useAxiosPublic();

  const { refetch, data: Notifications = [], isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const res = await axiosPublic.get('/announcement');
      return res.data;
    },
  });

 

  // if (Notifications.length === 0) {
  //   return (
  //     <div className="min-h-screen container lg:w-7/12 mx-auto border-2 bg-white shadow-lg">
  //       <Helmet>
  //         <title>PostPad | Notification</title>
  //       </Helmet>
  //       <h2 className="text-4xl text-center py-10 border-b-2 font-bold">Notifications</h2>
  //       <p className="text-center text-2xl mt-5 font-semibold">No Notifications</p>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen container lg:w-7/12 mx-auto rounded-md bg-white shadow-lg dark:bg-[#20293d] dark:text-white">
      <Helmet>
        <title>PostPad | Notification</title>
      </Helmet>
      <h2 className="text-4xl text-center py-10 border-b-2 font-bold">Notifications</h2>


      {
        isLoading?  <div className="p-3">
        {[1, 2].map((_, index) => (
          <div key={index} className="border-b p-3 mb-3 flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full" />
                <div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3" />
                  <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mt-1" />
                </div>
              </div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4" />
            </div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3" />
          </div>
        ))}
      </div> :  
        Notifications.map((notification) => (
          <div
            key={notification._id}
            className="border-b p-3 mb-3 flex flex-col space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full text-white flex items-center justify-center">
                  <img src={notification.authorImage} alt="" className="rounded-full" />
                </div>
                <div>
                  <p className="font-semibold">{notification.authorName}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-300">
                    {notification.date && moment(notification.date).fromNow()}
                  </p>
                </div>
              </div>
              <FaEllipsisH className="text-gray-500 cursor-pointer" />
            </div>
            <p className="text-gray-700 dark:text-white">{notification.description}</p>
          </div>
        ))
      }






      
    </div>
  );
};

export default Notification;