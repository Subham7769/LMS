// import { useParams, useNavigate } from "react-router-dom";
// import LoadingState from "../LoadingState";
// import { CheckBadgeIcon, XMarkIcon } from "@heroicons/react/20/solid";
// import { useEffect, useRef, useState } from "react";
// import { IoMdClose } from "react-icons/io";
// import Sorry from "../../assets/image/sorry.png";

// const CommentsModal = ({ margin, closeModal, message }) => {
//   return (
//     <div
//       id="loanInfoContainer"
//       style={{ marginLeft: `${margin}px` }}
//       className="fixed inset-0 bg-black/10 backdrop-blur-sm flex justify-center items-center transition-opacity duration-300 ease-out"
//     >
//       <div className="bg-white border border-red-600 p-6 rounded-xl overflow-hidden w-[70%] md:w-2/4 h-[300px] relative shadow-lg transition-transform transform duration-500 ease-out scale-100">
//         {/* Close Button */}
//         <button
//           onClick={closeModal}
//           className="absolute top-8 right-8 transition-colors duration-200"
//           aria-label="Close Modal"
//         >
//           <XMarkIcon className="h-6 w-6 hover:text-red-500 transition duration-200 ease-in-out" />
//         </button>

//         <div className="font-semibold text-center text-2xl text-gray-800 mb-5">
//           Comments
//         </div>

//         <div className="border-b border-gray-300 mb-5"></div>

//         <div className="comments-section overflow-y-auto h-[300px] px-4 space-y-4">
//           {" "}
//           <div className="p-3 bg-gray-100 rounded-md shadow-sm">
//             <div className="text-red-500 font-medium">
//               Customer is not eligible for this product
//             </div>
//           </div>
//           <div className="text-gray-600">
//             {message ? message : "No comments yet."}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const EligibilityResults = ({ eligibilityResults }) => {
//   const projects = eligibilityResults.registrationResults.projects;
//   const [leftPanelWidth, setLeftPanelWidth] = useState(0);
//   const leftPanelWidthRef = useRef(0);
//   const [isModalOpen, setModalOpen] = useState(false);

//   useEffect(() => {
//     const leftPanel = document.getElementById("SideBarId");

//     const resizeObserver = new ResizeObserver((entries) => {
//       const newWidth = entries[0].contentRect.width;
//       setLeftPanelWidth(newWidth);
//       leftPanelWidthRef.current = newWidth;
//     });

//     resizeObserver.observe(leftPanel);

//     return () => resizeObserver.disconnect();
//   }, []);

