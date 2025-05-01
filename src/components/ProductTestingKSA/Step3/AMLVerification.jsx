import React, { useState, useEffect } from "react";

const AMLVerification = ({ onNext }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    alias: "",
    dob: "",
    nationality: "",
    nationalId: "",
    address: "",
  });

  // Populate the data on component mount (simulate fetched data)
  useEffect(() => {
    setFormData({
      fullName: "Subham Jain",
      alias: "SJ",
      dob: "1996-03-15",
      nationality: "Indian",
      nationalId: "IND123456789",
      address: "123 Gandhi Marg, Jaipur, Rajasthan, India",
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("AML Data:", formData);
    onNext(); // Move to Salary Verification
  };

  return (
    <div className="mx-auto p-6 bg-white rounded-xl shadow-md">
      {/* Stepper */}
      <div>
        <p className="text-sm text-gray-500 mb-2">Step 1 of 4</p>
        <div className="w-full bg-gray-200 h-2 rounded-full mb-4">
          <div className="bg-teal-600 h-2 rounded-full w-1/4" />
        </div>
        <div className="flex justify-between text-xs text-gray-400 font-medium mb-6">
          {["AML Verification", "Salary Verification", "Credit History", "Completion"].map(
            (step, idx) => (
              <span key={idx} className={idx === 0 ? "text-teal-600" : ""}>
                {step}
              </span>
            )
          )}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            disabled
            className="w-full mt-1 p-2 border rounded-md bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Alias</label>
          <input
            type="text"
            name="alias"
            value={formData.alias}
            disabled
            className="w-full mt-1 p-2 border rounded-md bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            disabled
            className="w-full mt-1 p-2 border rounded-md bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Nationality</label>
          <input
            type="text"
            name="nationality"
            value={formData.nationality}
            disabled
            className="w-full mt-1 p-2 border rounded-md bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">National ID</label>
          <input
            type="text"
            name="nationalId"
            value={formData.nationalId}
            disabled
            className="w-full mt-1 p-2 border rounded-md bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <textarea
            name="address"
            value={formData.address}
            disabled
            rows={2}
            className="w-full mt-1 p-2 border rounded-md bg-gray-100"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-4 bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default AMLVerification;
