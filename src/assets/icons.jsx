import React from "react";

// Reusable icon components
export const DocumentationIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 12 12">
    <rect y="3" width="12" height="9" rx="1" />
    <path d="M2 0h8v2H2z" />
  </svg>
);

export const SupportIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 12 12">
    <path d="M10.5 0h-9A1.5 1.5 0 000 1.5v9A1.5 1.5 0 001.5 12h9a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0010.5 0zM10 7L8.207 5.207l-3 3-1.414-1.414 3-3L5 2h5v5z" />
  </svg>
);

export const ContactIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 12 12">
    <path d="M11.854.146a.5.5 0 00-.525-.116l-11 4a.5.5 0 00-.015.934l4.8 1.921 1.921 4.8A.5.5 0 007.5 12h.008a.5.5 0 00.462-.329l4-11a.5.5 0 00-.116-.525z" />
  </svg>
);

export const LogoIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M31.956 14.8C31.372 6.92 25.08.628 17.2.044V5.76a9.04 9.04 0 0 0 9.04 9.04h5.716ZM14.8 26.24v5.716C6.92 31.372.63 25.08.044 17.2H5.76a9.04 9.04 0 0 1 9.04 9.04Zm11.44-9.04h5.716c-.584 7.88-6.876 14.172-14.756 14.756V26.24a9.04 9.04 0 0 1 9.04-9.04ZM.044 14.8C.63 6.92 6.92.628 14.8.044V5.76a9.04 9.04 0 0 1-9.04 9.04H.044Z" />
  </svg>
);
