import React from 'react'
import ButtonIcon from './ButtonIcon'
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2'
import { useDarkmode } from '../context/DarkModeContext'

function DarkmodeToggle() {
    const { darkMode, toggleDarkMode } = useDarkmode()
    return (
        <ButtonIcon onClick={toggleDarkMode}>
            {
                darkMode ? <HiOutlineSun /> : <HiOutlineMoon />
            }
        </ButtonIcon>
    )

}

export default DarkmodeToggle