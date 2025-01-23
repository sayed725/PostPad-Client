import React, { useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";

const CommentState = ({ comment, index }) => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
  const [modalData, setModalData] = useState({ isOpen: false, commentText: "" });
  const [feedback, setFeedback] = useState("");



  console.log(feedback)

  const openModal = (commentText) => {
    setModalData({ isOpen: true, commentText });
  };

  const closeModal = () => {
    setModalData({ isOpen: false, commentText: "" });
  };

  const handleReport = (comment) => {

    const reportInfo = {
        reportBy: user.email,
        reportCommentId: comment._id,
        reportReason: feedback,
        reportFor:comment.commentEmail,
        report: comment,
    }

    // console.log('report', reportInfo)

    
   
    axiosSecure.post('/report', reportInfo)
    .then(res=>{
      console.log(res.data)
      if(res.data.insertedId){
          toast.success('Report Received by Admin')
         setFeedback("")
          
      }
    })



  };

  return (
    <>
      <tr>
        <td className="px-4 py-2 border">{index+1}</td>
        <td className="px-4 py-2 border">{comment.commentEmail}</td>
        <td className="px-4 py-2 border">
          {comment.comment.length > 20 ? (
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
          )}
        </td>
        <td className="px-4 py-2 border">
          <select
            className="border rounded p-2 w-full"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          >
            <option value="">Select feedback</option>
            <option value="inappropriate content">Inappropriate content</option>
            <option value="spam">Spam or irrelevant</option>
            <option value="harassment">Harassment or abuse</option>
          </select>
        </td>
        <td className="px-4 py-2 border text-center">
        <button onClick={()=>handleReport(comment)} 
        disabled={feedback ==""}

                className="btn  bg-[#005694] text-white hover:bg-[#005694]">
                      Report
                    </button>
        </td>



      
      </tr>


        {/* Modal */}
        {modalData.isOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex justify-center items-center"
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





      </>
      
    
  );
};

export default CommentState;
