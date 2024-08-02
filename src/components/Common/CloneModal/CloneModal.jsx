import { useState } from 'react';
import Button from '../Button/Button';
import InputText from '../InputText/InputText';

const CloneModal = ({ isOpen, onClose, onCreateClone, initialName }) => {
  const [cloneName, setCloneName] = useState('');

  const handleChange = (e) => {
    setCloneName(e.target.value);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white flex flex-col gap-7 p-5 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold">Create Clone of {initialName} </h2>
        <InputText inputName={"clonnedName"} inputValue={cloneName} onChange={handleChange} placeHolder={"Enter Cloned Name"} />
        <div className="flex gap-3 justify-center md:justify-end">
          <Button buttonName={"Cancel"} onClick={() => { onClose(); setCloneName(""); }} className={"bg-gray-600 text-white hover:bg-gray-500 focus-visible:outline-gray-600 self-end"} rectangle={true} />
          <Button buttonName={"Create Clone"} onClick={() => { onCreateClone(cloneName); onClose(); }} rectangle={true}  className={"self-end"}/>
        </div>
      </div>
    </div>
  );
};

export default CloneModal;
