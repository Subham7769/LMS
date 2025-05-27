import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { setMenus } from "../../redux/Slices/sidebarSlice";
import { useDispatch, useSelector } from "react-redux";
import { BoltIcon } from "@heroicons/react/24/outline";

// import BG from "../../assets/image/1.webp";
// import BG1 from "../../assets/image/2.webp";
// import BG2 from "../../assets/image/3.webp";
// import BG3 from "../../assets/image/4.webp";
// import BG4 from "../../assets/image/5.webp";
// import BG5 from "../../assets/image/6.jpg";

import BG from "../../assets/image/illustrations/undraw_payments_nbqu.svg";
// import BG1 from "../../assets/image/illustrations/undraw_data-analysis_b7cp.svg";
// import BG2 from "../../assets/image/illustrations/undraw_finance_m6vw.svg";
import BG3 from "../../assets/image/illustrations/undraw_online-payments_p97e.svg";
import BG4 from "../../assets/image/illustrations/undraw_credit-card-payments_y0vn.svg";
import BG5 from "../../assets/image/illustrations/undraw_pay-with-credit-card_77g6.svg";

import {
  setIsSignup,
  updateDataField,
  login,
  setButtonText,
  setError,
  resetError,
  setRole,
} from "../../redux/Slices/authSlice";
import { LogoIcon } from "../../assets/icons";

