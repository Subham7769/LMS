import React from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="border border-red-600 rounded p-4 mx-auto w-3/12 mt-5">
      <div className="text-xl font-semibold mb-4">Set New Password</div>
      <div className="relative mb-2">
        <label htmlFor="username" className="px-1 text-xs text-gray-900">
          Email
        </label>
        <input
          type="text"
          name="username"
          id="username"
          // value={item.simpleInterest}
          // onChange={(e) => handleChange(e, item.id)}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder=""
        />
      </div>
      <div className="relative mb-2">
        <label htmlFor="newPassword" className="px-1 text-xs text-gray-900">
          New Password
        </label>
        <input
          type="password"
          name="newPassword"
          id="newPassword"
          // value={item.simpleInterest}
          // onChange={(e) => handleChange(e, item.id)}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder=""
        />
      </div>
      <div className="relative">
        <label htmlFor="cNewPassword" className="px-1 text-xs text-gray-900">
          Confirm New Password
        </label>
        <input
          type="password"
          name="cNewPassword"
          id="cNewPassword"
          // value={item.simpleInterest}
          // onChange={(e) => handleChange(e, item.id)}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder=""
        />
      </div>
      <div className="mt-5">
        <Link to="/login">
          <button
            type="button"
            className="block w-full rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Submit
          </button>  
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
