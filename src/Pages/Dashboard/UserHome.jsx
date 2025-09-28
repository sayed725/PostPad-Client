import useAuth from "../../Hooks/useAuth";
import { RiMedalFill } from "react-icons/ri";
import useMember from "../../Hooks/useMember";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import PostCard from "../../Components/Postcard";
import LoadingSpinner from "../../Components/LoadingSpinner";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const UserHome = () => {
  const { user } = useAuth();
  const [isMember] = useMember();
  const axiosSecure = useAxiosSecure();

  const { data: posts = [], isLoading } = useQuery({
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
    <div className="lg:w-3/5 mx-auto">
      <Helmet>
        {" "}
        <title>PostPad | UserProfile </title>
      </Helmet>
      <div className="mx-auto bg-white dark:bg-[#20293d] dark:text-white shadow-md rounded-lg overflow-hidden">
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center">
            <img
              className="w-16 h-16 rounded-full border-2 border-blue-500"
              src={user && user?.photoURL}
              alt="User avatar"
            />
            <div className="ml-2 sm:ml-5">
              <div className="flex items-center">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                  {user && user?.displayName}
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {user && user?.email}
              </p>
            </div>
          </div>

          <RiMedalFill
            className={`${isMember ? "text-6xl text-yellow-500" : "text-6xl"}`}
          ></RiMedalFill>
        </div>
      </div>

      {
         (!posts.length)&&(
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
         )
      }



     {/* post section  */}
     {
      (posts.length >0 ) && (
       <div>
       <h3 className="text-4xl text-center font-semibold mt-5">
        Your top 3 post
      </h3>

      <div className="  mx-auto flex flex-col gap-5 py-5 lg:py-10">
        {isLoading ? (
          <div className="">
            {/* Render skeleton BedCards while loading */}
            {Array(3)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="w-full bg-white dark:bg-[#20293d] rounded-lg hover:scale-[1.05] transition-all animate-pulse"
                >
                  <div className="rounded-lg shadow-lg overflow-hidden bg-white dark:bg-[#20293d]">
                    {/* Author Section */}
                    <div className="p-5 flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full" />
                      <div className="flex-1">
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3" />
                        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mt-2" />
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="px-5">
                      <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
                      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mt-3" />
                      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mt-2" />
                      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mt-2" />
                    </div>

                    {/* Post Image */}
                    <div className="mt-4 px-5">
                      <div className="w-full h-[350px] bg-gray-300 dark:bg-gray-700 rounded-lg" />
                    </div>

                    {/* Likes, Comments, and Share */}
                    <div className="flex items-center justify-between mt-4 px-5 pb-5">
                      <div className="flex items-center space-x-2">
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-16" />
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-16" />
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-10" />
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-10" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          posts.map((post) => <PostCard key={post._id} post={post}></PostCard>)
        )}
      </div>
     </div>
      )
        
      
     }

      
     
    </div>
  );
};

export default UserHome;
