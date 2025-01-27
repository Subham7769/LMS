import React from "react";
import Button from "../../Common/Button/Button";
import { useDispatch } from "react-redux";
import { downloadDocumentFile } from "../../../redux/Slices/personalLoansSlice";
import convertToTitleCase from "../../../utils/convertToTitleCase";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

const ViewDocumentsModal = ({ isOpen, onClose, documents }) => {
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const handleDownload = (docId, docName) => {
    if (!docId) return;
    const fileDownloadParams = {
      docId: docId,
      authToken: "Basic Y2FyYm9uQ0M6Y2FyMjAyMGJvbg==",
      docName,
    };
    dispatch(downloadDocumentFile(fileDownloadParams));
  };

  return (
    <>
      <div className="fixed z-20 inset-0 bg-stone-200/10 backdrop-blur-sm flex justify-center items-center">
        <div className="bg-white border border-red-600 p-8 rounded-xl w-1/3 relative shadow-lg transition-all duration-500 ease-in-out">
          <div
            onClick={onClose}
            className="h-9 w-9 cursor-pointer rounded-full text-white absolute top-2 right-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-9 h-9"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                fill="rgb(220 38 38)"
              />
            </svg>
          </div>
          {documents
            ?.filter((doc) => doc.docName) // Filter out documents without docName
            .map((doc) => (
              <div
                key={doc.docId} // Use docId as the key to ensure unique identifiers
                className="grid grid-cols-2 my-2 border-b border-gray-300 pb-2 items-center"
              >
                <div>{convertToTitleCase(doc.documentKey)}</div>
                <div className="text-center">
                  <Button
                    buttonIcon={ArrowDownTrayIcon}
                    onClick={() => handleDownload(doc?.docId, doc?.docName)}
                    circle={true}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default ViewDocumentsModal;
