import { useParams } from "react-router-dom";
import FamilyDetails from "./FamilyDetails";
import useDateExtract from "../../utils/useDateExtract";
import useBorrowerInfo from "../../utils/useBorrowerInfo";
import LoadingState from "../LoadingState/LoadingState";
import ContainerTile from "../Common/ContainerTile/ContainerTile";

const SubscriberInfo = () => {
  const { subID } = useParams();
  const url = ""; // Adjust your URL accordingly
  const kycInfo = useBorrowerInfo(url);

  // Default values for safety
  const defaultProfile = {
    firstNameEn: "",
    middleNameEn: "",
    lastNameEn: "",
    dateOfBirth: "",
    idType: "",
    occupation: "",
    gender: "",
    registrationDate: "",
    totalMonthlyExpenses: "",
    residenceDetails: {
      buildingNumber: "",
      streetName: "",
      city: "",
      postOfficeBox: "",
      neighborhood: "",
      additionalNumbers: "",
      rent: "",
    },
  };

  // Fallback to defaultProfile to ensure hooks are consistently called
  const {
    firstNameEn,
    middleNameEn,
    lastNameEn,
    dateOfBirth,
    idType,
    occupation,
    gender,
    registrationDate,
    totalMonthlyExpenses,
    residenceDetails,
  } = kycInfo?.borrowerProfile || defaultProfile;

  const {
    buildingNumber,
    streetName,
    city,
    postOfficeBox,
    neighborhood,
    additionalNumbers,
    rent,
  } = residenceDetails;

  // Use default empty string to ensure consistent hook usage
  const formattedDateOfBirth = useDateExtract(dateOfBirth);
  const regiDate = useDateExtract(registrationDate);

  if (!kycInfo || !kycInfo.borrowerProfile) {
    return <LoadingState />;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center gap-5 mb-5">
        <div>
          <img
            className="rounded-full w-12"
            src="https://lmscarbon.com/assets/index.png"
            alt=""
          />
        </div>
        <div className="text-xl">Borrower Id : {subID}</div>
      </div>

      <ContainerTile>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 border-b border-gray-300 pb-2">
          <div className="py-2">
            <div className="font-semibold">Full Name:</div>
            <div>{firstNameEn + " " + middleNameEn + " " + lastNameEn}</div>
          </div>
          <div className="py-2">
            <div className="font-semibold">Gender:</div>
            <div>{gender}</div>
          </div>
          <div className="py-2">
            <div className="font-semibold">Date of Birth:</div>
            <div>{formattedDateOfBirth}</div>
          </div>
          <div className="py-2">
            <div className="font-semibold">Active Id Type:</div>
            <div>{idType}</div>
          </div>
          <div className="py-2">
            <div className="font-semibold">Occupation:</div>
            <div>{occupation}</div>
          </div>
          <div className="py-2">
            <div className="font-semibold">Monthly expenses:</div>
            <div>{totalMonthlyExpenses}</div>
          </div>
          <div className="py-2">
            <div className="font-semibold">Account Creation Date:</div>
            <div>{regiDate}</div>
          </div>
        </div>

        <FamilyDetails info={kycInfo} />
        <div className="mt-4">
          <div className="text-xl mb-4 border-b border-gray-300 pb-2">
            Residential Details
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <div className="font-semibold">Address:</div>
              <div>{buildingNumber + ", " + streetName + ", " + city}</div>
            </div>
            <div>
              <div className="font-semibold">Street Name:</div>
              <div>{streetName}</div>
            </div>
            <div>
              <div className="font-semibold">Postal Code:</div>
              <div>{postOfficeBox}</div>
            </div>
            <div>
              <div className="font-semibold">Additional Number:</div>
              <div>{additionalNumbers}</div>
            </div>
            <div>
              <div className="font-semibold">Neighborhood:</div>
              <div>{neighborhood}</div>
            </div>
            <div>
              <div className="font-semibold">City:</div>
              <div>{city}</div>
            </div>
            <div>
              <div className="font-semibold">Building Number:</div>
              <div>{buildingNumber}</div>
            </div>
            <div>
              <div className="font-semibold">House is rented:</div>
              <div>{rent}</div>
            </div>
          </div>
        </div>
      </ContainerTile>
    </div>
  );
};

export default SubscriberInfo;
