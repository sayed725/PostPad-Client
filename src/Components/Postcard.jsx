import { useState } from "react";
import { FaRegCommentDots, FaShareAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BiSolidDownvote, BiSolidUpvote } from "react-icons/bi";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./LoadingSpinner";
import moment from "moment/moment";












const PostCard =({post})=> {
    const axiosPublic = useAxiosPublic()
    const [expanded, setExpanded] = useState(false);

    const {_id,title,authorName, authorImage, authorEmail, description, usedTag, image, upVote, dawnVote, time} = post


    const { refetch:cRefetch, data: comments , isLoading:isLoad  } = useQuery({
        queryKey: ['comments', _id],
        queryFn: async() => {
            const res = await axiosPublic.get(`/comments?id=${_id}`);
            return res.data;
        }
    })


    if(isLoad){
        return <LoadingSpinner></LoadingSpinner>
    }

    // console.log(post)
    return (
       <Link to={`/posts/${_id}`}>
        <div className="mx-auto bg-white dark:bg-[#20293d] dark:text-white shadow-lg rounded-lg p-5">
            {/* Author Section */}
            <div className="flex items-center space-x-3">
                <img 
                    src={authorImage}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                />
                <div>
                    <h3 className="font-semibold">{authorName}</h3>
                    <p className="text-gray-500 dark:text-gray-300 text-sm">{time && moment(time).fromNow()}</p>
                </div>
            </div>

            {/* Post Content */}
            <p className="mt-3 text-xl font-semibold">{title}</p>
            <p className="mt-3 text-gray-700 dark:text-white">
            {expanded ? description : `${description.slice(0, 200)}...`}
            <span className="ml-2 font-semibold">{usedTag}</span>
                {!expanded && (
                    <button 
                        onClick={() => setExpanded(true)} 
                        className="text-blue-500 ml-2"
                    >
                        Read More
                    </button>
                )}
               
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
            <div className="flex items-center justify-between mt-4 text-gray-600  ">
                <div className="flex items-center space-x-2 ">
                    <div className="flex gap-2 btn btn-sm dark:bg-[#20293d] dark:text-white dark:hover:text-blue-500 hover:text-blue-500" >
                    {/* <BiSolidUpvote className="text-xl cursor-pointer h" /> */}
                    <p>  UpVote · {upVote}</p>
                    </div>
                    <div className="flex gap-2 btn btn-sm dark:bg-[#20293d] dark:text-white dark:hover:text-blue-500 hover:text-blue-500">
                    {/* <BiSolidDownvote className="text-xl cursor-pointer " /> */}
                    <p> DawnVote · {dawnVote}</p>
                    </div>
                    
                </div>



                <div className="flex dark:text-white  items-center space-x-4">

                    {/* comment  */}
                    <div 
                     className="flex items-center dark:hover:text-blue-500 hover:text-blue-500 space-x-1">
                        <FaRegCommentDots className="text-xl cursor-pointer" />
                        <span>{comments.length}</span>
                    </div>


                    <div className="flex hover:to-blue-500 dark:hover:text-blue-500 items-center space-x-1">
                        <FaShareAlt className="text-xl cursor-pointer" />
                        
                    </div>
                </div>
            </div>
        </div></Link>
    );
}

export default PostCard;
