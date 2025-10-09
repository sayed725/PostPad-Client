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
import Add2 from '../Components/Add2';

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
        <div className=''> 
           <Helmet> <title>PostPad | Home </title></Helmet>
           <div className='lg:grid p-1 sm:p-0 sm:grid-cols-5 gap-7 max-w-7xl mx-auto'>
            <div className='hidden lg:block '>
            <Tags ></Tags>
            <HomeNotification></HomeNotification>
            
            <div className='py-5'>
            <Add2></Add2>
            </div>
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