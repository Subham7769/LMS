import React, { useState } from "react";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Stepper from "../../Common/Stepper/Stepper";
import InputSelect from "../../Common/InputSelect/InputSelect";
import InputText from "../../Common/InputText/InputText";
import InputNumber from "../../Common/InputNumber/InputNumber";
import InputDate from "../../Common/InputDate/InputDate";
import InputCheckbox from "../../Common/InputCheckbox/InputCheckbox";
import Button from "../../Common/Button/Button";
import { useSelector } from "react-redux";
import updateField, {
  generatePreEligibilityOtp,
} from "../../../redux/Slices/ProductTestingKSA";
import { useDispatch } from "react-redux";
import { useActiveTab } from "../ActiveTabContext";
import { toast } from "react-toastify";

// API for OTP generation

const Step1PersonalInfo = ({ onNext, onBack }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setUserId } = useActiveTab();

  const [formData, setFormData] = useState({
    mobile: "",
    nationality: "",
    nationalId: "",
    dob: "",
    agreed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleGetOtp = async () => {
    if (!formData.agreed) {
      toast.warn("Please agree to the Terms & Conditions before continuing.");
      return;
    }
    setUserId(formData.nationalId);
    // await dispatch(generatePreEligibilityOtp(formData)).unwrap();
    onNext();
  };

  const inputCheckLabel = () => (
    <>
      I agree to KSA's{" "}
      <span className="text-violet-600 underline cursor-pointer">
        Terms & Conditions
      </span>{" "}
      &{" "}
      <span className="text-violet-600 underline cursor-pointer">
        Privacy Policy
      </span>
    </>
  );

  return (
    <>
      {/* Stepper */}
      <Stepper
        title={"KSA Financing"}
        currentStep={2}
        steps={["Welcome", "Personal Info", "OTP Verification", "Completion"]}
      />

      {/* Form */}
      <h2 className="text-lg font-semibold mb-2">Create Your Account</h2>
      <p className="text-sm text-gray-600 dark:text-gray-500  mb-6">
        Please enter your details to register with KSA
      </p>

      <div className="space-y-4">
        {/* Mobile Number */}
        <InputNumber
          labelName={"Mobile Number"}
          inputName="mobile"
          inputValue={formData.mobile}
          onChange={handleChange}
          isValidation={true}
        />

        {/* Nationality */}
        <InputSelect
          labelName={"Nationality"}
          inputName="nationality"
          inputValue={formData.nationality}
          inputOptions={[
            { label: "Saudi", value: "saudi" },
            { label: "Non-Saudi", value: "non-saudi" },
          ]}
          onChange={handleChange}
          isValidation={true}
        />

        {/* National ID / Iqama */}
        <InputText
          labelName={"National ID / Iqama"}
          inputName="nationalId"
          inputValue={formData.nationalId}
          placeHolder="1XXXXXXXXX"
          onChange={handleChange}
          isValidation={true}
        />

        {/* Date of Birth */}
        <InputDate
          labelName={"Date of Birth"}
          inputName="dob"
          inputValue={formData.dob}
          onChange={handleChange}
          isValidation={true}
        />

        {/* Agree */}
        <InputCheckbox
          labelName={inputCheckLabel()}
          inputName="agreed"
          inputChecked={formData.agreed}
          onChange={handleChange}
        />
        {/* Submit */}
        <div className="flex justify-center items-center mt-4">
          <Button
            buttonName="Get OTP"
            buttonType="primary"
            onClick={handleGetOtp}
          />
        </div>
      </div>

      <p className="text-center text-sm text-gray-500 mt-6">
        Already have an account?{" "}
        <span className="text-violet-600 font-medium cursor-pointer">
          Login
        </span>
      </p>
    </>
  );
};

export default Step1PersonalInfo;
