import React from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../Components/LoadingSpinner';
import { FaTrash } from "react-icons/fa6";
import Swal from 'sweetalert2';

const UserPost = () => {

    const { user } = useAuth()

    const axiosSecure = useAxiosSecure()


   

    const { refetch,data: posts = [], isLoading } = useQuery({
        queryKey: ['userAllPosts', user],
        queryFn: async() => {
            const res = await axiosSecure.get(`/allpost/${user?.email}`);
            return res.data;
        }
    })

    // console.log(posts)

    if(isLoading){
        <LoadingSpinner></LoadingSpinner>
    }

    const handleDelete = (id)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/post/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your post has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }




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
                          <th>Post Title</th>
                          <th>No Of Votes</th>
                          <th>Comment</th>
                          <th>Delete</th>
                         
                        </tr>
                      </thead>
                      <tbody>
                        {posts.map((post, index) => (
                          <tr key={index}>
                            <th>{index + 1}</th>
                            <td>{post.title}</td>
                            <td>{post.upVote}</td>
                            <td><button className='btn'>All Comments</button></td>







                            <td><button onClick={()=>handleDelete(post._id)}
                             className='btn text-2xl text-red-500'><FaTrash></FaTrash></button></td>
                            
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
        </div>
    );
};

export default UserPost;