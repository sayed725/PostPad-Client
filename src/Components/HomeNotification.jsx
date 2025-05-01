import React from "react";
import { FaEllipsisH } from "react-icons/fa";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";

const HomeNotification = () => {
  const axiosPublic = useAxiosPublic();

  const {
    refetch,
    data: Notifications = [],
    isLoading,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await axiosPublic.get("/announcement");
      return res.data;
    },
  });

  return (
    <div className="bg-white dark:bg-[#20293d] dark:text-white shadow-lg mt-10">
      <div className="p-5">
        <h2 className="text-xl font-semibold border-b-2 border-[#005694] pb-1 w-[120px]">
          Announcement
        </h2>

        {isLoading ? (
          [1,2].map((_, index) => (
            <div key={index} className="border-b flex flex-col space-y-2 my-5 pb-2 animate-pulse">
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
          ))
        ) : (
          Notifications.map((notification) => (
            <div
              key={notification._id}
              className="border-b flex flex-col space-y-2 my-5 pb-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full text-white flex items-center justify-center">
                    <img
                      src={notification.authorImage}
                      alt=""
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{notification.authorName}</p>
                    <p className="text-xs text-gray-500">
                      {notification.date && moment(notification.date).fromNow()}
                    </p>
                  </div>
                </div>
                <FaEllipsisH className="text-gray-500 cursor-pointer" />
              </div>
              <p className="text-gray-700 dark:text-white">{notification.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HomeNotification;