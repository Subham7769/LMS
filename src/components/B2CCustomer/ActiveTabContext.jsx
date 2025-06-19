import React, { createContext, useContext, useEffect, useState } from "react";
import { updatePersonalBorrowerInfo } from "../../redux/Slices/B2CLoansSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const ActiveTabContext = createContext();

export const useActiveTab = () => {
  return useContext(ActiveTabContext);
};

export const ActiveTabProvider = ({ children, setActiveTab }) => {
  const [formData, setFormData] = useState({
    loanProductId: "",
    amount: "",
    period: "",
    repayment: "",
    email: "",
    basicPay: "",
    borrowerId: "",
    interestRate: 0,
    password: "",
  });
  const dispatch = useDispatch();

  const { personalBorrower, loanOfferFields, cachedDetails } = useSelector((state) => state.B2CLoans)
  const { uid } = loanOfferFields;

  const [preOfferSteps, setPreOfferSteps] = useState([0, 1, 2])
  const [postOfferSteps, setPostOfferSteps] = useState([0, 1, 2, 3, 4, 5])

  const [preOfferSubStep, setPreOfferSubStep] = useState(0);
  const [postOfferSubStep, setPostOfferSubStep] = useState(0);

  useEffect(() => {
    if (loanOfferFields?.uid) {
      setFormData((prev) => ({
        ...prev,
        borrowerId: loanOfferFields.uid,
      }));
    }
  }, [loanOfferFields?.uid]);

  useEffect(() => {
    if (uid) {
      setPreOfferSubStep(0);
      setPostOfferSubStep(0);
      // optionally reset formData here
    }
  }, [uid]);

useEffect(() => {
  if (cachedDetails && Object.keys(cachedDetails).length > 0) {
    const {
      cachedPeriod,
      cachedRepayment,
      cachedAmount,
      cachedEmail,
      cachedBasicPay,
      cachedBorrowerId,
      cachedInterestRate,
      cachedLoanProductId,
      cachedLoanId,
    } = cachedDetails;

    setFormData((prev) => ({
      ...prev,
      period: cachedPeriod,
      repayment: cachedRepayment,
      amount: cachedAmount,
      email: cachedEmail,
      basicPay: cachedBasicPay,
      borrowerId: cachedBorrowerId,
      interestRate: cachedInterestRate,
      loanProductId: cachedLoanProductId,
      loanId:cachedLoanId,
    }));
  }
}, [cachedDetails]);

  // console.log(loanOfferFields)

  const preOfferNext = () => setPreOfferSubStep((prev) => Math.min(prev + 1, preOfferSteps.length - 1));
  const preOfferBack = () => setPreOfferSubStep((prev) => Math.max(prev - 1, 0));

  const postOfferNext = async () => {
    if (!uid || !personalBorrower) {
      console.warn("Missing UID or personal borrower data");
      return;
    }

    await dispatch(updatePersonalBorrowerInfo({ borrowerData: personalBorrower, uid })).unwrap();
    setPostOfferSubStep((prev) => Math.min(prev + 1, postOfferSteps.length - 1));
  };
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
