import React, { useEffect, useState } from "react";
import * as Slider from "@radix-ui/react-slider";
import { useActiveTab } from "../ActiveTabContext";

function Onboarding02({ onNext, onBack }) {
  const { formData, setFormData } = useActiveTab();


  useEffect(() => {
    fetch("/api/interest-rate")
      .then((res) => res.json())
      .then((data) => setFormData({ ...formData, interestRate: data.rate }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  const sliderClass =
    "relative flex items-center select-none touch-none w-full h-5";
  const thumbClass =
    "block w-4 h-4 bg-violet-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500";
  const trackClass = "bg-gray-200 relative grow rounded-full h-[4px]";
  const rangeClass = "absolute bg-violet-500 rounded-full h-full";

  return (
    <div className="px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Loan Details</h1>
        <form onSubmit={handleSubmit}>
          {/* Loan Amount */}
          <label className="block mb-1 font-medium">
            Loan Amount: ₹{formData.amount}
          </label>
          <Slider.Root
            className={sliderClass + " mb-6"}
            value={[formData.amount]}
            onValueChange={([val]) => setFormData({ ...formData, amount: val })}
            min={0}
            max={100000}
            step={1000}
          >
            <Slider.Track className={trackClass}>
              <Slider.Range className={rangeClass} />
            </Slider.Track>
            <Slider.Thumb className={thumbClass} />
          </Slider.Root>

          {/* Loan Period */}
          <label className="block mb-1 font-medium">
            Loan Period: {formData.period} months
          </label>
          <Slider.Root
            className={sliderClass + " mb-6"}
            value={[formData.period]}
            onValueChange={([val]) => setFormData({ ...formData, period: val })}
            min={1}
            max={60}
            step={1}
          >
            <Slider.Track className={trackClass}>
              <Slider.Range className={rangeClass} />
            </Slider.Track>
            <Slider.Thumb className={thumbClass} />
          </Slider.Root>

          {/* Repayment Tenure */}
          <label className="block mb-1 font-medium">
            Repayment Tenure: {formData.repayment} months
          </label>
          <Slider.Root
            className={sliderClass + " mb-6"}
            value={[formData.repayment]}
            onValueChange={([val]) => setFormData({ ...formData, repayment: val })}
            min={1}
            max={60}
            step={1}
          >
            <Slider.Track className={trackClass}>
              <Slider.Range className={rangeClass} />
            </Slider.Track>
            <Slider.Thumb className={thumbClass} />
          </Slider.Root>

          <p className="text-sm mb-4">Interest Rate: {formData.interestRate}%</p>
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
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Onboarding02;
