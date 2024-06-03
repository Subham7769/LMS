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
        "http://194.163.172.33:32299/carbon-registration-service/xcbe/api/v1/borrowers/" +
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
          <th className="py-3.5 px-4 text-center ">Eligibility Status</th>
          <th className="py-3.5 px-4 text-center ">Register</th>
          <th className="py-3.5 px-4 text-center ">Comments</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {registrationResultsData.registrationResults.map((register, index) => {
          const isAlreadyRegistered = register.alreadyRegistered;
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
              <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                <div className=" mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                  {register.eligibleStatus.replace(/_/g, " ")}
                </div>
              </td>
              <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                <div className=" mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                  {isAlreadyRegistered ? "Yes" : "No"}
                  {/* {console.log(register.alreadyRegistered)} */}
                </div>
              </td>
              <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                <div className=" mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                  {register.inEligibilityReasons}
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Register;
