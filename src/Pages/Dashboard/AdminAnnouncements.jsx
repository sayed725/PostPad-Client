import React from 'react';

import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';

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


            <div className="mx-auto bg-white dark:bg-[#20293d] dark:text-white shadow-md rounded-lg overflow-hidden">
                    <div className="flex items-center justify-between p-2 sm:p-10">
                      <div className="flex items-center">
                        <img
                          className="w-16 h-16 rounded-full border-2 border-blue-500"
                          src={user && user?.photoURL}
                          alt="User avatar"
                        />
                        <div className="ml-2 sm:ml-5">
                          <div className="flex items-center">
                            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                              {user && user?.displayName}
                            </h2>
                          </div>
                          <p className="text-gray-600 dark:text-gray-300">{user && user?.email}</p>
                        </div>
                      </div>
                    </div>
                    </div>




           <form onSubmit={handleSubmit}
            className='mx-auto mt-10 bg-white dark:bg-[#20293d] dark:text-white shadow-lg rounded-lg overflow-hidden p-2 sm:p-10'>


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
                className='block w-full px-4 py-2 mt-2 dark:bg-[#20293d] dark:text-white text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              />
            </div>



           <div className='flex flex-col gap-2 mt-4'>
            <label className='text-gray-700 dark:text-white ' htmlFor='description'>
                Description
            </label>
            <textarea
              className='block w-full px-4 py-2 mt-2 dark:bg-[#20293d] dark:text-white text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              name='description'
              placeholder='Description'
              id='description'
              required
            ></textarea>
          </div>
          </div>

         <div>
         <button className="btn mt-10  bg-[#005694] text-white hover:bg-[#005694]">
              Make Announcement
            </button>
         </div>


           </form>
        </div>
    );
};

export default AdminAnnouncements;