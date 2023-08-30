function postToFacebook() {
    // Set up the necessary parameters
    const accessToken = "EAAPIDLpXx9sBOxAcX2q0hZBdLoJB82umoAGhAXUbkuo3rFATrqIknQ4ByZBDqtFiaWzFVoQ2MaUguU2prmzmVVNd5aoTlcHYkjsJz8fB8VhsJdYkcZBg4SopQ4Y4A4G3DiDF1ZBZBnnLVMsOEZBYApKwpAkiD1g1D9AYyV65nxEwEsHNqMh64RkWIKgxpoRxX2ZC4nZCTPPpSLcrbCMew6hq1KHVgt6ScEFg"; // Replace with your Facebook access token
    const postMessage =
        "we have new product, check it out! and tell us what you think about it!"; // Replace with your post message
    const pageId = "122285680960785";

    // Construct the API endpoint URL
    const apiUrl = `https://graph.facebook.com/v16.0/${pageId}/feed`; // Use the 'pageId' variable

    // Set up the post data
    const postData = new URLSearchParams({
        message: postMessage,
        access_token: accessToken,
    });

    // Send the post request
    fetch(apiUrl, {
        method: "POST",
        body: postData, // Use the 'postData' variable
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("Post successfully sent!");
            alert("Post successfully sent!");
        })
        .catch((error) => {
            console.log("Post request failed. Error:", error);
        });
}

module.exports = postToFacebook;