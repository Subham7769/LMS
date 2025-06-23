import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid"; // or use HeroIcons / any SVG
import B2CModal from "../B2CModal/B2CModal";
import { B2CLogin, fetchPersonalBorrowerById } from "../../../redux/Slices/B2CLoansSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);


  if (!isOpen) return null;

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await dispatch(B2CLogin({ email, password })).unwrap();

      console.log("Login Response:", res); // ✅ Add this to debug

      if (res?.data?.cachedDetails.cachedBorrowerId && res?.data?.cachedDetails.cachedLoanApplicationId) {
        dispatch(fetchPersonalBorrowerById(res?.data?.cachedDetails.cachedBorrowerId));

        navigate("/customer/loan-offers");
      } else {
        toast.error("Missing loan data after login");
      }
    } catch (error) {
      // console.error("Login failed:", error);
      toast.error("Login failed.");
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <>
      <B2CModal
        primaryButtonName={"Login"}
        primaryOnClick={handleLogin}
        secondaryButtonName={"Cancel"}
        secondaryOnClick={onClose}
        title={"Login"}
      >
        <div className="flex flex-col space-y-3">
          <input
            className={`form-input w-full mb-4 py-4`}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className={`relative group w-full`} >
            <input
              className="form-input w-full mb-4 py-4 pr-12"
              type={showPassword ? "text" : "password"}
              placeholder="Create Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$"
              required
            />

            {/* 👁 Password Toggle Icon */}
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute right-4 top-7 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeSlashIcon className='h-5 w-5' /> : <EyeIcon className='h-5 w-5' />}
            </button>

            {/* 🧠 Tooltip on hover */}
            <div className="absolute bottom-full left-0 mb-2 hidden w-32 rounded bg-gray-900 text-[9px] text-white p-1 group-hover:block z-10 shadow-lg">
              • At least 8 characters<br />
              • One uppercase letter<br />
              • One lowercase letter<br />
              • One number
            </div>
          </div>
        </div>
      </B2CModal>
    </>
  );
};

export default LoginModal;
