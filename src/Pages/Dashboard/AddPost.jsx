import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import Select from "react-select";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddPost = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const { data: tags = [] } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tags");
      return res.data;
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const title = form.title.value;
    const description = form.description.value;
    const tag = form.tag.value;
    const pic = form.pic.value;

    const postData = {
      title,
      description,
      tag,
      pic,
    };

    console.log(postData);

        // console.log(data)
        // image upload to imgbb and then get an url
        const imageFile = { pic };
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });
        if (res.data.success) {
          // now send the menu item data to the server with the image url
          const menuItem = {
            name: data.name,
            category: data.category,
            recipe: data.recipe,
            image: res.data.data.display_url,
          };
          //
        //   const menuRes = await axiosSecure.post("/menu", menuItem);
        //   // console.log(menuRes.data)
        //   if (menuRes.data.insertedId) {
        //     // show success popup
        //     reset();
        //     Swal.fire({
        //       position: "top-end",
        //       icon: "success",
        //       title: `${data.name} is added to the menu.`,
        //       showConfirmButton: false,
        //       timer: 1500,
        //     });
        //   }
        console.log(menuItem);
    }
  };

  const options = tags.map((tag) => ({
    value: tag.tagname,
    label: `#${tag.tagname}`,
  }));

  return (
    <div>
      <h2 className="text-4xl font-semibold text-center">Add a Post</h2>
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 mt-5 lg:mt-10"
        >
          <div>
            <label className="text-gray-700 ">
              <span className="label-text">Post Title</span>
            </label>
            <input
              id="title"
              name="title"
              placeholder="Post Title"
              type="text"
              required
              className="block w-full px-4 py-3 mt-2  text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
            />
          </div>

          <div className="">
            <label className=" text-gray-700">
              <span className="label-text">Post Description</span>
            </label>
            <textarea
              id="description"
              type="text"
              name="description"
              placeholder="Write Description"
              className="block w-full px-4 py-5 mt-2  text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              required
            />
          </div>

          <div>
            <label className="text-gray-700">
              <span className="label-text">Select Tag</span>
            </label>

            <Select
              className="basic-multi-select py-3 mt-2 select-bordered w-full rounded-md focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
              Value={[""]}
              id="tag"
              name="tag"
              options={options}
              required
              classNamePrefix="select"
            />
          </div>

          <div>
            <label className="text-gray-700">
              <span className="label-text">Add Picture</span>
            </label>
            <input
              id="pic"
              name="pic"
              placeholder="Add Picture"
              type="file"
              className="block w-full px-4 py-3 mt-2  text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
            />
          </div>

          {/* recipe details */}

          <div>
            <button className="btn  bg-[#005694] text-white hover:bg-[#005694]">
              Add Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
