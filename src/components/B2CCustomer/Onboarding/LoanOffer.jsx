import React, { useEffect, useState } from "react";

function LoanOffer({ formData, onBack }) {
  const [offer, setOffer] = useState(null);

  useEffect(() => {
    const fetchOffer = async () => {
      const response = await fetch("/los/borrowers/loan/offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setOffer(data);
    };

    fetchOffer();
  }, [formData]);

  return (
    <div className="p-4 max-w-md mx-auto">
      {formData ? (
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      ):(
        <p>Please Complete the form</p>
      )

      }
      <h1 className="text-2xl font-bold mb-4">Loan Offer</h1>
      {offer ? (
        <pre>{JSON.stringify(offer, null, 2)}</pre>
      ) : (
        <p>Loading offer...</p>
      )}

      <button
        type="button"
        onClick={onBack}
        className="btn bg-gray-300 text-black px-4 py-2 rounded"
      >
        Previous
      </button>
    </div>
  );
}

export default LoanOffer;
