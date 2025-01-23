import React, { useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import { FaEllipsisH } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const DetailsComment = () => {
  const { id } = useParams();

  

  // console.log(id)

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    refetch,
    data: comments = [],
    isLoading,
  } = useQuery({
    queryKey: ["comments", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/comments?id=${id}`);
      return res.data;
    },
  });


  const [modalData, setModalData] = useState({ isOpen: false, commentText: "" });

  const openModal = (commentText) => {
    setModalData({ isOpen: true, commentText });
  };

  const closeModal = () => {
    setModalData({ isOpen: false, commentText: "" });
  };

  const [commentsState, setCommentsState] = useState(
    comments.map((comment) => ({
      id: comment.id,
      feedback: "",
      isReported: false,
    }))
  );

  const feedbackOptions = [
    "Inappropriate content",
    "Spam or irrelevant",
    "Harassment or abuse",
  ];


  const handleFeedbackChange = (commentId, selectedFeedback) => {
    setCommentsState((prevState) =>
      prevState.map((comment) =>
        comment.id === commentId
          ? { ...comment, feedback: selectedFeedback, isReported: false }
          : comment
      )
    );
  };

  const handleReportClick = (commentId) => {
    setCommentsState((prevState) =>
      prevState.map((comment) =>
        comment.id === commentId ? { ...comment, isReported: true } : comment
      )
    );
    const reportedComment = commentsState.find((comment) => comment.id === commentId);
    alert(`Reported comment ID: ${commentId} with feedback: "${reportedComment.feedback}"`);
  };
  //   console.log(commentItem)

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
        <table className="table table-zebra w-full bg-white">
          {/* head */}
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
                      className="border rounded p-2 w-full"
                      onChange={(e) =>
                        handleFeedbackChange(comment.id, e.target.value)
                      }
                      value={commentsState.feedback || ""}
                    >
                      <option value="" disabled>
                        Select feedback
                      </option>
                      {feedbackOptions.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                </td>

                <td>
                <button
                      className={`px-4 py-2 rounded text-white ${
                        commentsState.feedback && !commentsState.isReported
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-gray-300 cursor-not-allowed"
                      }`}
                      disabled={!commentsState.feedback || commentsState.isReported}
                      onClick={() => handleReportClick(comment.id)}
                    >
                      {commentsState.isReported ? "Reported" : "Report"}
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>


      {/* Modal */}
      {modalData.isOpen && (
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
      )}









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
