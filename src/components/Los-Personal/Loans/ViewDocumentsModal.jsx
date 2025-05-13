import React from "react";
import Button from "../../Common/Button/Button";
import { useDispatch } from "react-redux";
import { downloadDocumentFile, previewDocumentFile } from "../../../redux/Slices/personalLoansSlice";
import convertToTitleCase from "../../../utils/convertToTitleCase";
import { ArrowDownTrayIcon, EyeIcon, XMarkIcon } from "@heroicons/react/24/outline";

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

  const handlePreview = (docId, docName) => {
    if (!docId) return;
    const filePreviewParams = {
      docId: docId,
      authToken: "Basic Y2FyYm9uQ0M6Y2FyMjAyMGJvbg==",
      docName,
    };
    dispatch(previewDocumentFile(filePreviewParams));
  };

  const filteredDocuments = documents.filter((doc) => doc.docName);

  return (
    <>
      <div className="fixed z-50 inset-0 bg-gray-900/30 backdrop-blur-sm flex justify-center items-center">
        <div className="bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 p-8 rounded-xl w-3/4 lg:w-1/3 relative shadow-lg transition-all duration-500 ease-in-out">
          <XMarkIcon
            onClick={onClose}
            className="absolute top-1 right-1 h-6 w-6 cursor-pointer text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
          />
          {filteredDocuments.length === 0 ? (
            <div className="text-center text-gray-500 font-medium">
              No documents were uploaded
            </div>
          ) : (
            filteredDocuments.map((doc) => (
              <div
                key={doc.docId}
                className="grid grid-cols-2 my-2 border-b border-border-gray-primary pb-2 items-center"
              >
                <div>{convertToTitleCase(doc.documentKey)}</div>
                <div className="flex justify-center gap-2">
                  <Button
                    buttonIcon={ArrowDownTrayIcon}
                    onClick={() => handleDownload(doc?.docId, doc?.docName)}
                    circle={true}
                  />
                  <Button
                    buttonIcon={EyeIcon}
                    onClick={() => handlePreview(doc?.docId, doc?.docName)}
                    circle={true}
                    buttonType="secondary"
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default ViewDocumentsModal;
