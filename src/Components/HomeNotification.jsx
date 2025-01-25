import React from "react";
import { FaEllipsisH } from "react-icons/fa";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../Components/LoadingSpinner";

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

  // console.log(Notifications);

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div className=" bg-white shadow-lg mt-10">
      <div className="p-5">
        <h2 className="text-xl font-semibold border-b-2 border-[#005694] pb-1 w-[120px] ">
          Announcement
        </h2>

        {Notifications.map((notification) => (
          <div
            key={notification._id}
            className="border-b  flex flex-col space-y-2 my-5 pb-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div
                  className={
                    "w-8 h-8 rounded-full text-white flex items-center justify-center"
                  }
                >
                  <img
                    src={notification.authorImage}
                    alt=""
                    className="rounded-full"
                  />
                </div>
                <div>
                  <p className="font-semibold">{notification.authorName}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(notification.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <FaEllipsisH className="text-gray-500 cursor-pointer" />
            </div>

            <p className="text-gray-700">{notification.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeNotification;
