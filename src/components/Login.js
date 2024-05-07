import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
        console.log(authToken);

        // Optionally, you can strip 'Bearer ' if it's included
        const token = authToken.replace("Bearer ", "");

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

  return (
    <div className="border border-red-600 rounded p-4 mx-auto w-3/12 mt-20">
      <div className="text-xl font-semibold mb-4">
        {isSignup ? "Sign Up" : "Login"}
      </div>
      {isSignup && (
        <div className="relative mb-2">
          <label htmlFor="fullName" className="px-1 text-xs text-gray-900">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            // value={item.simpleInterest}
            // onChange={(e) => handleChange(e, item.id)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder=""
          />
        </div>
      )}
      <div className="relative mb-2">
        <label htmlFor="username" className="px-1 text-xs text-gray-900">
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder=""
        />
      </div>
      <div className="relative">
        <label htmlFor="password" className="px-1 text-xs text-gray-900">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder=""
        />
      </div>
      <div className="mt-5">
        <button
          type="button"
          onClick={() => login(username, password)}
          className="block w-full rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Submit
        </button>
      </div>
      <p className="mt-6 text-sm cursor-pointer" onClick={toggleSignUp}>
        {isSignup ? "Already User? Login" : "New User? Sign Up"}
      </p>
      <p className="mt-1 text-sm cursor-pointer">
        <Link to="/forgot-password">{!isSignup && "Forget password"}</Link>
      </p>
    </div>
  );
};

export default Login;
