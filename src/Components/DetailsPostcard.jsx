import { FaRegCommentDots, FaShareAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BiSolidDownvote, BiSolidUpvote } from "react-icons/bi";

const DetailsPostCard =({post})=> {

    const {_id,title,authorName, authorImage, authorEmail, description, usedTag, image, upVote, dawnVote, time} = post

    console.log(post)
    return (
       <Link >
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
                <div className="flex items-center space-x-2 ">
                    <div className="flex gap-2 btn btn-sm hover:text-blue-500">
                    <BiSolidUpvote className="text-xl cursor-pointer h" />
                    <p>{upVote}</p>
                    </div>
                    <div className="flex gap-2 btn btn-sm hover:text-blue-500">
                    <BiSolidDownvote className="text-xl cursor-pointer " />
                    <p>{dawnVote}</p>
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
        </div></Link>
    );
}

export default DetailsPostCard;
