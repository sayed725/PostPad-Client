import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../../../../@/components/ui/button";
import { Helmet } from "react-helmet-async";
import ShowBlogTable from "./ShowBlogTable";
import AddPostForm from "./AddPostForm";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { imgUpload } from "../../../lib/imgUpload";
import uploadImageToCloudinary from "../../../lib/uploadImageToCloudinary";

const AddPost = () => {
  const axiosSecure = useAxiosSecure();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    refetch,
    data: posts = [],
    isLoading: isPostLoading,
  } = useQuery({
    queryKey: ["userAllPosts", user],
    queryFn: async () => {
      const res = await axiosSecure.get(`/allpost/${user?.email}`);
      return res.data;
    },
  });

  const handleAddPost = async (data, image) => {
    // console.log(data);
    // console.log(image);


    if (!user) {
      return toast.error("You're not authorized to do this action");
    }

    setLoading(true);

    const imageUrl = await toast.promise(uploadImageToCloudinary(image), {
      loading: "Image Uploading...",
      success: <b>Image Uploaded</b>,
      error: "Unable to upload!",
    });

    if (!imageUrl) {
      setLoading(false);
      toast.error("Image Upload Failed! Try Again");
      return;
    }
    // console.log(imageUrl);

    const postItem = {
      authorName: user?.displayName,
      authorImage: user?.photoURL,
      authorEmail: user?.email,
      title: data.title,
      description: data.description,
      usedTag: data.usedTag,
      image: imageUrl,
      upVote: 0,
      dawnVote: 0,
      time: new Date(),
    };

    // console.log(postItem);

    // Post the blog

    await toast.promise(axiosSecure.post("/add-post", postItem), {
      loading: "Adding Post...",
      success: <b>Post Added Successfully!</b>,
      error: <b>Unable to Add post!</b>,
    });

    // Reset and navigate
    setIsFormOpen(false);
    refetch();
    // reset();
    setLoading(false);
    navigate("/dashboard/userHome");
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>PostPad | UserPost</title>
      </Helmet>

      <div className="">
        <div className=":::flex :::flex-col :::sm:flex-row :::items-center :::justify-between">
          <div className="mb-8 text-center space-y-3">
            <h2 className="text-3xl font-bold">
              Hi! {user && user?.displayName}
            </h2>
            <p className="text-xl font-semibold text-gray-700 dark:text-gray-200">
              Here you can view all of your posts and manage, post or edit your
              posts.
            </p>
          </div>
          {/* Add Blog Form */}
          <div className="flex justify-end mb-6">
            <Button
              disabled={isFormOpen}
              onClick={() => setIsFormOpen(!isFormOpen)}
              className={"cursor-pointer text-white dark:bg-primary"}
            >
              Add New Blog
            </Button>
          </div>
        </div>
        {/* Assign User Form */}
        {isFormOpen && (
          <div className={`${isFormOpen ? "visible" : "hidden"} mt-4`}>
            <AddPostForm
              setModal={setIsFormOpen}
              onSubmit={handleAddPost}
              loading={loading}
              setLoading={setLoading}
            />
          </div>
        )}
        {/* Blog Table */}
        <ShowBlogTable
          posts={posts}
          isPostLoading={isPostLoading}
          refetch={refetch}
        />
      </div>
    </div>
  );
};

export default AddPost;
