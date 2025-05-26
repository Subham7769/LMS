import Button from "../Button/Button";
import { XMarkIcon } from "@heroicons/react/24/outline";

const Modal = ({
  primaryButtonName,
  primaryOnClick,
  secondaryOnClick,
  title,
  children,
  isFooter = true,
  modalWidth = "lg:w-1/2",
}) => {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-900/30 backdrop-blur-sm">
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-auto w-3/4 ${modalWidth}`}>
          <div className="px-5 py-3 border-b border-gray-200 dark:border-gray-700/60">
            <div className="flex justify-between items-center">
              <div className="font-semibold text-gray-800 dark:text-gray-100">
                {title}
              </div>
              <XMarkIcon
                onClick={secondaryOnClick}
                className="h-6 w-6 cursor-pointer text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
              />
            </div>
          </div>
          <div className="px-5 py-4">{children}</div>
          {isFooter && (
            <div className="px-5 py-4 border-t border-gray-200 dark:border-gray-700/60 flex gap-3 justify-end">
              <Button
                buttonName={"Cancel"}
                onClick={secondaryOnClick}
                buttonType="secondary"
                buttonSize="btn-sm"
                className="min-w-[120px]"
              />
              <Button
                buttonName={primaryButtonName}
                onClick={primaryOnClick}
                buttonType="primary"
                buttonSize="btn-sm"
                className="min-w-[120px]"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Modal;
