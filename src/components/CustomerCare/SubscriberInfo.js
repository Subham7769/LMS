import { useParams } from "react-router-dom";
import { subscriberList } from "../../config";
import { useEffect, useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import FamilyDetails from "./FamilyDetails";

const SubscriberInfo = () => {
  const { subID } = useParams();
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
  } = subscriberList.borrowerProfile;

  const {
    buildingNumber,
    streetName,
    city,
    postOfficeBox,
    neighborhood,
    additionalNumbers,
    rent,
  } = subscriberList.borrowerProfile.residenceDetails;

  const [regDate, setRegDate] = useState(registrationDate);
  useEffect(() => {
    handleExtractDate();
  }, []);
  async function handleExtractDate() {
    const dateObj = new Date(regDate);

    // Extract the year, month, and day components
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Add leading zero for single-digit months
    const day = String(dateObj.getDate()).padStart(2, "0");

    // Format the date in YYYY-MM-DD
    const formattedDate = `${year}-${month}-${day}`;

    // Update the state with the formatted date
    setRegDate(formattedDate);
  }
  const [open, setOpen] = useState(true);

  return (
    <div className="">
      <div>Subscriber Id : {subID}</div>
      <div className="text-xl">Personal Info</div>
      <div className="flex gap-10">
        <div className="w-1/5">
          <img
            className="rounded-full"
            src="https://lmscarbon.com/assets/index.png"
            alt=""
          />
        </div>
        <div className="w-4/5">
          <div className="flex gap-5">
            <div className="shadow-md p-4 grow rounded-lg flex flex-col divide-y divide-gray-300">
              <div className="flex gap-10 py-3">
                <div className="w-32">Full Name:</div>
                <div>{firstNameEn + " " + middleNameEn + " " + lastNameEn}</div>
              </div>
              <div className="flex gap-10 py-3">
                <div className="w-32">Active Id Type :</div>
                <div>{idType}</div>
              </div>
              <div className="flex gap-10 py-3">
                <div className="w-32">ID No :</div>
                <div>{subID}</div>
              </div>
              <div className="flex gap-10 py-3">
                <div className="w-32">Occupation :</div>
                <div>{occupation}</div>
              </div>
            </div>
            <div className="shadow-md p-4 grow rounded-lg flex flex-col divide-y divide-gray-300">
              <div className="flex gap-10 py-3">
                <div className="w-48">Date of Birth:</div>
                <div>{dateOfBirth}</div>
              </div>
              <div className="flex gap-10 py-3">
                <div className="w-48">Gender :</div>
                <div>{gender}</div>
              </div>
              <div className="flex gap-10 py-3">
                <div className="w-48">Account Creation Date :</div>
                <div>{regDate}</div>
              </div>
              <div className="flex gap-10 py-3">
                <div className="w-48">Monthly expenses :</div>
                <div>{totalMonthlyExpenses}</div>
              </div>
            </div>
          </div>
          <div className="shadow-md rounded-lg p-3 mt-4">
            <div className="flex justify-between">
              <div className="text-xl">Residential Details</div>
              <ChevronRightIcon
                className={`z-10 h-5 w-5 shrink-0 rotate-90 transform duration-500 ease-in-out ${
                  open ? "-rotate-90 text-gray-500" : "text-gray-400"
                }`}
                onClick={() => setOpen(!open)}
              />
            </div>
            <div
              className={`mt-3 transition-all overflow-y-hidden flex gap-20 w-auto ${
                open ? "h-36" : "h-0"
              }`}
            >
              <div className="flex gap-10">
                <div className="flex flex-col gap-y-3">
                  <div>Address :</div>
                  <div>City :</div>
                  <div>Building Number :</div>
                  <div>Street Name :</div>
                </div>
                <div className="flex flex-col gap-y-3">
                  <div>{buildingNumber + ", " + streetName + ", " + city}</div>
                  <div>{city}</div>
                  <div>{buildingNumber}</div>
                  <div>{streetName}</div>
                </div>
              </div>
              <div className="flex gap-10">
                <div className="flex flex-col gap-y-3">
                  <div>Neigborhood :</div>
                  <div>Postal Code :</div>
                  <div>Additional Number :</div>
                  <div>House is rented or not flag :</div>
                </div>
                <div className="flex flex-col gap-y-3">
                  <div>{neighborhood}</div>
                  <div>{postOfficeBox}</div>
                  <div>{additionalNumbers}</div>
                  <div>{rent}</div>
                </div>
              </div>
            </div>
          </div>
          <FamilyDetails />
        </div>
      </div>
    </div>
  );
};

export default SubscriberInfo;
