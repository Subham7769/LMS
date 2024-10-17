import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

import BG from "../../assets/image/1.webp";
import BG1 from "../../assets/image/2.webp";
import BG2 from "../../assets/image/3.webp";
import BG3 from "../../assets/image/4.webp";
import BG4 from "../../assets/image/5.webp";
import BG5 from "../../assets/image/6.jpg";

import { setMenus } from "../../redux/Slices/sidebarSlice";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/Slices/authSlice";

const Login = () => {
  const [isSignup, setIsSignup] = useState("Login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [imageIndex, setImageIndex] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [buttonText, setButtonText] = useState("Login");
  const images = [BG, BG1, BG2, BG3, BG4, BG5];
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {}, []);
  // Function to handle login
  const login = (username, password) => {
    setButtonText("Validating User");
    setErrorMsg("");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    };

    fetch(
      "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/api/v1/users/login",
      requestOptions
    )
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            setButtonText(errorData.message || "Try Again!");
            throw new Error(errorData.message || "Failed to login");
          });
        }
        const authToken = response.headers.get("Authorization");
        const token = authToken ? authToken.replace("Bearer ", "") : null;
        if (token) {
          localStorage.setItem("authToken", token);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data?.roles[0]?.name);
        dispatch(setUserData(data));
        dispatch(setMenus({ roleName: data?.roles[0]?.name }));
        setButtonText("Validated!");
        console.log("Login Successful:", data);
        localStorage.setItem("roleName", data?.roles[0]?.name);
        localStorage.setItem("username", username);
        setTimeout(() => {
          switch (data?.roles[0]?.name) {
            case "ROLE_SUPERADMIN":
              navigate("/");
              break;

            case "ROLE_VIEWER":
              navigate("/");
              break;

            case "ROLE_ADMIN":
              navigate("/");
              break;

            case "ROLE_CUSTOMER_CARE_USER":
              navigate("/customer-care");
              break;

            case "ROLE_CREDITOR_ADMIN":
              navigate("/");
              break;

            case "ROLE_CUSTOMER_CARE_MANAGER":
              navigate("/customer-care");
              break;

            case "ROLE_TICKETING_USER":
              navigate("/");
              break;

            case "ROLE_TICKETING_SUPERVISOR":
              navigate("/");
              break;

            case "ROLE_TECHNICAL":
              navigate("/customer-care");
              break;

            case "ROLE_MAKER_ADMIN":
              navigate("/dynamic-rac");
              break;

            case "ROLE_CHECKER_ADMIN":
              navigate("/dynamic-rac");
              break;

            default:
              navigate("/");
              break;
          }
        }, 0);
      })
      .catch((error) => {
        setButtonText("Try Again!");
        console.error("Failed to login:", error.message);
        setErrorMsg(error.message);
      });
  };

  const signup = (username, password, fullName) => {
    setButtonText("Creating User");
    setErrorMsg("");
    // const requestOptions = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ username, password, fullName }),
    // };

    // fetch("https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/api/v1/users/signup", requestOptions)
    //   .then((response) => {
    //     if (!response.ok) {
    //       return response.json().then((errorData) => {
    //         setButtonText(errorData.message || "Try Again!");
    //         throw new Error(errorData.message || "Failed to signup");
    //       });
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     setButtonText("Account Created!");
    //     console.log("Signup Successful:", data);
    //     setIsSignup("Login");
    //   })
    //   .catch((error) => {
    //     setButtonText("Try Again!");
    //     console.error("Failed to signup:", error.message);
    //     setErrorMsg(error.message);
    //   });
  };

  const resetPassword = (email, newPassword, confirmPassword) => {
    if (newPassword !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }
    setButtonText("Setting up Password");
    setErrorMsg("");
    // const requestOptions = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email, newPassword }),
    // };

    // fetch("https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/api/v1/users/forgot-password", requestOptions)
    //   .then((response) => {
    //     if (!response.ok) {
    //       return response.json().then((errorData) => {
    //         setButtonText(errorData.message || "Try Again!");
    //         throw new Error(errorData.message || "Failed to reset password");
    //       });
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     setButtonText("Password Reset Successful!");
    //     console.log("Password reset successful:", data);
    //     setIsSignup("Login");
    //   })
    //   .catch((error) => {
    //     setButtonText("Try Again!");
    //     console.error("Failed to reset password:", error.message);
    //     setErrorMsg(error.message);
    //   });
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    beforeChange: (current, next) => setImageIndex(next),
  };
  const InputStyle =
    "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50";

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-200">
      <div className="w-1/2 h-screen flex justify-between relative overflow-hidden">
        <div className="w-full min-h-screen">
          <Slider {...settings}>
            {images.map((image, index) => (
              <div key={index} className="flex items-center justify-center">
                <img
                  src={image}
                  className="w-full h-screen object-cover block"
                  alt={`Slide ${index}`}
                />
              </div>
            ))}
          </Slider>
        </div>
        <div className="inset-0 bg-black bg-opacity-50 absolute z-10" />
      </div>

      <div className="bg-white bg-opacity-80 rounded-lg shadow-lg p-8 max-sm:w-full md:w-full lg:w-1/2 max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isSignup === "Login"
            ? "Welcome Back"
            : isSignup === "Signup"
            ? "Create an Account"
            : "Reset Your Password"}
        </h2>
        <form>
          {isSignup === "Signup" && (
            <div className="mb-4">
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                className={InputStyle}
                placeholder="Your full name"
              />
            </div>
          )}
          {(isSignup === "Login" || isSignup === "Signup") && (
            <>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={InputStyle}
                  placeholder="Your username"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={InputStyle}
                  placeholder="Your password"
                />
              </div>
            </>
          )}
          {isSignup === "Forget Password" && (
            <>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={InputStyle}
                  placeholder="Your email"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={InputStyle}
                  placeholder="New password"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={InputStyle}
                  placeholder="Confirm password"
                />
              </div>
            </>
          )}
          {errorMsg && (
            <div className="mb-4 text-red-500 text-sm">{errorMsg}</div>
          )}
          <button
            type="button"
            onClick={() => {
              if (isSignup === "Login") {
                login(username, password);
              } else if (isSignup === "Signup") {
                const fullName = document.getElementById("fullName").value;
                signup(username, password, fullName);
              } else if (isSignup === "Forget Password") {
                resetPassword(email, newPassword, confirmPassword);
              }
            }}
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {isSignup === "Login" &&
              buttonText !== "Validating User" &&
              "Login"}
            {isSignup === "Signup" &&
              buttonText !== "Creating User" &&
              "Create an Account"}
            {isSignup === "Forget Password" &&
              buttonText !== "Setting up Password" &&
              "Set New Password"}
            {isSignup === "Login" && buttonText === "Validating User" && (
              <>
                {buttonText}
                <span className="animate-pulse">...</span>
              </>
            )}
            {isSignup === "Signup" && buttonText === "Creating User" && (
              <>
                {buttonText}
                <span className="animate-pulse">...</span>
              </>
            )}
            {buttonText === "Setting up Password" && (
              <>
                {buttonText}
                <span className="animate-pulse">...</span>
              </>
            )}
          </button>
        </form>
        <div className="mt-6 text-center">
          {isSignup === "Login" && (
            <p>
              Don't have an account?{" "}
              <button
                onClick={() => {
                  setIsSignup("Signup");
                  setErrorMsg("");
                  setButtonText("Create an Account");
                }}
                className="text-indigo-600 hover:text-indigo-500 font-semibold"
              >
                Sign up
              </button>
            </p>
          )}
          {isSignup === "Signup" && (
            <p>
              Already have an account?{" "}
              <button
                onClick={() => {
                  setIsSignup("Login");
                  setErrorMsg("");
                  setButtonText("Login");
                }}
                className="text-indigo-600 hover:text-indigo-500 font-semibold"
              >
                Login
              </button>
            </p>
          )}
          {isSignup === "Login" && (
            <p>
              <button
                onClick={() => {
                  setIsSignup("Forget Password");
                  setErrorMsg("");
                  setButtonText("Set New Password");
                }}
                className="text-indigo-600 hover:text-indigo-500 font-semibold"
              >
                Forgot password?
              </button>
            </p>
          )}
          {isSignup === "Forget Password" && (
            <p>
              <button
                onClick={() => {
                  setIsSignup("Login");
                  setErrorMsg("");
                  setButtonText("Login");
                }}
                className="text-indigo-600 hover:text-indigo-500 font-semibold"
              >
                Back To Login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
