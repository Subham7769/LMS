import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { useDispatch, useSelector } from 'react-redux';
import {
  toggleSidebar,
  setSubmenuStates,
  fetchRACData,
  fetchDBRData,
  fetchBEData,
  fetchProjectData,
  fetchProductData,
  fetchCreditScoreEqData,
  fetchRulePolicyData,
  fetchTCLData,
  fetchProdGroupData,
  fetchRecoveryData,
  fetchCreditScoreEligibleTenureData,
  setMenus
} from '../../../redux/Slices/sidebarSlice';
import {
  RectangleGroupIcon,
  ArrowPathRoundedSquareIcon,
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
  ClipboardDocumentListIcon, CreditCardIcon, NoSymbolIcon, HandRaisedIcon, UserGroupIcon
} from "@heroicons/react/24/outline";

import { createNewRac } from "../../../utils/createNewRac";
import { createNewProduct } from "../../../utils/createNewProduct";
import { createNewProject } from "../../../utils/createNewProject";
import { createNewRecovery } from "../../../utils/createNewRecovery";
import { createNewProductGroup } from "../../../utils/createNewProductGroup";
import { createNewDBC } from "../../../utils/createNewDBC";
import { createNewBE } from "../../../utils/createNewBE";
import { createNewCreditScoreEq } from "../../../utils/createNewCreditScoreEq";
import { createNewRulePolicy } from "../../../utils/createNewRulePolicy";
import { createNewTCL } from "../../../utils/createNewTCL";
import { createNewCreditScoreET } from "../../../utils/createNewCreditScoreET";

import CreateNew from '../CreateNew/CreateNew';

const SideBar = () => {
  const dispatch = useDispatch();
  const { menus, loading, error, submenuStates, open } = useSelector((state) => state.sidebar);

  const iconMapping = {
    HomeIcon,
    ClipboardDocumentCheckIcon,
    ArrowPathRoundedSquareIcon,
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
    UserGroupIcon
  };

  const functionMapping = {
    createNewRac,
    createNewProduct,
    createNewProject,
    createNewRecovery,
    createNewProductGroup,
    createNewDBC,
    createNewBE,
    createNewCreditScoreEq,
    createNewRulePolicy,
    createNewTCL,
    createNewCreditScoreET,
  }

  useEffect(() => {
    localStorage.setItem("submenuStates", JSON.stringify(submenuStates));
  }, [submenuStates]);

  useEffect(() => {
    const roleName = localStorage.getItem("roleName");
    console.log(roleName)
    switch (roleName) {
      case 'ROLE_SUPERADMIN':
        dispatch(fetchRACData());
        dispatch(fetchDBRData());
        dispatch(fetchBEData());
        dispatch(fetchProjectData());
        dispatch(fetchProductData());
        dispatch(fetchCreditScoreEqData());
        dispatch(fetchRulePolicyData());
        dispatch(fetchTCLData());
        dispatch(fetchProdGroupData());
        dispatch(fetchRecoveryData());
        dispatch(fetchCreditScoreEligibleTenureData());
        break;

      case 'ROLE_ADMIN':
        dispatch(fetchRACData());
        dispatch(fetchDBRData());
        dispatch(fetchBEData());
        dispatch(fetchProjectData());
        dispatch(fetchProductData());
        dispatch(fetchCreditScoreEqData());
        dispatch(fetchRulePolicyData());
        dispatch(fetchTCLData());
        dispatch(fetchProdGroupData());
        dispatch(fetchRecoveryData());
        dispatch(fetchCreditScoreEligibleTenureData());
        break;

      case 'ROLE_CUSTOMER_CARE_USER':
        
        break;

      case 'ROLE_CREDITOR_ADMIN':
        dispatch(fetchRACData());
        dispatch(fetchDBRData());
        dispatch(fetchBEData());
        dispatch(fetchProjectData());
        dispatch(fetchProductData());
        dispatch(fetchCreditScoreEqData());
        dispatch(fetchRulePolicyData());
        dispatch(fetchTCLData());
        dispatch(fetchProdGroupData());
        dispatch(fetchRecoveryData());
        dispatch(fetchCreditScoreEligibleTenureData());
        break;

      case 'ROLE_CUSTOMER_CARE_MANAGER':
        break;

      case 'ROLE_TICKETING_USER':
        break;

      case 'ROLE_TICKETING_SUPERVISOR':
        break;

      case 'ROLE_TECHNICAL':
        break;

      default:
        break;
    }

    dispatch(setMenus({ roleName }))
  }, [
    dispatch,
  ]);


  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const handleToggleSubmenu = (index) => {
    const updatedStates = submenuStates.map((state, i) =>
      i === index ? { ...state, isOpen: !state.isOpen } : state
    );
    dispatch(setSubmenuStates(updatedStates));
  };


  return (
    <div
      className={`-mr-1 relative overflow-y-auto h-screen scrollbar-none bg-white flex pl-1 transform duration-1000 ease-in-out ${open ? 'w-56' : 'w-14'}`}
    >
      {/* Collapse Button */}
      <button onClick={handleToggleSidebar} className={`z-30 absolute right-1 top-56 bg-indigo-500 h-16 w-4 rounded-full p-0`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 text-white transition-transform duration-300 ${open ? 'rotate-180' : ''
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
      <ul className={`pt-2 pr-1 border-r h-auto ${open ? 'w-52' : 'w-10'}  overflow-y-auto scrollbar-none border-gray-200`}>
        {/* Main Menu */}
        {menus.map((menu, index) => {
          const IconComponent = iconMapping[menu.icon];
          const createFunction = functionMapping[menu.createFunction];
          // console.log(menu.title + "-> "+menu.createFunction)
          return (
            <div key={menu.title} className={`${index === menus.length - 1 && 'mb-52'}`}>
              <NavLink to={menu.href} className="text-gray-500">
                <li
                  onClick={() => handleToggleSubmenu(index)}
                  className="w-full text-sm flex items-center gap-x-2 cursor-pointer p-2 py-1.5 rounded-md hover:bg-indigo-100 hover:text-indigo-600"
                >
                  <span className="text-2xl block float-left">
                    <IconComponent className="h-5 w-5 shrink-0" />
                  </span>
                  <span
                    className={`text-sm flex-1 transform duration-1000 ease-in-out ${!open && 'hidden'}`}
                  >
                    {menu.title}
                  </span>
                  {menu.submenu && open && (
                    <ChevronRightIcon
                      className={`text-sm text-gray-400 h-5 w-5 shrink-0 ${submenuStates[index]?.isOpen ? 'rotate-90' : ''
                        }`}
                      onClick={() => handleToggleSubmenu(index)}
                    />
                  )}
                </li>
              </NavLink>
              {/* SubMenu */}
              {menu.submenu && submenuStates[index]?.isOpen && open && (
                <ul>
                  {
                    // if create from Side bar Using input box
                    menu.createButton ? (
                      <div>
                        <li className="py-1 cursor-pointer rounded-md hover:bg-gray-100 hover:text-indigo-600">
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
                    ) : null
                  }
                  {menu.submenuItems.map((submenuItem) => (
                    <div key={submenuItem.name}>
                      <NavLink to={submenuItem.href} className="text-gray-500">
                        <li className="text-xs flex items-center  gap-x-4 overflow-hidden cursor-pointer p-2 px-6 rounded-md hover:bg-gray-100 hover:text-indigo-600">
                          {submenuItem.name}
                        </li>
                      </NavLink>
                    </div>
                  ))}
                </ul>
              )}
            </div>
          )
        })}
      </ul>
    </div>
  );
};

export default SideBar;
