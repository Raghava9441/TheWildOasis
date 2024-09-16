import { useEffect, useState } from 'react'
import { Application } from "@webex/embedded-app-sdk";

function WebX() {
    const [sidebar, setSidebar] = useState(null);
    const userAgent = window.navigator.userAgent
    console.log("userAgent:", userAgent)
    const urlParams = new URLSearchParams(window.location.search);
    console.log("urlParams:", urlParams)

    const [webexApp, setWebexApp] = useState(false);


    // useEffect(() => {
    //     const initWebexApp = async () => {
    //         try {
    //             const app = new Application();

    //             // Wait for the Webex application to be ready
    //             await app.onReady();

    //             // Access the sidebar
    //             const sidebar = await app.context.getSidebar();
    //             console.log("sidebar:", sidebar)
    //             setSidebar(sidebar);



    //         } catch (error) {
    //             console.error("Error initializing Webex application:", error);
    //         }
    //     };
    //     window.Webex
    //     initWebexApp();
    // }, []);


    useEffect(() => {
        if (webexApp) {
            return;
        }
        const _webexApp = new window.Webex.Application();
        _webexApp.onReady().then((app) => {
            console.log("Webex App Ready");
            setWebexApp(_webexApp);
            const sidebar = app.context.getSidebar();
            setSidebar(sidebar);
        });
    }, [webexApp])





    const clearBadge = async () => {
        if (sidebar) {
            await sidebar.clearBadge();
        }
    };

    const showErrorBadge = async () => {
        if (sidebar) {
            const isBadgeSet = await sidebar.showBadge({
                badgeType: "error",
            });
            console.log("Badge set:", isBadgeSet);
        }
    };

    const showCountBadge = async () => {
        if (sidebar) {
            const isBadgeSet = await sidebar.showBadge({
                badgeType: "count",
                count: 5, // Example count
            });
            console.log("Count badge set:", isBadgeSet);
        }
    };

    return (
        <div className='d-flex flex-direction h-p-100 o-hidden justify-between'>
            <h1>Webex Embedded App</h1>
            <button onClick={clearBadge}>Clear Badge</button>
            <button onClick={showErrorBadge}>Show Error Badge</button>
            <button onClick={showCountBadge}>Show Count Badge</button>

        </div>
    );
}

export default WebX

