import axios from "axios";

export default async function uploadImageToCloudinary(imageFile) {
  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", "blog-post");

  const { data } = await axios.post(
    `https://api.cloudinary.com/v1_1/${
      import.meta.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    }/image/upload`,
    formData
  );

  console.log(data);

  return data.secure_url;
}
