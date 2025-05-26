import React from "react";
import Button from "../../Common/Button/Button";
import { useDispatch } from "react-redux";
import { downloadDocumentFile, previewDocumentFile } from "../../../redux/Slices/personalLoansSlice";
import convertToTitleCase from "../../../utils/convertToTitleCase";
import { ArrowDownTrayIcon, EyeIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Modal from "../../Common/Modal/Modal";

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
      <Modal
        title={"Download/Preview Documents"}
        isFooter={false}
        secondaryOnClick={onClose}
      >
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
      </Modal>
    </>
  );
};

export default ViewDocumentsModal;
