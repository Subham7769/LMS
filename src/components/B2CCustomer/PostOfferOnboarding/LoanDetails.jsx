import React, { useEffect } from 'react'
import B2CShimmerTable from '../B2CShimmerTable/B2CShimmerTable'
import B2CExpandableTable from '../B2CExpandableTable/B2CExpandableTable'
import { useDispatch, useSelector } from 'react-redux';
import { getFullLoanDetails } from "../../../redux/Slices/B2CLoansSlice";
import { convertDate } from "../../../utils/convertDate";
import { toast } from 'react-toastify';

const LoanDetails = () => {
    const dispatch = useDispatch();
    const { loading, fullLoanDetails, personalBorrower } = useSelector((state) => state.B2CLoans);
    const borrowerId = personalBorrower?.cachedDetails?.cachedBorrowerId;
    const loanId = personalBorrower?.cachedDetails?.cachedLoanId;

    console.log(" borrowerId, loanId Value :", { borrowerId, loanId });


    const shouldFetch = borrowerId?.trim() && loanId?.trim()

    useEffect(() => {
        if (!shouldFetch) return;

        console.log("Fetching loan details:", { borrowerId, loanId });

        dispatch(getFullLoanDetails({ uid: borrowerId, loanId }))
            .unwrap()
            .catch((err) => {
                toast.error("Failed to fetch loan details.");
                console.error(err);
            });
    }, [shouldFetch, borrowerId, loanId, dispatch]);

    const ShimmerTable = () => {
        return (
            <div className="grid grid-cols-4 gap-4 animate-pulse">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
            </div>
        );
    };


    const columns = [
        { label: "EMI No.", field: "emiNo" },
        { label: "Date", field: "installmentDate" },
        { label: "Interest Value", field: "interestValue" },
        { label: "Amount", field: "amount" },
        { label: "Status", field: "status" },
    ];

    if (loading) {
        return (
            <div className='flex flex-col gap-2 p-5 w-full shadow-[-8px_0_8px_-4px_rgba(96,165,250,0.3)] min-h-[calc(100vh-4rem)]  bg-linear-to-tr from-blue-100 to-blue-500  md:w-1/2'>
                <p className='text-center py-2 font-bold text-3xl text-white '>{"-"}</p>
                <div className="grid grid-cols-1 gap-2  shadow-md">
                    {/* General Info Section */}
                    <div className="p-6 bg-white border border-gray-200 rounded-lg">
                        <h2 className="text-xl font-semibold text-gray-800 border-l-4 border-blue-500 pl-3">
                            General Info
                        </h2>

                        <div className='mt-4 grid grid-cols-1 gap-x-4 gap-y-6'>
                            <ShimmerTable />
                            <ShimmerTable />
                            <ShimmerTable />
                            <ShimmerTable />
                        </div>

                    </div>

                    {/* Financials Section */}
                    <div className="p-6 border-t bg-white border border-gray-200 rounded-lg">
                        <h2 className="text-xl font-semibold text-gray-800 border-l-4 border-blue-500 pl-3">
                            Financials
                        </h2>
                        <div className='mt-4 grid grid-cols-1  gap-x-4 gap-y-6'>
                            <ShimmerTable />
                            <ShimmerTable />
                            <ShimmerTable />
                            <ShimmerTable />
                        </div>
                    </div>
                </div>

                <div className="p-6 border-t bg-white border border-gray-200 rounded-lg">
                    <h2 className="text-xl font-semibold text-gray-800 border-l-4 border-blue-500 pl-3">
                        EMI Schedule
                    </h2>
                    <div className='mt-4 grid grid-cols-1  gap-x-4 gap-y-6'>
                        <ShimmerTable />
                        <ShimmerTable />
                        <ShimmerTable />
                        <ShimmerTable />
                    </div>
                </div>
            </div>)
    }

    console.log(fullLoanDetails)



    const today = new Date();
    const nextDueDate = fullLoanDetails?.installments?.find(
        (i) => new Date(i.installmentDate) > today
    )?.installmentDate;

    const dataWithEmiNo = fullLoanDetails?.installments?.map((item, index) => ({
        ...item,
        emiNo: index + 1,
        installmentDate: convertDate(item.installmentDate),
        status: item.paid ? "Paid" : "Unpaid",
    })) || []; // ✅ fallback to empty array

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(fullLoanDetails.loanId);
            toast.success("ID was copied successfully!");
        } catch (err) {
            toast.error("The ID was not copied!");
        }
    };

    return (
        <div className='flex flex-col gap-2 p-5 w-full shadow-[-8px_0_8px_-4px_rgba(96,165,250,0.3)] min-h-[calc(100vh-4rem)]  bg-linear-to-tr from-blue-100 to-blue-500  md:w-1/2'>
            <p className='text-center py-2 font-bold text-3xl text-white '>{fullLoanDetails?.loanType ?? "-"}</p>
            <div className="grid grid-cols-1 gap-2  shadow-md">
                {/* General Info Section */}
                <div className="p-6 bg-white border border-gray-200 rounded-lg">
                    <h2 className="text-xl font-semibold text-gray-800 border-l-4 border-blue-500 pl-3">
                        General Info
                    </h2>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                        {/* Loan ID */}
                        <div>
                            <p className="text-sm text-gray-500">Loan ID</p>
                            <div className="flex items-center mt-1">
                                <p className="font-medium text-gray-900">{fullLoanDetails?.loanId ?? "-"}</p>
                                <button
                                    onClick={() => copyToClipboard()}
                                    className="ml-2 px-2 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded hover:bg-blue-100 focus:outline-none"
                                >
                                    Copy
                                </button>
                            </div>
                        </div>
                        {/* Total Amount */}
                        <div>
                            <p className="text-sm text-gray-500">Total Amount</p>
                            <p className="mt-1 font-medium text-gray-900">
                                {fullLoanDetails?.totalAmount?.toLocaleString() ?? "-"}
                            </p>
                        </div>
                        {/* Release Date */}
                        <div>
                            <p className="text-sm text-gray-500">Release Date</p>
                            <p className="mt-1 font-medium text-gray-900">
                                {convertDate(fullLoanDetails?.releaseDate)}
                            </p>
                        </div>
                        {/* Next Due Date */}
                        <div>
                            <p className="text-sm text-gray-500">Next Due Date</p>
                            <p className="mt-1 font-medium text-gray-900">
                                {fullLoanDetails?.nextDueDate
                                    ? convertDate(fullLoanDetails?.nextDueDate)
                                    : '-'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Financials Section */}
                <div className="p-6 border-t bg-white border border-gray-200 rounded-lg">
                    <h2 className="text-xl font-semibold text-gray-800 border-l-4 border-blue-500 pl-3">
                        Financials
                    </h2>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                        {/* Wallet Balance */}
                        <div>
                            <p className="text-sm text-gray-500">Wallet Balance</p>
                            <p className="mt-1 font-medium text-gray-900">
                                {fullLoanDetails?.walletBalance?.toLocaleString() ?? "-"}
                            </p>
                        </div>
                        {/* Remaining Principal */}
                        <div>
                            <p className="text-sm text-gray-500">Remaining Principal</p>
                            <p className="mt-1 font-medium text-gray-900">
                                {fullLoanDetails?.remainingPrincipal?.toLocaleString() ?? "-"}
                            </p>
                        </div>
                        {/* Remaining Interest */}
                        <div>
                            <p className="text-sm text-gray-500">Remaining Interest</p>
                            <p className="mt-1 font-medium text-gray-900">
                                {fullLoanDetails?.remainingInterest?.toLocaleString() ?? "-"}
                            </p>
                        </div>
                        {/* XC Closing Amount */}
                        <div>
                            <p className="text-sm text-gray-500">XC Closing Amount</p>
                            <p className="mt-1 font-medium text-gray-900">
                                {fullLoanDetails?.xcClosingAmount?.toLocaleString() ?? "-"}
                            </p>
                        </div>
                        {/* Total Outstanding */}
                        <div>
                            <p className="text-sm text-gray-500">Total Outstanding</p>
                            <p className="mt-1 font-medium text-gray-900">
                                {fullLoanDetails?.totalOutstanding?.toLocaleString() ?? "-"}
                            </p>
                        </div>
                    </div>
                </div>

            </div>

            <div className="overflow-hidden max-h-[400px] rounded-lg">
                <B2CExpandableTable
                    columns={columns}
                    data={dataWithEmiNo}
                    defaultClass={false}
                    loading={loading}
                    className={
                        "bg-white dark:bg-gray-800 shadow-md border dark:border-gray-700 relative "
                    }
                />
            </div>
        </div>
    )
}

export default LoanDetails