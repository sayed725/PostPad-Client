
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "./useAuth";

const useRole = () => {
  const { user, loading } = useAuth();

  const { data: role = null, isLoading: isRoleLoading, error } = useQuery({
    queryKey: ["role", user?.email],
    queryFn: async () => {
      if (!user?.email) {
        throw new Error("User email is not available");
      }
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/role/${user.email}`
      );
      return data?.role || null;
    },
    enabled: !!user?.email && !loading, // Run query only when user.email exists and loading is false
  });

  return [role, isRoleLoading, error];
};

export default useRole;