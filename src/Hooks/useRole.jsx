
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "./useAuth";

const useRole = () => {
  const { user, loading } = useAuth();

//   console.log("User in useRole:", user?.email);

  const { data: role = "", isLoading } = useQuery({
    queryKey: ["role", user?.email],
     enabled: !loading,
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/role/${user?.email}`
      );
      return data.role;
    },
    enabled: !!user?.email, 
  });

  return [role, isLoading];
};

// console.log("User role:", useRole());

export default useRole;