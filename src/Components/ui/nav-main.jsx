import { Collapsible } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import useRole from "@/hooks/useRole";
import "../shared/Navbar/Navbar.css";
import { useAuthLoading } from "@/redux/auth/authActions";
import {
  BriefcaseMedical,
  CalendarDays,
  Home,
  IdCardIcon,
  LayoutDashboard,
  MessageSquareText,
Stethoscope,
  UserPlus,
  Users,
} from "lucide-react";

import { FaUserDoctor } from "react-icons/fa6";

import { NavLink } from "react-router";


export function NavMain() {
  const { state } = useSidebar();
//   const loading = useAuthLoading();
  const [role, isLoading] = useRole();

  const dashboardRoutes = (
    <>
      {/* Loading Skeleton */}
      {loading || isLoading ? (
        <div className="flex flex-col gap-4 pb-4">
          <div className="flex items-center gap-3 mt-1 pl-2">
            <div className="w-6 h-6 bg-gray-200 skeleton animate-shimmer rounded-lg" />
            <div className="w-2/5 h-4 bg-gray-200 skeleton animate-shimmer" />
          </div>
          <div className="flex items-center gap-3 pl-2">
            <div className="w-6 h-6 bg-gray-200 skeleton animate-shimmer rounded-lg" />
            <div className="w-3/5 h-4 bg-gray-200 skeleton animate-shimmer" />
          </div>
          <div className="flex items-center gap-3 pl-2">
            <div className="w-6 h-6 bg-gray-200 skeleton animate-shimmer rounded-lg" />
            <div className="w-4/6 h-4 bg-gray-200 skeleton animate-shimmer" />
          </div>
          <div className="flex items-center gap-3 pl-2">
            <div className="w-6 h-6 bg-gray-200 skeleton animate-shimmer rounded-lg" />
            <div className="w-3/5 h-4 bg-gray-200 skeleton animate-shimmer" />
          </div>
          <div className="flex items-center gap-3 pl-2">
            <div className="w-6 h-6 bg-gray-200 skeleton animate-shimmer rounded-lg" />
            <div className="w-2/5 h-4 bg-gray-200 skeleton animate-shimmer" />
          </div>
          <div className="flex items-center gap-3 pl-2">
            <div className="w-6 h-6 bg-gray-200 skeleton animate-shimmer rounded-lg" />
            <div className="w-2/7 h-4 bg-gray-200 skeleton animate-shimmer" />
          </div>
          <div className="divider w-3/5 mx-auto"></div>
        </div>
      ) : (
        <ul className="pt-2 *:font-semibold *:text-gray-700 flex flex-col gap-6 pl-2">
          {/* Admin Dashboard Menu*/}
          {role === "admin" && (
            <>
              <NavLink to="/dashboard/administrator-overview">
                <h3 className="flex gap-2 items-center">
                  <LayoutDashboard className="text-base" />
                  <span className={`${state === "collapsed" && "md:hidden"}`}>
                    Overview{" "}
                  </span>
                </h3>
              </NavLink>
             
              <NavLink to="/dashboard/administrator/manage-users">
                <h3 className="flex gap-2 items-center">
                  <Users className="text-base" />
                  <span className={`${state === "collapsed" && "md:hidden"}`}>
                    Users Management{" "}
                  </span>
                </h3>
              </NavLink>{" "}
              <NavLink to="/dashboard/administrator/doctors">
                <h3 className="flex gap-2 items-center tracking-[-0.2px]">
                  <IdCardIcon className="text-base" />
                  <span className={`${state === "collapsed" && "md:hidden"}`}>
                    Report/Activities{" "}
                  </span>
                </h3>
              </NavLink>
              <NavLink to="/dashboard/administrator/assign-users">
                <h3 className="flex gap-2 items-center tracking-wide">
                  <UserPlus className="text-base" />
                  <span className={`${state === "collapsed" && "md:hidden"}`}>
                    Announcements{" "}
                  </span>
                </h3>
              </NavLink>
              <NavLink to="/dashboard/administrator/manage-doctors">
                <h3 className="flex gap-2 items-center tracking-wide">
                  <FaUserDoctor size={25} className="text-base " />
                  <span className={`${state === "collapsed" && "md:hidden"}`}>
                    Manage Posts{" "}
                  </span>
                </h3>
              </NavLink>
               <NavLink to="/dashboard/administrator/manage-doctors">
                <h3 className="flex gap-2 items-center tracking-wide">
                  <FaUserDoctor size={25} className="text-base " />
                  <span className={`${state === "collapsed" && "md:hidden"}`}>
                    Admin Posts{" "}
                  </span>
                </h3>
              </NavLink>
              <div className="divider mt-2"></div>
            </>
          )}


          {/* Doctor Dashboard Menu */}
          {role === "bronze" || role === "gold" && (
            <>
              <NavLink to="/dashboard/doctor-overview">
                <h3 className="flex gap-2 items-center">
                  <LayoutDashboard className="text-base" />
                  <span className={`${state === "collapsed" && "md:hidden"}`}>
                    Profile Overview{" "}
                  </span>
                </h3>
              </NavLink>
              <NavLink to="/dashboard/doctor/doctor-chat">
                <h3 className="flex gap-2 items-center">
                  <MessageSquareText className="text-base" />
                  <span className={`${state === "collapsed" && "md:hidden"}`}>
                    Add Post{" "}
                  </span>
                </h3>
              </NavLink>
              <NavLink to="/dashboard/my-appointments">
                <h3 className="flex gap-2 items-center">
                  <CalendarDays className="text-base" />
                  <span className={`${state === "collapsed" && "md:hidden"}`}>
                    Manage My Posts{" "}
                  </span>
                </h3>
              </NavLink>{" "}
              <div className="divider"></div>
            </>
          )}
         
        </ul>
      )}
    </>
  );

  const mainRoutes = (
    <ul className="pt-2 pl-2 *:font-semibold *:text-gray-700 flex flex-col gap-6">
      <NavLink to="/">
        <h3 className="flex gap-2 items-center">
          <Home />
          <span className={`${state === "collapsed" && "md:hidden"}`}>
            Home
          </span>
        </h3>
      </NavLink>
      <NavLink to="/pharmacy">
        <h3 className="flex gap-2 items-center">
          <BriefcaseMedical className="text-lg" />
          <span className={`${state === "collapsed" && "md:hidden"}`}>
            Notification
          </span>
        </h3>
      </NavLink>
      <NavLink to="/services">
        <h3 className="flex gap-2 items-center">
          <Stethoscope className="text-lg" />
          <span className={`${state === "collapsed" && "md:hidden"}`}>
            MemberShip
          </span>
        </h3>
      </NavLink>
    </ul>
  );

  return (
    <SidebarGroup className={"overflow-y-auto overflow-x-hidden"}>
      <SidebarMenu>
        <Collapsible asChild className="group/collapsible">
          <SidebarMenuItem>
            <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
            {dashboardRoutes}
            <SidebarGroupLabel>Main Pages</SidebarGroupLabel>
            {mainRoutes}
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>
    </SidebarGroup>
  );
}