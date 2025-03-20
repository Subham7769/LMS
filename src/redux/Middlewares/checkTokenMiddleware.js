import { toast } from "react-toastify";
import { logout } from "../Slices/authSlice"; // Import your logout action

// Middleware to check token expiration
const tokenMiddleware = (storeAPI) => (next) => (action) => {
  const token = localStorage.getItem("authToken");
  const decodedToken = parseJwt(token);
  const currentTime = Date.now() / 1000;

  if (token) {
    // console.log(decodedToken?.exp);
    // console.log(currentTime);

    if (decodedToken?.exp < currentTime) {
      // Toast Token has expired
      toast("Token expired. Logging out...");

      // Clear the token
      localStorage.removeItem("authToken");

      setTimeout(() => {
        // Dispatch logout action
        storeAPI.dispatch(logout());

        // Redirect to login page
        window.location.pathname = "/login";
      }, 1000);

      // Stop further execution
      return;
    }
  }

  // Pass the action to the next middleware
  return next(action); // Ensure `next(action)` is called correctly
};
// Utility function to decode JWT
const parseJwt = (token) => {
  try {
    if (token) {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      return JSON.parse(atob(base64));
    }
  } catch (e) {
    console.error("Error decoding token:", e);
    return null;
  }
};

export default tokenMiddleware;
