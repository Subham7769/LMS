import React, { useState } from "react";
import {
  ClockIcon,
  XMarkIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
const StatusPill = ({ rule }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex gap-3 align-middle">
      <div
        className={`px-2 w-fit py-1 rounded-full text-sm font-semibold ${
          rule.status === "CREATED" && !rule.needDeleteApprove
            ? rule.history.updateBy
              ? "bg-yellow-100 text-yellow-700" // Modified (Pending Approval)
              : "bg-green-100 text-green-700" // Newly Added
            : rule.status === "REJECTED" ||
              (rule.status === "APPROVED" && rule.needDeleteApprove) ||
              (rule.status === "CREATED" && rule.needDeleteApprove)
            ? "bg-red-100 text-red-700" // Rejected or requires delete approval
            : rule.status === "APPROVED" && !rule.needDeleteApprove
            ? "bg-green-100 text-green-700" // Approved without delete approval
            : "bg-gray-100 text-gray-700" // Default case
        }`}
      >
        <div className={"flex justify-start align-middle gap-1"}>
          {rule.status === "CREATED" && !rule.needDeleteApprove ? (
            <>
              {rule.history.updateBy ? (
                <>
                  <ClockIcon className="h-5 w-5" />
                  Modified (Pending Approval)
                </>
              ) : (
                <>
                  <PlusIcon className="h-5 w-5" />
                  Newly Added (Pending Approval)
                </>
              )}
            </>
          ) : rule.needDeleteApprove &&
            (rule.status === "REJECTED" ||
              rule.status === "APPROVED" ||
              rule.status === "CREATED") ? (
            <>
              <XMarkIcon className="h-5 w-5" />
              Deleted (Pending Approval)
            </>
          ) : rule.status === "APPROVED" && !rule.needDeleteApprove ? (
            <>
              <CheckIcon className="h-5 w-5" />
              Approved
            </>
          ) : (
            <>
              <XMarkIcon className="h-5 w-5" />
              Rejected
            </>
          )}
        </div>
      </div>

      {/* Exclamation Icon and Review Comment Wrapper */}

      {rule.reviewComment && (
        <div
          className={`relative flex items-center `}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <ExclamationTriangleIcon
            className={`h-5 w-5 ${
              rule.status === "CREATED" && !rule.needDeleteApprove
                ? rule.history.updateBy
                  ? " text-yellow-700" // Modified (Pending Approval)
                  : " text-green-700" // Newly Added (Pending Approval)
                : rule.status === "REJECTED" ||
                  (rule.status === "APPROVED" && rule.needDeleteApprove) ||
                  (rule.status === "CREATED" && rule.needDeleteApprove)
                ? " text-red-700" // Rejected or requires delete approval
                : rule.status === "APPROVED" && !rule.needDeleteApprove
                ? " text-green-700" // Approved without delete approval
                : " text-gray-700" // Default case
            }`}
          />

          {/* Hover effect: Show the comment inside a styled box */}
          {isHovered && (
            <div
              className={`absolute left-7 px-3 py-1.5 font-semibold rounded-md shadow-lg text-xs whitespace-nowrap ${
                rule.status === "CREATED" && !rule.needDeleteApprove
                  ? rule.history.updateBy
                    ? "bg-yellow-100 text-yellow-700" // Modified (Pending Approval)
                    : "bg-green-100 text-green-700" // Newly Added
                  : rule.status === "REJECTED" ||
                    (rule.status === "APPROVED" && rule.needDeleteApprove) ||
                    (rule.status === "CREATED" && rule.needDeleteApprove)
                  ? "bg-red-100 text-red-700" // Rejected or requires delete approval
                  : rule.status === "APPROVED" && !rule.needDeleteApprove
                  ? "bg-green-100 text-green-700" // Approved without delete approval
                  : "bg-gray-100 text-gray-700" // Default case
              }`}
            >
              {rule.reviewComment ? rule.reviewComment : ""}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StatusPill;
