import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";
import LoadingSpinner from "../Components/LoadingSpinner";
import toast from "react-hot-toast";
import useRole from "../Hooks/useRole";
import DashboardLoader from "../Components/Loader/DashboardLoader";



const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
     const [, isRoleLoading] = useRole();

    // Return Loader
  if (loading || isRoleLoading) return <DashboardLoader />;


   // Return Children
  if (user && user.email) return children;
  
    return ( 
    // <Navigate to="/" state={{ from: location }} replace></Navigate>
     <Navigate to={"/login"}>
      {toast.error("Login Required", {
        description: "You must be logged in to access this page!",
        position: "top-right",
        duration: 3000,
      })}
    </Navigate>
    );
};

export default PrivateRoute;