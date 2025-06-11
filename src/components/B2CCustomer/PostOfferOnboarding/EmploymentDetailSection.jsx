import { useActiveTab } from "../ActiveTabContext";


function EmploymentDetailSection() {
  const { formData, setFormData } = useActiveTab();

  return (
    <>

      <>
        <select
          className="form-input w-full py-4"
          value={formData.workType}
          onChange={(e) => setFormData({ ...formData, workType: e.target.value })}
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
          value={formData.ministry}
          onChange={(e) => setFormData({ ...formData, ministry: e.target.value })}
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
          value={formData.employer}
          onChange={(e) => setFormData({ ...formData, employer: e.target.value })}
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
          value={formData.occupation}
          onChange={e => setFormData({ ...formData, occupation: e.target.value })}
          required
        />
        <input
          className="form-input w-full py-4"
          type="text"
          placeholder="Employee No."
          value={formData.employeeNo}
          onChange={e => setFormData({ ...formData, employeeNo: e.target.value })}
          required
        />

        <div className="relative">
          <input
            type="date"
            className="form-input w-full py-4 text-gray-900"
            value={formData.workStartDate}
            onChange={e => setFormData({ ...formData, workStartDate: e.target.value })}
            required
            onFocus={(e) => e.target.showPicker()} // Optional: shows date picker on focus
          />
          {!formData.workStartDate && (
            <span className="absolute left-4 top-4 text-gray-400 pointer-events-none">
              Work Start Date (dd-mm-yyyy)
            </span>
          )}
        </div>
        <input
          className="form-input w-full py-4"
          type="text"
          placeholder="Location"
          value={formData.employmentLocation}
          onChange={e => setFormData({ ...formData, employmentLocation: e.target.value })}
          required
        />
                
      </>

    </>
  );
}

export default EmploymentDetailSection;
