import React, { useState, useRef, useEffect } from "react";
import { Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Stepper from "../../Common/Stepper/Stepper";
import Button from "../../Common/Button/Button";
import { useActiveTab } from "../ActiveTabContext";
import { useDispatch } from "react-redux";
import { validatePreEligibilityOtp } from "../../../redux/Slices/ProductTestingKSA";
import { toast } from "react-toastify";

// API for OTP validation

const Step1OtpVerification = ({ onNext, onBack }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [otpValues, setOtpValues] = useState(Array(6).fill(""));
  const inputsRef = useRef([]);
  const [secondsLeft, setSecondsLeft] = useState(180); // 3 minutes
  const { userId } = useActiveTab();
  console.log(...otpValues)
  // Countdown timer
  useEffect(() => {
    if (secondsLeft > 0) {
      const timer = setTimeout(() => setSecondsLeft(secondsLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [secondsLeft]);

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  const handleChange = (e, idx) => {
    const val = e.target.value.replace(/\D/, "").slice(-1);
    const newOtp = [...otpValues];
    newOtp[idx] = val;
    setOtpValues(newOtp);
    if (val && idx < 5) {
      inputsRef.current[idx + 1].focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !otpValues[idx] && idx > 0) {
      inputsRef.current[idx - 1].focus();
    }
  };

  const handleResend = () => {
    setSecondsLeft(180);
    setOtpValues(Array(6).fill(""));
    inputsRef.current[0].focus();
    // TODO: trigger resend OTP API call here
  };

  const handleBack = () => {
    onBack()
  };

  const handleContinue = async () => {
    if (otpValues.some((d) => d === "")) {
      toast.warn("Please enter the full 6-digit code.");
      return;
    }
    const code = otpValues.join("");
    // TODO: verify OTP via API
    // await dispatch(validatePreEligibilityOtp({ userId, otp: otpValues.join("") }))
    onNext()
  };

  return (
    <>
      {/* Stepper */}
      <Stepper
        title={"KSA Financing"}
        currentStep={3}
        steps={["Welcome", "Personal Info", "OTP Verification", "Completion"]}
      />

      {/* OTP Box */}
      <div className="text-center mb-6">
        <Lock className="w-8 h-8 text-violet-500 mx-auto mb-3" />
        <h2 className="text-lg font-semibold mb-1">Verify OTP</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Enter the code we sent to +966 5XXXXXXXX
        </p>

        {/* 6-digit inputs */}
        <div className="flex justify-center space-x-2 mb-2">
          {otpValues.map((digit, idx) => (
            <input
              key={idx}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              ref={(el) => (inputsRef.current[idx] = el)}
              className="w-10 h-10 dark:bg-gray-600 border rounded-md text-center text-lg font-medium focus:outline-none"
            />
          ))}
        </div>

        {/* Timer & Resend */}
        <div className="flex justify-center items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
          <span>
            Code expires in {minutes}:{seconds}
          </span>
          <button
            onClick={handleResend}
            disabled={secondsLeft === 180}
            className="ml-2 text-violet-500 font-medium disabled:text-gray-300"
          >
            Resend Code
          </button>
        </div>

        {/* Info box */}
        <div className="bg-violet-700/20 border-l-4 border-violet-300 p-4 text-sm">
          The one-time password (OTP) has been sent to your mobile number for
          verification. If you didn’t receive it, check your number and click
          “Resend Code”.
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center">
        <Button buttonName="Back" buttonType="secondary" onClick={handleBack} />
        <Button
          buttonName="Continue"
          onClick={handleContinue}
        />
      </div>
    </>
  );
};

export default Step1OtpVerification;
