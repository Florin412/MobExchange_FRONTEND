import axios from "axios";

// This functions creats a new access token by using a refresh token.
const getNewAccessToken = async () => {
  // Retrieve the refresh token from local storage
  const refreshToken = localStorage.getItem("refreshToken");

  try {
    // Make a POST request to the API to get a new access token by using our refresh token.
    const response = await axios.post(
      "http://localhost:8080/auth/getNewAccessToken",
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`
        }
      }
    );

    // If the request was successful, extract the new access token
    if (response.status === 200 || response.status === 201) {
      const newAccessToken = response.data.accessToken;
      const newRefreshToken = response.data.refreshToken;

      localStorage.setItem("accessToken", newAccessToken);
      localStorage.setItem("refreshToken", newRefreshToken);

      console.log("New Access Token creaded.");

      return newAccessToken;
    } else {
      return null;
    }
  } catch (error) {
    // Handle errors, such as invalid or expired refresh token
    console.error("Refresh token invalid. Please log in again.", error);
    //signOut(); // Function that logs out the user
  }
};

export { getNewAccessToken };
