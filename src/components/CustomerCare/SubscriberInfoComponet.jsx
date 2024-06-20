import React from "react";
import FamilyDetails from "./FamilyDetails";
import useDateExtract from "../../utils/useDateExtract";

const SubscriberInfoComponet = ({ subscriberListNew }) => {
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
  } = subscriberListNew?.borrowerProfile;

  const {
    buildingNumber,
    streetName,
    city,
    postOfficeBox,
    neighborhood,
    additionalNumbers,
    rent,
  } = subscriberListNew?.borrowerProfile?.residenceDetails;

  const regiDate = useDateExtract(registrationDate);
  const formattedDateOfBirth = useDateExtract(dateOfBirth);
  return (
    <>
      <div className="shadow-md rounded-xl py-4 px-5 border border-red-600">
        <div className="flex border-b border-gray-300 pb-4">
          <div className="py-2 pr-4 flex flex-col border-r border-gray-300">
            <div className="flex gap-2 py-2">
              <div className="w-24">Full Name :</div>
              <div>{firstNameEn + " " + middleNameEn + " " + lastNameEn}</div>
            </div>
            <div className="flex gap-2 py-2">
              <div className="w-24">Gender :</div>
              <div>{gender}</div>
            </div>
          </div>
          <div className=" px-4 py-2  flex flex-col border-r border-gray-300">
            <div className="flex gap-2 py-2">
              <div className="w-32">Date of Birth:</div>
              <div>{formattedDateOfBirth}</div>
              {/* <div>{dateOfBirth}</div> */}
            </div>
            <div className="flex gap-2 py-2">
              <div className="w-32">Active Id Type :</div>
              <div>{idType}</div>
            </div>
          </div>
          <div className="px-4 py-2  flex flex-col border-r border-gray-300">
            <div className="flex gap-2 py-2">
              <div className="w-40">Occupation :</div>
              <div>{occupation}</div>
            </div>
            <div className="flex gap-2 py-2">
              <div className="w-40">Monthly expenses :</div>
              <div>{totalMonthlyExpenses}</div>
            </div>
          </div>
          <div className="px-4 py-2 flex flex-col">
            <div className="flex gap-2 py-2">
              <div className="w-48">Account Creation Date :</div>
              <div>{regiDate}</div>
              {/* <div>{registrationDate}</div> */}
            </div>
          </div>
        </div>
        <div className="flex gap-16">
          <div className="mt-4 border-r border-gray-300 pr-20">
            <div className="text-xl mb-4">Residential Details</div>
            <div className="flex gap-10">
              <div className="flex gap-5">
                <div className="flex flex-col gap-y-3">
                  <div>Address :</div>
                  <div>Street Name :</div>
                  <div>Postal Code :</div>
                  <div>Additional Number :</div>
                </div>
                <div className="flex flex-col gap-y-3">
                  <div>{buildingNumber + ", " + streetName + ", " + city}</div>
                  <div>{streetName}</div>
                  <div>{postOfficeBox}</div>
                  <div>{additionalNumbers}</div>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="flex flex-col gap-y-3">
                  <div>Neigborhood :</div>
                  <div>City :</div>
                  <div>Building Number :</div>
                  <div>House is rented or not flag :</div>
                </div>
                <div className="flex flex-col gap-y-3">
                  <div>{neighborhood}</div>
                  <div>{city}</div>
                  <div>{buildingNumber}</div>
                  <div>{rent}</div>
                </div>
              </div>
            </div>
          </div>
          <FamilyDetails info={subscriberListNew} />
        </div>
      </div>
    </>
  );
};

export default SubscriberInfoComponet;
