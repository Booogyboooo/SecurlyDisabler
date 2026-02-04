createRequest = function () {} // Override securlys request method

// Called for each tab every secound
function ran() {
    document.getElementById("securlyOverlay").remove(); // Remove the overlay
}

// Loop through tabs and remove the overlay
async function injectScript() {

    // Get all of chromes open tabs
    const tabs = await new Promise((resolve) => {
        chrome.tabs.query({}, resolve);
    });

    // Cycle through each tab
    for (var tab of tabs) {

        // Make sure the tab exists
        if (!tab || !tab.id) {
            console.error("No valid tab found");
            continue;
        }

        try {
            // Try to remove the overlay for a tab
            await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: ran,
            });

            console.log(`Injected into tab ${tab.id}`);
        } catch (err) {
            console.error(`Failed to inject into tab ${tab.id}:`, err);
        }
    }
}

// Check tabs every 1 secound
setInterval(injectScript, 1000);
