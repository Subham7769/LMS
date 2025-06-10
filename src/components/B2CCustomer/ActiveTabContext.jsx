import React, { createContext, useContext, useState } from "react";

const ActiveTabContext = createContext();

export const useActiveTab = () => {
  return useContext(ActiveTabContext);
};

export const ActiveTabProvider = ({ children, setActiveTab }) => {
  const [formData, setFormData] = useState({
    loanType: "",
    amount: "",
    period: "",
    repayment: "",
    email: "",
    basicPay: "",
    borrowerId: "",
    interestRate: 0,
    title: "",
    firstName: "",
    surname: "",
    gender: "",
    maritalStatus: "",
    nationality: "India",
    dateOfBirth: "",
    placeOfBirth: "",
    mobile1: "",
    houseNumber: "", 
    street: "",
    residentialArea: "",
    country: "",
  });

  const abc = {
    contactDetails: {
      mobile1: "",
      mobile2: "", //optional
      landlinePhone: "", //optional
      houseNumber: "", //optional
      street: "",
      residentialArea: "",
      country: "Zambia",
      province: "", //optional
      district: "", //optional
      email: "",
      postBox: "", //optional
    },
    employmentDetails: {
      employer: "",
      occupation: "",
      employmentDistrict: "", //optional
      employmentLocation: "",
      workStartDate: "",
      workPhoneNumber: "", //optional
      workPhysicalAddress: "", //optional
      employeeNo: "",
      workType: "",
      ministry: "",
    },
    incomeOnPaySlip: {
      basicPay: "",
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
      bankName: "",
      accountName: "",
      accountType: "",
      branch: "",
      branchCode: "",
      sortCode: "",
      accountNo: "",
    },
    nextOfKinDetails: {
      kinTitle: "",
      kinSurname: "",
      kinOtherName: "", //optional
      kinNrcNo: "",
      kinGender: "",
      kinRelationship: "",
      kinMobile1: "",
      kinMobile2: "", //optional
      kinEmail: "",
      kinHouseNo: "", //optional
      kinStreet: "",
      kinResidentialArea: "",
      kinDistrict: "", //optional
      kinCountry: "Zambia",
      kinProvince: "", //optional
      kinEmployer: "",
      kinOccupation: "",
      kinLocation: "", //optional
      kinWorkPhoneNumber: "", //optional
    },
    otherDetails: {
      reasonForBorrowing: "", //optional
      sourceOfRepayment: "", //optional
      groupId: "",
      creditScore: "",
      customerPhotoId: "",
    },
  }


  const [preOfferSteps, setPreOfferSteps] = useState([0, 1, 2])
  const [postOfferSteps, setPostOfferSteps] = useState([0, 1, 2, 3, 4])

  const [preOfferSubStep, setPreOfferSubStep] = useState(0);
  const [postOfferSubStep, setPostOfferSubStep] = useState(0);
  console.log(preOfferSubStep)

  const preOfferNext = () => setPreOfferSubStep((prev) => Math.min(prev + 1, preOfferSteps.length - 1));
  const preOfferBack = () => setPreOfferSubStep((prev) => Math.max(prev - 1, 0));

  const postOfferNext = () => setPostOfferSubStep((prev) => Math.min(prev + 1, postOfferSteps.length - 1));
  const postOfferBack = () => setPostOfferSubStep((prev) => Math.max(prev - 1, 0));


  return (
    <ActiveTabContext.Provider value={{
      formData,
      setFormData,

      preOfferSubStep,
      setPreOfferSubStep,
      preOfferNext,
      preOfferBack,
      preOfferSteps,

      postOfferSubStep,
      setPostOfferSubStep,
      postOfferNext,
      postOfferBack,
      postOfferSteps

    }}>
      {children}
    </ActiveTabContext.Provider>
  );
};
