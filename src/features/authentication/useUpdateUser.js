import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
    const queryClient = useQueryClient();

    const { mutate: updateUser, isLoading: isUpdating } = useMutation({
        mutationFn: updateCurrentUser,
        onSuccess: (data) => {
            const updatedUser = data?.user;
            console.log("data:", data)
            console.log("updatedUser:", updatedUser)

            if (updatedUser) {
                toast.success("User account successfully updated");
                queryClient.setQueryData(["user"], updatedUser);
            } else {
                toast.error("Failed to update user account");
            }
        },
        onError: (err) => toast.error(err.message),
    });

    return { updateUser, isUpdating };
}