import React from 'react'
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useNotification = () => {
    const axiosPublic = useAxiosPublic()
  const {
    refetch: refetchNotification,
    data: Notifications = [],
    isLoading: isNotificationLoading,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await axiosPublic.get("/announcement");
      return res.data;
    },
  });
  return [ Notifications, isNotificationLoading, refetchNotification ];
}

export default useNotification;