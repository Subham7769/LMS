import InputSelect from "../Common/InputSelect/InputSelect";
import { operatorOptions } from "../../data/OptionsData";
import InputNumber from "../Common/InputNumber/InputNumber";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingState from "../LoadingState/LoadingState";
import {
  CheckCircleIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import toast, { Toaster } from "react-hot-toast";
import { Passed, RowChanged, Warning } from "../Toasts";
import Button from "../Common/Button/Button";
import DynamicName from "../Common/DynamicName/DynamicName";
import CloneModal from "../Common/CloneModal/CloneModal";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCreditScoreETInfo,
  fetchCreditScoreETName,
  handleChangeDispatch,
  addTenure,
  deleteTenure,
  saveCreditScoreET,
  updateCreditScoreETName,
  createCloneCSET,
  handleDeleteCSET,
  setFormData,
  setTenure,
} from "../../redux/Slices/creditScoreETSlice";
import TagInput from "../TagInput/TagInput";

const CreditScoreET = () => {
  const { creditScoreETId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { creditScoreET, creditScoreETName, loading, error } = useSelector(
    (state) => state.creditScoreET
  );

  useEffect(() => {
    dispatch(fetchCreditScoreETInfo(creditScoreETId));
    dispatch(fetchCreditScoreETName(creditScoreETId));
    dispatch(
      setFormData({ ...creditScoreET, creditScoreEtTempId: creditScoreETId })
    );
  }, [creditScoreETId, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(handleChangeDispatch({ name, value }));
  };

  const handleAddET = () => {
    dispatch(addTenure(creditScoreET.tenure));
    // console.log(tenure);
  };

  const handleSaveET = async () => {
    await dispatch(saveCreditScoreET(creditScoreET)).unwrap();
    toast.custom((t) => <RowChanged t={t} toast={toast} />);
  };

  const handleDelete = ({ index }) => {
    console.log(index);
    dispatch(deleteTenure(index));
    toast.custom((t) => (
      <Warning
        t={t}
        toast={toast}
        title={"Not Yet Deleted!"}
        message={"Please click the save button to confirm removal of entry"}
      />
    ));
  };

  const handleChangeTenure = (e) => {
    const { name, value } = e.target;
    dispatch(setTenure({ [name]: value }));
  };

  const handleUpdateCSET = async (updatecsetName) => {
    await dispatch(
      updateCreditScoreETName({ creditScoreETId, updatecsetName })
    ).unwrap();
    dispatch(fetchCreditScoreETName(creditScoreETId));
  };

  const handleClone = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onCreateClone = async (cloneCSETName) => {
    setIsModalOpen(false);
    const details = await dispatch(
      createCloneCSET({ creditScoreETId, cloneCSETName })
    ).unwrap();
    toast.custom((t) => (
      <Passed
        t={t}
        toast={toast}
        title="Clone Successful"
        message="The clone was created successfully"
      />
    ));
    navigate("/credit-score-eligible-tenure/" + details.creditScoreEtTempId);
  };

  const onDeleteCSET = async () => {
    await dispatch(handleDeleteCSET(creditScoreETId)).unwrap();
    navigate("/credit-score-eligible-tenure");
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    <p>Error: {error}</p>;
  }

  console.log(creditScoreET);
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="mb-4 flex items-center justify-between">
        <DynamicName
          initialName={creditScoreETName}
          onSave={handleUpdateCSET}
        />
        <div className="flex gap-4">
          <Button buttonName={"Clone"} onClick={handleClone} rectangle={true} />
          <Button
            buttonIcon={TrashIcon}
            onClick={() => onDeleteCSET(creditScoreETId)}
            circle={true}
          />
        </div>
      </div>
      <CloneModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onCreateClone={onCreateClone}
        initialName={creditScoreETName}
      />
      <ContainerTile>
        <div className="grid grid-cols-4 gap-2 mb-5 items-end">
          <InputSelect
            labelName={"Minimum Credit Score"}
            inputName={"firstCreditScoreOperator"}
            inputValue={creditScoreET?.operators?.firstCreditScoreOperator}
            inputOptions={operatorOptions}
            onChange={handleChange}
          />
          <InputNumber
            inputName={"firstCreditScore"}
            inputValue={creditScoreET?.rules[0]?.firstCreditScore}
            onChange={handleChange}
            placeHolder="0"
          />
          <InputSelect
            labelName={"Maximum Credit Score"}
            inputName={"secondCreditScoreOperator"}
            inputValue={creditScoreET?.operators?.secondCreditScoreOperator}
            inputOptions={operatorOptions}
            onChange={handleChange}
          />
          <InputNumber
            inputName={"secondCreditScore"}
            inputValue={creditScoreET?.rules[0]?.secondCreditScore}
            onChange={handleChange}
            placeHolder="2"
          />
        </div>
        <TagInput
          formData={creditScoreET}
          handleChange={handleChangeTenure}
          inputTextName={"tenure"}
          inputTextLabel={"Eligible Tenure"}
          addTag={handleAddET}
          deleteTag={handleDelete}
        />
        <div className="text-right">
          <button
            type="button"
            onClick={handleSaveET}
            className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <CheckCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
            Save
          </button>
        </div>
      </ContainerTile>
    </>
  );
};

export default CreditScoreET;
