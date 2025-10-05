import React, { useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";
import ReactDOM from "react-dom";
import { Button } from '../../@/components/ui/button';


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
      <tr className="hover:bg-base-200 dark:hover:bg-gray-700">
        <td className="px-4 py-2 border dark:border-gray-700">{index + 1}</td>
        <td className="px-4 py-2 border dark:border-gray-700">{report.reportFor}</td>
        <td className="px-4 py-2 border dark:border-gray-700 ">
          {report.report.comment.length > 20 ? (
            <>
              {report.report.comment.substring(0, 20)}...
              <button
                onClick={() => openModal(report.report.comment)}
                className="text-blue-500 underline ml-1 overflow-x-scroll"
              >
                Read More
              </button>
            </>
          ) : (
            report.report.comment
          )}
        </td>
        <td className="px-4 py-2 border text-center dark:border-gray-700">
          <Button
          variant="ghost"
          className="bg-red-300 dark:text-black"
            >
            { report.reportReason.substring(0, 13)}
          </Button>
        </td>
        <td className="px-4 py-2 border text-center dark:border-gray-700">
          <Button
            disabled={disabled}
            variant="ghost"
            onClick={() => removeComment(report.reportCommentId)}
            className=" hover:text-white hover:bg-[#005694]"
          >
            Remove
          </Button>
        </td>
        <td className="px-4 py-2 border text-center dark:border-gray-700">
          <Button
          variant="ghost"
            onClick={() => removeUser(report.reportFor)}
          className=" hover:text-white w-full hover:bg-[#005694]">
            Remove User
          </Button>
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
              className="bg-white rounded-lg dark:bg-[#20293d] dark:text-white shadow-lg p-6 w-4/4 md:w-1/2"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-lg font-bold mb-4">Full Comment</h2>
              <p className="text-gray-700 dark:text-white mb-6">{modalData.commentText}</p>
              <Button
              variant="secondary"
                onClick={closeModal}
                className="text-white bg-[#005694]"
              >
                Close
              </Button>
            </div>
          </div>,
          document.body 
        )}
    </>
  );
};

export default AdminCommentState;
