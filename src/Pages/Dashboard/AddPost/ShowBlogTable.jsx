import { Button } from "../../../../@/components/ui/button";
import { Form } from "../../../../@/components/ui/form";
import { Input } from "../../../../@/components/ui/input";
import { Label } from "../../../../@/components/ui/label";
import { Textarea } from "../../../../@/components/ui/textarea";
import { imgUpload } from "../../../lib/imgUpload";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaFileUpload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import DashboardPostCard from "./DashboardPostCard";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import QuillEditor from "../Form/QuillEditor";
import useTags from "../../../Hooks/useTags";
import AddPostForm from "./AddPostForm";
import uploadImageToCloudinary from "../../../lib/uploadImageToCloudinary";
import DashboardPostCardSkeleton from "./DashboardPostCardSkeleton";

const ShowBlogTable = ({ posts, isPostLoading, refetch }) => {
     const [initialData, setInitialData] = useState(null);
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit, reset, watch, setValue } = useForm();
  const [tags, tRefetch, isTagLoading] = useTags();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [preview, setPreview] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);


//   console.log(selectedPost)

  // Handle Edit
  const handleEdit = (post) => {

    // console.log(post)

    
     setInitialData({
        id: post._id,
        title: post.title,
      usedTag: post.usedTag,
      image: post.image,
      description: post.description,
      time: new Date(),
    })
    setIsEditOpen(true);
  };


  const handleEditPost = async (data, image) => {
    setLoading(true);
    let imageUrl = "";

    if(image === initialData?.image) {
         imageUrl = initialData?.image;
    } else {
        imageUrl = await toast.promise(uploadImageToCloudinary(image), {
        success: <b>Image Uploaded</b>,
        loading: "Image Uploading...",
        error: "Unable to upload!",
      }); 
    } 

      if (!imageUrl) {
        setLoading(false);
        toast.error("Image Upload Failed! Try Again");
        return;
      }

      console.log(imageUrl)
      console.log(data)
    

    const updatedPostData = {
      title: data.title,
      usedTag: data.usedTag,
      image: imageUrl,
      description: data.description,
      time: new Date(),
    };

    // console.log(initialData._id)

    try {
      await toast.promise(
        axiosSecure.put(`/post/update/${initialData.id}`, updatedPostData),
        {
          loading: "Updating Blog...",
          success: <b>Post Updated Successfully!</b>,
          error: <b>Unable to Update!</b>,
        }
      );
      setIsEditOpen(false);
      setImage(null);
      reset();
      refetch();
    } catch (error) {
      toast.error("Failed to update Post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Blog Cards */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
         {isPostLoading ? (
             <>
                {/* Render skeleton BedCards while loading */}
                {Array(4)
                  .fill(0)
                  .map((_, index) => (
                    
                   <DashboardPostCardSkeleton key={index} isPostLoading={isPostLoading}></DashboardPostCardSkeleton>
                      
                      
                    
                  ))}
              </>
            ) : 

        posts?.map((post, i) => (
          <DashboardPostCard
            key={i}
            post={post}
            handleEdit={handleEdit}
            refetch={refetch}
            isPostLoading={isPostLoading}
          />
        ))} 
      </div>

      {/* Custom Modal */}
      {isEditOpen && setInitialData && (
        <div className="modal-overlay  ">
          <div className="modal-content dark:bg-[#20293d]">
            <div className="modal-header ">
              <h2 className="modal-title dark:text-white">Edit Blog is under Construction it will be available soon</h2>
              <p className="modal-description dark:text-white mt-2">Update the details of the blog post.</p>
              <button
                className="modal-close dark:text-white hover:dark:text-white"
                onClick={() => {
                  setIsEditOpen(false);
                  setPreview("");
                  setImage(null);
                }}
              >
                &times;
              </button>
            </div>
           <AddPostForm initialData={initialData} onSubmit={handleEditPost} setModal={setIsEditOpen} setLoading={setLoading}/>
          </div>
        </div>
      )}

      {/* Modal Styles */}
      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal-content {
          background: white;
          border-radius: 8px;
          width: 100%;
          max-width: 600px;
          max-height: 80vh;
          overflow-y: auto;
          padding: 24px;
          position: relative;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        .modal-header {
          margin-bottom: 16px;
        }
        .modal-title {
          font-size: 1.5rem;
          font-weight: bold;
          color: #333;
        }
        .modal-description {
          font-size: 1rem;
          color: #666;
        }
        .modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #666;
        }
        .modal-close:hover {
          color: #000;
        }
      `}</style>
    </div>
  );
};

export default ShowBlogTable;