import React, { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AddTags = () => {
    const axiosSecure= useAxiosSecure()


    const [tagName, setTagName] = useState('');





    const handleAddTag = async (e) => {
        e.preventDefault();
        try {
          await axiosSecure.post('/tags', { name: tagName });
          
          toast.success('Tag Added to Db')
          setTagName(''); // Clear the input
        } catch (error) {
          console.error('Error adding tag:', error);
        }
      };

     





  return (
    <div>
      <h2 className="text-4xl font-bold">Add tags</h2>
      <form onSubmit={handleAddTag}>
        <input
          type="text"
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
          className=" className='block px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'"
          placeholder="Enter tag name"
          required
        />
        <button className="btn" type="submit">Add Tag</button>
      </form>
    </div>
  );
};

export default AddTags;
