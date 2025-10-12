
import axios from 'axios';

export default async function uploadImageToCloudinary(image) {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "blog-post");

    try {
        const res = await axios.post(
            `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
            formData
        );
        return res.data.secure_url;
    } catch (error) {
        throw new Error("Failed to Upload Image");
    }
}
