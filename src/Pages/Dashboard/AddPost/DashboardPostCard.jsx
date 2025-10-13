import { Eye, MoreVertical, Pencil, Trash } from "lucide-react";
import { Badge } from "../../../../@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../../../../@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../../@/components/ui/dropdown-menu";

import { Link } from "react-router";
import moment from "moment";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { Button } from "../../../../@/components/ui/button";
import { useState } from "react";

const DashboardPostCard = ({ post, handleEdit , refetch }) => {
    
    const axiosSecure = useAxiosSecure()



    // console.log(post);
   
    // delete post 
    const handleDelete = async (id) => {
  toast(
    (t) => (
      <div className="flex gap-3 items-center">
        <div>
          <p>
            Are you <b>sure? </b> you want to <b>Delete </b> this post?
          </p>
        </div>
        <div className="gap-2 flex">
          <button
            className="bg-red-400 text-white px-3 py-1 rounded-md"
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                toast.loading("Deleting Post...", { position: "top-right" });
                const { data } = await axiosSecure.delete(`/post/${id}`);
                if (data.deletedCount > 0) {
                  refetch();
                  toast.dismiss();
                  toast.success("Post deleted successfully!", { position: "top-right" });
                } else {
                  toast.dismiss();
                  toast.error("No post was deleted.", { position: "top-right" });
                }
              } catch (error) {
                toast.dismiss();
                toast.error(error.message || "Failed to delete the post!", { position: "top-right" });
              }
            }}
          >
            Yes
          </button>
          <button
            className="bg-green-400 text-white px-3 py-1 rounded-md"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </div>
      </div>
    ),
    { position: "top-right" }
  );
};

  return (
    <Card className="shadow-sm w-full rounded-lg dark:text-white dark:bg-[#20293d]">
      <CardHeader className="p-0 relative">
        <img
          src={post?.image || "/placeholder.svg"}
          alt={post?.title}
          className="object-cover h-[220px] w-full"
        />
        <div className="absolute top-2 right-2 ">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <div className="bg-base-200 dark:bg-gray-700 p-1 mx-0 rounded border border-border w-fit">
                <MoreVertical className="cursor-pointer text-gray-700 dark:text-white" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-base-200 dark:bg-gray-700">
              <Link to={`/posts/${post?._id}`}>
                <DropdownMenuItem className="cursor-pointer">
                  <Eye className="w-4 h-4 " /> Details
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => handleEdit(post)}
              >
                <Pencil className="w-4 h-4 " /> Update
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => handleDelete(post?._id)}
              >
                <Trash className="w-4 h-4 text-red-500" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          {/* <Badge variant={blog?.status === "published" ? "default" : "outline"}>
            {blog?.status}
          </Badge> */}
          <span className="text-sm text-muted-foreground">{post.time && moment(post.time).fromNow()}</span>

           <div className="flex items-center space-x-2 justify-end ">
            <Button variant="outline"  size="sm" className="dark:text-white">
              {/* <BiSolidUpvote className="text-xl cursor-pointer h" /> */}
              <p> UpVote · {post.upVote}</p>
            </Button>
            <Button variant="outline"  size="sm" className="dark:text-white">
              {/* <BiSolidDownvote className="text-xl cursor-pointer " /> */}
              <p> DawnVote · {post.dawnVote}</p>
            </Button>
          </div>
        </div>
        <h3 className="text-lg font-semibold line-clamp-1 mb-2">
          {post?.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {post?.description?.slice(0, 200)}
        </p>
      </CardContent>
      <CardFooter className="p-4  flex items-center">
        <div className="flex items-center gap-3 ">
          <div className="relative w-8 h-8 rounded-full overflow-hidden">
            <img
              src={post?.authorImage || "/placeholder.svg?height=32&width=32"}
              alt={post?.authorName}
              className="object-cover"
            />
          </div>
          <span className="text-sm font-medium">{post?.authorName}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DashboardPostCard;