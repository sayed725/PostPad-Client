import { useForm } from "react-hook-form";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import useMember from "../../Hooks/useMember";
import { useEffect, useState } from "react";
import { use } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../Components/LoadingSpinner";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddaPost = () => {
    const { user } = useAuth()
    const navigate = useNavigate();
    const [isMember, isMemberLoading] = useMember();
    const [postCount, setPostCount] = useState(0);
    // console.log(isMember)
    // console.log(postCount)
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();


  useEffect( () =>{
    axiosSecure.get(`/postCount/${user?.email}`)
     .then(res => res.data)
     .then(data => setPostCount(data.postCount))
 }, [user?.email])




  const { data: tags = [], isLoading } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tags");
      return res.data;
    },
  });

 

  const onSubmit = async (data) => {
    // console.log(data)
    // image upload to imgbb and then get an url
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      // now send the menu item data to the server with the image url
      const postItem = {
        authorName: user?.displayName,
        authorImage: user?.photoURL,
        authorEmail: user?.email,
        title: data.title,
        description: data.description,
        usedTag: data.tag,
        image: res.data.data.display_url,
        upVote: 0,
        dawnVote:0,
        time: new Date(),
      };
      
      const postRes = await axiosSecure.post("/add-post", postItem);
    //   console.log(postRes.data)
      if (postRes.data.insertedId) {
        // show success popup
        toast.success('Post Successfully Added')
        reset();
        navigate('/dashboard/userHome')
      }
    }
    // console.log("with image url", res.data);
  };

  if (isMemberLoading) {
    return <LoadingSpinner></LoadingSpinner>
  }

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>
  }

  if (postCount >= 5 && !isMember)  {
    // Show Become a Member button if user has reached the post limit
    return (
      <div className="text-center min-h-screen mt-10">
        <div className="p-5 bg-white rounded-md shadow-lg">
        <p className="mb-5 font-bold text-2xl">
          You have reached the limit of 5 posts. Become a Member to add more posts.
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
      <h2 className="text-4xl font-semibold text-center">Add a Post</h2>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>

            {/* title  */}
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Post Title*</span>
            </label>
            <input
              type="text"
              placeholder="Post Title"
              {...register("title", { required: true })}
              required
              className="input input-bordered w-full focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

         
          {/* post description */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Post Description*</span>
            </label>
            <textarea
              {...register("description")}
              className="textarea textarea-bordered h-32 focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Post Description"
            ></textarea>
          </div>


           {/* tag select */}
           <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Select Tag*</span>
            </label>

            <select
              defaultValue="default"
              {...register("tag", { required: true })}
              className="select select-bordered w-full focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option disabled value="default">
                Select a tag
              </option>
              {tags.map((tag, index) => (
                <option key={index}>#{tag.tagname}</option>
              ))}
            </select>
          </div>


          <div className="form-control w-full my-6">
            <input
              {...register("image",{ required: true})}
              type="file"
              className="file-input w-full max-w-xs focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <button className="btn  bg-[#005694] text-white hover:bg-[#005694]">
              Add Post
            </button>
        </form>
      </div>
    </div>
  );
};

export default AddaPost;
