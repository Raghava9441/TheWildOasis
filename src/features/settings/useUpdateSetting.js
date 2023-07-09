import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export function useUpdateSetting() {
    const queryClint = useQueryClient()
    const { isLoading: isUpdating, mutate: updateSetting, } = useMutation({
        mutationFn: updateSettingApi,
        onSuccess: () => {
            toast.success("settings successfully updated")
            queryClint.invalidateQueries({
                queryKey: ['settings']
            })
        },
        onError: () => toast.error("error updating settings")
    })
    return { isUpdating, updateSetting }
}