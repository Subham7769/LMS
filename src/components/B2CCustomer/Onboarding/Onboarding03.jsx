import React, { useState } from "react";
import { registerDummyBorrower } from "../Actions/RegisterDummyBorrower";
import { useActiveTab } from "../ActiveTabContext";

function Onboarding03({ onNext, onBack, defaultData }) {
  const { formData, setFormData } = useActiveTab();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const borrowerId = await registerDummyBorrower(formData.email, formData.basicPay);

    if (isValid) {
        dispatch(registerBorrower(addBorrowerData))
          .unwrap()
          .then(() => {
            navigate(
              `/loan/loan-origination-system/personal/borrowers/view-borrower`
            );
          });
      }

    setLoading(false);

    if (borrowerId) {
      setFormData({ ...formData, borrowerId });
      onNext();
    } else {
      alert("Failed to create borrower.");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Contact & Salary</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="form-input w-full mb-4"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={e => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          className="form-input w-full mb-4"
          type="number"
          placeholder="Basic Pay"
          value={formData.basicPay}
          onChange={e => setFormData({ ...formData, basicPay: e.target.value })}
          required
        />
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onBack}
            className="btn bg-gray-300 text-black px-4 py-2 rounded"
          >
            Previous
          </button>
          <button
            type="submit"
            className="btn bg-violet-500 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Creating..." : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Onboarding03;
