import { useForm } from "react-hook-form";

import { useEffect, useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { Form } from "../../../../@/components/ui/form";
import { Button } from "../../../../@/components/ui/button";
import { Input } from "../../../../@/components/ui/input";
import { Label } from "../../../../@/components/ui/label";
import { Card, CardContent } from "../../../../@/components/ui/card";

import toast from "react-hot-toast";

import useTags from "../../../Hooks/useTags";
import QuillEditor from "../Form/QuillEditor";

function AddPostForm({
  setModal,
  onSubmit,
  initialData,
  loading,
  setLoading,
}) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
   formState: { errors },
  } = useForm({
    defaultValues: initialData || {
      title: "",
      UsedTag: "",
      description: "",
      image: "",
    },
  });
//   console.log(initialData);
  const [tags, tRefetch, isTagLoading] = useTags();

  // console.log(tags)

  // State to manage image preview and file
  const [preview, setPreview] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (initialData?.image) {
      setPreview(initialData.image);
      setImage(initialData.image);
    } else {
      setPreview("");
      setImage(null);
    }
  }, [initialData]);

//   useEffect(() => {
//     if (initialData?.usedTag) {
//       setValue("usedTag", initialData.UsedTag);
//     } else {
//       setValue("usedTag", "default");
//     }
//   }, [initialData]);




  // console.log(image)

  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const filePreview = URL.createObjectURL(file);
      //   console.log(filePreview)
      setPreview(filePreview);
    }
  };

  // console.log(preview)
  // console.log(image)

  const onFormSubmit = (data) => {
    // console.log(data)

//  console.log(image)

    if (!image) {
      setLoading(false);
      toast.error("Please select a blog image");
      return;
    }
    onSubmit(data, image);
  };
//   console.log(image)

  return (
    <div>
      <Card className="border shadow-none border-[#e5e7eb] w-full py-6 rounded-lg dark:bg-[#20293d] mb-5">
        <CardContent className="">
          <form
            onSubmit={handleSubmit(onFormSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="grid gap-2">
              <Label htmlFor="title">Post Title</Label>
              <Input
                id="title"
                type="text"
                placeholder="Your Post Title"
                className="dark:bg-[#001221] py-3"
                required
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>
            {/* Tag Selection */}
            <div className="grid gap-2">
              <Label htmlFor="UsedTag">Use Tag</Label>
              <select
                id="usedTag"
                defaultValue={initialData?.usedTag || "default"}
                {...register("usedTag", { required: "Tag is required" })}
                className="select select-bordered  focus:border-blue-400 dark:bg-[#001221] text-black dark:text-white"
              >
                <option disabled value="default">
                  Select a tag
                </option>
                {tags.map((tag, index) => (
                  <option key={index}>{tag.tagname}</option>
                ))}
              </select>
              {errors.usedTag && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.useTag.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="grid gap-2 mb-20">
              <Label htmlFor="description">Description</Label>
              <QuillEditor
                value={watch("description")}
                //   defaultValue={watch(`${initialData?.description}`) || ""}
                onChange={(html) =>
                  setValue("description", html, { shouldValidate: true })
                }
                placeholder="Write Your Post Content Here"
              />
              {errors.description && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Image Upload */}
            <div className="grid gap-2">
              <Label htmlFor="photo">Upload Post Image</Label>
              {preview === "" ? (
                <div
                  className="w-full md:w-[100%] flex items-center justify-center flex-col gap-4 border-blue-200 border rounded-md py-4 cursor-pointer"
                  onClick={() => document.getElementById("image").click()}
                >
                  <FaFileUpload className="text-[2rem] text-[#777777] dark:text-white" />
                  <p className="text-gray-700 dark:text-white">Browse To Upload Blog Image</p>
                  <input
                    id="image"
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
                    className="text-[2rem] text-white bg-red-600 p-1 absolute top-0 right-0 cursor-pointer rounded-tr-[13px]"
                    onClick={() => {
                      setPreview("");
                      setImage(null);
                    }}
                  />
                  {image && (
                    <div className="mt-4 text-center">
                      <p className="text-sm font-medium text-gray-700">
                        {/* {image.name.length > 20
                          ? image.name.slice(0, 10) +
                            "..." +
                            image.name.slice(-15)
                          : image.name} */}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(image.size / 1024).toFixed(2)} KB | {image.type}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-2 text-white">
              <Button className="bg-red-600">
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    setModal(false);
                    setPreview("");
                    setImage(null);
                    setLoading(false);
                    reset();
                  }}
                >
                  Cancel
                </span>
              </Button>
              <Button className="cursor-pointer dark:bg-primary" disabled={loading} >
                {loading ? "Adding..." : "Add Blog"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddPostForm;
