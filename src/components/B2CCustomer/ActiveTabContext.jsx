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

  const { personalBorrower } = useSelector((state) => state.B2CLoans)
  const { cachedBorrowerId } = personalBorrower?.cachedDetails;

  const [preOfferSteps, setPreOfferSteps] = useState([0, 1, 2])
  const [postOfferSteps, setPostOfferSteps] = useState([0, 1, 2, 3, 4, 5])

  const [preOfferSubStep, setPreOfferSubStep] = useState(0);
  const [postOfferSubStep, setPostOfferSubStep] = useState(0);


  useEffect(() => {
    if (cachedBorrowerId) {
      setPreOfferSubStep(0);
      setPostOfferSubStep(0);
      // optionally reset formData here
    }
  }, [cachedBorrowerId]);



  const preOfferNext = () => setPreOfferSubStep((prev) => Math.min(prev + 1, preOfferSteps.length - 1));
  const preOfferBack = () => setPreOfferSubStep((prev) => Math.max(prev - 1, 0));

  const postOfferNext = async () => {
    if (!cachedBorrowerId || !personalBorrower) {
      console.warn("Missing cachedBorrowerId or personal borrower data");
      return;
    }

    await dispatch(updatePersonalBorrowerInfo({ borrowerData: personalBorrower, uid:cachedBorrowerId })).unwrap();
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
