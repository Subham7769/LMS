import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";

import BG from "../assets/image/1.webp";
import BG1 from "../assets/image/2.webp";
import BG2 from "../assets/image/3.webp";
import BG3 from "../assets/image/4.webp";
import BG4 from "../assets/image/5.webp";
import BG5 from "../assets/image/6.jpg";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [imageIndex, setImageIndex] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [buttonText, setButtonText] = useState("Login");
  const images = [BG, BG1, BG2, BG3, BG4, BG5];
  const navigate = useNavigate();

  const toggleSignUp = () => {
    setIsSignup(!isSignup);
  };

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
      "http://10.10.10.70:32014/carbon-product-service/lmscarbon/api/v1/users/login",
      requestOptions
    )
      .then((response) => {
        if (!response.ok) {
          // Handle non-OK responses
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
        setButtonText("Validated!");
        console.log("Login Successful:", data);
        localStorage.setItem("username", username);
        setTimeout(() => {
          navigate("/");
        }, 0);
      })
      .catch((error) => {
        setButtonText("Try Again!");
        console.error("Failed to login:", error.message);
        setErrorMsg(error.message);
      });
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
          {isSignup ? "Create an Account" : "Welcome Back"}
        </h2>
        <form>
          {isSignup && (
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                placeholder="Your full name"
              />
            </div>
          )}
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              placeholder="Your password"
            />
          </div>
          {errorMsg && (
            <p className="text-red-500 text-center mb-2">{errorMsg}!</p>
          )}
          <button
            type="button"
            onClick={() => login(username, password)}
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {isSignup ? (
              "Sign Up"
            ) : buttonText === "Validating User" ? (
              <>
                {buttonText}
                <span className="animate-pulse">...</span>
              </>
            ) : (
              buttonText
            )}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm">
            {isSignup ? "Already have an account?" : "New to our platform?"}{" "}
            <span
              onClick={toggleSignUp}
              className="text-indigo-600 cursor-pointer hover:underline"
            >
              {isSignup ? "Login" : "Sign Up"}
            </span>
          </p>
          {!isSignup && (
            <p className="mt-2 text-sm">
              <Link
                to="/forgot-password"
                className="text-indigo-600 hover:underline"
              >
                Forgot password?
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
