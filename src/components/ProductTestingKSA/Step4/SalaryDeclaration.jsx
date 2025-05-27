import React, { useState } from "react";
import Stepper from "../../Common/Stepper/Stepper";
import { useActiveTab } from "../ActiveTabContext";
import { useDispatch } from "react-redux";
import { updateMonthlyExpenses } from "../../../redux/Slices/ProductTestingKSA";

const SalaryDeclaration = ({ onNext }) => {
  const [formData, setFormData] = useState({
    medicalExpenses: "",
    housingExpenses: "",
    foodExpenses: "",
    educationExpenses: "",
    transportationExpenses: "",
    rentExpenses: "",
    othersExpenses: "",
    totalMonthlyObligations: "",
  });

  const dispatch = useDispatch();
  const { userId } = useActiveTab();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    //     console.log("Salary Declaration Submitted:", formData);
    // await dispatch(updateMonthlyExpenses({ formData, userId })).unwrap();
    onNext();
  };

  const expenseFields = [
    { name: "medicalExpenses", label: "Medical Expenses (SAR)" },
    { name: "housingExpenses", label: "Housing Expenses (SAR)" },
    { name: "foodExpenses", label: "Food Expenses (SAR)" },
    { name: "educationExpenses", label: "Education Expenses (SAR)" },
    { name: "transportationExpenses", label: "Transportation Expenses (SAR)" },
    { name: "rentExpenses", label: "Rent Expenses (SAR)" },
    { name: "othersExpenses", label: "Other Expenses (SAR)" },
    { name: "totalMonthlyObligations", label: "Monthly Obligations (SAR)" },
  ];

  return (
    <div className="bg-white mx-auto p-6 rounded-xl shadow-md space-y-4">
      <Stepper
        title="KSA Financing"
        currentStep={1}
        steps={["Self Declaration", "Loan Offers", "Digital Contract", "Promissory Note", "IBAN Verification", "Completion"]}
      />

      <div className="space-y-3">
        <h2 className="text-lg font-semibold mb-2">Expense & Employment Details</h2>
        <p className="text-sm text-gray-600 mb-6">
          Please enter your monthly expenses and obligations
        </p>

        {expenseFields.map(({ name, label }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <input
              type="number"
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="e.g. 1000"
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-teal-600 text-white py-2 rounded-lg mt-6 hover:bg-teal-700 transition"
      >
        Move to Loan Offers
      </button>
    </div>
  );
};

export default SalaryDeclaration;
