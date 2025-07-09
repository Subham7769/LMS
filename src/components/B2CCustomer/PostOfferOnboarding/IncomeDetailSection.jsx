import { useDispatch, useSelector } from "react-redux";
import { updatePersonalBorrowerField } from "../../../redux/Slices/B2CLoansSlice";


function IncomeDetailSection() {
  const dispatch = useDispatch();
  const { personalBorrower } = useSelector((state) => state.B2CLoans)

  const handleInputChange = (e, section) => {
    const { name, value, type, checked } = e.target;
    console.log(e)
    dispatch(updatePersonalBorrowerField({ section, field: name, value, type, checked }));
  };

  return (
    <>
      {/* Basic Pay (Required) */}
      <input
        className="form-input w-full py-4"
        type="number"
        placeholder="Basic Pay"
        name="basicPay"
        value={personalBorrower.incomeOnPaySlip.basicPay}
        onChange={(e) => handleInputChange(e, "incomeOnPaySlip")}
        required
      />

      {/* Housing Allowance */}
      <input
        className="form-input w-full py-4"
        type="number"
        placeholder="Housing Allowance"
        name="housingAllowance"
        value={personalBorrower.incomeOnPaySlip.housingAllowance}
        onChange={(e) => handleInputChange(e, "incomeOnPaySlip")}
      />

      {/* Transport Allowance */}
      <input
        className="form-input w-full py-4"
        type="number"
        placeholder="Transport Allowance"
        name="transportAllowance"
        value={personalBorrower.incomeOnPaySlip.transportAllowance}
        onChange={(e) => handleInputChange(e, "incomeOnPaySlip")}
      />

      {/* Rural/Remote Hardship Allowance */}
      <input
        className="form-input w-full py-4"
        type="number"
        placeholder="Rural/Remote Hardship Allowance"
        name="ruralHardshipAllowance"
        value={personalBorrower.incomeOnPaySlip.ruralHardshipAllowance}
        onChange={(e) => handleInputChange(e, "incomeOnPaySlip")}
      />

      {/* Infectious Health Risk */}
      <input
        className="form-input w-full py-4"
        type="number"
        placeholder="Infectious Health Risk"
        name="infectiousHealthRisk"
        value={personalBorrower.incomeOnPaySlip.infectiousHealthRisk}
        onChange={(e) => handleInputChange(e, "incomeOnPaySlip")}
      />

      {/* Health Shift Allowance */}
      <input
        className="form-input w-full py-4"
        type="number"
        placeholder="Health Shift Allowance"
        name="healthShiftAllowance"
        value={personalBorrower.incomeOnPaySlip.healthShiftAllowance}
        onChange={(e) => handleInputChange(e, "incomeOnPaySlip")}
      />

      {/* Interface Allowance */}
      <input
        className="form-input w-full py-4"
        type="number"
        placeholder="Interface Allowance"
        name="interfaceAllowance"
        value={personalBorrower.incomeOnPaySlip.interfaceAllowance}
        onChange={(e) => handleInputChange(e, "incomeOnPaySlip")}
      />

      {/* Responsibility Allowance */}
      <input
        className="form-input w-full py-4"
        type="number"
        placeholder="Responsibility Allowance"
        name="responsibilityAllowance"
        value={personalBorrower.incomeOnPaySlip.responsibilityAllowance}
        onChange={(e) => handleInputChange(e, "incomeOnPaySlip")}
      />

      {/* Double Class Allowance */}
      <input
        className="form-input w-full py-4"
        type="number"
        placeholder="Double Class Allowance"
        name="doubleClassAllowance"
        value={personalBorrower.incomeOnPaySlip.doubleClassAllowance}
        onChange={(e) => handleInputChange(e, "incomeOnPaySlip")}
      />

      {/* Acting Allowance */}
      <input
        className="form-input w-full py-4"
        type="number"
        placeholder="Acting Allowance"
        name="actingAllowance"
        value={personalBorrower.incomeOnPaySlip.actingAllowance}
        onChange={(e) => handleInputChange(e, "incomeOnPaySlip")}
      />

      {/* Other Allowances */}
      <input
        className="form-input w-full py-4"
        type="number"
        placeholder="Other Allowances"
        name="otherAllowances"
        value={personalBorrower.incomeOnPaySlip.otherAllowances}
        onChange={(e) => handleInputChange(e, "incomeOnPaySlip")}
      />

      {/* Total Deductions On Payslip */}
      <input
        className="form-input w-full py-4"
        type="number"
        placeholder="Total Deductions On Payslip"
        name="totalDeductionsOnPayslip"
        value={personalBorrower.deductionOnPaySlip.totalDeductionsOnPayslip}
        onChange={(e) => handleInputChange(e, "deductionOnPaySlip")}
      />

      {/*Total Deductions Not On Payslip */}
      <input
        className="form-input w-full py-4"
        type="number"
        placeholder="Total Deductions Not On Payslip"
        name="totalDeductionsNotOnPayslip"
        value={personalBorrower.deductionOnPaySlip.totalDeductionsNotOnPayslip}
        onChange={(e) => handleInputChange(e, "deductionOnPaySlip")}
      />

    </>
  );
}

export default IncomeDetailSection;
