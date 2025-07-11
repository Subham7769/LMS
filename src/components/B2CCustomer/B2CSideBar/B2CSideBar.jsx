import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ArrowLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { setSubmenuStates, toggleSidebar } from "../../../redux/Slices/sidebarSlice";
import { setRole } from "../../../redux/Slices/authSlice";
import ProductListSection from "../PreOfferOnboarding/ProductListSection";
import LoanRequirementSection from "../PreOfferOnboarding/LoanRequirementSection";
import PersonDetailsSection from "../PreOfferOnboarding/PersonDetailsSection";
import { registerB2CPersonalBorrower } from "../../../redux/Slices/B2CLoansSlice";
import { generatePersonalLoanApplicationId, saveDraftLoanData, submitPersonalLoan } from "../../../redux/Slices/B2CLoansSlice";
import { useActiveTab } from "../ActiveTabContext";
import Button from '../../Common/Button/Button'
import { toast } from "react-toastify";



const SideBar = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { pathname } = location;
    const { menus, error, submenuStates, open } = useSelector((state) => state.sidebar);
    const { roleName } = useSelector((state) => state.auth);
    const roleNameLocal = localStorage.getItem("roleName");
    const { formData } = useActiveTab();
    const [submitLoading, setSubmitLoading] = useState(false);
    const { loanConfigData } = useSelector((state) => state.B2CLoans);
    const { loanApplicationId } = loanConfigData


    if (!roleName) {
        dispatch(setRole(roleNameLocal));
    }


    useEffect(() => {
        localStorage.setItem("submenuStates", JSON.stringify(submenuStates));
    }, [submenuStates]);


    const handleToggleSidebar = () => {
        dispatch(toggleSidebar());
    };

    const handleToggleSidebarOnMobile = (menu) => {
        if (window.innerWidth < 1024 && (!menu || !menu.submenu)) {
            dispatch(toggleSidebar());
        }
    };

    const handleToggleSubmenu = (index) => {
        const updatedStates = submenuStates.map((state, i) =>
            i === index ? { ...state, isOpen: !state.isOpen } : state
        );
        dispatch(setSubmenuStates(updatedStates));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitLoading(true);

        const today = new Date();
        const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        // console.log(formattedDate)

        try {

            // 1. Prepare Loan Data
            const dummyLoanData = {
                "loanApplicationId": loanApplicationId,
                "borrowerName": "Anonymous User",
                "borrowerType": "PERSONAL_BORROWER",
                "status": "IN_PROGRESS",
                "generalLoanDetails": {
                    "loanProductId": formData.loanProductId,
                    "borrowerId": formData.email,
                    "disbursedBy": "Bank",
                    "principalAmount": formData.amount,
                    "loanReleaseDate": formattedDate,
                    "interestMethod": "REDUCING",
                    "loanInterest": formData.interestRate,
                    "loanInterestType": "YEAR",
                    "loanInterestStr": `${formData.interestRate}% PER YEAR REDUCING`,
                    "loanDuration": formData.period,
                    "loanDurationType": "MONTH",
                    "loanDurationStr": `${formData.period} MONTHS`,
                    "repaymentTenure": formData.repayment,
                    "repaymentTenureType": "MONTH",
                    "repaymentTenureStr": `${formData.repayment} MONTHS`,
                    "reasonForBorrowing": null,
                    "refinancedLoanId": null,
                    "refinancedLoanAmount": 0,
                    "branch": "Online",
                    "agentName": "",
                    "lhacoName": "",
                    "sector": "",
                    "uniqueID": formData.email,
                    "loanCreationDate": formattedDate,
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

            // 2. Save Draft
            await dispatch(saveDraftLoanData(dummyLoanData)).unwrap();
            //   console.log("Saved Draft Loan!");

            // 3. Submit Loan
            const submitPayload = {
                ...dummyLoanData.generalLoanDetails,
                documents: dummyLoanData.documents,
                loanApplicationId,
                refinanceDetails: dummyLoanData.refinanceDetails,
            };
            await dispatch(submitPersonalLoan(submitPayload)).unwrap();
            //   console.log("Submitted Loan!");

            // 4. Navigate
            //   navigate("/customer/loan-offers");

        } catch (error) {
            console.error("Loan Submission Error:", error);
            toast(`Error: ${error}`);
        } finally {
            setSubmitLoading(false);
        }
    };

    
  const ShimmerTable = () => {
    return (
      <div className="grid grid-cols-4 gap-4 animate-pulse">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded"></div>
      </div>
    );
  };


    return (
        <>
            {/* Sidebar backdrop (mobile only) */}
            <div
                className={` inset-0 bg-gray-900/30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                aria-hidden="true"
            ></div>
            <div
                className={`z-40   md:static relative top-0 left-0 overflow-y-auto h-screen no-scrollbar flex transform duration-1000 ease-in-out ${open ? "w-[17rem] " : "lg:w-4 w-0 "
                    }`}
            >
                {/* Collapse Button */}
                <button
                    onClick={handleToggleSidebar}
                    className={`hidden md:block z-50 absolute ${open ? "right-2" : "right-0"}  top-56 bg-gray-800 dark:border border-gray-400 h-16 w-4 rounded-full p-0`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 text-white transition-transform duration-300 ${open ? "rotate-180" : ""
                            }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </button>
                <div
                    className={`pt-4 h-auto ${open ? "w-64 px-4  border-r" : "lg:w-10 w-0 pl-1 pr-2"
                        } overflow-y-auto no-scrollbar border-gray-200 dark:border-gray-500  bg-white dark:bg-gray-800 transition-[width,padding] duration-1000 ease-in-out`}
                >
                    <div className="w-full flex shrink-0 items-center justify-between lg:w-1/3">
                        <ArrowLeftIcon
                            className={`h-6 w-auto mb-10 lg:hidden`}
                            onClick={handleToggleSidebar}
                        />
                    </div>
                    <div className={`flex flex-col align-middle gap-2 transform duration-500 ease-in-out transition-opacity ${open ? "opacity-100" : "opacity-0"}`}>

                        <p className="font-bold ">Loan Products</p>
                        {/* Product List Section */}
                        <ProductListSection />

                        <p className="font-bold mt-5">Loan Config</p>
                        {/* Loan Amount, Period, Repayment, Interest Rate */}
                        <LoanRequirementSection />

                        {/* Person Details Section */}
                        <PersonDetailsSection />

                        <Button
                            buttonName={submitLoading ? "Updating..." : "Submit"}
                            onClick={handleSubmit}
                            disabled={submitLoading}
                        />

                    </div>
                </div>
            </div>
        </>
    );
};

export default SideBar;