const Login = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const images = [BG, BG3, BG4, BG5];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    isSignup,
    username,
    password,
    email,
    newPassword,
    confirmPassword,
    buttonText,
    error,
  } = useSelector((state) => state.auth);

  const handleLogin = (username, password) => {
    dispatch(setButtonText("Validating User"));

    // Dispatch the login action
    dispatch(login({ username, password }))
      .unwrap()
      .then(({ token, data }) => {
        // Successful login logic
        if (data?.roles && data?.roles.length > 0) {
          const role = data?.roles[0]?.name;

          // Set RoleName
          dispatch(setRole(role));

          // Dispatch menus
          dispatch(setMenus({ roleName: role }));

          // Set the button text to "Validated!"
          dispatch(setButtonText("Validated!"));

          // Role-based navigation mapping
          const roleBasedNavigation = {
            ROLE_SUPERADMIN: "/loan/home",
            ROLE_VIEWER: "/loan/home",
            ROLE_ADMIN: "/loan/home",
            ROLE_CUSTOMER_CARE_USER: "/loan/customer-care",
            ROLE_CREDITOR_ADMIN: "/loan/home",
            ROLE_CUSTOMER_CARE_MANAGER: "/loan/customer-care",
            ROLE_TICKETING_USER: "/loan/home",
            ROLE_TICKETING_SUPERVISOR: "/loan/home",
            ROLE_TECHNICAL: "/loan/customer-care",
            ROLE_MAKER_ADMIN: "/loan/dynamic-rac",
            ROLE_CHECKER_ADMIN: "/loan/dynamic-rac",
          };

          // Navigate based on the user role
          navigate(roleBasedNavigation[role] || "/loan/home");
        } else {
          // Handle case where no roles are found in the response
          dispatch(setButtonText("Try Again!"));
          // toast("User roles not found.");
        }
      })
      .catch((error) => {
        // Failure handling logic
        dispatch(setButtonText("Try Again!"));
      });
  };

  const signup = (username, password, fullName) => {
    dispatch(setButtonText("Creating User"));
    // const requestOptions = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ username, password, fullName }),
    // };

    // fetch("https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/api/v1/users/signup", requestOptions)
    //   .then((response) => {
    //     if (!response.ok) {
    //       return response.json().then((errorData) => {
    //         dispatch(setButtonText(errorData.message || "Try Again!"));
    //         throw new Error(errorData.message || "Failed to signup");
    //       });
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     dispatch(setButtonText("Account Created!"));
    //     console.log("Signup Successful:", data);
    //     dispatch(setIsSignup("Login"));
    //   })
    //   .catch((error) => {
    //     dispatch(setButtonText("Try Again!"));
    //     console.error("Failed to signup:", error.message);
    //   });
  };

  const resetPassword = (email, newPassword, confirmPassword) => {
    if (newPassword !== confirmPassword) {
      dispatch(setError("Passwords do not match"));
      return;
    }
    dispatch(setButtonText("Setting up Password"));

    // const requestOptions = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email, newPassword }),
    // };

    // fetch("https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/api/v1/users/forgot-password", requestOptions)
    //   .then((response) => {
    //     if (!response.ok) {
    //       return response.json().then((errorData) => {
    //         dispatch(setButtonText(errorData.message || "Try Again!"));
    //         throw new Error(errorData.message || "Failed to reset password");
    //       });
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     dispatch(setButtonText("Password Reset Successful!"));
    //     console.log("Password reset successful:", data);
    //     dispatch(setIsSignup("Login"));
    //   })
    //   .catch((error) => {
    //     dispatch(setButtonText("Try Again!"));
    //     console.error("Failed to reset password:", error.message);
    //   });
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    beforeChange: (current, next) => setImageIndex(next),
    responsive: [
      {
        breakpoint: 1026,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateDataField({ name, value }));
  };

  const InputStyle = "form-input w-full";

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative ">
      <div className="hidden md:flex md:w-1/2 h-64 lg:h-[60vh]   justify-between relative overflow-hidden">
        <div className="w-full h-full">
          <Slider {...settings}>
            {images.map((image, index) => (
              <div key={index} className="flex items-center justify-center h-full">
                <img
                  src={image}
                  className="object-contain max-h-[60vh] w-auto p-6"
                  alt={`Slide ${index}`}
                />
              </div>
            ))}
          </Slider>
        </div>
        {/* <div className="inset-0 bg-black/50 absolute z-10" /> */}
      </div>

      <div className="bg-white bg-opacity-80 p-8 w-full md:w-1/2 max-w-md mx-auto rounded-lg md:border md:border-gray-300">
        {/* Header */}
        <div className="absolute top-3 left-0">
          {/* Logo */}
          <LogoIcon className={`h-8 w-auto ml-5 fill-violet-500`} />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-6 ">
          {isSignup === "Login"
            ? "Welcome back!"
            : isSignup === "Signup"
            ? "Create an Account"
            : "Reset Your Password"}
        </h2>
        <form className="border-b border-gray-100 pb-6">
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
                  onChange={(e) => handleChange(e)}
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
                  onChange={(e) => handleChange(e)}
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
                  onChange={(e) => handleChange(e)}
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
                  onChange={(e) => handleChange(e)}
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
                  onChange={(e) => handleChange(e)}
                  className={InputStyle}
                  placeholder="Confirm password"
                />
              </div>
            </>
          )}
          {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600 ">
              {isSignup === "Login" && (
                <p>
                  <button
                    onClick={() => {
                      dispatch(setIsSignup("Forget Password"));
                      dispatch(resetError());
                      dispatch(setButtonText("Set New Password"));
                    }}
                    className="hover:no-underline underline"
                  >
                    Forgot password?
                  </button>
                </p>
              )}
              {isSignup === "Forget Password" && (
                <p>
                  <button
                    onClick={() => {
                      dispatch(setIsSignup("Login"));
                      dispatch(resetError());
                      dispatch(setButtonText("Login"));
                    }}
                    className="hover:no-underline underline"
                  >
                    Back To Login
                  </button>
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => {
                if (isSignup === "Login") {
                  handleLogin(username, password);
                } else if (isSignup === "Signup") {
                  const fullName = document.getElementById("fullName").value;
                  signup(username, password, fullName);
                } else if (isSignup === "Forget Password") {
                  resetPassword(email, newPassword, confirmPassword);
                }
              }}
              className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white ml-3 cursor-pointer"
            >
              {isSignup === "Login" &&
                buttonText !== "Validating User" &&
                "Login"}
              {isSignup === "Signup" &&
                buttonText !== "Creating User" &&
                "Sign Up"}
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
          </div>
        </form>
        <div className="mt-6 text-gray-600 text-sm">
          {isSignup === "Login" && (
            <p className="">
              Don't have an account?{" "}
              <button
                onClick={() => {
                  dispatch(setIsSignup("Signup"));
                  dispatch(resetError());
                  dispatch(setButtonText("Sign Up"));
                }}
                className="font-medium text-violet-500 hover:text-violet-600 dark:hover:text-violet-400"
              >
                Sign up
              </button>
            </p>
          )}
          {isSignup === "Signup" && (
            <p className="">
              Already have an account?{" "}
              <button
                onClick={() => {
                  dispatch(setIsSignup("Login"));
                  dispatch(resetError());
                  dispatch(setButtonText("Login"));
                }}
                className="font-medium text-violet-500 hover:text-violet-600 dark:hover:text-violet-400"
              >
                Login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
