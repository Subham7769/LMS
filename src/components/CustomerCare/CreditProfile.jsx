// src/components/CreditProfile/CreditProfile.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBorrowerData } from '../../redux/Slices/borrowerSlice';
import LoadingState from '../LoadingState/LoadingState';
import ListTable from '../Common/ListTable/ListTable';
import ContainerTile from '../Common/ContainerTile/ContainerTile';
import { useParams } from 'react-router-dom';
import { InformationCircleIcon } from '@heroicons/react/20/solid';

const CreditProfile = () => {
  const dispatch = useDispatch();
  const { subID } = useParams();

  const { creditProfile,
    loadingCreditProfile,
    errorCreditProfile,
    loanOffersCalculations,
    loadingLoanOffersCalculations,
    errorLoanOffersCalculations,
    loading,
    error } = useSelector((state) => state.customerCare);

  useEffect(() => {
    dispatch(fetchBorrowerData({ subID, url: '/credit-profile' }));
    dispatch(fetchBorrowerData({ subID, url: '/loan-offers-calculations' }));
  }, [dispatch, subID]);

  const {
    simahLiabilitiesTotalMontllyInstallments,
    adjustedEMI,
    creditScore,
    simahScore,
    gosiFullWage,
    netIncome,
    eligibleDBR,
    disposableIncome,
    eligibleEMI,
    propensityToPay,
    bareMinimumExpenses,
  } = loanOffersCalculations;

  const DataWithIcon = ({ value, name }) => {
    return (
      <div className="flex gap-2 py-2 text-sm items-center">
        <div
          className="w-60 2xl:w-80 cursor-pointer flex items-center text-[14px]"
          title={name}
        >
          {name}
          <InformationCircleIcon className=" h-4 w-4 ml-2 text-gray-500 hover:text-gray-800" />
          :
        </div>
        <div className='text-[14px]'>{value}</div>
      </div>
    );
  };

  const DataWithoutIcon = ({ value, name }) => {
    return (
      <div className="flex gap-2 py-2 text-sm items-center text-[14px]">
        <div className="w-60 2xl:w-80 text-[14px]">{name} :</div>
        <div className='text-[14px]'>{value}</div>
      </div>
    );
  };

  // Conditional rendering starts after hooks have been defined
  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col gap-5">
      {
        loadingCreditProfile || loadingLoanOffersCalculations ? <LoadingState /> :
          <>
            <ListTable
              ListName="Credit Profile Data"
              ListHeader={['No.', 'Product Name', 'Total TCL', 'Net TCL']}
              ListItem={creditProfile.map((cp, index) => ({
                no: index + 1,
                projectName: cp.loanProductName,
                totalTCL: cp.totalTCL ? cp.totalTCL : 'N/A',
                netTCL: cp.netTCL,
              }))}
              Divider={true}
            />
            <ContainerTile className="grid grid-cols-2 gap-2">
                  <DataWithIcon name="Consumer CB liabilities" value={simahLiabilitiesTotalMontllyInstallments?.consumer} />
                  <DataWithIcon name="GDBR (Without MTG) CB liabilities" value={simahLiabilitiesTotalMontllyInstallments?.gdbrWithoutMTG} />
                  <DataWithIcon name="GDBR (With MTG) CB liabilities" value={simahLiabilitiesTotalMontllyInstallments?.gdbrWithMTG} />
                  <DataWithIcon name="Total calculated existing CB liabilities" value={simahLiabilitiesTotalMontllyInstallments?.gdbrWithMTG} />
                  <DataWithoutIcon name="Adjustment for Disposable Income" value={adjustedEMI} />
                  <DataWithoutIcon name="Credit Bureau Score" value={simahScore} />
                  <DataWithoutIcon name="Derived Credit Score" value={creditScore} />
                  <DataWithoutIcon name="Gross income" value={gosiFullWage} />
                  <DataWithoutIcon name="Net income" value={netIncome} />
                  <DataWithIcon name="DBR" value={eligibleDBR} />
                  <DataWithoutIcon name="Disposal income" value={disposableIncome?.toFixed(2)} />
                  <DataWithoutIcon name="Maximum EMI amount" value={eligibleEMI?.toFixed(2)} />
                  <DataWithoutIcon name="Propensity to pay"  value={propensityToPay?.toFixed(2)} />
                  <DataWithoutIcon name="Bare Minimum Expenses" value={bareMinimumExpenses} />
              <div className="text-xs text-gray-400 mt-3 -mb-5 col-span-2">
                *CB - Credit Bureau, *GDBR - Gross Debt Burden Ratio, *MTG - Mortgage
              </div>
            </ContainerTile>
          </>
      }

    </div>
  );
};

export default CreditProfile;
