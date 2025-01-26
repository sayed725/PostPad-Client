import useAuth from "../../Hooks/useAuth";
import { RiMedalFill } from "react-icons/ri";
import useMember from "../../Hooks/useMember";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import PostCard from "../../Components/Postcard";
import LoadingSpinner from "../../Components/LoadingSpinner";
import { Helmet } from "react-helmet-async";

const UserHome = () => {
  const { user } = useAuth();
  const [isMember] = useMember();
  const axiosSecure = useAxiosSecure()


  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['userPosts', user],
    queryFn: async() => {
        const res = await axiosSecure.get(`/post/${user?.email}`);
        return res.data;
    }
})

 if(isLoading){
    <LoadingSpinner></LoadingSpinner>
 }







  return (
    <div>
       <Helmet> <title>PostPad | UserProfile </title></Helmet>
      <div className="mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex items-center justify-between p-2 sm:p-10">
          <div className="flex items-center">
            <img
              className="w-16 h-16 rounded-full border-2 border-blue-500"
              src={user && user?.photoURL}
              alt="User avatar"
            />
            <div className="ml-2 sm:ml-5">
              <div className="flex items-center">
                <h2 className="text-xl font-bold text-gray-800">
                  {user && user?.displayName}
                </h2>
              </div>
              <p className="text-gray-600">{user && user?.email}</p>
            </div>
          </div>

          <RiMedalFill
            className={`${
              isMember ? "text-6xl text-yellow-500" : "text-6xl"
            }`}
          ></RiMedalFill>
        </div>
      </div>

      {/* post section  */}
      <h3 className="text-4xl text-center font-semibold mt-5">Your top 3 post</h3>

      <div className="  mx-auto flex flex-col gap-5 py-5 lg:py-10">
      {
                    posts.map(post=><PostCard key={post._id} post={post}></PostCard>)
                }
        </div>
    </div>
  );
};

export default UserHome;
