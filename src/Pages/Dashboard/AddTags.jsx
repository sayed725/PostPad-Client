import React, { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const AddTags = () => {
    const axiosSecure= useAxiosSecure()


    const [tagName, setTagName] = useState('');





    const handleAddTag = async (e) => {
        e.preventDefault();
        try {
          await axiosSecure.post('/tags', { tagname: tagName });
          
          toast.success('Tag Added')
          setTagName(''); // Clear the input
        } catch (error) {
          console.error('Error adding tag:', error);
        }

      };

     





  return (
    <div>
      <h2 className="text-2xl font-semibold py-3">Add tags</h2>
      <form onSubmit={handleAddTag}>
        <input
          type="text"
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
          className=" className='block px-4 py-3 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'"
          placeholder="Enter tag name"
          required
        />
        <button className="btn  bg-[#005694] ml-5 text-white hover:bg-[#005694]" type="submit">Add Tag</button>
      </form>
    </div>
  );
};

export default AddTags;
