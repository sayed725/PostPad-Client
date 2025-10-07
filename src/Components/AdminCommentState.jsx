import React, { useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";
import ReactDOM from "react-dom";
import { Button } from "../../@/components/ui/button";
import { Trash2 } from "lucide-react";

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
  // remove comment and delete report
  const removeComment = (report) => {
    toast(
      (t) => (
        <div className="flex gap-3 items-center">
          <div>
            <p>
              Are you <b>sure</b> you want to delete this comment?
            </p>
          </div>
          <div className="gap-2 flex">
            <button
              className="bg-blue-400 text-white px-3 py-1 rounded-md"
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  toast.loading("Deleting comment and report...", {
                    position: "top-right",
                  });
                  const { data } = await axiosSecure.post(
                    "/remove-comment",
                    report
                  );

                  if (data.commentDeleted || data.reportDeleted) {
                    toast.dismiss();
                    refetch();
                    toast.success(
                      data.message ||
                        "Comment and report deleted successfully!",
                      {
                        position: "top-right",
                        style: {
                          background: "#22c55e", // Green background
                          color: "#ffffff",
                          borderRadius: "8px",
                          padding: "12px",
                          fontSize: "16px",
                        },
                        icon: "✅",
                      }
                    );
                  } else {
                    toast.dismiss();
                    toast.error("No comment or report was deleted.", {
                      position: "top-right",
                      style: {
                        background: "#ef4444", // Red background
                        color: "#ffffff",
                        borderRadius: "8px",
                        padding: "12px",
                        fontSize: "16px",
                      },
                      icon: "❌",
                    });
                  }
                } catch (error) {
                  toast.dismiss();
                  const errorMessage =
                    error.response?.data?.error ||
                    error.message ||
                    "Failed to delete comment and report";
                  toast.error(errorMessage, {
                    position: "top-right",
                    style: {
                      background: "#ef4444",
                      color: "#ffffff",
                      borderRadius: "8px",
                      padding: "12px",
                      fontSize: "16px",
                    },
                    icon: "❌",
                  });
                  console.error("Error in removeComment:", error);
                }
              }}
            >
              Yes
            </button>
            <button
              className="bg-green-400 text-white px-3 py-1 rounded-md"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { position: "top-right" }
    );
  };

  // remove user and delete report

  const removeUser = (report) => {
    toast(
      (t) => (
        <div className="flex gap-3 items-center">
          <div>
            <p>
              Are you <b>sure</b> you want to remove this user?
            </p>
          </div>
          <div className="gap-2 flex">
            <button
              className="bg-blue-400 text-white px-3 py-1 rounded-md"
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  toast.loading("Deleting comment and report...", {
                    position: "top-right",
                  });
                  const { data } = await axiosSecure.post(
                    "/remove-user",
                    report
                  );

                  if (
                    data.commentDeleted ||
                    data.reportDeleted ||
                    data.userDeleted
                  ) {
                    toast.dismiss();
                    refetch();
                    toast.success(
                      data.message ||
                        "User & Comment and report deleted successfully!",
                      {
                        position: "top-right",
                        style: {
                          background: "#22c55e", // Green background
                          color: "#ffffff",
                          borderRadius: "8px",
                          padding: "12px",
                          fontSize: "16px",
                        },
                        icon: "✅",
                      }
                    );
                  } else {
                    toast.dismiss();
                    toast.error("No User was deleted.", {
                      position: "top-right",
                      style: {
                        background: "#ef4444", // Red background
                        color: "#ffffff",
                        borderRadius: "8px",
                        padding: "12px",
                        fontSize: "16px",
                      },
                      icon: "❌",
                    });
                  }
                } catch (error) {
                  toast.dismiss();
                  const errorMessage =
                    error.response?.data?.error ||
                    error.message ||
                    "Failed to delete User";
                  toast.error(errorMessage, {
                    position: "top-right",
                    style: {
                      background: "#ef4444",
                      color: "#ffffff",
                      borderRadius: "8px",
                      padding: "12px",
                      fontSize: "16px",
                    },
                    icon: "❌",
                  });
                  console.error("Error in removeUser:", error);
                }
              }}
            >
              Yes
            </button>
            <button
              className="bg-green-400 text-white px-3 py-1 rounded-md"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { position: "top-right" }
    );
  };

  return (
    <>
      <tr className="hover:bg-base-200 dark:hover:bg-gray-700">
        <td className="px-4 py-3 border dark:border-gray-700"> {index}</td>
        <td className="px-4 py-3 border dark:border-gray-700">
          {report.reportFor}
        </td>
        <td className="px-4 py-3 border dark:border-gray-700">
          {report.reportBy}
        </td>
        <td className="px-4 py-3 border dark:border-gray-700 ">
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
        <td className="px-4 py-3 border text-center dark:border-gray-700">
          <Button
            variant="ghost"
            size="sm"
            className="bg-red-300 dark:text-black"
          >
            {report.reportReason.substring(0, 13)}
          </Button>
        </td>
        <td className="px-4 py-3 border text-center dark:border-gray-700">
          <Button
            variant="destructive"
            size="sm"
            className="text-red-500"
            onClick={() => removeComment(report)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </td>
        <td className="px-4 py-3 border text-center dark:border-gray-700">
          <Button
            variant="destructive"
            size="sm"
            onClick={() => removeUser(report)}
            className="text-red-500"
          >
            <Trash2 className="h-4 w-4" />
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
              <p className="text-gray-700 dark:text-white mb-6">
                {modalData.commentText}
              </p>
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
