import { useParams, useNavigate } from "react-router-dom";
import LoadingState from "../LoadingState/LoadingState";
import { CheckBadgeIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Sorry from "../../assets/image/sorry.png";
import ContainerTile from "../Common/ContainerTile/ContainerTile";

const CommentsModal = ({ closeModal, message }) => {
  console.log(message);
  return (
    <div
      id="loanInfoContainer"
      className="fixed inset-0 bg-black/10 backdrop-blur-sm flex justify-center items-center transition-opacity duration-300 ease-out"
    >
      <ContainerTile>
        {/* Close Button */}
        <div
          onClick={closeModal}
          className="h-9 w-9 cursor-pointer rounded-full text-white absolute top-0 right-0 self-end"
        >
          <XCircleIcon className="w-9 h-9" fill="rgb(220 38 38)" />
        </div>
        <div className="font-semibold text-center text-2xl text-gray-800 mb-5">
          Comments
        </div>
        <div className="overflow-y-auto h-[300px] px-4 space-y-4">
          {Array.isArray(message) && message.length > 0 ? (
            message.map((comment, index) => (
              <div key={index} className="p-3 bg-gray-100 rounded-md shadow-sm">
                <div className="text-red-500 font-medium">{comment}</div>
              </div>
            ))
          ) : (
            <div className="text-gray-600">No comments yet.</div>
          )}
        </div>
      </ContainerTile>
    </div>
  );
};

const EligibilityResults = ({ eligibilityResults }) => {
  const projects = eligibilityResults.registrationResults.projects;
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState([]);


  const handleModalOpen = (message) => {
    setModalMessage(message || []);
    setModalOpen(true);
  };

  return (
    <>
      <div className="p-4 grid max-md:grid-cols-1 grid-cols-2 2xl:grid-cols-2 gap-3">
        {projects?.map((project, index) => (
          <ContainerTile>
            <h2 className="text-[16px] text-center font-semibold mb-4">
              {project.projectName}
            </h2>
            <table className="table-auto w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-[14px] font-semibold border-b border-gray-400">
                    Product
                  </th>
                  <th className="px-4 py-2 text-[14px] font-semibold border-b border-gray-400">
                    Eligibility
                  </th>
                  <th className="px-4 py-2 text-[14px] font-semibold border-b border-gray-400">
                    Registered
                  </th>
                  <th className="px-4 py-2 text-[14px] font-semibold border-b border-gray-400">
                    Comments
                  </th>
                </tr>
              </thead>
              <tbody>
                {project.loanProducts.map((product, idx) => (
                  <tr key={idx} className="border-t border-b border-gray-400">
                    <td className="px-4 py-2 border-r border-gray-400 text-[14px]">
                      {product.productName}
                    </td>
                    <td className="px-4 py-2 text-[14px] text-green-500 font-semibold flex items-center justify-center border-r border-gray-400">
                      {product.eligibleStatus === "ELIGIBLE" ? (
                        <CheckBadgeIcon className="2xl:h-7 2xl:w-7 h-5 w-5" />
                      ) : (
                        <IoMdClose className="2xl:h-7 2xl:w-7 h-5 w-5 text-red-500 rounded-full" />
                      )}
                    </td>
                    {project.isRegister === true ? (
                      <td className="px-4 py-2 text-[14px] text-green-500 font-semibold text-center border-r border-gray-400">
                        <div className="flex items-center justify-center">
                          <CheckBadgeIcon className="2xl:h-7 2xl:w-7 h-5 w-5" />
                        </div>
                      </td>
                    ) : (
                      <td className="px-4 py-2 text-[14px] text-green-500 font-semibold border-r border-gray-400">
                        <div className="flex items-center justify-center">
                          <IoMdClose className="2xl:h-7 2xl:w-7 h-5 w-5 text-red-500 rounded-full" />
                        </div>
                      </td>
                    )}
                    {product.inEligibilityReasons ? (
                      <td
                        className="px-4 py-2 text-[14px] text-center font-semibold underline cursor-pointer"
                        onClick={() =>
                          handleModalOpen(product.inEligibilityReasons)
                        }
                      >
                        View
                      </td>
                    ) : (
                      <td className="px-4 py-2 text-[14px] text-center">N/A</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </ContainerTile>
        ))}
      </div>
      {isModalOpen && (
        <CommentsModal
          closeModal={() => setModalOpen(false)}
          message={modalMessage}
        />
      )}
    </>
  );
};

const Register = () => {
  const [registrationResultsData, setregistrationResultsData] = useState([]);
  const { userID } = useParams();
  const navigate = useNavigate(); // Adding useNavigate  for navigation

  useEffect(() => {
    getBorrowerInfo();
  }, [userID]);

  async function getBorrowerInfo() {
    const postData = {
      msisdn: "966500666496",
      firstNameEn: "MOHAMMED",
      lastNameEn: "ABIDABRAHIM",
      middleNameEn: "MAHMOUD",
      firstNameAr: "محمد",
      lastNameAr: "عبيد ابراهيم",
      middleNameAr: "محمود",
      gender: "M",
      dateOfBirth: "1983-07-29",
      idType: "IQAMA ID",
      idNumber: userID,
      idExpiryDate: "2030-08-24",
      nationality: "لبنان",
      nationalityId: 122,
      occupation: "N/A",
      residenceDetails: {
        buildingNumber: "4083",
        streetName: "اغادير",
        city: "الرياض",
        cityId: 85,
        neighborhood: "الملك عبد العزيز",
        postOfficeBox: "12233",
        additionalNumbers: "7787",
        unitNumber: "1",
        rent: true,
        homeOwnership: 0,
        residentialType: "VILLA",
      },
      maritalDetails: {
        maritalStatus: "Married",
        noOfDomesticWorkers: 0,
        noOfChildren: 3,
        totalDependent: 5,
        breadWinner: true,
        noOfDependentsInPrivateSchools: "2",
        noOfDependentsInPublicSchools: "0",
      },
      totalMonthlyExpenses: 0.0,
      monthlyExpenses: {
        RE: 0.0,
        FLE: 0.0,
        TE: 0.0,
        CE: 0.0,
        UE: 0.0,
        EE: 0.0,
        HHE: 0.0,
        HCE: 0.0,
        IP: 0.0,
        EDT: 0.0,
        MR: 0.0,
        OMR: 0.0,
      },
    };
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "https://api-test.lmscarbon.com/carbon-registration-service/lmscarbon/api/v1/borrowers/" +
          userID,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        }
      );
      if (data.status === 404) {
        console.log("User Not Found"); // Clear the token
        navigate("/user"); // Redirect to login page
        return; // Stop further execution
      }
      // Check for token expiration or invalid token
      if (data.status === 401 || data.status === 403) {
        localStorage.removeItem("authToken"); // Clear the token
        navigate("/login"); // Redirect to login page
        return; // Stop further execution
      }
      const json = await data.json();
      // console.log(json);
      setregistrationResultsData(json);
    } catch (error) {
      console.error(error);
    }
  }

  console.log(registrationResultsData);
  if (registrationResultsData.length === 0) {
    return (
      <>
        <LoadingState />
      </>
    );
  } else if (registrationResultsData.message === "Borrower already exists") {
    return (
      <>
        <div className="min-h-[70vh] w-full flex flex-col items-center justify-center">
          <img
            className="w-[250px] h-[250px] mb-4"
            src={Sorry}
            alt="Loading Icon"
          />
          <p className="text-center font-bold text-xl">
            {registrationResultsData.message}
          </p>
        </div>
      </>
    );
  } else if (
    registrationResultsData.message ===
    "Something is wrong, please contact system administrator"
  ) {
    return (
      <>
        <div className="min-h-[70vh] w-full flex flex-col items-center justify-center">
          <img
            className="w-[250px] h-[250px] mb-4"
            src={Sorry}
            alt="Loading Icon"
          />
          <p className="text-center font-bold text-xl">
            {registrationResultsData.message}
          </p>
        </div>
      </>
    );
  }
  return <EligibilityResults eligibilityResults={registrationResultsData} />;
};

export default Register;
