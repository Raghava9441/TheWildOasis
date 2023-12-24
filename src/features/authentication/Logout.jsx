import React from 'react'
import ButtonIcon from '../../ui/ButtonIcon'
import { HiArrowRightOnRectangle } from 'react-icons/hi2'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logout as logOutApi } from "../../services/apiAuth";
import { useNavigate } from 'react-router-dom'
import SpinnerMini from '../../ui/SpinnerMini'

function Logout() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { mutate: logout, isLoading } = useMutation({
        mutationFn: () => logOutApi(),
        onSuccess: () => {
            queryClient.removeQueries()
            navigate("/login", { replace: true })
        }
    })

    return (
        <ButtonIcon onClick={logout} disabled={isLoading}>
            {!isLoading ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
        </ButtonIcon>
    )
}

export default Logout