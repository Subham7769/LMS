import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../../redux/Slices/sidebarSlice';
import { PowerIcon, ArrowLeftEndOnRectangleIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/react/20/solid';
import { resetLoanOfferFields } from '../../../redux/Slices/B2CLoansSlice';
import LoginModal from '../LoginModal/LoginModal';

const B2CHeader = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { open } = useSelector((state) => state.sidebar);
    const { loanOfferFields } = useSelector((state) => state.B2CLoans);
    const { uid } = loanOfferFields;
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (uid) {
            setShowModal(false)
        }
    }, [uid]);


    const handleToggleSidebar = () => {
        dispatch(toggleSidebar());
    };

    const handleLogOut = () => {
        dispatch(resetLoanOfferFields())
        navigate("/customer/loan-application")
        console.log("/customer/loan-application")
    }
    return (
        <>
            <div className={`flex justify-between align-middle ${pathname.includes("/loan-application") ? "md:w-[50%]" : "w-full"}  h-16 md:mb-0 bg-linear-to-tr from-blue-600 to-blue-500 z-0`} aria-hidden="true">

                <div className='flex'>
                    {/* Hamburger Icon for Mobile View*/}
                    <div className="flex shrink-0 items-center justify-center md:hidden md:px-5 ml-4">
                        {!open && pathname.includes("/loan-offers") && (
                            <Bars3Icon
                                className={`h-8 w-auto text-white`}
                                onClick={handleToggleSidebar}
                            />
                        )}
                    </div>

                    {/* Site branding */}
                    <div className="shrink-0 flex items-center justify-center sm:px-6 px-4 lg:px-8 ">
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

                <div
                    className="group relative flex shrink-0 items-center justify-center px-8 cursor-pointer"
                    // title={uid ? "Logout" : "Login"}
                    onClick={uid ? handleLogOut : () => setShowModal(true)}
                >
                    {/* Hover Text */}
                    <span className="absolute left-[-40px] text-sm whitespace-nowrap font-medium text-white bg-black/70 px-3 py-1 rounded-lg opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out z-10">
                        {uid ? "Logout" : "Login"}
                    </span>

                    {/* Icon */}
                    {uid ? (
                        <ArrowRightStartOnRectangleIcon
                            className="h-8 w-auto font-extrabold text-red-500 hover:text-red-600 hover:bg-red-100 hover:p-1 rounded-full transition-all ease-in-out duration-300"
                        />
                    ) : (
                        <ArrowLeftEndOnRectangleIcon
                            className="h-8 w-auto font-extrabold text-white hover:text-blue-500 hover:bg-blue-100 hover:p-1 rounded-full transition-all ease-in-out duration-300"
                        />
                    )}
                </div>

            </div>
            <LoginModal isOpen={showModal} onClose={() => setShowModal(false)} />
        </>
    )
}

export default B2CHeader