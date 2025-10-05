import React, { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Input } from "../../../@/components/ui/input";
import { Button } from "../../../@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, } from '../../../@/components/ui/card'

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
    <Card className="text-center border-none">
      <CardHeader >
        <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white mb-3 text-left">Add Tags For Posts</CardTitle>
        <p className="text-lg tracking-wider font-medium text-left">Add Unique tags topic for users/members to posts</p>
      </CardHeader>
      <CardContent className="flex flex-col justify-center items-center">
        <form onSubmit={handleAddTag}>
        <Input
          type="text"
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
          className=" text-gray-700 bg-white border rounded-lg  dark:text-white py-3 text-center dark:bg-[#101720]    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'"
          placeholder="Enter tag name"
          required
        />
        <Button className="text-white mt-5 hover:bg-[#005694]" type="submit">Add Tag</Button>
      </form>
      </CardContent>
      
    </Card>
  );
};

export default AddTags;
