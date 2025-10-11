import { useForm } from "react-hook-form";

import { useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { imgUpload } from "../../../lib/imgUpload";
import { Form } from "../../../../@/components/ui/form";
import { Button } from "../../../../@/components/ui/button";
import { Input } from "../../../../@/components/ui/input";
import { Label } from "../../../../@/components/ui/label";
import { Textarea } from "../../../../@/components/ui/textarea";
import { Card, CardContent } from "../../../../@/components/ui/card";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import axios from "axios";
import useAuth from "../../../Hooks/useAuth";
import useTags from "../../../Hooks/useTags";
import QuillEditor from "../Form/QuillEditor";
import { useNavigate } from "react-router-dom";
// import uploadImageToCloudinary from "../../../lib/uploadImageToCloudinary";

function AddPostForm({ refetch, setIsFormOpen }) {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit, reset, watch, setValue } = useForm();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [tags, tRefetch, isTagLoading] = useTags();
  const navigate = useNavigate();

  // console.log(tags)

  // State to manage image preview and file
  const [preview, setPreview] = useState("");
  const [image, setImage] = useState(null);

  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const filePreview = URL.createObjectURL(file);
      setPreview(filePreview);
    }
  };

  const onSubmit = async (data) => {
    if (!user) {
      return toast.error("You're not authorized to do this action");
    }

    setLoading(true);

    if (!image) {
      setLoading(false);
      toast.error("Please select a blog image");
      return;
    }

    const imageUrl = await toast.promise(imgUpload(image), {
      success: <b>Image Uploaded</b>,
      loading: "Image Uploading...",
      error: "Unable to upload!",
    });
    if (!imageUrl) {
      setLoading(false);
      toast.error("Image Upload Failed! Try Again");
      return;
    }

    const postItem = {
      authorName: user?.displayName,
      authorImage: user?.photoURL,
      authorEmail: user?.email,
      title: data.title,
      description: data.description,
      usedTag: data.tag,
      image: imageUrl,
      upVote: 0,
      dawnVote: 0,
      time: new Date(),
    };

    console.log(postItem);

    // Post the blog

    await toast.promise(axiosSecure.post("/add-post", postItem), {
      loading: "Adding Post...",
      success: <b>Blog Added Successfully!</b>,
      error: <b>Unable to Add!</b>,
    });

    // Reset and navigate
    setPreview("");
    setImage(null);
    setIsFormOpen(false);
    refetch();
    reset();
    setLoading(false);
    navigate("/dashboard/userHome");
  };

  return (
    <div>
      <Card className="border shadow-none border-[#e5e7eb] w-full py-6 rounded-lg">
        <CardContent className="">
          <Form>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div className="grid gap-2">
                <Label htmlFor="title">Post Title</Label>
                <Input
                  id="title"
                  type="text"
                  name="title"
                  placeholder="Your Post Title"
                  defaultValue={""}
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
                  className="select select-bordered  focus:border-blue-400 dark:bg-[#20293d] text-black"
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
                  className="min-h-[150px] "
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
                <Button className="bg-red-600">
                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      setPreview("");
                      setImage(null);
                      setIsFormOpen(false);
                    }}
                  >
                    Cancel
                  </span>
                </Button>
                <Button className="cursor-pointer" disabled={loading}>
                  {loading ? "Adding..." : "Add Blog"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddPostForm;
