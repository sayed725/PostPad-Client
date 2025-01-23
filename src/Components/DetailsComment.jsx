import React, { useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import { FaEllipsisH } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import CommentState from "./CommentState";
import LoadingSpinner from "./LoadingSpinner";



const DetailsComment = () => {
  const { id } = useParams();

  

  console.log(id)

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    refetch,
    data: comments = [],
    isLoading,
  } = useQuery({
    queryKey: ["postComments", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/comments?id=${id}`);
      return res.data;
    },
  });

  if(isLoading){
    return <LoadingSpinner></LoadingSpinner>
  }


  // const [modalData, setModalData] = useState({ isOpen: false, commentText: "" });

  // const openModal = (commentText) => {
  //   setModalData({ isOpen: true, commentText });
  // };

  // const closeModal = () => {
  //   setModalData({ isOpen: false, commentText: "" });
  // };

  // const [commentsState, setCommentsState] = useState('');

  // const feedbackOptions = [
  //   "Inappropriate content",
  //   "Spam or irrelevant",
  //   "Harassment or abuse",
  // ];


 
    // console.log(commentsState)

    console.log(comments)

  // axiosSecure.post('/add-comment', commentItem)
  // .then(res=>{
  //   console.log(res.data)
  //   if(res.data.insertedId){
  //       toast.success('Comment Added')
  //       e.target.reset()
  //       cRefetch()

  //   }
  // })

  return (
    <div className="mt-10 mx-auto bg-white  rounded-md p-5 shadow-lg">
      <div className="overflow-x-auto w-full">


      <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th></th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Comment</th>
              <th className="px-4 py-2 border">Feedback</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment,index) => (
              <CommentState key={index} comment={comment} index={index} />
            ))}
          </tbody>
        </table>










        {/* <table className="table table-zebra w-full bg-white">
          <thead className="text-xl font-semibold">
            <tr>
              <th></th>
              <th>Commenter Email</th>
              <th>Comment</th>
              <th>Feedback</th>
              <th>Report</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{comment.commentEmail}</td>
                <td> {comment.comment.length > 20 ? (
                    <>
                      {comment.comment.substring(0, 20)}...
                      <button
                        onClick={() => openModal(comment.comment)}
                        className="text-blue-500 underline ml-1"
                      >
                        Read More
                      </button>
                    </>
                  ) : (
                    comment.comment
                  )}</td>
                <td>
                <select
              name='report'
              id='report'
              onChange={e => setCommentsState(e.target.value)}
              value={commentsState}
              className='border p-4 rounded-md'
            >
              <option value="">Select an option</option>
              <option >Inappropriate content</option>
              <option >Spam or irrelevant</option>
              <option >Harassment or abuse</option>
            </select>
                </td>

                <td>
                <button disabled={commentsState==''}
                className="btn  bg-[#005694] text-white hover:bg-[#005694]">
                      Report
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}

      </div>


      {/* Modal */}
      {/* {modalData.isOpen && (
        <div
          className="fixed inset-0 bg-gray-900 z-50 bg-opacity-50 flex justify-center items-center"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 w-3/4 md:w-1/2"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold mb-4">Full Comment</h2>
            <p className="text-gray-700 mb-6">{modalData.commentText}</p>
            <button
              onClick={closeModal}
              className="btn  bg-[#005694] text-white hover:bg-[#005694]"
            >
              Close
            </button>
          </div>
        </div>
      )} */}









      {/* Comments List */}
      {/* {comments.map(comment => ( */}
      {/* <div
                 key={comment._id}
                 className="border-b pb-3 mb-3 flex flex-col space-y-2"
               >
                 <div className="flex items-center justify-between">
                   <div className="flex items-center space-x-2">
                     <div className={'w-8 h-8 rounded-full text-white flex items-center justify-center'}>
                      
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
                
               </div> */}
      {/* ))} */}
    </div>
  );
};

export default DetailsComment;
