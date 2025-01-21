import React from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import useAuth from '../Hooks/useAuth';
import { FaEllipsisH } from "react-icons/fa";

const DetailsComment = ({ comments, cRefetch}) => {

    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()


    const handleCommentSubmit = (e)=>{
        e.preventDefault();

      const commentItem = {
         comment: e.target.comment.value,
         postId: _id,
         commentUser: user?.displayName,
         commentImg: user?.photoURL,
         commentEmail: user?.email,
         commentTime: new Date(),
      }

    //   console.log(commentItem) 

      axiosSecure.post('/add-comment', commentItem)
      .then(res=>{
        console.log(res.data)
        if(res.data.insertedId){
            toast.success('Comment Added')
            e.target.reset()
            cRefetch()
            
        }
      })

      }





    return (
       <div className="my-5 mx-auto bg-white  rounded-md">
             {/* Comment Input */}
             <div className="flex items-center space-x-2 border-b pb-3 mb-3 ">
               <div className="w-11 h-11 rounded-full flex items-center justify-center">
                <img src={user.photoURL} alt=""  className="rounded-full "/>
               </div>
              <form onSubmit={handleCommentSubmit}
              className="flex items-center justify-between w-full gap-2">
              <input
                 type="text"
                 name="comment"
                 placeholder="Write a Comment..."
                 className="w-full input input-bordered text-gray-600 bg-gray-100 p-3 rounded-md focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
               />
               <button className="bg-[#005694] hover:bg-[#005694] text-white px-4 py-3 rounded-md">
                 Comment
               </button>
              </form>
             </div>
       
             {/* Comments List */}
             {comments.map(comment => (
               <div
                 key={comment._id}
                 className="border-b pb-3 mb-3 flex flex-col space-y-2"
               >
                 <div className="flex items-center justify-between">
                   <div className="flex items-center space-x-2">
                     <div className={'w-8 h-8 rounded-full text-white flex items-center justify-center'}>
                       {/* {comment.user.charAt(0)} */}
                       <img src={comment.commentImg} alt="" className="rounded-full" />
                     </div>
                     <div>
                       <p className="font-semibold">{comment.commentUser}</p>
                       <p className="text-xs text-gray-500">{new Date(comment.commentTime).toLocaleDateString()}</p>
                     </div>
                   </div>
                   <FaEllipsisH className="text-gray-500 cursor-pointer" />
                 </div>
       
                 <p className="text-gray-700">{comment.comment}</p>
                
               </div>
             ))}
       
            
           </div>
    );
};

export default DetailsComment;