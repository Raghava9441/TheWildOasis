import { useEffect, useRef } from "react";

export default function useOutSideClick(handler, listenCapturing = true) {
    const outsideRef = useRef();
    useEffect(() => {
        const handleClick = (e) => {
            if (outsideRef.current && !outsideRef.current.contains(e.target)) {
                handler()
            }
        };
        document.addEventListener("click", handleClick, listenCapturing);

        return () => document.removeEventListener("click", handleClick, listenCapturing);
    }, [handler]);
    return outsideRef
}