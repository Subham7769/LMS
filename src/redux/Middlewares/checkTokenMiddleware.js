import { toast } from "react-toastify";
// import { logout } from "../Slices/authSlice"; // Import your logout action

// Middleware to check token expiration
const tokenMiddleware = (navigate) => (storeAPI) => (next) => (action) => {
  const token = localStorage.getItem("authToken");

  if (token) {
    const decodedToken = parseJwt(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken?.exp < currentTime) {
      // Tost Token has expired
      toast("Token expired. Logging out...");

      // Clear the token
      localStorage.removeItem("authToken"); 

      // Dispatch logout action
      storeAPI.dispatch(logout()); 

      // Redirect to login page
      navigate("/login"); 

      // Stop further execution
      return; 
    }
  }

  // Pass the action to the next middleware
  return next(action); 
};

// Utility function to decode JWT
const parseJwt = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64));
  } catch (e) {
    console.error("Error decoding token:", e);
    return null;
  }
};

export default tokenMiddleware;
