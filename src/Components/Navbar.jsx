import { useContext } from "react";
import { IoHome, IoNotifications } from "react-icons/io5";
import { MdCardMembership, MdSpaceDashboard } from "react-icons/md";
import { FaUser, FaEnvelope, FaFileAlt, FaCog, FaLock } from "react-icons/fa";

import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import useAdmin from "../Hooks/useAdmin";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { CgLogOut } from "react-icons/cg";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const axiosPublic = useAxiosPublic();

  const {
    refetch,
    data: Notifications = [],
    isLoading,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await axiosPublic.get("/announcement");
      return res.data;
    },
  });

  

  const links = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? " active btn text-3xl bg-[#005694] text-white  hover:bg-[#005694]"
              : "  btn text-3xl  hover:bg-[#005694] hover:text-white"
          }
          to="/"
        >
          <IoHome></IoHome>
        </NavLink>
      </li>

      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? " active btn text-3xl bg-[#005694] text-white  hover:bg-[#005694] relative"
              : "  btn text-3xl  hover:bg-[#005694] hover:text-white relative"
          }
          to="/notification"
        >
          <IoNotifications></IoNotifications>
         {
            Notifications.length > 0 && <span className="absolute -top-2 -right-2 bg-[#005694] text-white text-base font-bold w-7 h-7 flex items-center justify-center rounded-full">{Notifications.length}</span>
         }
        </NavLink>
      </li>

      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? " active btn text-3xl bg-[#005694] text-white  hover:bg-[#005694]"
              : "  btn text-3xl  hover:bg-[#005694] hover:text-white"
          }
          to="/member"
        >
          <MdCardMembership></MdCardMembership>
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="bg-white sticky top-0 z-10 mb-8 py-1 shadow-lg">
      <div className="navbar  sm:w-11/12  lg:w-9/12 bg-white   mx-auto">
        <div className="navbar-start">
          {/* <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden border-2 border-[#ebb475] mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className=" flex flex-col gap-7 dropdown-content bg-base-100 rounded-box z-[1] mt-3  w-52 px-2 py-5  shadow"
          >
            {links}
          </ul>
        </div> */}
          <Link to="/" className="flex gap-2 items-center">
            <img className="w-auto h-7" src="/postpad-logo.png" alt="logo" />
            {/* <p className="font-bold">PostPad</p> */}
          </Link>
        </div>

        <div className="navbar-end gap-2 sm:gap-10">
          <ul className="flex justify-between gap-2 sm:gap-10 text-sm ">
            <div className="flex">
              <ul className="flex justify-between gap-2 sm:gap-5">{links}</ul>
            </div>

            {!user && (
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? " active btn bg-[#005694] text-white  hover:bg-[#005694]"
                      : " btn hover:bg-[#005694] hover:text-white"
                  }
                  to="/login"
                >
                  Join Us
                </NavLink>
              </li>
            )}
          </ul>

          {user && (
            <div className="dropdown dropdown-end z-50">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div title={user?.displayName} className="w-10 rounded-full">
                  <img
                    referrerPolicy="no-referrer"
                    alt="User Profile Photo"
                    src={user?.photoURL}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content z-[1] rounded-box  font-bold"
              >
                <div className="w-64 bg-white shadow-lg rounded-lg p-5">
                  <div className=" mb-4">
                    <h2 className="text-xl font-bold">
                      {user && user?.displayName}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {user && user?.email}
                    </p>
                  </div>
                  <div className="flex flex-col space-y-4">
                    <Link
                      to={
                        isAdmin ? "dashboard/adminHome" : "dashboard/userHome"
                      }
                      className="flex items-center space-x-2 text-gray-700 hover:text-blue-500"
                    >
                      <FaUser />
                      <span>Profile</span>
                    </Link>
                    <Link
                      to={
                        isAdmin ? "dashboard/adminHome" : "dashboard/userHome"
                      }
                      className="flex items-center space-x-2 text-gray-700 hover:text-blue-500"
                    >
                      <MdSpaceDashboard />
                      <span>DashBoard</span>
                    </Link>
                   
                    <Link
                      onClick={logOut}
                      className="flex items-center space-x-2 rounded-md  bg-[#005694] text-white px-3 py-3 hover:bg-[#005694] hover:text-white text-center"
                    >
                      <CgLogOut className="hover:text-black" />
                      <span>Logout</span>
                    </Link>
                  </div>
                </div>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
