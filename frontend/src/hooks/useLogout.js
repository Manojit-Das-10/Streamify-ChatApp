import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../lib/api";
import toast from "react-hot-toast";

const useLogout = () => {
  const queryClient = useQueryClient();

  const { mutate: logoutMutation, isPending, error } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["authUser"] }),
        toast.success("Logout successful!");
    },
  });

  return { logoutMutation, isPending, error };
};

export default useLogout;
