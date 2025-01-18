import useAuth from "../../Hooks/useAuth";
import { RiMedalFill } from "react-icons/ri";
import useMember from "../../Hooks/useMember";

const UserHome = () => {
  const { user } = useAuth();
  const [isMember] = useMember();

  return (
    <div>
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
              isMember ? "text-6xl text-yellow-500" : "text-6xl bg-gray-500"
            }`}
          ></RiMedalFill>
        </div>
      </div>

      {/* post section  */}

      <div className="py-10">
            <h2 className="text-4xl font-bold text-center">Your top 3 Posts</h2>
        </div>
    </div>
  );
};

export default UserHome;
