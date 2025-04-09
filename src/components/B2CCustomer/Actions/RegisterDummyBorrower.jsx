import { nanoid } from "nanoid";
import { registerBorrower } from "../../../redux/Slices/personalBorrowersSlice";
import store from "../../../redux/store";

export const registerDummyBorrower = async (email, basicPay) => {
    const dummyBorrowerData = {
        personalDetails: {
          title: "Mr.",
          firstName: "Sample",
          surname: "User",
          otherName: "",
          uniqueIDType: "EMAIL",
          uniqueID: email,
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
          email: email,
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
          basicPay: Number(basicPay),
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

  const borrowerPayload = {
    borrowerType: "PERSONAL_BORROWER",
    borrowerProfileDraftId: nanoid(),
    personalBorrowerProfileDraft: dummyBorrowerData,
  };

  try {
    const result = await store.dispatch(registerBorrower(dummyBorrowerData)).unwrap();
    console.log("Borrower created:", result);
    return result?.uid || null;
  } catch (err) {
    console.error("Error registering borrower:", err);
    return null;
  }
};
