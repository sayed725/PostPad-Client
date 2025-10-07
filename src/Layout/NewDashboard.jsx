import { FaHome, FaUsersCog } from "react-icons/fa";
import { RxActivityLog } from "react-icons/rx";
import { TfiAnnouncement } from "react-icons/tfi";
import { MdOutlinePostAdd, MdCardMembership } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoNotifications } from "react-icons/io5";
import { GrMultiple } from "react-icons/gr";
import { Link, NavLink, Outlet } from "react-router-dom";
// import useAdmin from "../Hooks/useAdmin";
import { Helmet } from "react-helmet-async";
// import Darkmode from "../Components/Darkmode";
import { TiThMenu } from "react-icons/ti";
import useRole from "../Hooks/useRole";
import { Button } from "../../@/components/ui/button";
import { cn } from "../../@/lib/utils";
import { NavUser } from "../Pages/Dashboard/nav-user";
// import { ModeToggle } from "../Components/theme/mode-toogle";
import useAuth from "../Hooks/useAuth";
import { MdPostAdd } from "react-icons/md";

const NewDashboard = () => {
  const { user, loading } = useAuth();
  const [role, isRoleLoading] = useRole();

  console.log("User role:", role, isRoleLoading);

  const navItemClass = ({ isActive }) =>
    cn(
      "flex items-center justify-center lg:justify-start gap-2 w-full rounded-md ",
      isActive
        ? "bg-[#005694] text-base text-white hover:bg-[#005694]"
        : "text-base hover:bg-[#005694] hover:text-white dark:bg-[#20293d] dark:hover:bg-[#005694] dark:text-white"
    );

  return (
    <div className="bg-[#f5f5f5] dark:bg-[#101720] dark:text-white">
      <Helmet>
        {" "}
        <title>PostPad | DashBoard </title>
      </Helmet>
      <div className="bg-[#f5f5f5] dark:bg-[#011222] dark:text-white drawer  flex mx-auto">
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col py-2   w-full">
            <div className="flex items-center gap-5 justify-between lg:hidden dark:bg-[#011222] ">
              <Link to="/" className="flex gap-2 items-center">
                <img
                  className="w-auto h-10"
                  src="/postpad-logo.png"
                  alt="logo"
                />
              </Link>

              <div className="flex items-center gap-2">
                <label className="lg:hidden">
                  {/* <Darkmode></Darkmode> */}
                   {/* <ModeToggle></ModeToggle> */}
                </label>
                <label
                  htmlFor="my-drawer-2"
                  className="drawer-button lg:hidden btn lg:btn-sm border-2 border-gray-500 mb-2 text-black dark:text-white dark:bg-[#011222] cursor-pointer"
                >
                  <TiThMenu className="text-3xl"></TiThMenu>
                </label>
              </div>
            </div>

            {/* Page content here */}
            <div className="bg-white dark:bg-[#011222]  dark:text-white lg:px-7 px-2 py-5 lg:py-10 w-full">
              <Outlet></Outlet>
            </div>
          </div>

          {/* large device sidebar  */}
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>

            {/* Sidebar content here */}


            <ul className="text-start min-h-screen relative lg:text-base text-xl  py-5 lg:py-0  w-[220px] shadow-lg bg-[#f5f5f5] dark:bg-[#20293d] dark:text-white">
              <p className="lg:hidden text-center font-semibold">Dashboard</p>

               <div className="divider lg:hidden"></div>

              <div className="justify-between hidden lg:flex px-3">
                <Link
                  to="/"
                  className="flex text-2xl font-semibold  gap-2 items-center my-5 pb-1 w-[120px]"
                >
                  <img
                    className="w-auto h-10"
                    src="/postpad-logo.png"
                    alt="logo"
                  />
                </Link>

                {/* <Darkmode></Darkmode> */}
                 {/* <ModeToggle></ModeToggle> */}
              </div>

              {/* Administrator Dashboard Menu*/}
              { role === "admin" && (
                <>
                 <li className="">
                    <NavLink to="/dashboard/adminHome" className={navItemClass}>
                      {({ isActive }) => (
                        <Button
                          variant={isActive ? "default" : "ghost"}
                          className={cn(navItemClass({ isActive }), "w-full")}
                        >
                          <FaHome />
                          <span>Admin Home</span>
                        </Button>
                      )}
                    </NavLink>
                  </li>
                 <li className="mt-2">
                    <NavLink to="/dashboard/managePosts" className={navItemClass}>
                      {({ isActive }) => (
                        <Button
                          variant={isActive ? "default" : "ghost"}
                          className={cn(navItemClass({ isActive }), "w-full")}
                        >
                          <MdPostAdd />
                          <span>Manage Posts</span>
                        </Button>
                      )}
                    </NavLink>
                  </li>
                 <li className="mt-2">
                    <NavLink to="/dashboard/manageUsers" className={navItemClass}>
                      {({ isActive }) => (
                        <Button
                          variant={isActive ? "default" : "ghost"}
                          className={cn(navItemClass({ isActive }), "w-full")}
                        >
                          <FaUsersCog />
                          <span>Manage Users</span>
                        </Button>
                      )}
                    </NavLink>
                  </li>
                  <li className="mt-2">
                    <NavLink to="/dashboard/activities" className={navItemClass}>
                      {({ isActive }) => (
                        <Button
                          variant={isActive ? "default" : "ghost"}
                          className={cn(navItemClass({ isActive }), "w-full")}
                        >
                          <RxActivityLog />
                          <span>Report/Activities</span>
                        </Button>
                      )}
                    </NavLink>
                  </li>
                 <li className="mt-2">
                    <NavLink to="/dashboard/announcement" className={navItemClass}>
                      {({ isActive }) => (
                        <Button
                          variant={isActive ? "default" : "ghost"}
                          className={cn(navItemClass({ isActive }), "w-full")}
                        >
                          <TfiAnnouncement />
                          <span>Announcements</span>
                        </Button>
                      )}
                    </NavLink>
                  </li>
                </>
              ) } 


              {/*  normal users / member dashboard menu*/}
              
              { role !== "admin" &&  (
                <>
                  <li className="">
                    <NavLink to="/dashboard/userHome" className={navItemClass}>
                      {({ isActive }) => (
                        <Button
                          variant={isActive ? "default" : "ghost"}
                          className={cn(navItemClass({ isActive }), "w-full")}
                        >
                          <CgProfile />
                          <span>My Profile</span>
                        </Button>
                      )}
                    </NavLink>
                  </li>
                  <li className="mt-2">
                    <NavLink to="/dashboard/addPost" className={navItemClass}>
                      {({ isActive }) => (
                        <Button
                          variant={isActive ? "default" : "ghost"}
                          className={cn(navItemClass({ isActive }), "w-full")}
                        >
                          <MdOutlinePostAdd />
                          <span>Add Post</span>
                        </Button>
                      )}
                    </NavLink>
                  </li>
                  <li className="mt-2">
                    <NavLink to="/dashboard/userPost" className={navItemClass}>
                      {({ isActive }) => (
                        <Button
                          variant={isActive ? "default" : "ghost"}
                          className={cn(navItemClass({ isActive }), "w-full")}
                        >
                          <GrMultiple />
                          <span>My Post</span>
                        </Button>
                      )}
                    </NavLink>
                  </li>
                </>
              ) }

              {/* default navbar  */}
              <div className="divider"></div>
              <li className="mt-2">
                <NavLink to="/" className={navItemClass}>
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className={cn(navItemClass({ isActive }), "w-full")}
                    >
                      <FaHome />
                      <span>Home</span>
                    </Button>
                  )}
                </NavLink>
              </li>
              <li className="mt-2">
                <NavLink to="/notification" className={navItemClass}>
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className={cn(navItemClass({ isActive }), "w-full")}
                    >
                      <IoNotifications />
                      <span>Notification</span>
                    </Button>
                  )}
                </NavLink>
              </li>
              <li className="mt-2">
                <NavLink to="/member" className={navItemClass}>
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className={cn(navItemClass({ isActive }), "w-full")}
                    >
                      <MdCardMembership />
                      <span>MemberShip</span>
                    </Button>
                  )}
                </NavLink>
              </li>
          <li>
             <NavUser className="w-full text-center"/>
          </li>
            </ul>
          </div>
        </div>
      </div>

      

     
    </div>
  );
};

export default NewDashboard;
