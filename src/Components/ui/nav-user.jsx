import { Bell, LogOut, Mail, Sparkles, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { useIsMobile } from "@/hooks/use-mobile";
import useRole from "../../Hooks/useRole";
import { NavLink, useNavigate } from "react-router";
import { toast } from "sonner";
import useAuth from "../../Hooks/useAuth";
import { AuthContext } from "../../Provider/AuthProvider";
import { CgLogOut } from "react-icons/cg";
import { FaUser } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { useContext } from "react";

export function NavUser() {
     const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();
 const { user, loading } = useAuth();
  const [role] = useRole();
  const isMobile = useIsMobile();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            {loading ? (
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
              >
                <div className="h-10 w-10 bg-gray-200 rounded-lg animate-shimmer skeleton" />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <div className="h-4 w-24 bg-gray-200 rounded animate-shimmer skeleton" />
                  <div className="h-3 w-32 bg-gray-200 rounded mt-1 animate-shimmer skeleton" />
                </div>
                <div className="ml-auto h-4 w-4 bg-gray-200 rounded animate-shimmer skeleton" />
              </SidebarMenuButton>
            ) : (
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
              >
                <img
                  src={user?.photoURL}
                  alt={user?.displayName}
                  referrerPolicy="no-referrer"
                  className="h-10 w-10 rounded-lg object-cover"
                />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {user?.displayName}
                  </span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </SidebarMenuButton>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <img
                  src={user?.photoURL}
                  alt={user?.displayName}
                  referrerPolicy="no-referrer"
                  className="h-10 w-10 rounded-lg object-cover"
                />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {user?.displayName}
                  </span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className={"border"} />
            <DropdownMenuGroup className="flex flex-col gap-1">
             <div className="flex flex-col space-y-4">
                    <Link
                      to={
                        isAdmin ? "dashboard/adminHome" : "dashboard/userHome"
                      }
                      className="flex items-center space-x-2 text-gray-700 dark:text-white dark:hover:text-blue-500 hover:text-blue-500"
                    >
                      <FaUser />
                      <span>Profile</span>
                    </Link>
                    <Link
                      to={
                        "dashboard/addPost"
                      }
                      className="flex items-center space-x-2 text-gray-700 dark:text-white dark:hover:text-blue-500 hover:text-blue-500"
                    >
                      <FaUser />
                      <span>Add Post</span>
                    </Link>
                    <Link
                      to={
                        isAdmin ? "dashboard/adminHome" : "dashboard/userHome"
                      }
                      className="flex items-center space-x-2 text-gray-700 dark:text-white dark:hover:text-blue-500 hover:text-blue-500"
                    > 
                      <MdSpaceDashboard />
                      <span>DashBoard</span>
                    </Link>
                  </div>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className={"border"} />
            <Link
                      onClick={logOut}
                      className="flex items-center space-x-2 rounded-md dark:bg-[#20293d] dark:text-white border-2 dark:hover:bg-[#005694]  bg-[#005694] text-white px-3 py-3 hover:bg-[#005694] hover:text-white text-center"
                    >
                      <CgLogOut className="hover:text-black" />
                      <span>Logout</span>
                    </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}