import { useDispatch, useSelector } from "react-redux";
import { updatePersonalBorrowerField } from "../../../redux/Slices/B2CLoansSlice";

function BankDetailSection() {
  const dispatch = useDispatch();
  const { personalBorrower } = useSelector((state) => state.B2CLoans)

  const handleInputChange = (e, section) => {
    const { name, value, type, checked } = e.target;
    console.log(e)
    dispatch(updatePersonalBorrowerField({ section, field: name, value, type, checked }));
  };

  return (
    <>
      {/* Bank Name */}
      <input
        className="form-input w-full py-4"
        type="text"
        placeholder="Enter Bank Name"
        name="bankName"
        value={personalBorrower.bankDetails.bankName}
        onChange={(e) => handleInputChange(e, "bankDetails")}
        required
      />

      {/* Account Name */}
      <input
        className="form-input w-full py-4"
        type="text"
        placeholder="Enter Account Name"
        name="accountName"
        value={personalBorrower.bankDetails.accountName}
        onChange={(e) => handleInputChange(e, "bankDetails")}
        required
      />

      {/* Account Type */}
      <select
        className="form-input w-full py-4"
        name="accountType"
        value={personalBorrower.bankDetails.accountType}
        onChange={(e) => handleInputChange(e, "bankDetails")}
        required
      >
        <option value="">Select Account Type</option>
        <option value="Savings">Savings</option>
        <option value="Current">Current</option>
        <option value="Salary">Salary</option>
        <option value="NRI">NRI</option>
        <option value="Joint">Joint</option>
        <option value="Fixed Deposit">Fixed Deposit</option>
        <option value="Recurring Deposit">Recurring Deposit</option>
      </select>

      {/* Account Number */}
      <input
        className="form-input w-full py-4"
        type="text"
        placeholder="Enter Account Number"
        name="accountNo"
        value={personalBorrower.bankDetails.accountNo}
        onChange={(e) => handleInputChange(e, "bankDetails")}
        required
      />

      {/* Branch */}
      <input
        className="form-input w-full py-4"
        type="text"
        placeholder="Enter Branch Name"
        name="branch"
        value={personalBorrower.bankDetails.branch}
        onChange={(e) => handleInputChange(e, "bankDetails")}
        required
      />

      {/* Branch Code */}
      <input
        className="form-input w-full py-4"
        type="text"
        placeholder="Enter Branch Code"
        name="branchCode"
        value={personalBorrower.bankDetails.branchCode}
        onChange={(e) => handleInputChange(e, "bankDetails")}
        required
      />

      {/* Sort Code */}
      <input
        className="form-input w-full py-4"
        type="text"
        placeholder="Enter Sort Code"
        name="sortCode"
        value={personalBorrower.bankDetails.sortCode}
        onChange={(e) => handleInputChange(e, "bankDetails")}
        required
      />



    </>
  );
}

export default BankDetailSection;
