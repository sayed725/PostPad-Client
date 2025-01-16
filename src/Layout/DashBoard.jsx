import { FaBook, FaHome, FaList, FaUsers, FaUtensils } from "react-icons/fa";
import { MdOutlinePostAdd, MdCardMembership } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoNotifications } from "react-icons/io5";
import { GrMultiple } from "react-icons/gr";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import Footer from "../Components/Footer";

const Dashboard = () => {
 
  const [isAdmin] = useAdmin();

  return (
    <div className="bg-[#f5f5f5] sm:w-11/12  lg:w-9/12 mx-auto">
      <div className="flex min-h-screen">
        {/* dashboard side bar */}
        <div className="lg:w-64 w-[80px] min-h-screen bg-white shadow-lg ">
          <ul className="text-start p-3 lg:p-5 text-normal text-2xl lg:text-normal">
            <h2 className="text-2xl font-semibold border-b-2 border-[#005694] my-5 pb-1 w-[120px] ">
              ShortCuts
            </h2>
            {isAdmin ? (
              <>
                <li className="">
                  <NavLink to="/dashboard/adminHome">
                    <FaHome></FaHome>
                    Admin Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/addItems">
                    <FaUtensils></FaUtensils>
                    Add Items
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manageItems">
                    <FaList></FaList>
                    Manage Items
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/bookings">
                    <FaBook></FaBook>
                    Manage Bookings
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/users">
                    <FaUsers></FaUsers>
                    All Users
                  </NavLink>
                </li>
              </>
            ) : (
                // normal users 
              <>
                <li>
                  <NavLink 
                    className={({ isActive }) =>
                      isActive
                        ? "  bg-[#005694] py-3 px-3  flex  lg:py-3 lg:px-5 justify-center lg:justify-start items-center  gap-2 rounded-md  text-white  hover:bg-[#005694]"
                        : "  hover:bg-[#005694] py-3 px-3  flex  lg:py-3 lg:px-5 justify-center lg:justify-start  items-center bg-slate-50 gap-2 rounded-md hover:text-white"
                    }
                    to="/dashboard/userHome"
                  >
                    <CgProfile></CgProfile>
                   <p className="hidden lg:block"> User Profile</p>
                  </NavLink>
                </li>
                <li className="mt-2">
                  <NavLink
                     className={({ isActive }) =>
                        isActive
                          ? "  bg-[#005694] py-3 px-3  flex  lg:py-3 lg:px-5 justify-center lg:justify-start items-center  gap-2 rounded-md  text-white  hover:bg-[#005694]"
                          : "  hover:bg-[#005694] py-3 px-3  flex  lg:py-3 lg:px-5 justify-center lg:justify-start  items-center bg-slate-50 gap-2 rounded-md hover:text-white"
                      }
                    to="/dashboard/addPost"
                  >
                    <MdOutlinePostAdd></MdOutlinePostAdd>
                   <p className="hidden lg:block"> Add Post</p>
                  </NavLink>
                </li>
                <li className="mt-2">
                  <NavLink
                     className={({ isActive }) =>
                        isActive
                          ? "  bg-[#005694] py-3 px-3  flex  lg:py-3 lg:px-5 justify-center lg:justify-start items-center  gap-2 rounded-md  text-white  hover:bg-[#005694]"
                          : "  hover:bg-[#005694] py-3 px-3  flex  lg:py-3 lg:px-5 justify-center lg:justify-start  items-center bg-slate-50 gap-2 rounded-md hover:text-white"
                      }
                    to="/dashboard/userPost"
                  >
                    <GrMultiple></GrMultiple>
                  <p className="hidden lg:block">  User Post</p>
                  </NavLink>
                </li>
              </>
            )}
            
            {/* normal navbar  */}
            <div className="divider"></div>
            <li>
              <NavLink
               className={({ isActive }) =>
                isActive
                  ? "  bg-[#005694] py-3 px-3  flex  lg:py-3 lg:px-5 justify-center lg:justify-start items-center  gap-2 rounded-md  text-white  hover:bg-[#005694]"
                  : "  hover:bg-[#005694] py-3 px-3  flex  lg:py-3 lg:px-5 justify-center lg:justify-start  items-center bg-slate-50 gap-2 rounded-md hover:text-white"
              }
                to="/"
              >
                <FaHome></FaHome>
               <p className="hidden lg:block"> Home</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                    isActive
                      ? "  bg-[#005694] py-3 px-3  flex  lg:py-3 lg:px-5 justify-center lg:justify-start items-center  gap-2 rounded-md  text-white  hover:bg-[#005694]"
                      : "  hover:bg-[#005694] py-3 px-3  flex  lg:py-3 lg:px-5 justify-center lg:justify-start  items-center bg-slate-50 gap-2 rounded-md hover:text-white"
                  }
                to="/order/salad"
              >
                <IoNotifications></IoNotifications>
                <p className="hidden lg:block">Notification</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                    isActive
                      ? "  bg-[#005694] py-3 px-3  flex  lg:py-3 lg:px-5 justify-center lg:justify-start items-center  gap-2 rounded-md  text-white  hover:bg-[#005694]"
                      : "  hover:bg-[#005694] py-3 px-3  flex  lg:py-3 lg:px-5 justify-center lg:justify-start  items-center bg-slate-50 gap-2 rounded-md hover:text-white"
                  }
                to="/order/contact"
              >
                <MdCardMembership></MdCardMembership>
                <p className="hidden lg:block">MemberShip</p>
              </NavLink>
            </li>
          </ul>
        </div>
        {/* dashboard content */}
        <div className="flex-1 p-3 lg:p-8">
          <Outlet></Outlet>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Dashboard;
