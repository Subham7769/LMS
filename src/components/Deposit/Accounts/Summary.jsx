import React from "react";
import ContainerTile from "../../Common/ContainerTile/ContainerTile";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { convertDate } from "../../../utils/convertDate";

const Summary = () => {
  const { userID } = useParams();
  const { accountDetails, loading, error } = useSelector(
    (state) => state.accounts
  );

  const InfoRow = ({ label, value }) => (
    <div className="py-2 grid grid-cols-3">
      <div className="font-semibold">{label}:</div>
      <div className="col-span-2">{value || "N/A"}</div>
    </div>
  );
  return (
    <>
      <ContainerTile>
        <div className="flex items-center gap-5">
          <img
            className="rounded-full w-12"
            src="https://lmscarbon.com/assets/index.png"
            alt=""
          />
          <div className="text-xl font-semibold">User Id: {userID}</div>
        </div>
      </ContainerTile>
      {accountDetails.map((acDetail) => (
        <ContainerTile className={"mt-5"} loading={loading}>
          <div className="text-sm mb-2 font-semibold">Account Summary</div>
          <div className="grid grid-cols-2 gap-4 text-[14px] pb-2">
            <InfoRow
              label="Account Holder Name"
              value={`${acDetail?.accountHolderName}`}
            />
            <InfoRow label="Account Number" value={acDetail?.accountNumber} />
            <InfoRow label="Account Type" value={acDetail?.accountType} />
            <InfoRow label="Balance Amount" value={acDetail?.balanceAmount} />
            <InfoRow label="Min Balance" value={acDetail?.minimumBalance} />
            <InfoRow
              label="Daily Withdrawal Limit"
              value={acDetail?.dailyWithdrawalLimit}
            />
            <InfoRow
              label="Max Deposit Limit"
              value={acDetail?.maxDepositLimit}
            />
            <InfoRow
              label="Daily Deposit Limit"
              value={acDetail?.dailyDepositLimit}
            />
            <InfoRow
              label="Withdrawal Limit"
              value={acDetail?.withdrawalTransactionLimit}
            />

            <InfoRow
              label="Min Balance To Apply Interest"
              value={acDetail?.minimumBalanceToApplyInterest}
            />
            <InfoRow
              label="Account Currency"
              value={acDetail?.accountCurrency}
            />
            <InfoRow label="Status" value={acDetail?.status} />
            <InfoRow
              label="Creation Date"
              value={convertDate(acDetail?.creationDate)}
            />
            <InfoRow
              label="Expire Date"
              value={convertDate(acDetail?.expireDate)}
            />
          </div>
        </ContainerTile>
      ))}
    </>
  );
};

export default Summary;
