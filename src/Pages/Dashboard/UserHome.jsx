import useAuth from "../../Hooks/useAuth";
import { RiMedalFill } from "react-icons/ri";
import useMember from "../../Hooks/useMember";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import PostCard from "../../Components/Postcard";
import LoadingSpinner from "../../Components/LoadingSpinner";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import DashboardPostCard from "./AddPost/DashboardPostCard";
import DashboardPostCardSkeleton from "./AddPost/DashboardPostCardSkeleton";

const UserHome = () => {
  const { user } = useAuth();
  const [isMember] = useMember();
  const axiosSecure = useAxiosSecure();

  const { data: posts = [], isLoading: isPostLoading } = useQuery({
    queryKey: ["userPosts", user],
    queryFn: async () => {
      const res = await axiosSecure.get(`/post/${user?.email}`);
      return res.data;
    },
  });

  // if (isLoading) {
  //   <LoadingSpinner></LoadingSpinner>;
  // }

  return (
    <div className="mx-auto">
      <Helmet>
        {" "}
        <title>PostPad | UserProfile </title>
      </Helmet>
      {/* user profile  */}
      <div className="w-full border bg-white shadow-sm border-[#e5e7eb] dark:border-none dark:bg-[#20293d] rounded-lg">
        <div className="flex justify-between items-center">
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-5 lg:gap-0">
              <div className="flex-shrink-0">
                <div className="avatar h-32 w-32 rounded-md">
                  <div className="ring-[#005694] ring-offset-base-100 w-24 rounded-md ring-2 ring-offset-2">
                    <img src={user?.photoURL} alt={user?.displayName} />
                  </div>
                </div>
              </div>

              <div className="flex-grow space-y-4">
                <div>
                  <h1 className="text-2xl font-bold">{user?.displayName}</h1>
                  <p className="text-muted-foreground font-semibold">
                    Email: {user?.email}
                  </p>
                </div>

                <p>
                  {isMember && (
                    <span className=" py-1  font-semibold dark:text-white rounded-full">
                      Welcome to Member DashBoard You can view all of your posts
                      & Comments here.
                    </span>
                  )}
                  {!isMember && (
                    <span className=" py-1  font-semibold dark:text-white rounded-full">
                      Welcome to User DashBoard You can view all of your posts &
                      Comments here.
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center">
            {
              isMember && <p className="font-semibold text-xl">Member</p>
            }
            {
              !isMember && <p className="font-semibold text-xl">User</p>
            }
            <RiMedalFill
              className={`${
                isMember ? "text-8xl text-yellow-500" : "text-8xl"
              }`}
            ></RiMedalFill>
          </div>
        </div>
      </div>

      {!posts.length && (
        <div className="text-center mt-10">
          <h2 className="text-2xl font-semibold mb-4">No Posts Found</h2>
          <p className="text-gray-600 dark:text-gray-300">
            You haven't created any posts yet. Start sharing your thoughts and
            ideas with the community!
          </p>
          <button className="mt-5 bg-[#005694] hover:bg-[#005694] text-white px-6 py-2 rounded-md">
            <Link
              to="/dashboard/addPost"
              className="mt-5 bg-[#005694] hover:bg-[#005694] text-white px-6 py-2 rounded-md"
            >
              Create Your First Post
            </Link>
          </button>
        </div>
      )}

      {/* post section  */}
     
        <div>
          <h3 className="text-4xl text-center font-bold mt-5">
            Your total post {posts.length}
          </h3>

          <div className="  mx-auto grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 py-5 lg:py-10">
            {isPostLoading ? (
             <>
                {/* Render skeleton BedCards while loading */}
                {Array(3)
                  .fill(0)
                  .map((_, index) => (
                    
                   <DashboardPostCardSkeleton key={index} isPostLoading={isPostLoading}></DashboardPostCardSkeleton>
                      
                      
                    
                  ))}
              </>
            ) : (
              posts.map((post) => (
                <DashboardPostCard key={post._id} post={post} isPostLoading={isPostLoading}></DashboardPostCard>
              ))
            )}
          </div>
        </div>
      
    </div>
  );
};

export default UserHome;
