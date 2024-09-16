import { useEffect, useState } from 'react'
import { Application } from "@webex/embedded-app-sdk";

function WebX() {
    const [sidebar, setSidebar] = useState(null);

    useEffect(() => {
        const initWebexApp = async () => {
            try {
                const app = new Application();

                // Wait for the Webex application to be ready
                await app.onReady();

                // Access the sidebar
                const sidebar = await app.context.getSidebar();
                console.log("sidebar:", sidebar)
                setSidebar(sidebar);

                

            } catch (error) {
                console.error("Error initializing Webex application:", error);
            }
        };
        
          if(typeof window.WebX !== 'undefined')
        initWebexApp();
    }, []);

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

