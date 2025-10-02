import { useForm } from "react-hook-form";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import useMember from "../../Hooks/useMember";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../Components/LoadingSpinner";
import { Helmet } from "react-helmet-async";
import QuillEditor from "./Form/QuillEditor";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddaPost = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isMember, isMemberLoading] = useMember();
  const [postCount, setPostCount] = useState(0);
  const [previewUrl, setPreviewUrl] = useState("");
  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  // Cleanup preview URL on unmount or file change
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/postCount/${user.email}`)
        .then((res) => res.data)
        .then((data) => setPostCount(data.postCount))
        .catch((err) => toast.error("Failed to fetch post count"));
    }
  }, [user?.email, axiosSecure]);

  const { data: tags = [], isLoading } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tags");
      return res.data;
    },
  });

  // Handle file selection for preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Revoke previous URL if exists
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      const newUrl = URL.createObjectURL(file);
      setPreviewUrl(newUrl);
    }
  };

  const onSubmit = async (data) => {
    try {
      // Image upload to imgbb and get URL
      const imageFile = { image: data.image[0] };
      const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        // Send post data to server with image URL
        const postItem = {
          authorName: user?.displayName,
          authorImage: user?.photoURL,
          authorEmail: user?.email,
          title: data.title,
          description: data.description, // This is now the HTML from Quill
          usedTag: data.tag,
          image: res.data.data.display_url,
          upVote: 0,
          downVote: 0,
          time: new Date(),
        };

        const postRes = await axiosSecure.post("/add-post", postItem);
        if (postRes.data.insertedId) {
          toast.success("Post Successfully Added");
          reset();
          setPreviewUrl(""); // Clear preview on success
          navigate("/dashboard/userHome");
        }
        console.log(postItem);
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to add post. Please try again.");
    }
  };

  if (isMemberLoading) {
    return <LoadingSpinner />;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (postCount >= 5 && !isMember) {
    return (
      <div className="text-center min-h-screen mt-10">
        <div className="p-5 bg-white dark:bg-[#20293d] dark:text-white rounded-md shadow-lg">
          <p className="mb-10 text-4xl font-bold">OH! NO</p>
          <p className="mb-5 font-bold text-2xl">
            You have reached the limit of 5 posts
            <br className="hidden sm:block" /> Become a Member to add more posts and enjoy exclusive benefits!
          </p>
          <Link className="btn bg-[#005694] text-white hover:bg-[#005694]" to="/member">
            Become a Member
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>PostPad | Add Post</title>
      </Helmet>
      <h2 className="text-4xl font-semibold text-center">Add a Post</h2>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Title */}
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text dark:text-white">Post Title*</span>
            </label>
            <input
              type="text"
              placeholder="Post Title"
              {...register("title", { required: "Title is required" })}
              className="input input-bordered w-full dark:bg-[#20293d] dark:text-white focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
            />
            {errors.title && <span className="label-text-alt text-red-500">{errors.title.message}</span>}
          </div>

          {/* Post Description (QuillEditor) */}
          <div className="form-control my-6">
            <label className="label">
              <span className="label-text dark:text-white">Post Description*</span>
            </label>
            <QuillEditor
              value={watch("description") || ""}
              onChange={(html) => setValue("description", html, { shouldValidate: true })}
              placeholder="Write Your Post Content Here"
            />
            <input type="hidden" {...register("description", { required: "Description is required" })} />
            {errors.description && <span className="label-text-alt text-red-500">{errors.description.message}</span>}
          </div>

          {/* Tag Select */}
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text dark:text-white">Select Tag*</span>
            </label>
            <select
              defaultValue="default"
              {...register("tag", { required: "Tag is required" })}
              className="select select-bordered w-full focus:border-blue-400 dark:bg-[#20293d] dark:text-white focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option disabled value="default">
                Select a tag
              </option>
              {tags.map((tag, index) => (
                <option key={index}>{tag.tagname}</option>
              ))}
            </select>
            {errors.tag && <span className="label-text-alt text-red-500">{errors.tag.message}</span>}
          </div>

          {/* Image Upload with Preview */}
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text dark:text-white">Upload Image*</span>
            </label>
            <input
              id="image"
              name="image"
              accept="image/*"
              type="file"
              {...register("image", { required: "Image is required" })}
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500 file:py-2 file:px-4 file:border-0 file:rounded-full file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-green-600 file:hover:text-white cursor-pointer"
            />
            {errors.image && <span className="label-text-alt text-red-500">{errors.image.message}</span>}
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Image Preview"
                className="mt-2 max-h-40 border object-contain"
                style={{ width: "200px", height: "200px" }}
              />
            )}
          </div>

          <button type="submit" className="btn bg-[#005694] text-white hover:bg-[#005694]">
            Add Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddaPost;