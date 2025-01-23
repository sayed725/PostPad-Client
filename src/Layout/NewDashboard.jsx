import { FaHome, FaUsersCog } from "react-icons/fa";
import { RxActivityLog } from "react-icons/rx";
import { LiaHashtagSolid } from "react-icons/lia";
import { TfiAnnouncement } from "react-icons/tfi";
import { MdOutlinePostAdd, MdCardMembership } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoNotifications } from "react-icons/io5";
import { GrMultiple } from "react-icons/gr";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import Footer from "../Components/Footer";
import { FaArrowUpShortWide } from "react-icons/fa6";

const NewDashboard = () => {
 
  const [isAdmin] = useAdmin();

  return (
  <div className="bg-[#f5f5f5]">


<div className="bg-[#f5f5f5] drawer sm:w-11/12 flex  lg:w-9/12 mx-auto">
<div className="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col py-10 w-full">
  <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden w-[200px] bg-[#005694] mb-2 text-white hover:bg-[#005694]">
    <FaArrowUpShortWide></FaArrowUpShortWide> ShortCuts
    </label>
    {/* Page content here */}
    <div className="bg-[#f5f5f5] p-1 w-full">
          <Outlet></Outlet>
        </div>
   
  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
   
      {/* Sidebar content here */}
      <ul className="text-start p-3 lg:p-5 lg:text-base text-xl min-h-full w-80 shadow-lg bg-[#f5f5f5]">
            <h2 className="hidden lg:block text-2xl font-semibold border-b-2 border-[#005694] my-5 pb-1 w-[120px] ">
              ShortCuts
            </h2>
            {isAdmin ? (
              <>
                <li className="">
                  <NavLink  className={({ isActive }) =>
                      isActive
                        ? "  bg-[#005694] py-3 px-3  flex  lg:py-3 lg:px-5 justify-center lg:justify-start items-center  gap-2 rounded-md  text-white  hover:bg-[#005694]"
                        : "  hover:bg-[#005694] py-3 px-3  flex  lg:py-3 lg:px-5 justify-center lg:justify-start  items-center bg-slate-50 gap-2 rounded-md hover:text-white"
                    }
                   to="/dashboard/adminHome">
                    <FaHome></FaHome>
                   <p className=""> Admin Home</p>
                  </NavLink>
                </li>
                <li className="mt-2">
                  <NavLink
                     className={({ isActive }) =>
                        isActive
                          ? "  bg-[#005694] py-3 px-3  flex  lg:py-3 lg:px-5 justify-center lg:justify-start items-center  gap-2 rounded-md  text-white  hover:bg-[#005694]"
                          : "  hover:bg-[#005694] py-3 px-3  flex  lg:py-3 lg:px-5 justify-center lg:justify-start  items-center bg-slate-50 gap-2 rounded-md hover:text-white"
                      }
                    to="/dashboard/manageUsers"
                  >
                    <FaUsersCog></FaUsersCog>
                   <p className=""> Manage Users</p>
                  </NavLink>
                </li>
                <li className="mt-2">
                  <NavLink
                     className={({ isActive }) =>
                        isActive
                          ? "  bg-[#005694] py-3 px-3  flex  lg:py-3 lg:px-5 justify-center lg:justify-start items-center  gap-2 rounded-md  text-white  hover:bg-[#005694]"
                          : "  hover:bg-[#005694] py-3 px-3  flex  lg:py-3 lg:px-5 justify-center lg:justify-start  items-center bg-slate-50 gap-2 rounded-md hover:text-white"
                      }
                    to="/dashboard/activities"
                  >
                    <RxActivityLog></RxActivityLog>
                  <p className=""> Report/Activities</p>
                  </NavLink>
                </li>
                <li className="mt-2">
                  <NavLink className={({ isActive }) =>
                        isActive
                          ? "  bg-[#005694] py-3 px-3  flex  lg:py-3 lg:px-5 justify-center lg:justify-start items-center  gap-2 rounded-md  text-white  hover:bg-[#005694]"
                          : "  hover:bg-[#005694] py-3 px-3  flex  lg:py-3 lg:px-5 justify-center lg:justify-start  items-center bg-slate-50 gap-2 rounded-md hover:text-white"
                      }
                  to="/dashboard/announcement">
                    <TfiAnnouncement></TfiAnnouncement>
                    <p className="">Announcements</p>
                  </NavLink>
                </li>
               
              </>
            ) : (
                // normal users 
              <>
                <li className="">
                  <NavLink 
                    className={({ isActive }) =>
                      isActive
                        ? "  bg-[#005694] py-3 px-3  flex  lg:py-3 lg:px-5 justify-center lg:justify-start items-center  gap-2 rounded-md  text-white  hover:bg-[#005694]"
                        : "  hover:bg-[#005694] py-3 px-3  flex  lg:py-3 lg:px-5 justify-center lg:justify-start  items-center bg-slate-50 gap-2 rounded-md hover:text-white"
                    }
                    to="/dashboard/userHome"
                  >
                    <CgProfile></CgProfile>
                   <p className=""> My Profile</p>
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
                   <p className=""> Add Post</p>
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
                  <p className="">  My Post</p>
                  </NavLink>
                </li>
              </>
            )}
            
            {/* normal navbar  */}
            <div className="divider"></div>
            <li className="mt-2">
              <NavLink
               className={({ isActive }) =>
                isActive
                  ? "  bg-[#005694] py-3 px-3  flex  lg:py-3 lg:px-5 justify-center lg:justify-start items-center  gap-2 rounded-md  text-white  hover:bg-[#005694]"
                  : "  hover:bg-[#005694] py-3 px-3  flex  lg:py-3 lg:px-5 justify-center lg:justify-start  items-center bg-slate-50 gap-2 rounded-md hover:text-white"
              }
                to="/"
              >
                <FaHome></FaHome>
               <p className=""> Home</p>
              </NavLink>
            </li>
            <li className="mt-2">
              <NavLink
                className={({ isActive }) =>
                    isActive
                      ? "  bg-[#005694] py-3 px-3  flex  lg:py-3 lg:px-5 justify-center lg:justify-start items-center  gap-2 rounded-md  text-white  hover:bg-[#005694]"
                      : "  hover:bg-[#005694] py-3 px-3  flex  lg:py-3 lg:px-5 justify-center lg:justify-start  items-center bg-slate-50 gap-2 rounded-md hover:text-white"
                  }
                to="/order/salad"
              >
                <IoNotifications></IoNotifications>
                <p className="">Notification</p>
              </NavLink>
            </li>
            <li className="mt-2"> 
              <NavLink
                className={({ isActive }) =>
                    isActive
                      ? "  bg-[#005694] py-3 px-3  flex  lg:py-3 lg:px-5 justify-center lg:justify-start items-center  gap-2 rounded-md  text-white  hover:bg-[#005694]"
                      : "  hover:bg-[#005694] py-3 px-3  flex  lg:py-3 lg:px-5 justify-center lg:justify-start  items-center bg-slate-50 gap-2 rounded-md hover:text-white"
                  }
                to="/order/contact"
              >
                <MdCardMembership></MdCardMembership>
                <p className="">MemberShip</p>
              </NavLink>
            </li>
          </ul>
    
  </div>
</div>
</div>















      <div className="bg-[#f5f5f5] drawer sm:w-11/12  lg:w-9/12 mx-auto hidden">
      <div className="flex">
        {/* dashboard side bar */}
        <div className="drawer-content lg:w-64 w-[80px] min-h-screen bg-white shadow-lg ">
          <ul className="text-start p-3 lg:p-5 lg:text-base text-2xl ">
            <h2 className="hidden lg:block text-2xl font-semibold border-b-2 border-[#005694] my-5 pb-1 w-[120px] ">
              ShortCuts
            </h2>
            {isAdmin ? (
              <>
                <li className="">
                  <NavLink  className={({ isActive }) =>
                      isActive
                        ? "  bg-[#005694] py-3 px-3  flex  lg:py-3 lg:px-5 justify-center lg:justify-start items-center  gap-2 rounded-md  text-white  hover:bg-[#005694]"
                        : "  hover:bg-[#005694] py-3 px-3  flex  lg:py-3 lg:px-5 justify-center lg:justify-start  items-center bg-slate-50 gap-2 rounded-md hover:text-white"
                    }
                   to="/dashboard/adminHome">
                    <FaHome></FaHome>
                   <p className="hidden lg:block"> Admin Home</p>
                  </NavLink>
                </li>
                <li className="mt-2">
                  <NavLink
                     className={({ isActive }) =>
                        isActive
                          ? "  bg-[#005694] py-3 px-3  flex  lg:py-3 lg:px-5 justify-center lg:justify-start items-center  gap-2 rounded-md  text-white  hover:bg-[#005694]"
                          : "  hover:bg-[#005694] py-3 px-3  flex  lg:py-3 lg:px-5 justify-center lg:justify-start  items-center bg-slate-50 gap-2 rounded-md hover:text-white"
                      }
                    to="/dashboard/manageUsers"
                  >
                    <FaUsersCog></FaUsersCog>
                   <p className="hidden lg:block"> Manage Users</p>
                  </NavLink>
                </li>
                <li className="mt-2">
                  <NavLink
                     className={({ isActive }) =>
                        isActive
                          ? "  bg-[#005694] py-3 px-3  flex  lg:py-3 lg:px-5 justify-center lg:justify-start items-center  gap-2 rounded-md  text-white  hover:bg-[#005694]"
                          : "  hover:bg-[#005694] py-3 px-3  flex  lg:py-3 lg:px-5 justify-center lg:justify-start  items-center bg-slate-50 gap-2 rounded-md hover:text-white"
                      }
                    to="/dashboard/activities"
                  >
                    <RxActivityLog></RxActivityLog>
                  <p className="hidden lg:block"> Activities</p>
                  </NavLink>
                </li>
                <li className="mt-2">
                  <NavLink className={({ isActive }) =>
                        isActive
                          ? "  bg-[#005694] py-3 px-3  flex  lg:py-3 lg:px-5 justify-center lg:justify-start items-center  gap-2 rounded-md  text-white  hover:bg-[#005694]"
                          : "  hover:bg-[#005694] py-3 px-3  flex  lg:py-3 lg:px-5 justify-center lg:justify-start  items-center bg-slate-50 gap-2 rounded-md hover:text-white"
                      }
                  to="/dashboard/announcement">
                    <TfiAnnouncement></TfiAnnouncement>
                    <p className="hidden lg:block">Announcements</p>
                  </NavLink>
                </li>
               
              </>
            ) : (
                // normal users 
              <>
                <li className="">
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
            <li className="mt-2">
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
            <li className="mt-2">
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
            <li className="mt-2"> 
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
  </div>
  );
};

export default NewDashboard;
