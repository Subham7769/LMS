import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsSignup,
  updateDataField,
  login,
  setButtonText,
  setError,
  resetError,
  setRole,
} from "../../redux/Slices/authSlice";
import { setMenus } from "../../redux/Slices/sidebarSlice";
import InputPassword from "../Common/InputPassword/InputPassword";
import InputEmail from "../Common/InputEmail/InputEmail";
import { LockClosedIcon, UserIcon } from "@heroicons/react/20/solid";
import { LogoIcon } from "../../assets/icons";
import {
  ArrowPathRoundedSquareIcon,
  Cog6ToothIcon,
  ComputerDesktopIcon,
  CpuChipIcon,
} from "@heroicons/react/24/outline";
import Illustration from "../../assets/image/illustrations/undraw_metrics_5v8d.svg";


const heroSectionCards = [
  {
    title: "Smart Debt Collections",
    desc: "Configurable workflows for collections, Deploy Recovery equations, Create Hardship programs",
    Icon: ArrowPathRoundedSquareIcon,
  },
  {
    title: "Agentic & Gen AI Integration",
    desc: "Advanced AI capabilities for enhanced decision-making and Consumer onboarding",
    Icon: CpuChipIcon,
  },
  {
    title: "Dynamic Business Rule Engine",
    desc: "Automated decisioning and scoring engines for loans, recovery, affordability calculations & more",
    Icon: Cog6ToothIcon,
  },
  {
    title: "Adaptive Setup",
    desc: "Tailor-made workflows, products, approval documents and pricing structures",
    Icon: ComputerDesktopIcon,
  },
];

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    isSignup,
    username,
    password,
    email,
    newPassword,
    confirmPassword,
    buttonText,
    error,
  } = useSelector((state) => state.auth);
  const [stats, setStats] = useState({ loans: 0, institutions: 0, uptime: 0 });

  useEffect(() => {
    const animateValue = (key, end, duration) => {
      let start = 0;
      const stepTime = 1000 / 60;
      const totalSteps = duration / stepTime;
      let step = 0;
      const interval = setInterval(() => {
        step++;
        const progress = step / totalSteps;
        const value = +(progress * end).toFixed(1);
        setStats((prev) => ({ ...prev, [key]: value }));
        if (step >= totalSteps) clearInterval(interval);
      }, stepTime);
    };
    setTimeout(() => {
      animateValue("loans", 200, 2000);
      animateValue("institutions", 6, 2000);
      animateValue("uptime", 500, 2000);
    }, 1000);
  }, []);

  const handleLogin = (username, password) => {
    dispatch(setButtonText("Authenticating"));
    dispatch(login({ username, password }))
      .unwrap()
      .then(({ token, data }) => {
        if (data?.roles && data?.roles.length > 0) {
          const role = data.roles[0].name;
          dispatch(setRole(role));
          dispatch(setMenus({ roleName: role }));
          dispatch(setButtonText("Validated!"));
          const roleBasedNavigation = {
            ROLE_SUPERADMIN: "/loan/home",
            ROLE_VIEWER: "/loan/home",
            ROLE_ADMIN: "/loan/home",
            ROLE_CUSTOMER_CARE_USER: "/loan/customer-care",
            ROLE_CREDITOR_ADMIN: "/loan/home",
            ROLE_CUSTOMER_CARE_MANAGER: "/loan/customer-care",
            ROLE_TICKETING_USER: "/loan/home",
            ROLE_TICKETING_SUPERVISOR: "/loan/home",
            ROLE_TECHNICAL: "/loan/customer-care",
            ROLE_MAKER_ADMIN: "/loan/dynamic-rac",
            ROLE_CHECKER_ADMIN: "/loan/dynamic-rac",
          };
          navigate(roleBasedNavigation[role] || "/loan/home");
        } else {
          dispatch(setButtonText("Try Again!"));
        }
      })
      .catch(() => {
        dispatch(setButtonText("Try Again!"));
      });
  };

  const resetPassword = (email, newPassword, confirmPassword) => {
    if (newPassword !== confirmPassword) {
      dispatch(setError("Passwords do not match"));
      return;
    }
    dispatch(setButtonText("Setting up Password"));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateDataField({ name, value }));
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-5 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700">
      <div
        className="fixed inset-0 z-0 opacity-10 animate-gridPulse pointer-events-none"
        style={{
          backgroundImage: `
      linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
    `,
          backgroundSize: "50px 50px",
        }}
      ></div>
      <div className="absolute inset-0 pointer-events-none z-0">
        {["💰", "📊", "🔒", "⚡"].map((icon, i) => (
          <div
            key={i}
            className={`absolute w-10 h-10 bg-violet-500/10 rounded-lg flex items-center justify-center animate-float`}
            style={{
              top: `${[15, 70, 40, 25][i]}%`,
              left: `${[10, 80, 5, 85][i]}%`,
              animationDelay: `${i * 2}s`,
            }}
          >
            {icon}
          </div>
        ))}
      </div>
      <div className="relative grid grid-cols-1 lg:grid-cols-2 max-w-[1400px] w-full rounded-2xl overflow-hidden shadow-card backdrop-blur-2xl bg-slate-900/95 animate-slideIn">
        {/* HERO SECTION */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-10 lg:p-20 relative">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle,rgba(139,92,246,0.1)_0%,transparent_50%)] animate-pulse" />
          <div className="relative z-10 flex items-center mb-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center shadow-xl mr-5">
              <LogoIcon className="h-8 w-8 fill-white" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold bg-gradient-to-br from-violet-500 to-violet-400 bg-clip-text text-transparent">
                PhotonMatters
              </h1>
              <p className="text-slate-400 text-sm font-medium">
                Enterprise Loan Management
              </p>
            </div>
          </div>

          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-slate-100 leading-tight mb-6">
              Advanced Loan Management Platform
            </h2>
            <p className="text-lg text-slate-300 mb-10 max-w-xl">
              Streamline your lending operations with AI-powered risk
              assessment, automated workflows, and comprehensive portfolio
              management.
            </p>

            <div className="hidden sm:grid sm:grid-cols-2 gap-5 mb-10">
              {heroSectionCards.map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-slate-800/80 border border-violet-500/20 rounded-xl p-6 backdrop-blur-md transition-all duration-300 hover:translate-y-[-5px] hover:rotate-[1deg] hover:border-violet-500/40 hover:shadow-[0_15px_40px_rgba(139,92,246,0.1)]"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-violet-600 rounded-lg flex items-center justify-center mb-4">
                    {React.createElement(feature.Icon, {
                      className: "h-6 w-6 text-white",
                    })}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>

            <div className="hidden sm:grid grid-cols-3 gap-10 text-center">
              <div>
                <div className="text-violet-500 text-2xl font-bold">
                  {stats.loans}K+
                </div>
                <div className="text-slate-500 text-xs uppercase tracking-wider">
                  Loans requests/day
                </div>
              </div>
              <div>
                <div className="text-violet-500 text-2xl font-bold">0.1-2%</div>
                <div className="text-slate-500 text-xs uppercase tracking-wider">
                  Bad Debt Rate
                </div>
              </div>
              <div>
                <div className="text-violet-500 text-2xl font-bold">
                  ${stats.uptime}M+
                </div>
                <div className="text-slate-500 text-xs uppercase tracking-wider">
                  Designed for high loans volumes
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* LOGIN SECTION */}
        <div className="bg-white px-5 py-10 lg:p-20 flex flex-col">
          <div className="text-center mb-8">
            <div className="inline-flex items-center bg-violet-500/10 text-violet-700 px-4 py-2 rounded-full border border-violet-500/20 text-sm font-semibold mb-4">
              🔒{" "}
              {isSignup === "Forget Password"
                ? "Reset Access"
                : "Secure Access Portal"}
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              {isSignup === "Login"
                ? "Welcome Back"
                : isSignup === "Signup"
                ? "Create an Account"
                : "Reset Your Password"}
            </h2>
            <p className="text-slate-500 text-base">
              {isSignup === "Login"
                ? "Access your loan management platform"
                : "Provide the required information to continue"}
            </p>
          </div>

          <form className="space-y-6">
            {isSignup === "Signup" && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  className="w-full px-5 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-violet-500"
                  placeholder="Your full name"
                />
              </div>
            )}

            {(isSignup === "Login" || isSignup === "Signup") && (
              <>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={username}
                    onChange={handleChange}
                    className="w-full px-5 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-violet-500"
                    placeholder="Your username"
                  />
                  <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-slate-400">
                    <UserIcon className="h-5 w-5" />
                  </div>
                </div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={handleChange}
                    className="w-full px-5 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-violet-500"
                    placeholder="Your password"
                  />
                  <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-slate-400">
                    <LockClosedIcon className="h-5 w-5" />
                  </div>
                </div>
              </>
            )}

            {isSignup === "Forget Password" && (
              <>
                <InputEmail
                  labelName="Email"
                  inputName="email"
                  inputValue={email}
                  onChange={handleChange}
                  placeHolder="Your email"
                />
                <InputPassword
                  labelName="Password"
                  inputName="newPassword"
                  inputValue={newPassword}
                  onChange={handleChange}
                  placeHolder="New password"
                />
                <InputPassword
                  labelName="Confirm Password"
                  inputName="confirmPassword"
                  inputValue={confirmPassword}
                  onChange={handleChange}
                  placeHolder="Confirm password"
                />
              </>
            )}

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <div className="flex justify-between items-center mb-6">
              <label className="flex items-center text-sm text-slate-500 ">
                <input type="checkbox" className="mr-2 form-checkbox" /> Keep me
                signed in
              </label>
              <div className="font-semibold text-sm text-violet-500 hover:text-violet-600">
                {isSignup === "Login" && (
                  <button
                    type="button"
                    onClick={() => {
                      dispatch(setIsSignup("Forget Password"));
                      dispatch(resetError());
                      dispatch(setButtonText("Set New Password"));
                    }}
                    className="hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                )}
                {isSignup === "Forget Password" && (
                  <button
                    type="button"
                    onClick={() => {
                      dispatch(setIsSignup("Login"));
                      dispatch(resetError());
                      dispatch(setButtonText("Login"));
                    }}
                    className="hover:underline cursor-pointer"
                  >
                    Back to Login
                  </button>
                )}
              </div>
            </div>

            <div className="">
              <button
                type="button"
                onClick={() => {
                  if (isSignup === "Login") {
                    handleLogin(username, password);
                  } else if (isSignup === "Signup") {
                    const fullName = document.getElementById("fullName").value;
                    // implement signup call
                  } else if (isSignup === "Forget Password") {
                    resetPassword(email, newPassword, confirmPassword);
                  }
                }}
                className="cursor-pointer group relative w-full px-6 py-4 bg-gradient-to-br from-violet-500 to-violet-600 text-white text-base font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(139,92,246,0.4)]"
              >
                {/* Shine Effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />

                {/* Button Text */}
                <span className="relative z-10">
                  {buttonText.includes("Authenticating") ||
                  buttonText.includes("Password") ? (
                    <>
                      {buttonText} <span className="animate-pulse">...</span>
                    </>
                  ) : isSignup === "Login" ? (
                    "Access Platform"
                  ) : isSignup === "Signup" ? (
                    "Sign Up"
                  ) : (
                    "Set New Password"
                  )}
                </span>
              </button>
            </div>
          </form>

          <div className="text-center text-slate-500 text-sm mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
            {isSignup === "Login" && (
              <p>
                Need access to the system?{" "}
                <a
                  // onClick={() => {
                  //   dispatch(setIsSignup("Signup"));
                  //   dispatch(resetError());
                  //   dispatch(setButtonText("Sign Up"));
                  // }}
                  href="https://49356640.hs-sites.com/photonmatters-request-account"
                  target="blank"
                  className="text-violet-600 font-semibold hover:underline cursor-pointer"
                >
                  Request Account
                </a>
              </p>
            )}
            {isSignup === "Signup" && (
              <p>
                Already have an account?{" "}
                <button
                  onClick={() => {
                    dispatch(setIsSignup("Login"));
                    dispatch(resetError());
                    dispatch(setButtonText("Login"));
                  }}
                  className="text-violet-600 font-semibold hover:underline cursor-pointer"
                >
                  Login
                </button>
              </p>
            )}
          </div>

          <div className="flex justify-center gap-6 mt-10 text-slate-500 text-sm opacity-70">
            <div className="flex items-center gap-2">
              🛡️ <span>ISO/IEC 27001-aligned</span>
            </div>
            <div className="flex items-center gap-2">
              🔐 <span>256-bit Encryption</span>
            </div>
            <div className="flex items-center gap-2">
              ✓ <span>GDPR Compliant</span>
            </div>
          </div>
          <div className="flex justify-center mt-10">
            <img src={Illustration} alt="Metrics Illustration" className="" />
            {/* w-2/5 max-w-xs md:max-w-sm lg:max-w-md */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
