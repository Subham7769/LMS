import React from "react";
import { ClockIcon, XCircleIcon, CheckCircleIcon } from "@heroicons/react/24/solid";

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

const StatusPill = ({ status, showIcon = true, customLabel }) => {
  const { bg, text, label, Icon } = statusConfig[status] || statusConfig.DEFAULT;

  return (
    <div className={`px-2 w-fit py-1 rounded-full text-sm font-semibold ${bg} ${text}`}>
      <div className="flex items-center gap-1">
        {showIcon && Icon && <Icon className="h-5 w-5" />}
        {customLabel || label} {/* Prioritize custom label if provided */}
      </div>
    </div>
  );
};

export default StatusPill;
