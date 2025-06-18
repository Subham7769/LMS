import { useLocation } from 'react-router-dom';
import { useActiveTab } from '../ActiveTabContext';
import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid"; // or use HeroIcons / any SVG

const PersonDetailsSection = () => {
    const { formData, setFormData } = useActiveTab();
    const location = useLocation();
    const { pathname } = location;
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <input
                className={`form-input w-full mb-4 py-4 ${pathname.includes("loan-offers") && "hidden"}`}
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={pathname.includes("loan-offers")}
            />
            <input
                className="form-input w-full mb-4 py-4"
                type="number"
                placeholder="Basic Pay"
                value={formData.basicPay}
                onChange={e => setFormData({ ...formData, basicPay: e.target.value })}
                required
            />
            <div className={`relative group w-full ${pathname.includes("loan-offers") && "hidden"} `} >
                <input
                    className="form-input w-full mb-4 py-4 pr-12"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create Password"
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
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
        </>
    )
}

export default PersonDetailsSection