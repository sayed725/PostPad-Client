import React from 'react';

import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import { Button } from '../../../@/components/ui/button';

const AdminAnnouncements = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    
    const handleSubmit = (e) => {
        e.preventDefault();


        const title = e.target.title.value;
        const description = e.target.description.value;
        const date = new Date();

        const announcement = {
            authorName: user?.displayName,
            authorImage: user?.photoURL,
            title,
            description,
            date,
        }
        // console.log(announcement);

        axiosSecure.post('/add-announcement', announcement).then(res => {
            if(res.data.insertedId){
                toast.success('Announcement Successfully Added')}
        })

      
      
    }





    return (
        <div className='min-h-screen'>
           <Helmet> <title>PostPad | Admin | Announcement </title></Helmet>


            <div className="w-full border shadow-sm border-[#e5e7eb] dark:border-none dark:bg-[#20293d] rounded-lg">
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
           <div className="avatar h-32 w-32 rounded-md">
  <div className="ring-offset-base-100 w-24 rounded-md ring-2 ring-[#005694] ring-offset-2">
    <img src= {user?.photoURL} alt={user?.displayName} />
  </div>
</div>
          </div>

          <div className="flex-grow space-y-4">
            <div>
              <h1 className="text-2xl font-bold">{user?.displayName}</h1>
              <p className="text-muted-foreground font-semibold">
                Email: {user?.email}
              </p>
            </div>

            <p className=" w-full md:w-11/12 lg:w-10/12 xl:w-9/12">
              As an admin, you have the authority to make announcements that will be visible to all users on the platform.
            </p>
            <p className=" w-full md:w-11/12 lg:w-10/12 xl:w-9/12">
              Use the form below to create and publish important updates, news, or information that you want to share with the community.
            </p>
          </div>
        </div>
      </div>
    </div>




           <form onSubmit={handleSubmit}
            className='mx-auto mt-10  dark:bg-[#20293d] dark:text-white shadow-lg rounded-lg overflow-hidden p-2 sm:p-10'>


          <div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-1'>
          <div>
              <label className='text-gray-700 dark:text-white ' htmlFor='title'>
                Title
              </label>
              <input
                id='title'
                name='title'
                type='text'
                placeholder='Title'
                required
                className='block w-full px-4 py-2 mt-2 dark:bg-[#101720] dark:text-white text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              />
            </div>



           <div className='flex flex-col gap-2 mt-4'>
            <label className='text-gray-700 dark:text-white ' htmlFor='description'>
                Description
            </label>
            <textarea
              className='block w-full px-4 py-10 mt-2 dark:bg-[#101720] dark:text-white text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              name='description'
              placeholder='Description'
              id='description'
              required
            ></textarea>
          </div>
          </div>

         <div>
         <Button className=" mt-10  bg-[#005694] text-white hover:bg-[#005694]">
              Make Announcement
            </Button>
         </div>


           </form>
        </div>
    );
};

export default AdminAnnouncements;