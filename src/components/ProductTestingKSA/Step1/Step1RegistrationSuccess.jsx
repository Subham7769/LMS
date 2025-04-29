import React from "react";
import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Step1RegistrationSuccess = ({ userData }) => {
  const navigate = useNavigate();

  // Dummy fallback if userData is not passed via props
  const data = userData || {
    fullName: "Subham Jain",
    email: "subham@example.com",
    phone: "+966 5XXXXXXXX",
    nationality: "Indian",
    idNumber: "1234-5678-9012",
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md text-center mt-10">
      <CheckCircle2 className="text-green-600 w-14 h-14 mx-auto mb-4" />
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Registration Successful!
      </h2>
      <p className="text-gray-600 mb-6">
        Your account has been successfully created.
      </p>

      {/* User Details */}
      <div className="bg-gray-50 p-4 rounded-lg text-left text-sm text-gray-700 mb-6 border">
        <p><strong>Full Name:</strong> {data.fullName}</p>
        <p><strong>Email:</strong> {data.email}</p>
        <p><strong>Phone Number:</strong> {data.phone}</p>
        <p><strong>Nationality:</strong> {data.nationality}</p>
        <p><strong>ID Number:</strong> {data.idNumber}</p>
      </div>

      <button
        onClick={() => navigate("/loan/product-testing-KSA/pre-eligibility-check")}
        className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition"
      >
        Pre Eligibility Check
      </button>
    </div>
  );
};

export default Step1RegistrationSuccess;
