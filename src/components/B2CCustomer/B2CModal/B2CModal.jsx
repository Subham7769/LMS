import { XMarkIcon } from "@heroicons/react/24/outline";

const B2CModal = ({
  primaryButtonName,
  primaryOnClick,
  primaryDisabled,
  secondaryButtonName,
  secondaryOnClick,
  title,
  loading,
  children,
  isFooter = true,
  modalWidth = "lg:w-1/2",
}) => {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-900/30 backdrop-blur-sm">
        <div
          className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-auto w-3/4 ${modalWidth}`}
        >
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
          <div className="px-5 py-4 overflow-y-auto flex-1">{children}</div>
          {isFooter && (
            <div className="sticky bottom-0 px-5 py-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700/60 flex gap-3 justify-end">
              <button
                type="submit"
                className="btn hover:cursor-pointer bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded"
                disabled={loading}
                onClick={primaryOnClick}
              >
                {primaryButtonName}
              </button>
              <button
                type="button"
                onClick={secondaryOnClick}
                className="btn bg-gray-300 text-black px-4 py-2 rounded"
              >
                {loading ? "Loading..." : secondaryButtonName}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default B2CModal;
