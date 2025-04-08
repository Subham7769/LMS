import React, { useState } from "react";
import { registerDummyBorrower } from "../Actions/RegisterDummyBorrower";

function Onboarding03({ onNext, onBack, defaultData }) {
  const [email, setEmail] = useState(defaultData.email || "");
  const [basicPay, setBasicPay] = useState(defaultData.basicPay || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const borrowerId = await registerDummyBorrower(email, basicPay);
    setLoading(false);

    if (borrowerId) {
      onNext({ email, basicPay, borrowerId });
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
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          className="form-input w-full mb-4"
          type="number"
          placeholder="Basic Pay"
          value={basicPay}
          onChange={e => setBasicPay(e.target.value)}
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
