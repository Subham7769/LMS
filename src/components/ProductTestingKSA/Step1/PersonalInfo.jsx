import React, { useState } from "react";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Step1PersonalInfo = ({onNext,onBack}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    mobileNumber: "",
    nationality: "",
    nationalId: "",
    day: "",
    month: "",
    year: "",
    agreed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleGetOtp = () => {
    if (!formData.agreed) {
      alert("Please agree to the Terms & Conditions before continuing.");
      return;
    }
    onNext()
  };

  return (
    <div className="p-6 mx-auto bg-white rounded-xl shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">KSA Financing</h1>
      </div>

      {/* Progress */}
      <p className="text-sm text-gray-500 mb-4">Step 1 of 4</p>
      <div className="w-full bg-gray-200 h-2 rounded-full mb-6">
        <div className="bg-teal-600 h-2 rounded-full w-1/4" />
      </div>

      {/* Sub-step nav */}
      <div className="flex justify-between mb-6">
        {["Welcome", "Personal Info", "OTP Verification"].map((label, idx) => (
          <span
            key={idx}
            className={`text-sm font-medium ${
              idx === 1 ? "text-teal-600" : "text-gray-400"
            }`}
          >
            {label}
          </span>
        ))}
      </div>

      {/* Form */}
      <h2 className="text-lg font-semibold mb-2">Create Your Account</h2>
      <p className="text-sm text-gray-600 mb-6">
        Please enter your details to register with KSA
      </p>

      <div className="space-y-4">
        {/* Mobile Number */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center border rounded-md overflow-hidden bg-yellow-50">
            <span className="px-3 py-2 text-sm bg-gray-100">+966</span>
            <input
              type="tel"
              name="mobileNumber"
              placeholder="5XXXXXXXX"
              value={formData.mobileNumber}
              onChange={handleChange}
              className="flex-1 px-3 py-2 text-sm outline-none bg-transparent"
            />
          </div>
        </div>

        {/* Nationality */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Nationality <span className="text-red-500">*</span>
          </label>
          <select
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 text-sm bg-yellow-50"
          >
            <option value="">Select your nationality</option>
            <option value="saudi">Saudi</option>
            <option value="non-saudi">Non-Saudi</option>
          </select>
        </div>

        {/* National ID / Iqama */}
        <div>
          <label className="block text-sm font-medium mb-1">
            National ID / Iqama <span className="text-red-500">*</span>
          </label>
          <div className="relative bg-yellow-50 rounded-md">
            <input
              type="text"
              name="nationalId"
              placeholder="1XXXXXXXXX"
              value={formData.nationalId}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 pr-10 text-sm bg-yellow-50 outline-none"
            />
            <User className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-2 bg-yellow-50 p-2 rounded-md">
            <select
              name="day"
              value={formData.day}
              onChange={handleChange}
              className="border rounded-md px-2 py-2 text-sm bg-yellow-50"
            >
              <option value="">Day</option>
              {Array.from({ length: 31 }, (_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select
              name="month"
              value={formData.month}
              onChange={handleChange}
              className="border rounded-md px-2 py-2 text-sm bg-yellow-50"
            >
              <option value="">Month</option>
              {[
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ].map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="border rounded-md px-2 py-2 text-sm bg-yellow-50"
            >
              <option value="">Year</option>
              {Array.from({ length: 70 }, (_, i) => 2025 - i).map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Agree */}
        <div className="flex items-start mt-2">
          <input
            type="checkbox"
            name="agreed"
            checked={formData.agreed}
            onChange={handleChange}
            className="mt-1 mr-2"
          />
          <label className="text-sm text-gray-600">
            I agree to KSA's{" "}
            <span className="text-teal-600 underline cursor-pointer">
              Terms & Conditions
            </span>{" "}
            &{" "}
            <span className="text-teal-600 underline cursor-pointer">
              Privacy Policy
            </span>
          </label>
        </div>

        {/* Submit */}
        <button
          onClick={handleGetOtp}
          className="flex items-center justify-center w-full py-2 mt-4 text-white rounded-lg bg-teal-600 hover:bg-teal-700 transition"
        >
          Get OTP
        </button>

        <p className="text-xs text-red-500">* Required fields are highlighted in yellow</p>
      </div>

      <p className="text-center text-sm text-gray-500 mt-6">
        Already have an account?{" "}
        <span className="text-teal-600 font-medium cursor-pointer">Login</span>
      </p>
    </div>
  );
};

export default Step1PersonalInfo;
