import { useDispatch, useSelector } from "react-redux";
import { updatePersonalBorrowerField } from "../../../redux/Slices/B2CLoansSlice";


function EmploymentDetailSection() {
  const dispatch = useDispatch();
  const { personalBorrower } = useSelector((state) => state.B2CLoans)

  const handleInputChange = (e, section) => {
    const { name, value, type, checked } = e.target;
    console.log(e)
    dispatch(updatePersonalBorrowerField({ section, field: name, value, type, checked }));
  };

  return (
    <>

      <>
        <select
          className="form-input w-full py-4"
          name="workType"
          value={personalBorrower.employmentDetails.workType}
          onChange={(e) => handleInputChange(e, "employmentDetails")}
          required
        >
          <option value="">Select Work Type</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Freelancer">Freelancer</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
          <option value="Temporary">Temporary</option>
          <option value="Unemployed">Unemployed</option>
        </select>
        <select
          className="form-input w-full py-4"
          name="ministry"
          value={personalBorrower.employmentDetails.ministry}
          onChange={(e) => handleInputChange(e, "employmentDetails")}
          required
        >
          <option value="">Select Ministry</option>
          <option value="Ministry of Finance">Ministry of Finance</option>
          <option value="Ministry of Health">Ministry of Health</option>
          <option value="Ministry of Education">Ministry of Education</option>
          <option value="Ministry of Defence">Ministry of Defence</option>
          <option value="Ministry of Home Affairs">Ministry of Home Affairs</option>
          <option value="Ministry of Railways">Ministry of Railways</option>
          <option value="Ministry of External Affairs">Ministry of External Affairs</option>
          <option value="Ministry of Agriculture">Ministry of Agriculture</option>
          <option value="Other">Other</option>
        </select>
        <select
          className="form-input w-full py-4"
          name="employer"
          value={personalBorrower.employmentDetails.employer}
          onChange={(e) => handleInputChange(e, "employmentDetails")}
          required
        >
          <option value="">Select Employer</option>
          <option value="Government of India">Government of India</option>
          <option value="TCS">TCS</option>
          <option value="Infosys">Infosys</option>
          <option value="Wipro">Wipro</option>
          <option value="HCL Technologies">HCL Technologies</option>
          <option value="Capgemini">Capgemini</option>
          <option value="Cognizant">Cognizant</option>
          <option value="IBM">IBM</option>
          <option value="Accenture">Accenture</option>
          <option value="Other">Other</option>
        </select>
        <input
          className="form-input w-full py-4"
          type="text"
          placeholder="Occupation"
          name="occupation"
          value={personalBorrower.employmentDetails.occupation}
          onChange={(e) => handleInputChange(e, "employmentDetails")}
          required
        />
        <input
          className="form-input w-full py-4"
          type="text"
          placeholder="Employee No."
          name="employeeNo"
          value={personalBorrower.employmentDetails.employeeNo}
          onChange={(e) => handleInputChange(e, "employmentDetails")}
          required
        />

        <div className="relative">
          <input
            type="date"
            className="form-input w-full py-4 text-gray-900"
            name="workStartDate"
            value={personalBorrower.employmentDetails.workStartDate}
            onChange={(e) => handleInputChange(e, "employmentDetails")}
            required
            onFocus={(e) => e.target.showPicker()} // Optional: shows date picker on focus
          />
          {!personalBorrower.employmentDetails.workStartDate && (
            <span className="absolute left-4 top-4 text-gray-400 pointer-events-none">
              Work Start Date (dd-mm-yyyy)
            </span>
          )}
        </div>
        <input
          className="form-input w-full py-4"
          type="text"
          placeholder="Location"
          name="employmentLocation"
          value={personalBorrower.employmentDetails.employmentLocation}
          onChange={(e) => handleInputChange(e, "employmentDetails")}
          required
        />

      </>

    </>
  );
}

export default EmploymentDetailSection;
