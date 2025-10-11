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

const ShowBlogTable = ({ posts, isPostLoading, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit, reset, watch, setValue } = useForm();
  const [tags, tRefetch, isTagLoading] = useTags();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [preview, setPreview] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle Edit
  const handleEdit = (post) => {
    setSelectedPost(post);
    setIsEditOpen(true);
    setPreview(post.image);
    setValue("title", post.title);
    setValue("tag", post.usedTag);
    setValue("description", post.description);
  };

  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const filePreview = URL.createObjectURL(file);
      setPreview(filePreview);
    }
  };

  const onEditSubmit = async (data) => {
    setLoading(true);
    let imageUrl = selectedPost.image;

    if (image) {
      imageUrl = await toast.promise(imgUpload(image), {
        success: <b>Image Uploaded</b>,
        loading: "Image Uploading...",
        error: "Unable to upload!",
      });

      if (!imageUrl) {
        setLoading(false);
        toast.error("Image Upload Failed! Try Again");
        return;
      }
    }

    const updatedPostData = {
      title: data.title,
      tag: data.tag,
      image: imageUrl,
      description: data.description,
      time: new Date(),
    };

    try {
      await toast.promise(
        axiosSecure.put(`/post/${selectedPost._id}`, updatedPostData),
        {
          loading: "Updating Blog...",
          success: <b>Post Updated Successfully!</b>,
          error: <b>Unable to Update!</b>,
        }
      );
      setIsEditOpen(false);
      setPreview("");
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
        {posts?.map((post, i) => (
          <DashboardPostCard
            key={i}
            post={post}
            handleEdit={handleEdit}
            refetch={refetch}
          />
        ))}
      </div>

      {/* Custom Modal */}
      {isEditOpen && selectedPost && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Edit Blog</h2>
              <p className="modal-description">Update the details of the blog post.</p>
              <button
                className="modal-close"
                onClick={() => {
                  setIsEditOpen(false);
                  setPreview("");
                  setImage(null);
                }}
              >
                &times;
              </button>
            </div>
            <Form>
              <form
                onSubmit={handleSubmit(onEditSubmit)}
                className="flex flex-col gap-4"
              >
                <div className="grid gap-2">
                  <Label htmlFor="title">Post Title</Label>
                  <Input
                    id="title"
                    type="text"
                    name="title"
                    placeholder="Your Post Title"
                    defaultValue=""
                    required
                    {...register("title")}
                  />
                </div>
                {/* Tag Selection */}
                <div className="grid gap-2">
                  <Label htmlFor="tag">Use Tag</Label>
                  <select
                    defaultValue="default"
                    {...register("tag", { required: "Tag is required" })}
                    className="select select-bordered focus:border-blue-400 dark:bg-[#20293d] text-black"
                  >
                    <option disabled value="default">
                      Select a tag
                    </option>
                    {tags.map((tag, index) => (
                      <option key={index}>{tag.tagname}</option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div className="grid gap-2 mb-20">
                  <Label htmlFor="description">Description</Label>
                  <QuillEditor
                    id="description"
                    value={watch("description") || ""}
                    onChange={(html) =>
                      setValue("description", html, { shouldValidate: true })
                    }
                    placeholder="Write Your Post Content Here"
                    className="min-h-[150px]"
                  />
                  <Textarea
                    id="description-textarea"
                    className="hidden"
                    value={watch("description") || ""}
                    {...register("description", {
                      required: "Description is required",
                    })}
                  />
                </div>

                {/* Image Upload Section */}
                <div className="grid gap-2">
                  <Label htmlFor="photo">Upload Post Image</Label>
                  {preview === "" ? (
                    <div
                      className="w-full md:w-[100%] flex items-center justify-center flex-col gap-4 border-blue-200 border rounded-md py-4 cursor-pointer"
                      onClick={() =>
                        document.getElementById("file-input").click()
                      }
                    >
                      <FaFileUpload className="text-[2rem] text-[#777777]" />
                      <p className="text-gray-700">Browse To Upload Blog Image</p>
                      <input
                        id="file-input"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleUploadImage}
                      />
                    </div>
                  ) : (
                    <div className="relative w-full border border-blue-200 rounded-xl p-4">
                      <img
                        src={preview}
                        alt="Selected file preview"
                        className="mx-auto object-cover rounded-full w-24 h-24"
                      />
                      <MdDelete
                        className="text-[2rem] text-white bg-[#000000ad] p-1 absolute top-0 right-0 cursor-pointer rounded-tr-[13px]"
                        onClick={() => {
                          setPreview("");
                          setImage(null);
                        }}
                      />
                      {image && (
                        <div className="mt-4 text-center">
                          <p className="text-sm font-medium text-gray-700">
                            {image.name.length > 20
                              ? image.name.slice(0, 10) +
                                "..." +
                                image.name.slice(-15)
                              : image.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(image.size / 1024).toFixed(2)} KB | {image.type}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex justify-end gap-2 text-white">
                  <Button
                    className="bg-red-600"
                    onClick={() => {
                      setPreview("");
                      setImage(null);
                      setIsEditOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button className="cursor-pointer" disabled={loading}>
                    {loading ? "Updating..." : "Update Blog"}
                  </Button>
                </div>
              </form>
            </Form>
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