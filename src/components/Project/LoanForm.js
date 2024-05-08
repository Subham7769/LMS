import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import Select from "react-select";

const LoanForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    country: "",
    location: "",
    currency: "",
    loanType: "",
    flatInterestRate: "",
    interestPeriodUnit: "",
    interestRatePeriod: "",
    gracePeriodDownPayment: "",
    gracePeriodEMIs: "",
    loanGracePeriod: "",
    rollOverPeriod: "",
    rollOverFees: "",
    rollOverInterestRate: "",
    lateEMIPenalty: "",
    maxPaymentAttempt: "",
    rollOverEquation: "",
    startDate: "",
    endDate: "",
    loanAmount: "",
    numberOfInstallments: "",
    loanSchemeTCL: "",
    totalOpenLoans: "",
    downPayment: "",
    serviceFee: "",
    client: "",
  });

  const countryOptions = [
    { value: "South Africa", label: "South Africa" },
    { value: "India", label: "India" },
    { value: "Nigeria", label: "Nigeria" },
  ];

  const locationOptions = [
    { value: "Gauteng", label: "Gauteng" },
    { value: "New Delhi", label: "New Delhi" },
    { value: "Abuja", label: "Abuja" },
  ];

  const currencyOptions = [
    { value: "ZAR", label: "ZAR" },
    { value: "Rs.", label: "Rs." },
    { value: "NGN", label: "NGN" },
  ];

  const loanTypeOptions = [
    { value: "Assets", label: "Assets" },
    { value: "Personal Loan", label: "Personal Loan" },
    { value: "Home Equity Loan", label: "Home Equity Loan" },
  ];

  const interestPeriodOptions = [
    { value: "Monthly", label: "Monthly" },
    { value: "Weekly", label: "Weekly" },
    { value: "Forthnightly", label: "Forthnightly" },
  ];

  const signsOptions = [
    { value: "==", label: "==" },
    { value: "<", label: "<" },
    { value: ">", label: ">" },
    { value: "<=", label: "<=" },
    { value: ">=", label: ">=" },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (
      name === "interestRatePeriod" ||
      name === "gracePeriodDownPayment" ||
      name === "gracePeriodEMIs" ||
      name === "loanGracePeriod" ||
      name === "rollOverPeriod"
    ) {
      const isPositiveInteger = /^[1-9]\d*$/.test(value);
      if (isPositiveInteger) {
        setFormData({
          ...formData,
          [name]: value,
        });
      } else {
        alert("Please enter a positive integer.");
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <div className="w-full mx-auto bg-white p-6 shadow-md rounded-xl border border-red-600">
        <h2 className="text-lg font-bold mb-4">Create Loan Scheme</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
          {/* Name */}
          <div className="col-span-1">
            <label className="block text-gray-700" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
            />
          </div>

          {/* Description */}
          <div className="col-span-1">
            <label className="block text-gray-700" htmlFor="description">
              Description
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          {/* Country */}
          <div className="col-span-1">
            <label className="block text-gray-700" htmlFor="country">
              Country
            </label>
            <Select
              name="country"
              className="focus:ring focus:ring-blue-600 pb-2"
              options={countryOptions}
            />
          </div>

          {/* Location */}
          <div className="col-span-1">
            <label className="block text-gray-700" htmlFor="location">
              Location
            </label>
            <Select
              name="location"
              className="focus:ring focus:ring-blue-600 pb-2"
              options={locationOptions}
            />
          </div>

          {/* Loan Scheme Currency */}
          <div className="col-span-1">
            <label className="block text-gray-700" htmlFor="currency">
              Loan Scheme Currency
            </label>
            <Select
              name="currency"
              className="focus:ring focus:ring-blue-600 pb-2"
              options={currencyOptions}
            />
          </div>

          {/* Loan Scheme Type */}
          <div className="col-span-1">
            <label className="block text-gray-700" htmlFor="loanType">
              Loan Scheme Type
            </label>
            <Select
              name="loanType"
              className="focus:ring focus:ring-blue-600 pb-2"
              options={loanTypeOptions}
            />
          </div>

          {/* Flat Interest Rate */}
          <div className="col-span-1">
            <label className="block text-gray-700" htmlFor="flatInterestRate">
              Flat Interest Rate
            </label>
            <input
              type="number"
              name="flatInterestRate"
              value={formData.flatInterestRate}
              onChange={handleChange}
              placeholder="6"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
            />
          </div>

          {/* Interest Period Unit */}
          <div className="col-span-1">
            <label className="block text-gray-700" htmlFor="interestPeriodUnit">
              Interest Period Unit
            </label>
            <Select
              name="interestPeriodUnit"
              className="focus:ring focus:ring-blue-600 pb-2"
              options={interestPeriodOptions}
            />
          </div>

          {/* Interest Rate Period */}
          <div className="col-span-1">
            <label className="block text-gray-700" htmlFor="interestRatePeriod">
              Interest Rate Period
            </label>
            <input
              type="number"
              name="interestRatePeriod"
              value={formData.interestRatePeriod}
              onChange={handleChange}
              placeholder="30"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          {/* Grace Period For Down Payment (Days) */}
          <div className="col-span-1">
            <label
              className="block text-gray-700"
              htmlFor="gracePeriodDownPayment"
            >
              Grace Period For Down Payment (Days)
            </label>
            <input
              type="number"
              name="gracePeriodDownPayment"
              value={formData.gracePeriodDownPayment}
              onChange={handleChange}
              placeholder="30"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          {/* Grace Period For EMIs (Days) */}
          <div className="col-span-1">
            <label className="block text-gray-700" htmlFor="gracePeriodEMIs">
              Grace Period For EMIs (Days)
            </label>
            <input
              type="number"
              name="gracePeriodEMIs"
              value={formData.gracePeriodEMIs}
              onChange={handleChange}
              placeholder="30"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          {/* Loan Grace Period (Days) */}
          <div className="col-span-1">
            <label className="block text-gray-700" htmlFor="loanGracePeriod">
              Loan Grace Period (Days)
            </label>
            <input
              type="number"
              name="loanGracePeriod"
              value={formData.loanGracePeriod}
              onChange={handleChange}
              placeholder="30"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          {/* Roll Over Period (Days) */}
          <div className="col-span-1">
            <label className="block text-gray-700" htmlFor="rollOverPeriod">
              Roll Over Period (Days)
            </label>
            <input
              type="number"
              name="rollOverPeriod"
              value={formData.rollOverPeriod}
              onChange={handleChange}
              placeholder="30"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          {/* Roll Over Fees */}
          <div className="col-span-1">
            <label className="block text-gray-700" htmlFor="rollOverFees">
              Roll Over Fees
            </label>
            <input
              type="number"
              name="rollOverFees"
              value={formData.rollOverFees}
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          {/* Roll Over Interest Rate */}
          <div className="col-span-1">
            <label
              className="block text-gray-700"
              htmlFor="rollOverInterestRate"
            >
              Roll Over Interest Rate
            </label>
            <input
              type="number"
              name="rollOverInterestRate"
              value={formData.rollOverInterestRate}
              onChange={handleChange}
              placeholder="6"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          {/* Late EMI Penalty */}
          <div className="col-span-1">
            <label className="block text-gray-700" htmlFor="lateEMIPenalty">
              Late EMI Penalty
            </label>
            <input
              type="number"
              name="lateEMIPenalty"
              value={formData.lateEMIPenalty}
              onChange={handleChange}
              placeholder="6"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          {/* Max. Payment Attempt */}
          <div className="col-span-1">
            <label className="block text-gray-700" htmlFor="maxPaymentAttempt">
              Max. Payment Attempt
            </label>
            <input
              type="number"
              name="maxPaymentAttempt"
              value={formData.maxPaymentAttempt}
              onChange={handleChange}
              placeholder="2"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          {/* Roll Over Equation */}
          <div className="col-span-1">
            <label className="block text-gray-700" htmlFor="rollOverEquation">
              Roll Over Equation
            </label>
            <input
              type="number"
              name="rollOverEquation"
              value={formData.rollOverEquation}
              onChange={handleChange}
              placeholder="30"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          {/* Start Date */}
          <div className="col-span-1">
            <label className="block text-gray-700" htmlFor="startDate">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          {/* End Date */}
          <div className="col-span-1">
            <label className="block text-gray-700" htmlFor="endDate">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>
      <div className="w-full mx-auto bg-white p-6 mt-8 shadow-md rounded-xl border border-red-600">
        <div className="grid grid-cols-2 gap-5 mb-[24px]">
          {/* Loan Amount */}
          <div>
            <label className="block text-gray-700" htmlFor="loanAmount">
              Loan Amount
            </label>
            <div className="flex items-center space-x-2">
              <Select
                name="sign1"
                defaultValue={signsOptions[0]}
                className="block w-full max-w-20 rounded-md leading-normal text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm"
                options={signsOptions}
              />
              <input
                type="number"
                name="min"
                value={formData.loanAmount}
                onChange={handleChange}
                placeholder="Min"
                className="block w-full rounded-md border-0 py-[8px] leading-normal text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              />
              <Select
                name="sign2"
                defaultValue={signsOptions[0]}
                className="block w-full max-w-20 rounded-md leading-normal text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm"
                options={signsOptions}
              />
              <input
                type="number"
                name="max"
                value={formData.loanAmount}
                onChange={handleChange}
                placeholder="Max"
                className="block w-full rounded-md border-0 py-[9px] leading-normal text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          {/* Number of Installments */}
          <div>
            <label className="block text-gray-700" htmlFor="loanAmount">
              Number of Installments
            </label>
            <div className="flex items-center space-x-2">
              <Select
                name="sign1"
                defaultValue={signsOptions[0]}
                className="block w-full max-w-20 rounded-md leading-normal text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm"
                options={signsOptions}
              />
              <input
                type="number"
                name="min"
                value={formData.installments}
                onChange={handleChange}
                placeholder="Min"
                className="block w-full rounded-md border-0 leading-normal text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              />
              <Select
                name="sign2"
                defaultValue={signsOptions[0]}
                className="block w-full max-w-20 rounded-md leading-normal text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm"
                options={signsOptions}
              />
              <input
                type="number"
                name="max"
                value={formData.installments}
                onChange={handleChange}
                placeholder="Max"
                className="block w-full rounded-md border-0 leading-normal text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-5">
          <div className="">
            <label className="block text-gray-700" htmlFor="loanSchemeTCL">
              Loan Scheme TCL
            </label>
            <div className="flex items-center space-x-2">
              <Select
                name="sign5"
                defaultValue={signsOptions[0]}
                className="block w-full max-w-20 rounded-md leading-normal text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm"
                options={signsOptions}
              />
              <input
                type="number"
                name="loanSchemeTCL"
                value={formData.loanSchemeTCL}
                onChange={handleChange}
                placeholder="TCL"
                className="block w-full rounded-md border-0 py-[9px] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="">
            <label className="block text-gray-700" htmlFor="totalOpenLoans">
              Total Open Loans
            </label>
            <div className="flex items-center space-x-2">
              <Select
                name="sign6"
                defaultValue={signsOptions[0]}
                className="block w-full max-w-20 rounded-md leading-normal text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm"
                options={signsOptions}
              />
              <input
                type="number"
                name="totalOpenLoans"
                value={formData.totalOpenLoans}
                onChange={handleChange}
                placeholder="Total Open Loans"
                className="block w-full rounded-md border-0 py-[9px] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="">
            <label className="block text-gray-700" htmlFor="downPayment">
              Down Payment (Fixed or Percent)
            </label>
            <div className="flex items-center space-x-2">
              <Select
                name="sign5"
                defaultValue={signsOptions[0]}
                className="block w-full max-w-20 rounded-md leading-normal text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm"
                options={signsOptions}
              />
              <input
                type="number"
                name="downPayment"
                value={formData.downPayment}
                onChange={handleChange}
                placeholder="Down Payment"
                className="block w-full rounded-md border-0 py-[9px] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="">
            <label className="block text-gray-700" htmlFor="serviceFee">
              Service Fee
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                name="serviceFee"
                value={formData.serviceFee}
                onChange={handleChange}
                placeholder="Service Fee"
                className="block w-full rounded-md border-0 py-[9px] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mx-auto bg-white shadow-md rounded-xl border border-red-600 p-6 mt-8">
        <div className="gap-5">
          <div>
            <label className="block text-gray-700" htmlFor="client">
              Client
            </label>
            <textarea
              type="text"
              name="client"
              rows={3}
              value={formData.client}
              onChange={handleChange}
              placeholder="DarwinClient"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="flex space-x-4 items-center justify-between mt-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="earlyLatePayment"
                value="earlyLatePayment"
                className="form-checkbox rounded-md"
              />
              <span>Has Early Late Payment</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="calculateInterest"
                value="calculateInterest"
                className="form-checkbox rounded-md"
              />
              <span>Calculate Interest</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="tclIncludeFee"
                value="tclIncludeFee"
                className="form-checkbox rounded-md"
              />
              <span>TCL Include Fee</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="tclIncludeInterest"
                value="tclIncludeInterest"
                className="form-checkbox rounded-md"
              />
              <span>TCL Include Interest</span>
            </label>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="flex items-center justify-center mt-6 w-full bg-indigo-600  hover:bg-white hover:text-black hover:border hover:drop-shadow-lg text-white p-2 rounded-md"
      >
        <FaCheckCircle className="mr-2" />
        Create
      </button>
    </form>
  );
};

export default LoanForm;
