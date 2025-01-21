import React from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const UserPost = () => {

    const { user } = useAuth()

    const axiosSecure = useAxiosSecure()


   

    const { data: posts = [], isLoading } = useQuery({
        queryKey: ['userPosts', user],
        queryFn: async() => {
            const res = await axiosSecure.get(`/post/${user?.email}`);
            return res.data;
        }
    })

    console.log(posts)




    return (
        <div>
             <div className="rounded-md min-h-screen">

             <div className="mb-5">
             <h2 className="text-3xl text-center">Hi! {user&& user?.displayName}</h2>
      </div>
                  
                    
                    
                  
            
                  <div className="overflow-x-auto w-full">
                    <table className="table table-zebra w-full bg-white">
                      {/* head */}
                      <thead className="text-xl font-semibold">
                        <tr>
                          <th></th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Role</th>
                          <th>Subscription Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* {users.map((user, index) => ( */}
                          <tr key={user._id}>
                            {/* <th>{index + 1}</th> */}
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                              {user.role === "admin" ? (
                                <button className="btn  bg-[#005694] text-white hover:bg-[#005694]">
                                  Admin Role
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleMakeAdmin(user)}
                                  className="btn bg-[#005694] text-white hover:bg-[#005694]"
                                >
                                  Make Admin
                                </button>
                              )}
                            </td>
                            <td className="px-4 flex justify-center items-center py-4 text-sm text-gray-500  whitespace-nowrap">
                              {/* <RiMedalFill
                                className={`${user.role === "bronze" && "text-4xl mt-3"} ${
                                  user.role === "gold" && "text-4xl text-yellow-500 mt-3"
                                } ${
                                  user.role === "admin" && "text-4xl text-blue-500 mt-3"
                                } `}
                              ></RiMedalFill> */}
                            </td>
                            <td>
                              <button
                                onClick={() => handleDeleteUser(user)}
                                className="btn btn-ghost btn-lg"
                              >
                                {/* <FaTrashAlt className="text-red-600"></FaTrashAlt> */}
                              </button>
                            </td>
                          </tr>
                        {/* ))} */}
                      </tbody>
                    </table>
                  </div>
                </div>
        </div>
    );
};

export default UserPost;