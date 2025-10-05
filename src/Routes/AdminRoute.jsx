import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useAdmin from "../Hooks/useAdmin";
import LoadingSpinner from "../Components/LoadingSpinner";
import useRole from "../Hooks/useRole";
import DashboardLoader from "../Components/Loader/DashboardLoader";
import toast from "react-hot-toast";



const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [ role, isRoleLoading ] = useRole();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

   // Return Loader
  if (loading || isRoleLoading) return <DashboardLoader />;

    // Return Children
  if (user && user.email && role === "admin") return children;

    return (
    <Navigate
      to={
        role === "admin"
          ? "/dashboard/adminHome"
          : "/"
      }
    >
      {toast.error("You're not allowed to visit Admin routes!", {
        position: "top-right",
        duration: 2000,
      })}
    </Navigate>
  );

};

export default AdminRoute;