import { useParams } from "react-router-dom";
import useUserInfo from "../utils/useUserInfo";
import LoadingState from "../LoadingState";
import { CheckBadgeIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";

const CommentsModal = ({ margin, closeModal, message }) => {
  return (
    <div
      id="loanInfoContainer"
      style={{ marginLeft: `${margin}px` }}
      className="fixed inset-0 bg-black/10 backdrop-blur-sm flex justify-center items-center transition-opacity duration-300 ease-out"
    >
      <div className="bg-white border border-red-600 p-6 rounded-xl overflow-hidden w-[70%] md:w-2/4 h-[300px] relative shadow-lg transition-transform transform duration-500 ease-out scale-100">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-8 right-8 transition-colors duration-200"
          aria-label="Close Modal"
        >
          <XMarkIcon className="h-6 w-6 hover:text-red-500 transition duration-200 ease-in-out" />
        </button>

        <div className="font-semibold text-center text-2xl text-gray-800 mb-5">
          Comments
        </div>

        <div className="border-b border-gray-300 mb-5"></div>

        <div className="comments-section overflow-y-auto h-[300px] px-4 space-y-4">
          {" "}
          <div className="p-3 bg-gray-100 rounded-md shadow-sm">
            <div className="text-red-500 font-medium">
              Customer is not eligible for this product
            </div>
          </div>
          <div className="text-gray-600">
            {message ? message : "No comments yet."}
          </div>
        </div>
      </div>
    </div>
  );
};

const EligibilityResults = ({ eligibilityResults }) => {
  const projects = eligibilityResults.eligibilityResults.projects;
  const [leftPanelWidth, setLeftPanelWidth] = useState(0);
  const leftPanelWidthRef = useRef(0);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const leftPanel = document.getElementById("leftPanelId");

    const resizeObserver = new ResizeObserver((entries) => {
      const newWidth = entries[0].contentRect.width;
      setLeftPanelWidth(newWidth);
      leftPanelWidthRef.current = newWidth;
    });

    resizeObserver.observe(leftPanel);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <>
      <div className="p-4 grid max-md:grid-cols-1 grid-cols-2 2xl:grid-cols-3 gap-3">
        {projects.map((project, index) => (
          <div
            key={index}
            className="rounded-xl px-2 py-4 shadow-md border border-red-600"
          >
            <h2 className="text-[16px] text-center font-semibold mb-4">
              {project.projectName}
            </h2>
            <table className="table-auto w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-[14px] font-semibold border-b">
                    Product
                  </th>
                  <th className="px-4 py-2 text-[14px] font-semibold border-b">
                    Eligibility
                  </th>
                  <th className="px-4 py-2 text-[14px] font-semibold border-b">
                    Comments
                  </th>
                </tr>
              </thead>
              <tbody>
                {project.loanProducts.map((product, idx) => (
                  <tr key={idx} className="border-t border-b">
                    <td className="px-4 py-2 border-r text-[11px]">
                      {product.productName}
                    </td>
                    <td className="px-4 py-2 text-[11px] text-green-500 font-semibold flex items-center justify-center border-r">
                      {product.eligibleStatus === "ELIGIBLE" ? (
                        <CheckBadgeIcon className="2xl:h-7 2xl:w-7 h-5 w-5" />
                      ) : (
                        <IoMdClose className="2xl:h-7 2xl:w-7 h-5 w-5 text-red-500 rounded-full" />
                      )}
                    </td>
                    {product.comment ? (
                      <td
                        className="px-4 py-2 text-[11px] text-center font-semibold underline cursor-pointer"
                        onClick={() => setModalOpen(true)}
                      >
                        View
                      </td>
                    ) : (
                      <td className="px-4 py-2 text-[11px] text-center">N/A</td>
                    )}
                    {isModalOpen && (
                      <CommentsModal
                        margin={leftPanelWidth}
                        closeModal={() => setModalOpen(false)}
                        message={product.comment}
                      />
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </>
  );
};

const UserInfo = () => {
  const { userID } = useParams();
  const url = "/check-eligibility";
  const methodType = "POST";
  const eligibilityData = useUserInfo(url, methodType);
  if (eligibilityData.length === 0) {
    return (
      <>
        <LoadingState />
      </>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-5 mb-5">
        <div>
          <img
            className="rounded-full w-12"
            src="https://lmscarbon.com/assets/index.png"
            alt=""
          />
        </div>
        <div className="text-xl">User Id : {userID}</div>
      </div>
      <EligibilityResults eligibilityResults={eligibilityData} />
    </div>
  );
};

export default UserInfo;
