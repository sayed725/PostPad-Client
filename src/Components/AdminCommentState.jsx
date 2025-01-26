import React, { useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";
import ReactDOM from "react-dom";


const AdminCommentState = ({ report, index, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [modalData, setModalData] = useState({
    isOpen: false,
    commentText: "",
  });
  const [disabled, setDisabled] = useState(false);

  const openModal = (commentText) => {
    setModalData({ isOpen: true, commentText });
  };

  const closeModal = () => {
    setModalData({ isOpen: false, commentText: "" });
  };

  const removeComment = (id) => {
    // console.log('report', id)

    axiosSecure.delete(`/remove-comment/${id}`).then((res) => {
      // console.log(res.data)
      if (res.data.deletedCount > 0) {
        toast.success("Comment removed");
        axiosSecure.delete(`remove-report/${report._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
          }
        });
      }
    });
  };

  const removeUser = (email)=>{
    axiosSecure.delete(`/remove-user/${email}`).then((res)=>{
      if(res.data.deletedCount > 0){
        toast.success("User removed Successfully")

        axiosSecure.delete(`remove-report/${report._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
          }
        });



      }
  })
}





  return (
    <>
      <tr>
        <td className="px-4 py-2 border">{index + 1}</td>
        <td className="px-4 py-2 border">{report.reportFor}</td>
        <td className="px-4 py-2 border">
          {report.report.comment.length > 20 ? (
            <>
              {report.report.comment.substring(0, 20)}...
              <button
                onClick={() => openModal(report.report.comment)}
                className="text-blue-500 underline ml-1"
              >
                Read More
              </button>
            </>
          ) : (
            report.report.comment
          )}
        </td>
        <td className="px-4 py-2 border text-center">{report.reportReason}</td>
        <td className="px-4 py-2 border text-center">
          <button
            disabled={disabled}
            onClick={() => removeComment(report.reportCommentId)}
            className="btn  bg-[#005694] text-white hover:bg-[#005694]"
          >
            Remove
          </button>
        </td>
        <td className="px-4 py-2 border text-center">
          <button  onClick={() => removeUser(report.reportFor)}
          className="btn  bg-[#005694] text-white hover:bg-[#005694]">
            Remove User
          </button>
        </td>
      </tr>

      {/* Modal */}
      
     {modalData.isOpen &&
        ReactDOM.createPortal(
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
                className="btn bg-[#005694] text-white hover:bg-[#005694]"
              >
                Close
              </button>
            </div>
          </div>,
          document.body 
        )}
    </>
  );
};

export default AdminCommentState;
