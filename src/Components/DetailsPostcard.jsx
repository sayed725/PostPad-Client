import { FaRegCommentDots, FaShareAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BiSolidDownvote, BiSolidUpvote } from "react-icons/bi";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { FaEllipsisH } from "react-icons/fa";
import { useState } from "react";
import useAuth from "../Hooks/useAuth";

const DetailsPostCard =({post, refetch})=> {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()

    const {_id,title,authorName, authorImage, authorEmail, description, usedTag, image, upVote, dawnVote, time} = post

    // const comments = ['i ama a good person', 'i want to  work daily']


    const [comments, setComments] = useState([
        {
          id: 1,
          user: "Rajesh Ali",
          date: "29 জুলাই",
          text: "বাহ দারুণ লাগলো",
          upvotes: 10,
          downvotes: 2,
          avatarColor: "bg-gray-500",
        },
        {
          id: 2,
          user: "Shahidul Islam",
          date: "19 অক্টোবর",
          text: "এখানে দেওয়া ছবির দ্বারা কি বোঝানো হয়েছে",
          upvotes: 5,
          downvotes: 1,
          avatarColor: "bg-red-500",
        },
      ]);


      const handleCommentSubmit = (e)=>{
        e.preventDefault();

      const commentItem = {
         comment: e.target.comment.value,
         postId: _id,
         commentUser: user?.displayName,
         commentImg: user?.photoURL,
         commentEmail: user?.email
      }

    //   console.log(commentItem) 

      axiosSecure.post('/add-comment', commentItem)
      .then(res=>{
        console.log(res.data)
        if(res.data.insertedId){
            toast.success('Comment Added')
        }
      })

      }
    
     










   const setUpvote = (upPost)=>{
     axiosSecure.put(`post/upvote`,upPost).then((res) => {
        //   console.log(res.data)
          if (res.data.modifiedCount > 0) {
              toast.success('Post UpVoted')
              refetch()
            }
        });
   }
   const setDawnVote = (dwPost)=>{
     axiosSecure.put(`/post/dawnvote`,dwPost).then((res) => {
        //   console.log(res.data)
          if (res.data.modifiedCount > 0) {
           toast.success('Post DawnVoted')
           refetch()
          }
        });
   }


    // console.log(post)
    return (
       
        <div className="lg:w-7/12 mx-auto bg-white shadow-lg rounded-lg p-5">
            {/* Author Section */}
            <div className="flex items-center space-x-3">
                <img 
                    src={authorImage}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                />
                <div>
                    <h3 className="font-semibold">{authorName}</h3>
                    <p className="text-gray-500 text-sm">{new Date(time).toLocaleDateString()}</p>
                </div>
            </div>

            {/* Post Content */}
            <p className="mt-3 text-gray-700">
            {description}
            <span className="ml-2 font-semibold">{usedTag}</span>

               
            </p>

            {/* Post Image */}
            <div className="mt-4">
                <img 
                    src={image} 
                    alt="Post" 
                    className="w-full h-[350px] object-cover rounded-lg"
                />
            </div>

            {/* Likes, Comments, and Share */}
            <div className="flex items-center justify-between mt-4 text-gray-600 ">
                <div className="flex items-center space-x-1 sm:space-x-2 ">
                    <div onClick={()=>setUpvote(post)} 
                     className="flex gap-2 btn btn-sm hover:text-blue-500">
                    <BiSolidUpvote className="text-xl cursor-pointer h" />
                    <p>UpVote · {upVote}</p>
                    </div>
                    <div onClick={()=>setDawnVote(post)}
                     className="flex gap-2 btn btn-sm hover:text-blue-500">
                    <BiSolidDownvote className="text-xl cursor-pointer " />
                    <p>DawnVote · {dawnVote}</p>
                    </div>
                    
                </div>



                <div className="flex items-center space-x-2 sm:space-x-4">

                    {/* comment  */}
                    <Link to={'/okok'}
                     className="flex items-center space-x-1">
                        <FaRegCommentDots className="text-xl cursor-pointer" />
                        <span>41</span>
                    </Link>


                    <div className="flex items-center space-x-1">
                        <FaShareAlt className="text-xl cursor-pointer" />
                        <span>07</span>
                    </div>
                </div>
            </div>



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
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="border-b pb-3 mb-3 flex flex-col space-y-2"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full ${comment.avatarColor} text-white flex items-center justify-center`}>
                {/* {comment.user.charAt(0)} */}
              </div>
              <div>
                <p className="font-semibold">{comment.user}</p>
                <p className="text-xs text-gray-500">{comment.date}</p>
              </div>
            </div>
            <FaEllipsisH className="text-gray-500 cursor-pointer" />
          </div>

          <p className="text-gray-700">{comment.text}</p>

          {/* Upvote / Downvote Buttons */}
         
        </div>
      ))}

     
    </div>
















        </div>
    );
}

export default DetailsPostCard;
