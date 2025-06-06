import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../../redux/Slices/sidebarSlice';

const B2CHeader = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { open } = useSelector((state) => state.sidebar);

    const handleToggleSidebar = () => {
        console.log("first")
        dispatch(toggleSidebar());
    };


    return (

        <div className="flex  h-16 md:mb-0 bg-linear-to-tr from-blue-600 to-blue-500 z-0" aria-hidden="true">

            {/* Hamburger Icon for Mobile View*/}
            <div className="flex shrink-0 items-center justify-center md:hidden px-5">
                {!open &&  pathname.includes("/loan-offers")  && (
                    <Bars3Icon
                        className={`h-8 w-auto text-white`}
                        onClick={handleToggleSidebar}
                    />
                )}
            </div>

            {/* Site branding */}
            <div className="shrink-0 mr-4 flex items-center justify-center px-4 sm:px-6 lg:px-8 ">
                {/* Logo */}
                <a className="block" onClick={() => navigate("/customer/home")} aria-label="Cruip">
                    <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
                        <g fillRule="nonzero" fill="none">
                            <g className="fill-blue-50" transform="translate(3 3)">
                                <circle cx="5" cy="5" r="5" />
                                <circle cx="19" cy="5" r="5" />
                                <circle cx="5" cy="19" r="5" />
                                <circle cx="19" cy="19" r="5" />
                            </g>
                            <g className="fill-sky-300">
                                <circle cx="15" cy="5" r="5" />
                                <circle cx="25" cy="15" r="5" />
                                <circle cx="15" cy="25" r="5" />
                                <circle cx="5" cy="15" r="5" />
                            </g>
                        </g>
                    </svg>
                </a>
            </div>

        </div>
    )
}

export default B2CHeader