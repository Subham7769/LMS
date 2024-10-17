import DynamicName from "../DynamicName/DynamicName";
import Button from "../Button/Button";
import { TrashIcon } from "@heroicons/react/20/solid";
import { useSelector } from "react-redux";

const DynamicHeader = ({
  itemName,
  isEditable = true,
  handleNameUpdate,
  isClonable = true,
  handleClone,
  isDeleteable = true,
  handleDelete,
}) => {
  const { userData } = useSelector((state) => state.auth);
  const roleName = userData?.roles[0]?.name;
  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <DynamicName
          initialName={itemName}
          onSave={handleNameUpdate}
          editable={roleName !== "ROLE_VIEWER" && isEditable}
        />
        {roleName !== "ROLE_VIEWER" ? (
          <div className="flex items-center gap-4">
            {isClonable && (
              <Button
                buttonName={"Clone"}
                onClick={handleClone}
                rectangle={true}
              />
            )}
            {isDeleteable && (
              <Button
                buttonIcon={TrashIcon}
                onClick={handleDelete}
                circle={true}
              />
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default DynamicHeader;
