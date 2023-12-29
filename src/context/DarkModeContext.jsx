import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";


const DarkModeContext = createContext()
function DarkModeProvider({ children }) {
    const [darkMode, setIsDarkMode] = useLocalStorageState(false, 'isDarkMode')

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark-mode')
            document.documentElement.classList.remove('light-mode')
        } else {
            document.documentElement.classList.add('light-mode')
            document.documentElement.classList.remove('dark-mode')
        }
    }, [darkMode])

    function toggleDarkMode() {
        setIsDarkMode(isDark => !isDark)
    }
    return <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>{children}</DarkModeContext.Provider>

}

function useDarkmode() {
    const context = useContext(DarkModeContext)
    if (context === undefined) throw new Error("DarkMode context was used outside of darkMode provider")
    return context;
}


export { DarkModeProvider, useDarkmode }