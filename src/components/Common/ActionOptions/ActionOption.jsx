import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

const ActionOption = ({ userNavigation, actionID, align }) => {
  return (
    <>
      <Menu as="div" className="relative">
        <div className="">
          <Menu.Button
            className="relative "
            onClick={(event) => event.stopPropagation()}
          >
            <EllipsisHorizontalIcon aria-hidden="true" className="h-7 w-7" />
          </Menu.Button>
        </div>
        <Transition
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          {/* absolute right-0 z-50 mt-1 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none */}
          <Menu.Items
            className={`origin-top-right z-[100] absolute top-full min-w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 py-1.5 rounded-lg shadow-lg overflow-hidden mt-1 ${
              align === "right" ? "right-0" : "left-0"
            }`}
          >
            {userNavigation.map((item) => (
              <Menu.Item key={item?.name}>
                {({ active }) => (
                  <Link
                    to={item.href}
                    className={`font-medium text-sm text-gray-600 dark:text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 flex py-1 px-3 `}
                    onClick={() => item?.action(actionID)}
                  >
                    {item?.name}
                  </Link>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};

export default ActionOption;
