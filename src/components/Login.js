import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import BG from "../assets/bg/1.webp";
import BG1 from "../assets/bg/2.webp";
import BG2 from "../assets/bg/3.webp";
import BG3 from "../assets/bg/4.webp";
import BG4 from "../assets/bg/5.webp";
import BG5 from "../assets/bg/6.jpg";

const imageVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

const transition = {
  x: { type: "spring", stiffness: 300, damping: 30 },
  opacity: { duration: 0.2 },
};

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [direction, setDirection] = useState(1);
  const [imageIndex, setImageIndex] = useState(0);
  const images = [BG, BG1, BG2, BG3, BG4, BG5];
  const navigate = useNavigate();

  const toggleSignUp = () => {
    setIsSignup(!isSignup);
  };

  // Function to handle login
  function login(username, password) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    };

    fetch(
      "https://lmscarbon.com/xc-tm-customer-care/xcbe/api/v1/users/login",
      requestOptions
    )
      .then((response) => {
        // Check if the response is ok (status code 200-299)
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Access the authorization token from the response header
        const authToken = response.headers.get("Authorization");

        // Optionally, you can strip 'Bearer ' if it's included
        const token = authToken.replace("Bearer ", "");
        console.log(token);

        // Store the token for later use
        localStorage.setItem("authToken", token);

        return response.json(); // Parse JSON body of the response
      })
      .then((data) => {
        console.log("Login Successful:", data);
        localStorage.setItem("username", username);
        setTimeout(() => {
          navigate("/");
        }, 0);
        // Handle further actions after successful login if necessary
      })
      .catch((error) => {
        console.error("Failed to login:", error);
      });
  }

  const moveToNextImage = () => {
    setDirection(1);
    setImageIndex((prevIndex) => (prevIndex + 2) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      moveToNextImage();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-200">
      <div className="w-1/2 h-screen flex justify-between relative">
        {[images[imageIndex], images[(imageIndex + 1) % images.length]].map(
          (image, index) => (
            <motion.img
              key={image}
              src={image}
              custom={direction}
              variants={imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
              className="w-[50%] h-full object-cover block m-auto"
            />
          )
        )}
        <div className="inset-0 bg-black bg-opacity-50 absolute z-10" />
        <div className="absolute bottom-8 z-20 w-full flex justify-center space-x-2">
          {Array.from({ length: Math.ceil(images.length / 2) }).map(
            (_, index) => (
              <button
                onClick={() => setImageIndex(index * 2)}
                key={index}
                className={`w-4 h-4 rounded-full border-2 border-black ${
                  imageIndex === index * 2 ? "bg-gray-500" : "bg-white"
                }`}
              >
                {" "}
              </button>
            )
          )}
        </div>
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
          <button
            type="button"
            onClick={() => login(username, password)}
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {isSignup ? "Sign Up" : "Login"}
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
                href="/forgot-password"
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
