
export function NoRightClickImages() {
    // When to block the context menu from appearing on images. 
    const NRCI_OPTS = {
        "gesture": "Y",
        "drag": "Y",
        "touch": "Y",
        "admin": "Y"
    }
 
    document.addEventListener("contextmenu",checkTarget_StopRightClick, {passive: false});

	if (NRCI_OPTS['drag']==='Y') {
		document.addEventListener("dragstart",checkTarget_StopRightClick, {passive: false});
		document.addEventListener("touchmove",checkTarget_StopRightClick, {passive: false}); /* same as drag? */
	}
	if (NRCI_OPTS['touch']==='Y') {
		document.addEventListener("touchstart",checkTarget_StopRightClick, {passive: false});
	}
	if (NRCI_OPTS['gesture']==='Y') {
		document.addEventListener("gesturestart",checkTarget_StopRightClick, {passive: false});
    }
    if (NRCI_OPTS['admin']==='Y') {
        // TODO add verification for logged in user to allow admin to right click
    }

    function checkTarget_StopRightClick(event: any) {
        try {
            if (event.target.tagName === "IMG") {
                event.cancelBubble = true;
                event.preventDefault();
                event.stopPropagation();
            } 
        } catch(error) {
            // YEET
        }
    }

}