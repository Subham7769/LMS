import { useActiveTab } from "../ActiveTabContext";

function BankDetailSection() {
  const { formData, setFormData } = useActiveTab();


  return (
    <>
      {/* Bank Name */}
      <input
        className="form-input w-full py-4"
        type="text"
        placeholder="Enter Bank Name"
        value={formData.bankName}
        onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
        required
      />

      {/* Account Name */}
      <input
        className="form-input w-full py-4"
        type="text"
        placeholder="Enter Account Name"
        value={formData.accountName}
        onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
        required
      />

      {/* Account Type */}
      <select
        className="form-input w-full py-4"
        value={formData.accountType}
        onChange={(e) => setFormData({ ...formData, accountType: e.target.value })}
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
        value={formData.accountNo}
        onChange={(e) => setFormData({ ...formData, accountNo: e.target.value })}
        required
      />

      {/* Branch */}
      <input
        className="form-input w-full py-4"
        type="text"
        placeholder="Enter Branch Name"
        value={formData.branch}
        onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
        required
      />

      {/* Branch Code */}
      <input
        className="form-input w-full py-4"
        type="text"
        placeholder="Enter Branch Code"
        value={formData.branchCode}
        onChange={(e) => setFormData({ ...formData, branchCode: e.target.value })}
        required
      />

      {/* Sort Code */}
      <input
        className="form-input w-full py-4"
        type="text"
        placeholder="Enter Sort Code"
        value={formData.sortCode}
        onChange={(e) => setFormData({ ...formData, sortCode: e.target.value })}
        required
      />



    </>
  );
}

export default BankDetailSection;
