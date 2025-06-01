import React, { useState } from "react";
import { registerDummyBorrower } from "../Actions/RegisterDummyBorrower";
import { useActiveTab } from "../ActiveTabContext";
import { registerBorrower } from "../../../redux/Slices/personalBorrowersSlice";
import { useDispatch } from "react-redux";
import { generateLoanApplicationId, saveDraftLoanData, submitLoan } from "../../../redux/Slices/personalLoansSlice";

function Onboarding03({ onNext, onBack, defaultData }) {
  const { formData, setFormData } = useActiveTab();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;

    const dummyBorrowerData = {
      personalDetails: {
        title: "Mr.",
        firstName: "Sample",
        surname: "User",
        otherName: "",
        uniqueIDType: "EMAIL",
        uniqueID: formData.email,
        gender: "MALE",
        maritalStatus: "SINGLE",
        nationality: "Zambia",
        dateOfBirth: "2000-01-01",
        placeOfBirth: "Zambia",
        loanOfficer: "superadmin",
      },
      contactDetails: {
        mobile1: 9999999999,
        mobile2: "",
        landlinePhone: "",
        houseNumber: "",
        street: "Street1",
        residentialArea: "Res1",
        country: "Zambia",
        province: "Lusaka",
        district: "",
        email: formData.email,
        postBox: "",
      },
      employmentDetails: {
        employer: "Longhorn Associates",
        occupation: "PM",
        employmentDistrict: "",
        employmentLocation: "EmpLocation",
        workStartDate: "2021-04-03",
        workPhoneNumber: "",
        workPhysicalAddress: "",
        employeeNo: "PM01",
        workType: "Full-time",
        ministry: "MINISTRY_HEALTH",
      },
      incomeOnPaySlip: {
        basicPay: Number(formData.basicPay),
        housingAllowance: "",
        transportAllowance: "",
        ruralHardshipAllowance: "",
        infectiousHealthRisk: "",
        healthShiftAllowance: "",
        interfaceAllowance: "",
        responsibilityAllowance: "",
        doubleClassAllowance: "",
        actingAllowance: "",
        otherAllowances: "",
      },
      deductionOnPaySlip: {
        totalDeductionsOnPayslip: "",
        totalDeductionsNotOnPayslip: "",
      },
      bankDetails: {
        bankName: "Access Bank Zambia",
        accountName: "DummyAccount",
        accountType: "Savings",
        branch: "Cairo Road Branch",
        branchCode: "040001",
        sortCode: "04-00-01",
        accountNo: 12345678,
      },
      nextOfKinDetails: {
        kinTitle: "Mr.",
        kinSurname: "Surname",
        kinOtherName: "",
        kinNrcNo: "",
        kinGender: "MALE",
        kinRelationship: "EMPLOYER",
        kinMobile1: 9999999999,
        kinMobile2: "",
        kinEmail: "",
        kinHouseNo: "",
        kinStreet: "Street1",
        kinResidentialArea: "Res1",
        kinDistrict: "",
        kinCountry: "Zambia",
        kinProvince: "",
        kinEmployer: "DummyEmp",
        kinOccupation: "Service",
        kinLocation: "",
        kinWorkPhoneNumber: "",
      },
      otherDetails: {
        reasonForBorrowing: "",
        sourceOfRepayment: "",
        groupId: "",
        creditScore: 0.9,
        customerPhotoId: "",
      },
    };

    try {
      // 1. Register Borrower
      const borrowerResponse = await dispatch(registerBorrower(dummyBorrowerData)).unwrap();
      console.log("Borrower Registered:", borrowerResponse.registrationResults);

      // 2. Generate Loan Application ID
      const loanApplicationId = await dispatch(generateLoanApplicationId()).unwrap();
      console.log("Loan Application ID:", loanApplicationId);

      // 3. Prepare Loan Data
      const dummyLoanData = {
        "loanApplicationId": loanApplicationId,
        "borrowerName": "Anonymous User",
        "borrowerType": "PERSONAL_BORROWER",
        "status": "IN_PROGRESS",
        "generalLoanDetails": {
          "loanProductId": formData.loanType,
          "borrowerId": formData.email,
          "disbursedBy": "Bank",
          "principalAmount": formData.amount,
          "loanReleaseDate": formattedDate,
          "interestMethod": "REDUCING",
          "loanInterest": formData.interestRate,
          "loanInterestType": "YEAR",
          "loanInterestStr": "48.0000% PER YEAR REDUCING",
          "loanDuration": formData.period,
          "loanDurationType": "MONTH",
          "loanDurationStr": "1 MONTH",
          "repaymentTenure": formData.repayment,
          "repaymentTenureType": "MONTH",
          "repaymentTenureStr": `${formData.repayment} MONTHS`,
          "reasonForBorrowing": null,
          "refinancedLoanId": null,
          "refinancedLoanAmount": 0,
          "branch": "Lusaka",
          "agentName": "",
          "lhacoName": "",
          "sector": "",
          "uniqueID": formData.email,
          "loanCreationDate": "",
          "firstEmiDate": ""
        },
        "documents": [
          {
            "docId": "",
            "loanApplicationId": loanApplicationId,
            "size": 0,
            "documentKey": "PAY_SLIP",
            "verified": false
          },
          {
            "docId": "",
            "loanApplicationId": loanApplicationId,
            "size": 0,
            "documentKey": "EMPLOYER_FORM",
            "verified": false
          },
          {
            "docId": "",
            "loanApplicationId": loanApplicationId,
            "size": 0,
            "documentKey": "BANK_STATEMENT",
            "verified": false
          },
          {
            "docId": "",
            "loanApplicationId": loanApplicationId,
            "size": 0,
            "documentKey": "ATM_CARD",
            "verified": false
          }
        ],
        "refinanceDetails": [
          {
            "name": "",
            "loanId": "",
            "installmentOnPaySlip": 0,
            "refinanceAmount": 0,
            "refinanceYesNo": false
          }
        ]
      }

      // 4. Save Draft
      await dispatch(saveDraftLoanData(dummyLoanData)).unwrap();
      console.log("Saved Draft Loan!");

      // 5. Submit Loan
      const submitPayload = {
        ...dummyLoanData.generalLoanDetails,
        documents: dummyLoanData.documents,
        loanApplicationId,
        refinanceDetails: dummyLoanData.refinanceDetails,
      };
      await dispatch(submitLoan(submitPayload)).unwrap();
      console.log("Submitted Loan!");

      // 6. Navigate
      navigate("/loan/loan-origination-system/personal/loans/loan-offers");

    } catch (error) {
      console.error("Loan Submission Error:", error);
      alert(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };




  return (
    <div className="px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Contact & Salary</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="form-input w-full mb-4 py-4"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            className="form-input w-full mb-4 py-4"
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
              className="btn bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? "Creating..." : "Next"}
            </button>
          </div>
        </form>
      </div>
    </div >
  );
}

export default Onboarding03;
