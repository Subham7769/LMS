import { useParams } from "react-router-dom";
import { CheckBadgeIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Sorry from "../../../assets/image/sorry.png";
import ContainerTile from "../../Common/ContainerTile/ContainerTile";
import { useDispatch, useSelector } from "react-redux";
import { getBorrowerInfo } from "../../../redux/Slices/productTestingSlice";
import SectionErrorBoundary from "../../ErrorBoundary/SectionErrorBoundary";
import RegistrationForm from "./RegistrationForm";

const CommentsModal = ({ closeModal, message }) => {
  console.log(message);
  return (
    <div
      id="loanInfoContainer"
      className="fixed inset-0 bg-black/10 backdrop-blur-sm flex justify-center items-center transition-opacity duration-300 ease-out"
    >
      <ContainerTile className="bg-white border border-red-600 p-6 rounded-xl overflow-hidden w-[70%] md:w-2/4 h-[300px] relative shadow-lg transition-transform transform duration-500 ease-out scale-100">
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
          {Array.isArray(message) && message.length > 0 ? (
            message.map((comment, index) => (
              <div
                key={index}
                className="p-3 bg-background-light-secondary rounded-md shadow-sm"
              >
                <div className="text-red-500 font-medium">{comment}</div>
              </div>
            ))
          ) : (
            <div className="text-gray-600">No comments yet.</div>
          )}
        </div>
      </ContainerTile>
    </div>
  );
};

const EligibilityResults = ({ eligibilityResults, loading, error }) => {
  const projects = eligibilityResults?.registrationResults?.projects;
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState([]);

  const handleModalOpen = (message) => {
    setModalMessage(message || []);
    setModalOpen(true);
  };

  return (
    <>
      <div className="grid xl:grid-cols-2 grid-cols-1  gap-3">
        {projects?.map((project, index) => (
          <ContainerTile loading={loading} error={error}>
            <h2 className="text-[16px] text-center font-semibold mb-4">
              {project.projectName}
            </h2>
            <table className="table-auto w-full border-collapse">
              <thead className="bg-background-light-secondary">
                <tr>
                  <th className="px-2 md-px-4  py-2 text-[14px] font-semibold border-b border-gray-400">
                    Product
                  </th>
                  <th className="px-2 md-px-4 py-2 text-[14px] font-semibold border-b border-gray-400">
                    Eligibility
                  </th>
                  <th className="px-2 md-px-4 py-2 text-[14px] font-semibold border-b border-gray-400">
                    Registered
                  </th>
                  <th className="px-2 md-px-4 py-2 text-[14px] font-semibold border-b border-gray-400">
                    Comments
                  </th>
                </tr>
              </thead>
              <tbody>
                {project?.loanProducts?.map((product, idx) => (
                  <tr key={idx} className="border-t border-b border-gray-400">
                    <td className="px-2 md-px-4 py-2 border-r border-gray-400 text-[14px]">
                      {product?.productName}
                    </td>
                    <td className="px-2 md-px-4 py-2 text-[14px] text-green-500 font-semibold flex items-center justify-center border-r border-gray-400">
                      {product?.eligibleStatus === "ELIGIBLE" ? (
                        <CheckBadgeIcon className="2xl:h-7 2xl:w-7 h-5 w-5" />
                      ) : (
                        <IoMdClose className="2xl:h-7 2xl:w-7 h-5 w-5 text-red-500 rounded-full" />
                      )}
                    </td>
                    {project?.isRegister === true ? (
                      <td className="px-2 md-px-4 py-2 text-[14px] text-green-500 font-semibold text-center border-r border-gray-400">
                        <div className="flex items-center justify-center">
                          <CheckBadgeIcon className="2xl:h-7 2xl:w-7 h-5 w-5" />
                        </div>
                      </td>
                    ) : (
                      <td className="px-2 md-px-4 py-2 text-[14px] text-green-500 font-semibold border-r border-gray-400">
                        <div className="flex items-center justify-center">
                          <IoMdClose className="2xl:h-7 2xl:w-7 h-5 w-5 text-red-500 rounded-full" />
                        </div>
                      </td>
                    )}
                    {product?.inEligibilityReasons ? (
                      <td
                        className="px-2 md-px-4 py-2 text-[14px] text-center font-semibold underline cursor-pointer"
                        onClick={() =>
                          handleModalOpen(product?.inEligibilityReasons)
                        }
                      >
                        View
                      </td>
                    ) : (
                      <td className="px-2 md-px-4 py-2 text-[14px] text-center">
                        N/A
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </ContainerTile>
        ))}
      </div>
      {isModalOpen && (
        <CommentsModal
          closeModal={() => setModalOpen(false)}
          message={modalMessage}
        />
      )}
    </>
  );
};

const Register = () => {
  const { userID } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBorrowerInfo(userID));
  }, [dispatch, userID]);

  const { register, loading, error } = useSelector(
    (state) => state.productTesting
  );
  // console.log(register);

  // Conditional rendering based on loading and error states
  if (register.message === "Borrower already exists") {
    return (
      <>
        <div className="min-h-[70vh] w-full flex flex-col items-center justify-center">
          <img
            className="w-[250px] h-[250px] mb-4"
            src={Sorry}
            alt="Loading Icon"
          />
          <p className="text-center font-bold text-xl">{register.message}</p>
        </div>
      </>
    );
  } else if (
    register.message ===
    "Something is wrong, please contact system administrator"
  ) {
    return (
      <>
        <div className="min-h-[70vh] w-full flex flex-col items-center justify-center">
          <img
            className="w-[250px] h-[250px] mb-4"
            src={Sorry}
            alt="Loading Icon"
          />
          <p className="text-center font-bold text-xl">{register.message}</p>
        </div>
      </>
    );
  }

  return (
    <SectionErrorBoundary>
      {/* <RegistrationForm /> */}
      <EligibilityResults
        eligibilityResults={register}
        loading={loading}
        error={error}
      />
    </SectionErrorBoundary>
  );
};

export default Register;
