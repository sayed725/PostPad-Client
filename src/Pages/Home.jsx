import React from 'react';

import useAdmin from '../Hooks/useAdmin';
import useMember from '../Hooks/useMember';
import Tags from '../Components/Tags';
import Add from '../Components/Add';

import ShowPost from '../Components/ShowPost';

import HomeNotification from '../Components/HomeNotification';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    const axiosPublic = useAxiosPublic()
    const [ isAdmin ] = useAdmin()
    const [ isMember] = useMember()

    // console.log('admin',isAdmin)
    // console.log('member', isMember)


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
        <div>
           <Helmet> <title>PostPad | Home </title></Helmet>
           <div className='lg:grid p-1 sm:p-0 sm:grid-cols-5 gap-7'>
            <div className='hidden  lg:block'>
            <Tags></Tags>
            {
                Notifications.length > 0 && <HomeNotification></HomeNotification>
            }
            </div>

            <div className='col-span-3'>
            <ShowPost></ShowPost>
            </div>

            <div>
            <Add></Add>
            </div>

           </div>
        </div>
    );
};

export default Home;