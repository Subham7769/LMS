import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleSidebar,
  setSubmenuStates,
  fetchDBRData,
  fetchProjectData,
  fetchProductData,
  fetchCreditScoreEqData,
  fetchRulePolicyData,
  fetchTCLData,
  fetchProdGroupData,
  fetchRecoveryData,
  fetchAffordibilityData,
  fetchLoanApprovalData,
  fetchDocumentConfigData,
  fetchCreditScoreEligibleTenureData,
  fetchDynamicRacData,
  fetchReportingConfigData,
  setMenus,
  fetchDrlRulesetData,
} from "../../../redux/Slices/sidebarSlice";
import {
  RectangleGroupIcon,
  ArrowPathRoundedSquareIcon,
  HandThumbUpIcon,
  CheckBadgeIcon,
  BuildingOfficeIcon,
  DocumentTextIcon,
  ChartPieIcon,
  CubeIcon,
  CurrencyRupeeIcon,
  AdjustmentsHorizontalIcon,
  Cog6ToothIcon,
  ClipboardDocumentCheckIcon,
  HomeIcon,
  UsersIcon,
  BookOpenIcon,
  HeartIcon,
  CalculatorIcon,
  ClipboardDocumentListIcon,
  CreditCardIcon,
  NoSymbolIcon,
  HandRaisedIcon,
  UserGroupIcon,
  MinusCircleIcon,
  BeakerIcon,
  ChartBarIcon,
  DocumentCurrencyRupeeIcon,
  DocumentMagnifyingGlassIcon,
  NewspaperIcon,
  AtSymbolIcon,
  WrenchScrewdriverIcon,
  CubeTransparentIcon,
  CpuChipIcon,
  ArrowLeftIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";

import { createNewRac } from "../../../utils/createNewRac";
import { createNewProduct } from "../../../utils/createNewProduct";
import { createNewProject } from "../../../utils/createNewProject";
import { createNewRecovery } from "../../../utils/createNewRecovery";
import { createNewAffordability } from "../../../utils/createNewAffordability";
import { createNewLoanApproval } from "../../../utils/createNewLoanApproval";
import { createNewProductGroup } from "../../../utils/createNewProductGroup";
import { createNewDBC } from "../../../utils/createNewDBC";
import { createNewBE } from "../../../utils/createNewBE";
import { createNewCreditScoreEq } from "../../../utils/createNewCreditScoreEq";
import { createNewRulePolicy } from "../../../utils/createNewRulePolicy";
import { createNewTCL } from "../../../utils/createNewTCL";
import { createNewCreditScoreET } from "../../../utils/createNewCreditScoreET";
import { createNewRac as createNewDynamicRac } from "../../../utils/createNewDynamicRac";
import { createNewReportingConfig } from "../../../utils/createNewReportingConfig";
import { allSectionName } from "../../../data/MenuData.js";
import CreateNew from "../CreateNew/CreateNew";
import { setRole } from "../../../redux/Slices/authSlice";
import { createNewDocumentConfig } from "../../../utils/createNewDocumentConfig.js";
// import { LogoIcon } from "../../../assets/icons.jsx";
import LogoIcon from "../../../assets/logo.png";
import { createNewDrlRuleset } from "../../../utils/createNewDrlRuleset.js";

const SideBar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { pathname } = location;
  const { menus, loading, error, submenuStates, open } = useSelector(
    (state) => state.sidebar
  );
  const { roleName } = useSelector((state) => state.auth);
  const roleNameLocal = localStorage.getItem("roleName");
  // console.log(roleName);
  if (!roleName) {
    dispatch(setRole(roleNameLocal));
  }
  const iconMapping = {
    HomeIcon,
    ClipboardDocumentCheckIcon,
    ArrowPathRoundedSquareIcon,
    HandThumbUpIcon,
    CheckBadgeIcon,
    BuildingOfficeIcon,
    DocumentTextIcon,
    CurrencyRupeeIcon,
    ChartPieIcon,
    CubeIcon,
    CreditCardIcon,
    NoSymbolIcon,
    CalculatorIcon,
    ClipboardDocumentListIcon,
    RectangleGroupIcon,
    AdjustmentsHorizontalIcon,
    Cog6ToothIcon,
    HeartIcon,
    UsersIcon,
    BookOpenIcon,
    HandRaisedIcon,
    UserGroupIcon,
    MinusCircleIcon,
    BeakerIcon,
    ChartBarIcon,
    DocumentCurrencyRupeeIcon,
    DocumentMagnifyingGlassIcon,
    NewspaperIcon,
    AtSymbolIcon,
    WrenchScrewdriverIcon,
    CubeTransparentIcon,
    CpuChipIcon,
    BanknotesIcon,
  };

  const functionMapping = {
    createNewRac,
    createNewProduct,
    createNewProject,
    createNewRecovery,
    createNewAffordability,
    createNewDrlRuleset,
    createNewLoanApproval,
    createNewDocumentConfig,
    createNewProductGroup,
    createNewDBC,
    createNewBE,
    createNewCreditScoreEq,
    createNewRulePolicy,
    createNewTCL,
    createNewDynamicRac,
    createNewCreditScoreET,
    createNewReportingConfig,
  };

  useEffect(() => {
    localStorage.setItem("submenuStates", JSON.stringify(submenuStates));
  }, [submenuStates]);

  useEffect(() => {
    switch (roleName) {
      case "ROLE_SUPERADMIN":
      case "ROLE_ADMIN":
        // dispatch(fetchRACData());
        dispatch(fetchDBRData());
        // dispatch(fetchBEData());
        dispatch(fetchProjectData());
        dispatch(fetchProductData());
        dispatch(fetchCreditScoreEqData());
        dispatch(fetchRulePolicyData());
        dispatch(fetchTCLData());
        dispatch(fetchProdGroupData());
        dispatch(fetchRecoveryData());
        dispatch(fetchAffordibilityData());
        // dispatch(fetchDrlRulesetData());
        dispatch(fetchLoanApprovalData());
        dispatch(fetchDocumentConfigData());
        dispatch(fetchCreditScoreEligibleTenureData());
        dispatch(fetchDynamicRacData());
        dispatch(fetchReportingConfigData());
        break;

      case "ROLE_VIEWER":
        // dispatch(fetchRACData());
        dispatch(fetchDBRData());
        // dispatch(fetchBEData());
        dispatch(fetchProjectData());
        dispatch(fetchProductData());
        dispatch(fetchCreditScoreEqData());
        dispatch(fetchRulePolicyData());
        dispatch(fetchTCLData());
        dispatch(fetchProdGroupData());
        dispatch(fetchRecoveryData());
        dispatch(fetchAffordibilityData());
        // dispatch(fetchDrlRulesetData());
        dispatch(fetchLoanApprovalData());
        dispatch(fetchDocumentConfigData());
        dispatch(fetchCreditScoreEligibleTenureData());
        dispatch(fetchDynamicRacData());
        dispatch(fetchReportingConfigData());
        break;

      case "ROLE_CUSTOMER_CARE_USER":
        break;

      case "ROLE_CREDITOR_ADMIN":
        // dispatch(fetchRACData());
        dispatch(fetchDBRData());
        // dispatch(fetchBEData());
        dispatch(fetchProjectData());
        dispatch(fetchProductData());
        dispatch(fetchCreditScoreEqData());
        dispatch(fetchRulePolicyData());
        dispatch(fetchTCLData());
        dispatch(fetchProdGroupData());
        dispatch(fetchRecoveryData());
        dispatch(fetchAffordibilityData());
        // dispatch(fetchDrlRulesetData());
        dispatch(fetchLoanApprovalData());
        dispatch(fetchDocumentConfigData());
        dispatch(fetchCreditScoreEligibleTenureData());
        dispatch(fetchDynamicRacData());
        dispatch(fetchReportingConfigData());
        break;

      case "ROLE_CUSTOMER_CARE_MANAGER":
        break;

      case "ROLE_TICKETING_USER":
        break;

      case "ROLE_TICKETING_SUPERVISOR":
        break;

      case "ROLE_TECHNICAL":
        break;

      case "ROLE_MAKER_ADMIN":
        // dispatch(fetchRACData());
        dispatch(fetchDBRData());
        // dispatch(fetchBEData());
        dispatch(fetchProjectData());
        dispatch(fetchProductData());
        dispatch(fetchCreditScoreEqData());
        dispatch(fetchRulePolicyData());
        dispatch(fetchTCLData());
        dispatch(fetchRecoveryData());
        dispatch(fetchAffordibilityData());
        // dispatch(fetchDrlRulesetData());
        dispatch(fetchLoanApprovalData());
        dispatch(fetchDocumentConfigData());
        dispatch(fetchCreditScoreEligibleTenureData());
        dispatch(fetchDynamicRacData());
        break;

      case "ROLE_CHECKER_ADMIN":
        // dispatch(fetchRACData());
        dispatch(fetchDBRData());
        // dispatch(fetchBEData());
        dispatch(fetchProjectData());
        dispatch(fetchProductData());
        dispatch(fetchCreditScoreEqData());
        dispatch(fetchRulePolicyData());
        dispatch(fetchTCLData());
        dispatch(fetchRecoveryData());
        dispatch(fetchAffordibilityData());
        // dispatch(fetchDrlRulesetData());
        dispatch(fetchLoanApprovalData());
        dispatch(fetchDocumentConfigData());
        dispatch(fetchCreditScoreEligibleTenureData());
        dispatch(fetchDynamicRacData());
        break;

      case "ROLE_LOAN_OFFICER":
      case "ROLE_CREDIT_OFFICER":
      case "ROLE_CCO_AND_FINTECH_OFFICER":
      case "ROLE_CHIEF_EXECUTIVE_OFFICER":
      case "ROLE_MANAGEMENT_CREDIT_COMMITTEE":
      case "ROLE_BOARD":
        dispatch(fetchDBRData());
        // dispatch(fetchBEData());
        dispatch(fetchProjectData());
        dispatch(fetchProductData());
        dispatch(fetchCreditScoreEqData());
        dispatch(fetchRulePolicyData());
        dispatch(fetchTCLData());
        dispatch(fetchProdGroupData());
        dispatch(fetchRecoveryData());
        dispatch(fetchAffordibilityData());
        // dispatch(fetchDrlRulesetData());
        dispatch(fetchLoanApprovalData());
        dispatch(fetchDocumentConfigData());
        dispatch(fetchCreditScoreEligibleTenureData());
        dispatch(fetchDynamicRacData());
        dispatch(fetchReportingConfigData());
        break;

      default:
        break;
    }
    dispatch(setMenus({ roleName }));
  }, [dispatch, roleName]);

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const handleToggleSidebarOnMobile = (menu) => {
    if (window.innerWidth < 1024 && (!menu || !menu.submenu)) {
      dispatch(toggleSidebar());
    }
  };

  const handleToggleSubmenu = (index) => {
    const updatedStates = submenuStates.map((state, i) =>
      i === index ? { ...state, isOpen: !state.isOpen } : state
    );
    dispatch(setSubmenuStates(updatedStates));
  };

  return (
    <>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-gray-900/30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>
      <div
        className={`z-40 absolute top-0 left-0 -mr-1 lg:relative overflow-y-auto h-screen no-scrollbar lg:bg-gray-100 dark:lg:bg-gray-900/90 flex transform duration-1000 ease-in-out ${
          open ? "w-[17rem]" : "lg:w-14 w-0"
        }`}
      >
        {/* Collapse Button */}
        <button
          onClick={handleToggleSidebar}
          className={`hidden lg:block z-30 absolute right-2 top-56 bg-gray-800 dark:border border-gray-400 h-16 w-4 rounded-full p-0`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 text-white transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
        <ul
          className={`pt-4 border-r h-auto ${
            open ? "w-64 px-4" : "lg:w-10 w-0 pl-1 pr-2"
          } overflow-y-auto no-scrollbar border-gray-200 dark:border-gray-800  bg-white dark:bg-gray-800 transition-[width,padding] duration-1000 ease-in-out`}
        >
          <div className="w-full flex shrink-0 items-center justify-between lg:w-1/3">
            {/* <LogoIcon
              className={`h-8 ${
                open ? "w-auto" : "hidden"
              } mb-10 fill-violet-500`}
            /> */}
            <img
              src={LogoIcon}
              alt="logo"
              className={`h-8 ${open ? "w-auto" : "hidden"} mb-5`}
            />
            <ArrowLeftIcon
              className={`h-6 w-auto mb-10 lg:hidden`}
              onClick={handleToggleSidebar}
            />
          </div>
          {allSectionName.map((sectionName, sectionIndex) => (
            <div key={sectionName} className={`${!open && "mb-2 "} `}>
              {menus.some((menu) => menu.sectionName === sectionName) && (
                <h2
                  className={`text-gray-400 uppercase dark:text-gray-500 text-xs font-semibold ml-3 mb-3 ${
                    !open && "hidden"
                  } ${sectionIndex !== 0 ? "mt-7" : ""}`}
                >
                  {sectionName}
                </h2>
              )}
              {menus.map((menu, index) => {
                const IconComponent = iconMapping[menu.icon];
                const createFunction = functionMapping[menu.createFunction];

                // Ensure we return valid JSX or null for each iteration
                if (menu.sectionName === sectionName) {
                  return (
                    <div
                      key={menu.title}
                      className={`font-medium ${
                        index === menus.length - 1 && "mb-52"
                      } ${
                        pathname.includes(menu.href)
                          ? "menu-active-gradient rounded-lg"
                          : ""
                      } `}
                    >
                      <NavLink
                        to={menu.openInNewTab ? "#" : menu.href}
                        end
                        onClick={(e) => {
                          if (menu.openInNewTab) {
                            e.preventDefault();
                            window.open(menu.href, "_blank");
                          }
                        }}
                        target={menu.openInNewTab ? "_blank" : undefined}
                        rel={
                          menu.openInNewTab ? "noopener noreferrer" : undefined
                        }
                        className={({ isActive }) => {
                          const isHighlighted =
                            (isActive && !menu.openInNewTab) ||
                            pathname.includes(menu.href);
                          return `text-gray-400 dark:text-gray-500 ${
                            isHighlighted ? "text-violet-500" : ""
                          }`;
                        }}
                      >
                        <li
                          onClick={() => handleToggleSubmenu(index)}
                          className="group w-full text-sm flex items-center justify-center gap-x-3 cursor-pointer pl-4 pr-3 py-2 rounded-md"
                        >
                          <span
                            className={`text-2xl block float-left `}
                            title={menu.title}
                          >
                            <IconComponent className="h-5 w-5 shrink-0" />
                          </span>
                          <span
                            className={`text-sm ml-1 flex-1 transform duration-1000 ease-in-out text-gray-800 dark:text-gray-100 ${
                              !open && "hidden"
                            }`}
                            onClick={() => handleToggleSidebarOnMobile(menu)}
                          >
                            {menu.title}
                          </span>
                          {menu.submenu && open && (
                            <ChevronRightIcon
                              className={`text-sm text-gray-400 h-5 w-5 shrink-0 -rotate-90 ${
                                submenuStates[index]?.isOpen ? "rotate-90" : ""
                              }`}
                              onClick={() => handleToggleSubmenu(index)}
                            />
                          )}
                        </li>
                      </NavLink>
                      {/* SubMenu */}
                      {menu.submenu && submenuStates[index]?.isOpen && open && (
                        <ul>
                          {/* If create from Sidebar Using input box */}
                          {menu.createButton && (
                            <div>
                              <li className="py-1 cursor-pointer rounded-md">
                                <CreateNew
                                  placeholder={menu.placeholder}
                                  buttonName={menu.buttonName}
                                  createFunction={createFunction}
                                  menuTitle={menu.title}
                                  editable={menu.editable}
                                  navigateSuccess={menu.navigateSuccess}
                                  navigateFail={menu.navigateFail}
                                />
                              </li>
                            </div>
                          )}
                          {menu.submenuItems.map((submenuItem) => (
                            <div key={submenuItem.name}>
                              <NavLink
                                to={submenuItem.href}
                                className="text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                                onClick={() => handleToggleSidebarOnMobile()}
                              >
                                <li className="text-sm transition duration-150 flex items-center gap-x-4 overflow-hidden cursor-pointer p-2 pl-[3.25rem] rounded-md ">
                                  {submenuItem.name}
                                </li>
                              </NavLink>
                            </div>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                }
                return null; // Explicitly return null for unmatched items
              })}
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SideBar;
