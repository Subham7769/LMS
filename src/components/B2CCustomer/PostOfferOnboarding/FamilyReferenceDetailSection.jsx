import { useDispatch, useSelector } from "react-redux";
import { updatePersonalBorrowerField } from "../../../redux/Slices/B2CLoansSlice";


function FamilyReferenceDetailSection() {
  const dispatch = useDispatch();
  const { personalBorrower } = useSelector((state) => state.B2CLoans)

  const handleInputChange = (e, section) => {
    const { name, value, type, checked } = e.target;
    console.log(e)
    dispatch(updatePersonalBorrowerField({ section, field: name, value, type, checked }));
  };

  return (
    <>
      {/* Kin Title (Dropdown) */}
      <select
        className="form-input w-full py-4"
        name="kinTitle"
        value={personalBorrower.nextOfKinDetails.kinTitle}
        onChange={(e) => handleInputChange(e, "nextOfKinDetails")}
      >
        <option value="">Select Title</option>
        <option value="Mr">Mr</option>
        <option value="Mrs">Mrs</option>
        <option value="Miss">Miss</option>
        <option value="Ms">Ms</option>
        <option value="Dr">Dr</option>
      </select>


      {/* Kin Full Name */}
      <input
        className="form-input w-full py-4"
        type="text"
        placeholder="Full Name"
        name="kinFullName"
        value={personalBorrower.nextOfKinDetails.kinFullName}
        onChange={(e) => handleInputChange(e, "nextOfKinDetails")}
      />

      {/* Kin Surname */}
      {/* <input
        className="form-input w-full py-4"
        type="text"
        placeholder="Surname"
        name="kinSurname"
        value={personalBorrower.nextOfKinDetails.kinSurname}
        onChange={(e) => handleInputChange(e, "nextOfKinDetails")}
      /> */}

      {/* Kin Gender (Dropdown) */}
      <select
        className="form-input w-full py-4"
        name="kinGender"
        value={personalBorrower.nextOfKinDetails.kinGender}
        onChange={(e) => handleInputChange(e, "nextOfKinDetails")}
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>

      {/* Kin NRC No */}
      <input
        className="form-input w-full py-4"
        type="text"
        placeholder="NRC Number"
        name="kinNrcNo"
        value={personalBorrower.nextOfKinDetails.kinNrcNo}
        onChange={(e) => handleInputChange(e, "nextOfKinDetails")}
      />

      {/* Kin Relationship (Dropdown) */}
      <select
        className="form-input w-full py-4"
        name="kinRelationship"
        value={personalBorrower.nextOfKinDetails.kinRelationship}
        onChange={(e) => handleInputChange(e, "nextOfKinDetails")}
      >
        <option value="">Select Relationship</option>
        <option value="Spouse">Spouse</option>
        <option value="Parent">Parent</option>
        <option value="Mother">Mother</option>
        <option value="Father">Father</option>
        <option value="Sibling">Sibling</option>
        <option value="Brother">Brother</option>
        <option value="Sister">Sister</option>
        <option value="Child">Child</option>
        <option value="Son">Son</option>
        <option value="Daughter">Daughter</option>
        <option value="Uncle">Uncle</option>
        <option value="Aunt">Aunt</option>
        <option value="Cousin">Cousin</option>
        <option value="Nephew">Nephew</option>
        <option value="Niece">Niece</option>
        <option value="Grandparent">Grandparent</option>
        <option value="Grandfather">Grandfather</option>
        <option value="Grandmother">Grandmother</option>
        <option value="In-law">In-law</option>
        <option value="Father-in-law">Father-in-law</option>
        <option value="Mother-in-law">Mother-in-law</option>
        <option value="Brother-in-law">Brother-in-law</option>
        <option value="Sister-in-law">Sister-in-law</option>
        <option value="Friend">Friend</option>
        <option value="Guardian">Guardian</option>
        <option value="Colleague">Colleague</option>
        <option value="Other">Other</option>
      </select>

      {/* Kin Mobile */}
      <input
        className="form-input w-full py-4"
        type="number"
        placeholder="Mobile Number"
        name="kinMobile1"
        value={personalBorrower.nextOfKinDetails.kinMobile1}
        onChange={(e) => handleInputChange(e, "nextOfKinDetails")}
      />

      {/* Kin Email */}
      <input
        className="form-input w-full py-4"
        type="email"
        placeholder="Email"
        name="kinEmail"
        value={personalBorrower.nextOfKinDetails.kinEmail}
        onChange={(e) => handleInputChange(e, "nextOfKinDetails")}
      />

      {/* Kin Address */}
      <input
        className="form-input w-full py-4"
        type="text"
        placeholder="Address"
        name="kinAddress"
        value={personalBorrower.nextOfKinDetails.kinAddress}
        onChange={(e) => handleInputChange(e, "nextOfKinDetails")}
      />

      {/* Kin Street */}
      {/* <input
        className="form-input w-full py-4"
        type="text"
        placeholder="Street"
        name="kinStreet"
        value={personalBorrower.nextOfKinDetails.kinStreet}
        onChange={(e) => handleInputChange(e, "nextOfKinDetails")}
      /> */}

      {/* Kin Residential Area */}
      {/* <input
        className="form-input w-full py-4"
        type="text"
        placeholder="Residential Area"
        name="kinResidentialArea"
        value={personalBorrower.nextOfKinDetails.kinResidentialArea}
        onChange={(e) => handleInputChange(e, "nextOfKinDetails")}
      /> */}

      {/* Kin Country (default = Zambia) */}
      <input
        className="form-input w-full py-4"
        type="text"
        placeholder="Country"
        name="kinCountry"
        value={personalBorrower.nextOfKinDetails.kinCountry}
        onChange={(e) => handleInputChange(e, "nextOfKinDetails")}
      />

      {/* Kin Employer */}
      <input
        className="form-input w-full py-4"
        type="text"
        placeholder="Employer Name"
        name="kinEmployer"
        value={personalBorrower.nextOfKinDetails.kinEmployer}
        onChange={(e) => handleInputChange(e, "nextOfKinDetails")}
      />

      {/* Kin Occupation */}
      <input
        className="form-input w-full py-4"
        type="text"
        placeholder="Occupation"
        name="kinOccupation"
        value={personalBorrower.nextOfKinDetails.kinOccupation}
        onChange={(e) => handleInputChange(e, "nextOfKinDetails")}
      />

    </>
  );
}

export default FamilyReferenceDetailSection;
