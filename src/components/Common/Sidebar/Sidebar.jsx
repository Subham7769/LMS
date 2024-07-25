import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import useRACInfo from "../../../utils/useRACInfo";
import useAllProjectInfo from "../../../utils/useAllProjectInfo";
import useProductInfo from "../../../utils/useProductInfo";
import { MenusInitial } from "../../../data/MenuData";
import CreateNew from "../CreateNew/CreateNew";
import useDBInfo from "../../../utils/useDBInfo";
import useBEInfo from "../../../utils/useBEInfo";
import useCreditScoreEq from "../../../utils/useCreditScoreEq";
import useRulePolicy from "../../../utils/useRulePolicy";
import useTCLInfo from "../../../utils/useTCLInfo";
import useProdGroupInfo from "../../../utils/useProdGroupInfo";
import useRecoveryInfo from "../../../utils/useRecoveryInfo";

const SideBar = () => {
  const [open, setOpen] = useState(
    JSON.parse(localStorage.getItem("sidebarOpen")) ?? true
  );
  const [Menus, setMenus] = useState(MenusInitial);
  const RACDataInfo = useRACInfo();
  const ProjectDataInfo = useAllProjectInfo();
  const ProductDataInfo = useProductInfo();
  const DBCData = useDBInfo();
  const BEData = useBEInfo();
  const CreditScoreEqInfo = useCreditScoreEq();
  const RulePolicyInfo = useRulePolicy();
  const TCLInfo = useTCLInfo();
  const ProdGroupInfo = useProdGroupInfo();
  const RecoveryInfo = useRecoveryInfo();

  const [submenuStates, setSubmenuStates] = useState(
    JSON.parse(localStorage.getItem("submenuStates")) ??
      Menus.map((menu) => (menu.submenu ? { isOpen: false } : null))
  );

  useEffect(() => {
    setMenus((prevMenus) =>
      prevMenus.map((menu) => {
        if (menu.title === "RAC") {
          return { ...menu, submenuItems: RACDataInfo };
        }
        if (menu.title === "DBR Config") {
          return { ...menu, submenuItems: DBCData };
        }
        if (menu.title === "Blocked Employer") {
          return { ...menu, submenuItems: BEData };
        }
        if (menu.title === "Project") {
          return { ...menu, submenuItems: ProjectDataInfo };
        }
        if (menu.title === "Product") {
          return { ...menu, submenuItems: ProductDataInfo };
        }
        if (menu.title === "Credit Score") {
          return { ...menu, submenuItems: CreditScoreEqInfo };
        }
        if (menu.title === "Rule Policy") {
          return { ...menu, submenuItems: RulePolicyInfo };
        }
        if (menu.title === "TCL") {
          return { ...menu, submenuItems: TCLInfo };
        }
        if (menu.title === "Product Group") {
          return { ...menu, submenuItems: ProdGroupInfo };
        }
        if (menu.title === "Recovery") {
          return { ...menu, submenuItems: RecoveryInfo };
        }
        return menu;
      })
    );
  }, [
    RACDataInfo,
    DBCData,
    ProjectDataInfo,
    ProductDataInfo,
    BEData,
    CreditScoreEqInfo,
    RulePolicyInfo,
    TCLInfo,
    ProdGroupInfo,
    RecoveryInfo,
  ]);

  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(open));
  }, [open]);

  useEffect(() => {
    localStorage.setItem("submenuStates", JSON.stringify(submenuStates));
  }, [submenuStates]);

  const toggleSidebar = () => setOpen(!open);

  const toggleSubmenu = (index) => {
    setSubmenuStates(
      submenuStates.map((state, i) =>
        i === index && state ? { isOpen: !state.isOpen } : state
      )
    );
  };

  return (
    <div
      id="SideBarId"
      className={`z-[4] fixed bg-white h-full top-0 left-0 border-r border-gray-200 text-left flex flex-col pl-2 transform duration-1000 ease-in-out ${
        open ? "w-56" : "w-14"
      }`}
    >
      {/* logo */}
      <div className="flex h-16 shrink-0 items-center">
        <img
          className={`h-8 ${open ? "w-auto" : "w-10 h-auto"}`}
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
      </div>

      {/* Collapse Button */}
      <button onClick={toggleSidebar} className="flex justify-end">
        <div className="-right-3 absolute top-60">
          <div className="bg-indigo-600 h-6 w-6 rounded-full p-1">
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
          </div>
        </div>
      </button>

      <ul className="pt-2 pr-2 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-white scrollbar-track-white">
        {/* Main Menu */}
        {Menus.map((menu, index) => (
          <div key={menu.title}>
            <NavLink to={menu.href} className="text-gray-500">
              <li
                onClick={() => toggleSubmenu(index)}
                className="w-full text-sm flex items-center gap-x-2 cursor-pointer p-2 py-1.5 rounded-md hover:bg-gray-100 hover:text-indigo-600"
              >
                <span className="text-2xl block float-left">
                  <menu.icon className="h-5 w-5 shrink-0" />
                </span>
                <span
                  className={`text-sm flex-1 duration-200 ${!open && "hidden"}`}
                >
                  {menu.title}
                </span>
                {menu.submenu && open && (
                  <ChevronRightIcon
                    className={`text-sm text-gray-400 h-5 w-5 shrink-0 ${
                      submenuStates[index]?.isOpen ? "rotate-90" : ""
                    }`}
                    onClick={() => toggleSubmenu(index)}
                  />
                )}
              </li>
            </NavLink>
            {/* SubMenu */}
            {menu.submenu && submenuStates[index]?.isOpen && open && (
              <ul>
                {
                  //if create from Side bar Using input box
                  menu.createButton ? (
                    <div>
                      <li className="px-2 py-1 cursor-pointer rounded-md hover:bg-gray-100 hover:text-indigo-600">
                        <CreateNew
                          placeholder={menu.placeholder}
                          buttonName={menu.buttonName}
                          createFunction={menu.createFunction}
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
                      <li className="text-xs flex items-center gap-x-4 cursor-pointer p-2 px-8 rounded-md hover:bg-gray-100 hover:text-indigo-600">
                        {submenuItem.name}
                      </li>
                    </NavLink>
                  </div>
                ))}
              </ul>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