//   return (
//     <>
//       <div className="p-4 grid max-md:grid-cols-1 grid-cols-2 2xl:grid-cols-3 gap-3">
//         {projects?.map((project, index) => (
//           <div
//             key={index}
//             className="rounded-xl px-2 py-4 shadow-md border border-red-600"
//           >
//             <h2 className="text-[16px] text-center font-semibold mb-4">
//               {project.projectName}
//             </h2>
//             <table className="table-auto w-full border-collapse">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="px-4 py-2 text-[14px] font-semibold border-b">
//                     Product
//                   </th>
//                   <th className="px-4 py-2 text-[14px] font-semibold border-b">
//                     Eligibility
//                   </th>
//                   <th className="px-4 py-2 text-[14px] font-semibold border-b">
//                     Registered
//                   </th>
//                   <th className="px-4 py-2 text-[14px] font-semibold border-b">
//                     Comments
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {project.loanProducts.map((product, idx) => (
//                   <tr key={idx} className="border-t border-b">
//                     <td className="px-4 py-2 border-r text-[11px]">
//                       {product.productName}
//                     </td>
//                     <td className="px-4 py-2 text-[11px] text-green-500 font-semibold flex items-center justify-center border-r">
//                       {product.eligibleStatus === "ELIGIBLE" ? (
//                         <CheckBadgeIcon className="2xl:h-7 2xl:w-7 h-5 w-5" />
//                       ) : (
//                         <IoMdClose className="2xl:h-7 2xl:w-7 h-5 w-5 text-red-500 rounded-full" />
//                       )}
//                     </td>
//                     {project.isRegister === true ? (
//                       <td className="px-4 py-2 text-[11px] text-green-500 font-semibold text-center border-r">
//                         <div className="flex items-center justify-center">
//                           <CheckBadgeIcon className="2xl:h-7 2xl:w-7 h-5 w-5" />
//                         </div>
//                       </td>
//                     ) : (
//                       <td className="px-4 py-2 text-[11px] text-green-500 font-semibold border-r">
//                         <div className="flex items-center justify-center">
//                           <IoMdClose className="2xl:h-7 2xl:w-7 h-5 w-5 text-red-500 rounded-full" />
//                         </div>
//                       </td>
//                     )}
//                     {product.comment ? (
//                       <td
//                         className="px-4 py-2 text-[11px] text-center font-semibold underline cursor-pointer"
//                         onClick={() => setModalOpen(true)}
//                       >
//                         View
//                       </td>
//                     ) : (
//                       <td className="px-4 py-2 text-[11px] text-center">N/A</td>
//                     )}
//                     {isModalOpen && (
//                       <CommentsModal
//                         margin={leftPanelWidth}
//                         closeModal={() => setModalOpen(false)}
//                         message={product.comment}
//                       />
//                     )}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// const Register = () => {
//   const [registrationResultsData, setregistrationResultsData] = useState([]);
//   const { userID } = useParams();
//   const navigate = useNavigate(); // Adding useNavigate  for navigation

//   useEffect(() => {
//     getBorrowerInfo();
//   }, [userID]);

//   async function getBorrowerInfo() {
//     const postData = {
//       msisdn: "966500666496",
//       firstNameEn: "MOHAMMED",
//       lastNameEn: "ABIDABRAHIM",
//       middleNameEn: "MAHMOUD",
//       firstNameAr: "محمد",
//       lastNameAr: "عبيد ابراهيم",
//       middleNameAr: "محمود",
//       gender: "M",
//       dateOfBirth: "1983-07-29",
//       idType: "IQAMA ID",
//       idNumber: userID,
//       idExpiryDate: "2030-08-24",
//       nationality: "لبنان",
//       nationalityId: 122,
//       occupation: "N/A",
//       residenceDetails: {
//         buildingNumber: "4083",
//         streetName: "اغادير",
//         city: "الرياض",
//         cityId: 85,
//         neighborhood: "الملك عبد العزيز",
//         postOfficeBox: "12233",
//         additionalNumbers: "7787",
//         unitNumber: "1",
//         rent: true,
//         homeOwnership: 0,
//         residentialType: "VILLA",
//       },
//       maritalDetails: {
//         maritalStatus: "Married",
//         noOfDomesticWorkers: 0,
//         noOfChildren: 3,
//         totalDependent: 5,
//         breadWinner: true,
//         noOfDependentsInPrivateSchools: "2",
//         noOfDependentsInPublicSchools: "0",
//       },
//       totalMonthlyExpenses: 0.0,
//       monthlyExpenses: {
//         RE: 0.0,
//         FLE: 0.0,
//         TE: 0.0,
//         CE: 0.0,
//         UE: 0.0,
//         EE: 0.0,
//         HHE: 0.0,
//         HCE: 0.0,
//         IP: 0.0,
//         EDT: 0.0,
//         MR: 0.0,
//         OMR: 0.0,
//       },
//     };
//     try {
//       const token = localStorage.getItem("authToken");
//       const data = await fetch(
//         "https://api-test.lmscarbon.com/carbon-registration-service/xcbe/api/v1/borrowers/" +
//           userID,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(postData),
//         }
//       );
//       if (data.status === 404) {
//         console.log("User Not Found"); // Clear the token
//         navigate("/user"); // Redirect to login page
//         return; // Stop further execution
//       }
//       // Check for token expiration or invalid token
//       if (data.status === 401 || data.status === 403) {
//         localStorage.removeItem("authToken"); // Clear the token
//         navigate("/login"); // Redirect to login page
//         return; // Stop further execution
//       }
//       const json = await data.json();
//       // console.log(json);
//       setregistrationResultsData(json);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   console.log(registrationResultsData);
//   if (registrationResultsData.length === 0) {
//     return (
//       <>
//         <LoadingState />
//       </>
//     );
//   } else if (registrationResultsData.message === "Borrower already exists") {
//     return (
//       <>
//         <div className="min-h-[70vh] w-full flex flex-col items-center justify-center">
//           <img
//             className="w-[250px] h-[250px] mb-4"
//             src={Sorry}
//             alt="Loading Icon"
//           />
//           <p className="text-center font-bold text-xl">
//             {registrationResultsData.message}
//           </p>
//         </div>
//       </>
//     );
//   } else if (
//     registrationResultsData.message ===
//     "Something is wrong, please contact system administrator"
//   ) {
//     return (
//       <>
//         <div className="min-h-[70vh] w-full flex flex-col items-center justify-center">
//           <img
//             className="w-[250px] h-[250px] mb-4"
//             src={Sorry}
//             alt="Loading Icon"
//           />
//           <p className="text-center font-bold text-xl">
//             {registrationResultsData.message}
//           </p>
//         </div>
//       </>
//     );
//   }
//   return <EligibilityResults eligibilityResults={registrationResultsData} />;
// };

// export default Register;

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Register = () => {
  const [registrationResultsData, setregistrationResultsData] = useState([]);
  const { userID } = useParams();
  const navigate = useNavigate(); // Adding useNavigate  for navigation

  useEffect(() => {
    getBorrowerInfo();
  }, []);

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
  if (registrationResultsData.length === 0) {
    return (
      <>
        <div>Fetching Data</div>
      </>
    );
  }
  return (
    <table className="divide-y divide-gray-300">
      <thead>
        <tr className="divide-x divide-gray-200">
          <th className="py-3.5 px-4 text-center">Project Name</th>
          {/* <th className="py-3.5 px-4 text-center ">Eligibility Status</th> */}
          <th className="py-3.5 px-4 text-center ">Register</th>
          {/* <th className="py-3.5 px-4 text-center ">Comments</th> */}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {registrationResultsData.registrationResults.projects.map(
          (register, index) => {
            const isAlreadyRegistered = register.isRegister;
            return (
              <tr
                key={index}
                className="divide-x divide-gray-200 text-center w-full"
              >
                <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                  <div className=" mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                    {register.projectName}
                  </div>
                </td>
                {/* <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                <div className=" mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                  {register.eligibleStatus.replace(/_/g, " ")}
                </div>
              </td> */}
                <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                  <div className=" mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                    {isAlreadyRegistered ? "Yes" : "No"}
                  </div>
                </td>
                {/* <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                <div className=" mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                  {register.inEligibilityReasons}
                </div>
              </td> */}
              </tr>
            );
          }
        )}
      </tbody>
    </table>
  );
};

export default Register;
