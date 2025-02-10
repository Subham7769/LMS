import React, { useState } from "react";
import {
  ClockIcon,
  XCircleIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";

const statusConfig = {
  CREATED: {
    bg: "bg-yellow-100",
    text: "text-yellow-700",
    label: "Pending Approval",
    Icon: ClockIcon,
  },
  REJECTED: {
    bg: "bg-red-100",
    text: "text-red-700",
    label: "Rejected",
    Icon: XCircleIcon,
  },
  APPROVED: {
    bg: "bg-green-100",
    text: "text-green-700",
    label: "Approved",
    Icon: CheckCircleIcon,
  },
  DEFAULT: {
    bg: "bg-gray-100",
    text: "text-gray-700",
    label: "Unknown",
    Icon: null,
  },
};

const StatusPill = ({
  status,
  showIcon = true,
  customLabel,
  reviewComment,
}) => {
  const { bg, text, label, Icon } =
    statusConfig[status] || statusConfig.DEFAULT;

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-fit flex items-center gap-2">
      {/* Status Label */}
      <div
        className={`px-2 py-1 rounded-full text-sm font-semibold ${bg} ${text} flex items-center gap-1`}
      >
        {showIcon && Icon && <Icon className="h-5 w-5" />}
        {customLabel || label}
      </div>

      {/* Exclamation Icon and Review Comment Wrapper */}
      {reviewComment && (
        <div
          className="relative flex items-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <ExclamationCircleIcon className={`h-5 w-5 ${text}`} />

          {/* Hover effect: Show the comment inside a styled box */}
          {isHovered && (
            <div
              className={`absolute left-7 px-3 py-1.5 font-semibold rounded-md shadow-lg text-xs ${bg} ${text} whitespace-nowrap`}
            >
              {reviewComment}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StatusPill;
