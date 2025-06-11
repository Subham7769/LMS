import { useActiveTab } from "../ActiveTabContext";


function IncomeDetailSection() {
  const { formData, setFormData } = useActiveTab();

  return (
    <>
      {/* Basic Pay (Required) */}
      <input
        className="form-input w-full py-4"
        type="number"
        placeholder="Basic Pay"
        value={formData.basicPay}
        onChange={(e) => setFormData({ ...formData, basicPay: e.target.value })}
        required
      />

      {/* Housing Allowance */}
      <input
        className="form-input w-full py-4"
        type="number"
        placeholder="Housing Allowance"
        value={formData.housingAllowance}
        onChange={(e) => setFormData({ ...formData, housingAllowance: e.target.value })}
      />

      {/* Transport Allowance */}
      <input
        className="form-input w-full py-4"
        type="number"
        placeholder="Transport Allowance"
        value={formData.transportAllowance}
        onChange={(e) => setFormData({ ...formData, transportAllowance: e.target.value })}
      />

      {/* Rural/Remote Hardship Allowance */}
      <input
        className="form-input w-full py-4"
        type="number"
        placeholder="Rural/Remote Hardship Allowance"
        value={formData.ruralHardshipAllowance}
        onChange={(e) => setFormData({ ...formData, ruralHardshipAllowance: e.target.value })}
      />

      {/* Infectious Health Risk */}
      <input
        className="form-input w-full py-4"
        type="number"
        placeholder="Infectious Health Risk"
        value={formData.infectiousHealthRisk}
        onChange={(e) => setFormData({ ...formData, infectiousHealthRisk: e.target.value })}
      />

      {/* Health Shift Allowance */}
      <input
        className="form-input w-full py-4"
        type="number"
        placeholder="Health Shift Allowance"
        value={formData.healthShiftAllowance}
        onChange={(e) => setFormData({ ...formData, healthShiftAllowance: e.target.value })}
      />

      {/* Interface Allowance */}
      <input
        className="form-input w-full py-4"
        type="number"
        placeholder="Interface Allowance"
        value={formData.interfaceAllowance}
        onChange={(e) => setFormData({ ...formData, interfaceAllowance: e.target.value })}
      />

      {/* Responsibility Allowance */}
      <input
        className="form-input w-full py-4"
        type="number"
        placeholder="Responsibility Allowance"
        value={formData.responsibilityAllowance}
        onChange={(e) => setFormData({ ...formData, responsibilityAllowance: e.target.value })}
      />

      {/* Double Class Allowance */}
      <input
        className="form-input w-full py-4"
        type="number"
        placeholder="Double Class Allowance"
        value={formData.doubleClassAllowance}
        onChange={(e) => setFormData({ ...formData, doubleClassAllowance: e.target.value })}
      />

      {/* Acting Allowance */}
      <input
        className="form-input w-full py-4"
        type="number"
        placeholder="Acting Allowance"
        value={formData.actingAllowance}
        onChange={(e) => setFormData({ ...formData, actingAllowance: e.target.value })}
      />

      {/* Other Allowances */}
      <input
        className="form-input w-full py-4"
        type="number"
        placeholder="Other Allowances"
        value={formData.otherAllowances}
        onChange={(e) => setFormData({ ...formData, otherAllowances: e.target.value })}
      />

      {/* Total Deductions On Payslip */}
      <input
        className="form-input w-full py-4"
        type="number"
        placeholder="Total Deductions On Payslip"
        value={formData.totalDeductionsOnPayslip}
        onChange={(e) => setFormData({ ...formData, totalDeductionsOnPayslip: e.target.value })}
      />

      {/*Total Deductions Not On Payslip */}
      <input
        className="form-input w-full py-4"
        type="number"
        placeholder="Total Deductions Not On Payslip"
        value={formData.totalDeductionsNotOnPayslip}
        onChange={(e) => setFormData({ ...formData, totalDeductionsNotOnPayslip: e.target.value })}
      />

    </>
  );
}

export default IncomeDetailSection;
