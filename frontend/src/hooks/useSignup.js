import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signUp } from '../lib/api';
import toast from "react-hot-toast";

const useSignUp = () => {
    const queryClient = useQueryClient();

    const { mutate, isPending, error } = useMutation({
        mutationFn: signUp,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["authUser"] });
            toast.success("Signup successful!");
        },
       
        onError: (error) => {
          const errorMessage = error.response?.data?.message || "Signup failed";
          toast.error(errorMessage);
        },
      });
    
    return { signupMutation: mutate, isPending, error };
}   

export default useSignUp