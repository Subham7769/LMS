import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";


const ActionOption = ({ userNavigation, actionID }) => {

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
          <Menu.Items className="absolute right-0 z-50 mt-1 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {userNavigation.map((item) => (
              <Menu.Item key={item?.name}>
                {({ active }) => (
                  <Link
                    to={item.href}
                    className={`block px-4 py-2 text-sm ${
                      active
                        ? "bg-background-light-secondary text-gray-700"
                        : "text-gray-700"
                    }`}
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
