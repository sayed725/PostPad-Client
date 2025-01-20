import { FaRegCommentDots, FaShareAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BiSolidDownvote, BiSolidUpvote } from "react-icons/bi";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const DetailsPostCard =({post, refetch})=> {
    const axiosSecure = useAxiosSecure()

    const {_id,title,authorName, authorImage, authorEmail, description, usedTag, image, upVote, dawnVote, time} = post


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
            <span className="ml-2 font-semibold">#{usedTag}</span>

               
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
                <div className="flex items-center space-x-2 ">
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



                <div className="flex items-center space-x-4">

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
        </div>
    );
}

export default DetailsPostCard;
