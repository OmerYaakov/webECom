function postToFacebook() {
    // Set up the necessary parameters
    const accessToken = "EAAPIDLpXx9sBO7kmUYqjHoG1HJD0IG6zRUQVxjkMqIAPRCsZBtl4AAyxi3sSajR11hgGEm6Ahq0cqfGs1X2HR5vKItdykUs7hqajAQuXPSGr7dblEm88v770pucxYlHxdtWn5BmndiXEIpDF9TMDoMTUVRkLpQmj1NR4vs49UXGE44ZAgSIZBEAB5SwhGSQjawEin1Kw9JXTbf62ZArZCeOdSiUtu2bLljwIZD"; // Replace with your Facebook access token
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