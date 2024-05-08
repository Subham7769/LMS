import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateRac = () => {
  const [racName, setRacName] = useState("");
  const navigate = useNavigate();
  async function createNewRac(racName) {
    try {
      const token =
        "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdXBlcmFkbWluLTE1IiwiZXhwIjoxNzE1MTcxOTUxfQ.naMfg8jq_fs5qVnL8zBXrwtVj07H1eYCcI-M9An1Acm0ybYl1vGTGjS9CCV9alUoeWB0izKKFFZMys3_gF7rYg";
      const data = await fetch(
        "http://194.163.172.33:32299/carbon-product-service/xtracash/rules/rac/" +
          racName,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.status === 404) {
        console.log("The resource you were trying to reach is not found"); // Clear the token
        // navigate("/create-rac"); // Redirect to login page
        return; // Stop further execution
      }
      // Check for token expiration or invalid token
      if (data.status === 401 || data.status === 403) {
        console.log("Check for token expiration or invalid token");
        // localStorage.removeItem("authToken"); // Clear the token
        // navigate("/create-rac"); // Redirect to login page
        return; // Stop further execution
      }
      const racDetails = await data.json();
      console.log(racDetails);
      navigate("/newrac/" + racDetails.racId);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <div>Create RAC</div>
      <div className="my-5">
        <input
          type="text"
          name="racName"
          id="racName"
          value={racName}
          onChange={(e) => {
            setRacName(e.target.value);
          }}
          className="block w-1/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Enter New RAC Name"
        />
      </div>
      <div>
        <button
          onClick={() => createNewRac(racName)}
          type="button"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Create
        </button>
      </div>
    </>
  );
};

export default CreateRac;
