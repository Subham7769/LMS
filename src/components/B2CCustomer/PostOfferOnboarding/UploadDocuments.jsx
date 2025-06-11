import React, { useEffect, useState } from "react";
import { useActiveTab } from "../ActiveTabContext";


function UploadDocuments() {
  const { formData, setFormData } = useActiveTab();

  return (
    <>
      {[
        { label: "ATM Card", field: "atmCard" },
        { label: "Bank Statement", field: "bankStatement" },
        { label: "Employer Form", field: "employerForm" },
        { label: "Pay Slip", field: "paySlip" }
      ].map((doc) => (
        <div key={doc.field} className="mb-6">
          <label className="block text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2">
            {doc.label}
          </label>

          <div className="relative flex items-center justify-between p-4 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 transition hover:border-blue-500">
            <div className="w-full flex align-middle justify-start gap-1">
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                id={doc.field}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [doc.field]: e.target.files[0]
                  })
                }
                className="hidden"
              />
              <label
                htmlFor={doc.field}
                className="cursor-pointer px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md w-fit transition"
              >
                {formData[doc.field] ? "Replace File" : "Upload File"}
              </label>

              {formData[doc.field] && (
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-3">
                  {formData[doc.field].name}
                </p>
              )}
            </div>

            {formData[doc.field] && (
              <span className="flex  w-fit text-center text-green-600 font-semibold text-sm">
                <span>✅</span><span> Verified</span>
              </span>
            )}
          </div>
        </div>
      ))}
    </>
  );
}

export default UploadDocuments;
