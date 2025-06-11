import { useActiveTab } from "../ActiveTabContext";


function FamilyReferenceDetailSection() {
  const { formData, setFormData } = useActiveTab();


  return (
    <>
      {/* Kin Title (Dropdown) */}
      <select
        className="form-input w-full py-4"
        value={formData.kinTitle}
        onChange={(e) => setFormData({ ...formData, kinTitle: e.target.value })}
      >
        <option value="">Select Title</option>
        <option value="Mr">Mr</option>
        <option value="Mrs">Mrs</option>
        <option value="Miss">Miss</option>
        <option value="Ms">Ms</option>
        <option value="Dr">Dr</option>
      </select>

      {/* Kin Surname */}
      <input
        className="form-input w-full py-4"
        type="text"
        placeholder="Surname"
        value={formData.kinSurname}
        onChange={(e) => setFormData({ ...formData, kinSurname: e.target.value })}
      />

      {/* Kin NRC No */}
      <input
        className="form-input w-full py-4"
        type="text"
        placeholder="NRC Number"
        value={formData.kinNrcNo}
        onChange={(e) => setFormData({ ...formData, kinNrcNo: e.target.value })}
      />

      {/* Kin Gender (Dropdown) */}
      <select
        className="form-input w-full py-4"
        value={formData.kinGender}
        onChange={(e) => setFormData({ ...formData, kinGender: e.target.value })}
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>

      {/* Kin Relationship (Dropdown) */}
      <select
        className="form-input w-full py-4"
        value={formData.kinRelationship}
        onChange={(e) => setFormData({ ...formData, kinRelationship: e.target.value })}
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
        value={formData.kinMobile1}
        onChange={(e) => setFormData({ ...formData, kinMobile1: e.target.value })}
      />

      {/* Kin Email */}
      <input
        className="form-input w-full py-4"
        type="email"
        placeholder="Email Address"
        value={formData.kinEmail}
        onChange={(e) => setFormData({ ...formData, kinEmail: e.target.value })}
      />

      {/* Kin Street */}
      <input
        className="form-input w-full py-4"
        type="text"
        placeholder="Street"
        value={formData.kinStreet}
        onChange={(e) => setFormData({ ...formData, kinStreet: e.target.value })}
      />

      {/* Kin Residential Area */}
      <input
        className="form-input w-full py-4"
        type="text"
        placeholder="Residential Area"
        value={formData.kinResidentialArea}
        onChange={(e) => setFormData({ ...formData, kinResidentialArea: e.target.value })}
      />

      {/* Kin Country (default = Zambia) */}
      <input
        className="form-input w-full py-4"
        type="text"
        placeholder="Country"
        value={formData.kinCountry}
        onChange={(e) => setFormData({ ...formData, kinCountry: e.target.value })}
      />

      {/* Kin Employer */}
      <input
        className="form-input w-full py-4"
        type="text"
        placeholder="Employer Name"
        value={formData.kinEmployer}
        onChange={(e) => setFormData({ ...formData, kinEmployer: e.target.value })}
      />

      {/* Kin Occupation */}
      <input
        className="form-input w-full py-4"
        type="text"
        placeholder="Occupation"
        value={formData.kinOccupation}
        onChange={(e) => setFormData({ ...formData, kinOccupation: e.target.value })}
      />

    </>
  );
}

export default FamilyReferenceDetailSection;
