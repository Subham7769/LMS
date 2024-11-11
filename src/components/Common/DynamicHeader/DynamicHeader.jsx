import DynamicName from "../DynamicName/DynamicName";
import Button from "../Button/Button";
import { TrashIcon } from "@heroicons/react/20/solid";
import { useSelector } from "react-redux";

const DynamicHeader = ({
  itemName,
  isEditable = true,
  handleNameUpdate,
  handleClone,
  handleDelete,
  loading,
  error,
}) => {
  const { userData } = useSelector((state) => state.auth);
  const roleName = userData?.roles[0]?.name;

  if (loading) {
    return (
      <div className="flex items-center justify-between mb-5 animate-pulse">
        {/* <div className="animate-spin h-5 w-5 border-4 border-t-transparent border-gray-500 rounded-full"></div> //loader */}
        <div className="h-6 bg-gray-300 rounded w-1/4"></div>
        <div className="h-9  rounded w-1/4 flex items-end justify-end gap-5">
          <div className="h-9 bg-gray-300 rounded-lg w-1/3"></div>
          <div className="h-9 bg-gray-300 rounded-full w-9"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center text-red-500 mb-5">
        <p>Oops! Something went wrong. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between mb-5">
      <DynamicName
        initialName={itemName}
        onSave={handleNameUpdate}
        editable={roleName !== "ROLE_VIEWER" && isEditable}
      />
      {roleName !== "ROLE_VIEWER" && (
        <div className="flex items-center gap-4">
          {handleClone && (
            <Button
              buttonName={"Clone"}
              onClick={handleClone}
              rectangle={true}
            />
          )}
          {handleDelete && (
            <Button
              buttonIcon={TrashIcon}
              onClick={handleDelete}
              circle={true}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default DynamicHeader;
