import { logout } from "../Slices/authSlice";
import { toast } from "react-toastify";
let timeoutId;

const resetTimer = (store) => {
  if (timeoutId) {
    // console.log("Clearing timeout...");// Debugging
    clearTimeout(timeoutId);
  }

  //   console.log("Resetting inactivity timer..."); // Debugging
  timeoutId = setTimeout(() => {
    // console.log("Logging out due to inactivity"); // Debugging
    toast("Logging out due to inactivity");
    setTimeout(() => {
      store.dispatch(logout());
      // Redirect to login page
      window.location.pathname = "/login";
    }, 1000);
  }, 10 * 60 * 1000); // 10 minutes Auto Logout time
};

export const initializeAutoLogout = (store) => {
  attachActivityListeners(store); // Call this when the app starts
};

const AutoLogoutMiddleware = (store) => (next) => (action) => {
  //   console.log("Action dispatched:", action.type); // Debugging

  if (action.type === "auth/login/fulfilled") {
    initializeAutoLogout(store);
    resetTimer(store);
  }

  if (action.type === "auth/logout") {
    if (timeoutId) clearTimeout(timeoutId);
  }

  return next(action);
};

// Attach event listeners **only once** when the app starts
const attachActivityListeners = (store) => {
  ["mousemove", "keypress", "click", "scroll"].forEach((event) => {
    window.addEventListener(event, () => {
      //   console.log(`Activity detected: ${event}`); // Debugging
      resetTimer(store);
    });
  });
};

export default AutoLogoutMiddleware;
