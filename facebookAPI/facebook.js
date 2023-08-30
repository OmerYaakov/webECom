function postToFacebook() {
    // Set up the necessary parameters
    const accessToken = "EAAPIDLpXx9sBO8jdRodXZBNa968pyoaIvggnWZCl7mNqw6wQi3RXZA4ZBRtAE2wfR44fZBgPvV1TKQKNZA1HmgFOvZCBEz79aZA1KyjjLvb9bOl4FZAT8CNFwELbVhrPFM5uTuShTyV0XIXdDvl0aefUAYZC8nhjZC2cQfGIP7MHDmP0tAdsZBLqUiYSNS2GdZCl4x8zZC24F5KnJckNgw9e3qBiwjfVvOmCDHnf8ZD"; // Replace with your Facebook access token
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