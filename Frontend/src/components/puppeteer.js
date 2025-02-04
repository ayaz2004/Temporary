import puppeteer from 'puppeteer';

const BROWSER_WS = "wss://brd-customer-hl_51812ad0-zone-scraping_browser1:is8e3n2bn56b@brd.superproxy.io:9222";

export const getBrowser= async () => {
    let browser;
    try {
        browser = await puppeteer.connect({
            browserWSEndpoint: BROWSER_WS,
        });
        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(2 * 60 * 1000);

        // Listen for responses
        page.on('response', async (response) => {
            const url = response.url();
            const status = response.status();

            // Log the response URL and status
            console.log(`Response URL: ${url}, Status: ${status}`);

            // If the response is from the specific API endpoint, log its body
            if (url.includes("getDayCoordinatesII")) {
                try {
                    const responseBody = await response.json(); // Parse JSON response
                    console.log("Response Body:", responseBody);
                } catch (error) {
                    console.error("Failed to parse response as JSON:", error);
                }
            }
        });

        // Navigate to the target URL
        await page.goto("https://mcdonline.nic.in/esbm-mcd/citizenMap/getDayCoordinatesII?vehicleRegNo=DL1GC7925&startTime=06:00:00&endTime=21:47:56&date=03-02-2025");

        console.log("Page loaded successfully");

        // Wait for a few seconds to ensure all responses are captured
        await page.waitForTimeout(5000);

        return;
    } catch (error) {
        console.error(error.message);
    } finally {
        await browser?.close();
    }
}

// // Run the function
// getBrowser();