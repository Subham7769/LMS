import { useParams } from "react-router-dom";
import LoadingState from "../LoadingState/LoadingState";
import { CheckBadgeIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import { useDispatch, useSelector } from "react-redux";
import { getUserEligibility } from "../../redux/Slices/userProductTestingSlice";

const CommentsModal = ({ closeModal, message }) => {
  return (
    <div
      id="loanInfoContainer"
      className="fixed inset-0 bg-black/10 backdrop-blur-sm flex justify-center items-center transition-opacity duration-300 ease-out"
    >
      <div className="bg-white border border-red-600 p-6 rounded-xl overflow-hidden w-[70%] md:w-2/4 h-[300px] relative shadow-lg transition-transform transform duration-500 ease-out scale-100">
        {/* Close Button */}
        <div
          onClick={closeModal}
          className="h-9 w-9 cursor-pointer rounded-full text-white absolute top-0 right-0 self-end"
        >
          <XCircleIcon className="w-9 h-9" fill="rgb(220 38 38)" />
        </div>
        <div className="font-semibold text-center text-2xl text-gray-800 mb-5">
          Comments
        </div>
        <div className="overflow-y-auto h-[300px] px-4 space-y-4">
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
  const projects = eligibilityResults?.eligibilityResults?.projects;
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="p-4 grid max-md:grid-cols-1 grid-cols-2 2xl:grid-cols-2 gap-3">
        {projects?.map((project, index) => (
          <ContainerTile>
            <h2 className="text-[16px] text-center font-semibold">
              {project.projectName}
            </h2>
            <table className="table-auto w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-[14px] font-semibold border-b border-gray-400">
                    Product
                  </th>
                  <th className="px-4 py-2 text-[14px] font-semibold border-b border-gray-400">
                    Eligibility
                  </th>
                  <th className="px-4 py-2 text-[14px] font-semibold border-b border-gray-400">
                    Comments
                  </th>
                </tr>
              </thead>
              <tbody>
                {project?.loanProducts?.map((product, idx) => (
                  <tr key={idx} className="border-t border-b border-gray-400">
                    <td className="px-4 py-2 border-r text-[11px] border-gray-400">
                      {product.productName}
                    </td>
                    <td className="px-4 py-2 text-[11px] text-green-500 font-semibold flex items-center justify-center border-r border-gray-400">
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
                        closeModal={() => setModalOpen(false)}
                        message={product.comment}
                      />
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </ContainerTile>
        ))}
      </div>
    </>
  );
};

const UserInfo = () => {
  const { userID } = useParams();
  const dispatch = useDispatch();
  const url = "/check-eligibility";

  useEffect(() => {
    dispatch(getUserEligibility({ userID, url }))
  }, [dispatch, userID])

  const { eligibility, loading, error } = useSelector((state) => state.userProductTesting);
  console.log(eligibility)

  // Conditional rendering based on loading and error states
  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ContainerTile>Error: {error}</ContainerTile>;
  }


  return (
    <>
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
      <EligibilityResults eligibilityResults={eligibility} />
    </>
  );
};

export default UserInfo;
