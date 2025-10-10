import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../../../../@/components/ui/button";
import { Helmet } from "react-helmet-async";
import ShowBlogTable from "./ShowBlogTable";

const AddPost = () => {
  const axiosSecure = useAxiosSecure();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { user } = useAuth();

  const {
    refetch,
    data: posts = [],
    isPostLoading,
  } = useQuery({
    queryKey: ["userAllPosts", user],
    queryFn: async () => {
      const res = await axiosSecure.get(`/allpost/${user?.email}`);
      return res.data;
    },
  });

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>PostPad | UserPost</title>
      </Helmet>

      <div className="">
        <div className=":::flex :::flex-col :::sm:flex-row :::items-center :::justify-between">
          <div className="mb-8 text-center space-y-3">
            <h2 className="text-3xl font-bold">
              Hi! {user && user?.displayName}
            </h2>
            <p className="text-xl font-semibold text-gray-700 dark:text-gray-200">
             Here you can view all of your posts and manage, post or edit your posts.
            </p>
          </div>
          {/* Add Blog Form */}
          <div className="flex justify-end mb-6">
            <Button
              disabled={isFormOpen}
              onClick={() => setIsFormOpen(!isFormOpen)}
              className={"cursor-pointer"}
            >
              Add New Blog
            </Button>
          </div>
        </div>
        {/* Assign User Form */}
        {isFormOpen && (
          <div className={`${isFormOpen ? "visible" : "hidden"} mt-4`}>
            {/* <AddBlogForm refetch={refetch} setIsFormOpen={setIsFormOpen} /> */}
          </div>
        )}
        {/* Blog Table */}
        <ShowBlogTable posts={posts} isPostLoading={isPostLoading} refetch={refetch} />
      </div>
    </div>
  );
};

export default AddPost;
