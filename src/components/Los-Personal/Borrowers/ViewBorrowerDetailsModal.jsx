import React, { useEffect } from "react";
import Accordion from "../../Common/Accordion/Accordion";
import { fetchBorrowerInfo } from "../../../redux/Slices/personalBorrowersSlice";
import { useDispatch, useSelector } from "react-redux";
import { format, parseISO } from "date-fns";
import CardInfo from "../../Common/CardInfo/CardInfo";
import {
  CalendarDaysIcon,
  CheckCircleIcon,
  NewspaperIcon,
  CurrencyDollarIcon,
  UserIcon,
  ReceiptRefundIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
// Read-only DisplayField component with styling
const DisplayField = ({ label, value }) => (
  <div className="flex flex-col p-3">
    <div className="">{label}</div>
    <div className="font-semibold">{value || "-"}</div>
  </div>
);

// Function to render display details with formatting
const renderDisplayDetails = (
  details,
  config,
  className = "grid md:grid-cols-3 gap-4 text-sm"
) => (
  <div className={className}>
    {config.map((field, index) => (
      <div key={index} className={field.className || "col-span-1"}>
        <DisplayField
          //key={index}
          label={field.labelName}
          value={details[field.inputName]}
        />
      </div>
    ))}
  </div>
);

const BorrowerModal = ({ children, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-900/30 backdrop-blur-sm">
    {/* Modal Container */}
    <div className="relative bg-white dark:bg-gray-800 flex flex-col w-3/4 rounded-lg shadow-lg p-4">
      {/* The "X" close button */}
      <XMarkIcon
        onClick={onClose}
        className="absolute top-1 right-1 h-6 w-6 cursor-pointer text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
      />
      <h2 className="text-xl font-bold mb-4">Borrower Details</h2>
      {/* Scrollable Content */}
      <div className="overflow-auto h-[400px]">{children}</div>
    </div>
  </div>
);

const ViewBorrowerDetailsModal = ({ onClose, uid }) => {
  console.log(uid);
  const dispatch = useDispatch();
  const { updateBorrowerData, error, loading } = useSelector(
    (state) => state.personalBorrowers
  );

  useEffect(() => {
    if (uid) {
      dispatch(fetchBorrowerInfo(uid)).unwrap();
    }
  }, [dispatch, uid]);

  if (loading || Object.keys(updateBorrowerData).length === 0) {
    return (
      <BorrowerModal onClose={onClose}>
        <div className="text-center">Loading borrower data...</div>
      </BorrowerModal>
    );
  }

  // Function to merge and format borrower data before rendering e.g. Fullname,Address concat, date formatting
  const processBorrowerData = (borrower = {}) => {
    if (!borrower || Object.keys(borrower).length === 0) return {};
    
    const formatDate = (dateStr) =>
      dateStr ? format(parseISO(dateStr), import.meta.env.VITE_DATE_FORMAT || "dd/MM/yyyy") : "-";

    const joinAddress = (addressParts) =>
      addressParts.filter(Boolean).join(", ") || "-";

    return {
      ...borrower,
      personalDetails: {
        ...borrower.personalDetails,
        fullName: `${borrower?.personalDetails?.title || ""} ${
          borrower?.personalDetails?.firstName || ""
        } ${borrower?.personalDetails?.surname || ""}`.trim(),
        dateOfBirth: formatDate(borrower?.personalDetails?.dateOfBirth),
      },
      contactDetails: {
        ...borrower.contactDetails,
        address:
          [
            borrower?.contactDetails?.houseNumber,
            borrower?.contactDetails?.street,
            borrower?.contactDetails?.residentialArea,
            borrower?.contactDetails?.province,
            borrower?.contactDetails?.district,
            borrower?.contactDetails?.country,
          ]
            .filter(Boolean)
            .join(", ") +
          (borrower?.contactDetails?.postBox
            ? ` - ${borrower.contactDetails.postBox}`
            : ""),
      },
      employmentDetails: {
        ...borrower.employmentDetails,
        workStartDate: formatDate(borrower?.employmentDetails?.workStartDate),
      },
      nextOfKinDetails: {
        ...borrower.nextOfKinDetails,
        fullName: `${borrower?.nextOfKinDetails?.kinTitle || ""} ${
          borrower?.nextOfKinDetails?.kinFirstName || ""
        } ${borrower?.nextOfKinDetails?.kinSurname || ""}`.trim(),
        dateOfBirth: formatDate(borrower?.nextOfKinDetails?.kinDateOfBirth),
        address:
          [
            borrower?.nextOfKinDetails?.kinHouseNumber,
            borrower?.nextOfKinDetails?.kinStreet,
            borrower?.nextOfKinDetails?.kinResidentialArea,
            borrower?.nextOfKinDetails?.kinProvince,
            borrower?.nextOfKinDetails?.kinDistrict,
            borrower?.nextOfKinDetails?.kinCountry,
          ]
            .filter(Boolean)
            .join(", ") +
          (borrower?.nextOfKinDetails?.kinPostBox
            ? ` - ${borrower.nextOfKinDetails.kinPostBox}`
            : ""),
      },
    };
  };

  //const BorrowerData = updateBorrowerData;
  const BorrowerData = processBorrowerData(updateBorrowerData);
  if (Object.keys(BorrowerData).length === 0) {
    return (
      <BorrowerModal onClose={onClose}>
        <div className="text-center text-red-500">No borrower data available.</div>
      </BorrowerModal>
    );
  }

  const personalDetailsConfig = [
    // {
    //   labelName: "Title",
    //   inputName: "title",
    // },
    // {
    //   labelName: "First Name",
    //   inputName: "firstName",
    // },
    // {
    //   labelName: "Surname",
    //   inputName: "surname",
    // },
    {
      labelName: "Name",
      inputName: "fullName",
    },
    {
      labelName: "Other Name",
      inputName: "otherName",
    },
    {
      labelName: "Gender",
      inputName: "gender",
    },
    {
      labelName: "Marital Status",
      inputName: "maritalStatus",
    },
    {
      labelName: "Unique ID Type",
      inputName: "uniqueIDType",
    },
    {
      labelName: "Unique ID",
      inputName: "uniqueID",
    },
    {
      labelName: "Nationality",
      inputName: "nationality",
    },
    {
      labelName: "Date of Birth",
      inputName: "dateOfBirth",
    },
    {
      labelName: "Place of Birth",
      inputName: "placeOfBirth",
    },
  ];
  const contactDetailsConfig = [
    {
      labelName: "Address",
      inputName: "address",
    },
    {
      labelName: "Mobile 1",
      inputName: "mobile1",
    },
    {
      labelName: "Mobile 2",
      inputName: "mobile2",
    },
    {
      labelName: "Landline Phone",
      inputName: "landlinePhone",
    },

    // {
    //   labelName: "House Number",
    //   inputName: "houseNumber",
    // },
    // {
    //   labelName: "Street",
    //   inputName: "street",
    // },
    // {
    //   labelName: "Residential Area",
    //   inputName: "residentialArea",
    // },
    // {
    //   labelName: "Country",
    //   inputName: "country",
    // },
    // {
    //   labelName: "Province / State",
    //   inputName: "province",
    // },
    // {
    //   labelName: "District",
    //   inputName: "district",
    // },

    // {
    //   labelName: "Post Box",
    //   inputName: "postBox",
    // },
    { labelName: "Email", inputName: "email" },
  ];
  const employmentDetailsConfig = [
    {
      labelName: "Work Type",
      inputName: "workType",
    },
    {
      labelName: "Ministry",
      inputName: "ministry",
    },
    {
      labelName: "Employer",
      inputName: "employer",
    },
    {
      labelName: "Occupation",
      inputName: "occupation",
    },
    {
      labelName: "Employee No.",
      inputName: "employeeNo",
    },
    {
      labelName: "Work Start Date",
      inputName: "workStartDate",
    },
    {
      labelName: "Work Phone Number",
      inputName: "workPhoneNumber",
    },
    {
      labelName: "Work Physical Address",
      inputName: "workPhysicalAddress",
    },
    {
      labelName: "Location",
      inputName: "employmentLocation",
    },
    {
      labelName: "District",
      inputName: "employmentDistrict",
    },
  ];
  const incomeOnPaySlipConfig = [
    {
      labelName: "Basic Pay",
      inputName: "basicPay",
    },
    {
      labelName: "Housing Allowance",
      inputName: "housingAllowance",
    },
    {
      labelName: "Transport Allowance",
      inputName: "transportAllowance",
    },
    {
      labelName: "Rural/Remote Hardship Allowance",
      inputName: "ruralHardshipAllowance",
    },
    {
      labelName: "Infectious Health Risk",
      inputName: "infectiousHealthRisk",
    },
    {
      labelName: "Health Shift Allowance",
      inputName: "healthShiftAllowance",
    },
    {
      labelName: "Interface Allowance",
      inputName: "interfaceAllowance",
    },
    {
      labelName: "Responsibility Allowance",
      inputName: "responsibilityAllowance",
    },
    {
      labelName: "Double Class Allowance",
      inputName: "doubleClassAllowance",
    },
    {
      labelName: "Acting Allowance",
      inputName: "actingAllowance",
    },
    {
      labelName: "Other Allowances",
      inputName: "otherAllowances",
    },
  ];
  const deductionOnPaySlipConfig = [
    {
      labelName: "Total Deductions on payslip",
      inputName: "totalDeductionsOnPayslip",
    },
    {
      labelName: "Total deductions not on Payslip",
      inputName: "totalDeductionsNotOnPayslip",
    },
  ];
  const bankDetailsConfig = [
    {
      labelName: "Name of Bank",
      inputName: "bankName",
    },
    {
      labelName: "Account Name",
      inputName: "accountName",
    },
    {
      labelName: "Account No.",
      inputName: "accountNo",
    },
    {
      labelName: "Type of Account",
      inputName: "accountType",
    },
    {
      labelName: "Branch",
      inputName: "branch",
    },
    {
      labelName: "Branch Code",
      inputName: "branchCode",
    },
    {
      labelName: "Sort Code",
      inputName: "sortCode",
    },
  ];
  const nextOfKinConfig = [
    // {
    //   labelName: "Title",
    //   inputName: "kinTitle",
    // },
    // {
    //   labelName: "Surname",
    //   inputName: "kinSurname",
    // },
    { labelName: "Name", inputName: "fullName" },
    { labelName: "Other Name", inputName: "kinOtherName" },
    {
      labelName: "NRC No.",
      inputName: "kinNrcNo",
    },
    { labelName: "Address", inputName: "address", className: "md:col-span-3" },
    {
      labelName: "Gender",
      inputName: "kinGender",
    },
    {
      labelName: "Relationship",
      inputName: "kinRelationship",
      className: "md:col-span-2",
    },
    {
      labelName: "Mobile 1",
      inputName: "kinMobile1",
    },
    { labelName: "Mobile 2", inputName: "kinMobile2" },
    {
      labelName: "Email",
      inputName: "kinEmail",
    },

    {
      labelName: "Employer",
      inputName: "kinEmployer",
    },
    {
      labelName: "Occupation",
      inputName: "kinOccupation",
    },
    { labelName: "Location", inputName: "kinLocation" },
    {
      labelName: "Work Phone Number",
      inputName: "kinWorkPhoneNumber",
    },
  ];
  const otherDetailsConfig = [
    {
      labelName: "Credit Score",
      inputName: "creditScore",
    },
    {
      labelName: "Reason for Borrowing",
      inputName: "reasonForBorrowing",
    },
    {
      labelName: "Source of Repayment",
      inputName: "sourceOfRepayment",
    },
    // {
    //   labelName: "Customer Photo",
    //   inputName: "customerPhotoId",
    // },
  ];

  const personalDetailsInputNames = personalDetailsConfig.map(
    (field) => field.inputName
  );
  const contactDetailsInputNames = contactDetailsConfig.map(
    (field) => field.inputName
  );
  const employmentDetailsInputNames = employmentDetailsConfig.map(
    (field) => field.inputName
  );
  const incomeOnPaySlipInputNames = incomeOnPaySlipConfig.map(
    (field) => field.inputName
  );
  const deductionOnPaySlipInputNames = deductionOnPaySlipConfig.map(
    (field) => field.inputName
  );
  const bankDetailsInputNames = bankDetailsConfig.map(
    (field) => field.inputName
  );
  const nextOfKinInputNames = nextOfKinConfig.map((field) => field.inputName);
  const otherDetailsInputNames = otherDetailsConfig.map(
    (field) => field.inputName
  );

  return (
    <BorrowerModal onClose={onClose}>
      <div className="grid grid-cols-1 pb-3 mb-3">
        <Accordion
          heading="Personal Details"
          renderExpandedContent={() =>
            renderDisplayDetails(
              BorrowerData.personalDetails,
              personalDetailsConfig
            )
          }
          isOpen={true}
        />

        <Accordion
          heading="Contact Details"
          renderExpandedContent={() =>
            renderDisplayDetails(
              BorrowerData.contactDetails,
              contactDetailsConfig,
              "grid md:grid-cols-2 gap-4 text-sm"
            )
          }
        />

        <Accordion
          heading="Employment Details"
          renderExpandedContent={() =>
            renderDisplayDetails(
              BorrowerData.employmentDetails,
              employmentDetailsConfig
            )
          }
        />

        <Accordion
          heading="Salary Details"
          renderExpandedContent={() => (
            <>
              <Accordion
                heading="Income on PaySlip"
                renderExpandedContent={() =>
                  renderDisplayDetails(
                    BorrowerData.incomeOnPaySlip,
                    incomeOnPaySlipConfig
                  )
                }
              />
              <Accordion
                heading="Deduction"
                renderExpandedContent={() =>
                  renderDisplayDetails(
                    BorrowerData.deductionOnPaySlip,
                    deductionOnPaySlipConfig
                  )
                }
              />
            </>
          )}
        />

        <Accordion
          heading="Bank Details"
          renderExpandedContent={() =>
            renderDisplayDetails(BorrowerData.bankDetails, bankDetailsConfig)
          }
        />

        <Accordion
          heading="Next of Kin Details"
          renderExpandedContent={() =>
            renderDisplayDetails(BorrowerData.nextOfKinDetails, nextOfKinConfig)
          }
        />

        <Accordion
          heading="Other Details"
          renderExpandedContent={() =>
            renderDisplayDetails(BorrowerData.otherDetails, otherDetailsConfig)
          }
        />
      </div>
    </BorrowerModal>
  );
};

export default ViewBorrowerDetailsModal;
