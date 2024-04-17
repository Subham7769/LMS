import DeliquencyEq from "../DeliquencyEq";
import InequalityNumber from "../InequalityNumber";
import TagsDropdown from "../TagsDropdown";
import ToggleSwitch from "../ToggleSwitch";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

const options = [
  { value: "indian", label: "Indian" },
  { value: "american", label: "American" },
  { value: "russian", label: "Russian" },
  { value: "african", label: "African" },
  { value: "japanese", label: "Japanese" },
  { value: "chinise", label: "Chinise" },
];

const gender = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

const maritalStatus = [
  { value: "single", label: "Single" },
  { value: "Married", label: "Married" },
  { value: "Divorced", label: "Divorced" },
  { value: "Widowed", label: "Widowed" },
  { value: "Separated", label: "Separated" },
  { value: "Unknown", label: "Unknown" },
];
const residantialStatus = [
  { value: "Rent", label: "Rent" },
  { value: "Own", label: "Own" },
];

const RacMatrixConfig = () => {
  return (
    <div className="flex gap-5">
      <div className="flex flex-col max-w-[660px] flex-auto gap-y-5">
        <div className="shadow-md rounded-xl py-6 px-5 border border-red-600">
          <div className="">
            <label htmlFor="nationality" className="block">
              Nationality
            </label>
            <div className="flex items-center gap-4">
              <TagsDropdown options={options} />
              <ToggleSwitch />
            </div>
          </div>
          <div className="mt-3">
            <label htmlFor="gender" className="block">
              Gender
            </label>
            <div className="flex items-center gap-4">
              <TagsDropdown options={gender} />
            </div>
          </div>
          <div className="mt-3">
            <label htmlFor="maritalStatus" className="block">
              Marital Status
            </label>
            <div className="flex items-center gap-4">
              <TagsDropdown options={maritalStatus} />
            </div>
          </div>
          <div className="mt-3">
            <label htmlFor="residantialStatus" className="block">
              Residantial Status
            </label>
            <div className="flex items-center gap-4">
              <TagsDropdown options={residantialStatus} />
            </div>
          </div>
          <div className="text-right mt-5">
            <button
              type="button"
              className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <CheckCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
              Save
            </button>
          </div>
        </div>
        <div className="shadow-md rounded-xl py-6 px-5 border border-red-600">
          <div>
            <label htmlFor="blockedOccupation" className="block">
              Blocked Occupation
            </label>
            <div className="flex items-center gap-4">
              <TagsDropdown options={options} />
              <ToggleSwitch />
            </div>
          </div>
          <div className="mt-3">
            <label htmlFor="blockedRegion" className="block">
              Blocked Region
            </label>
            <div className="flex items-center gap-4">
              <TagsDropdown options={options} />
              <ToggleSwitch />
            </div>
          </div>
          <div className="mt-3">
            <label htmlFor="blockedSector" className="block">
              Blocked Sector
            </label>
            <div className="flex items-center gap-4">
              <TagsDropdown options={options} />
              <ToggleSwitch />
            </div>
          </div>
          <div className="text-right mt-5">
            <button
              type="button"
              className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <CheckCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
              Save
            </button>
          </div>
        </div>
        <DeliquencyEq />
        <div className="shadow-md rounded-xl py-6 px-5 border border-red-600">
          <div>
            <label htmlFor="nationality" className="block">
              Expats Basic Salary Percentage From Gross:
            </label>
            <div className="flex gap-5 items-center mt-2">
              <div>basic wage</div>
              <div>{">"}=</div>
              <div>
                <input
                  type="number"
                  name="number"
                  // id="number"
                  className="w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="0.54"
                />
              </div>
              <div>*gross salary</div>
            </div>
          </div>
          <div className="mt-5">
            <label htmlFor="nationality" className="block">
              Saudi Basic Salary Percentage From Gross:
            </label>
            <div className="flex gap-3 items-center mt-2">
              <div>basic wage</div>
              <div>{">"}=</div>
              <div>
                <input
                  type="number"
                  name="number"
                  // id="number"
                  className="w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="0.54"
                />
              </div>
              <div>*gross salary</div>
            </div>
          </div>
          <div className="text-right mt-5">
            <button
              type="button"
              className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <CheckCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
              Save
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-auto gap-y-5 ">
        <div className="shadow-md rounded-xl py-6 px-5 border border-red-600">
          <InequalityNumber labelText={"Expats Minimum Write Off"} />
          <InequalityNumber labelText={"Expats Maximum Write Off"} />
          <InequalityNumber labelText={"Saudi Minimum Write Off"} />
          <InequalityNumber labelText={"Saudi Maximum Write Off"} />
          <div className="text-right mt-5">
            <button
              type="button"
              className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <CheckCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
              Save
            </button>
          </div>
        </div>
        <div className="shadow-md rounded-xl py-6 px-5 border border-red-600">
          <InequalityNumber labelText={"Expats gross salary"} />
          <InequalityNumber labelText={"Saudi gross salary"} />
          <div className="text-right mt-5">
            <button
              type="button"
              className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <CheckCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
              Save
            </button>
          </div>
        </div>
        <div className="shadow-md rounded-xl py-6 px-5 border border-red-600">
          <InequalityNumber labelText={"Expats Simah Score"} />
          <InequalityNumber labelText={"Saudi Simah Score"} />
          <div className="text-right mt-5">
            <button
              type="button"
              className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <CheckCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
              Save
            </button>
          </div>
        </div>
        <div className="shadow-md rounded-xl py-6 px-5 border border-red-600">
          <InequalityNumber labelText={"Minimum Active Rule"} />
          <InequalityNumber labelText={"Maximum Active Rule"} />
          <div className="text-right mt-5">
            <button
              type="button"
              className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <CheckCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
              Save
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-auto gap-y-5">
        <div className="shadow-md rounded-xl py-6 px-5 border border-red-600">
          <InequalityNumber labelText={"Expats Minimum Age"} />
          <InequalityNumber labelText={"Expats Maximum Age"} />
          <InequalityNumber labelText={"Saudi Minimum Age"} />
          <InequalityNumber labelText={"Saudi Maximum Age"} />
          <div className="text-right mt-5">
            <button
              type="button"
              className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <CheckCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
              Save
            </button>
          </div>
        </div>
        <div className="shadow-md rounded-xl py-6 px-5 border border-red-600">
          <InequalityNumber labelText={"Expats Number Of Working Months"} />
          <InequalityNumber labelText={"Saudi Number Of Working Months"} />
          <div className="text-right mt-5">
            <button
              type="button"
              className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <CheckCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
              Save
            </button>
          </div>
        </div>
        <div className="shadow-md rounded-xl py-6 px-5 border border-red-600">
          <InequalityNumber labelText={"Expats Disposableincome"} />
          <InequalityNumber labelText={"Saudi Disposableincome"} />
          <div className="text-right mt-5">
            <button
              type="button"
              className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <CheckCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
              Save
            </button>
          </div>
        </div>
        <div className="shadow-md rounded-xl py-6 px-5 border border-red-600">
          <InequalityNumber labelText={"Dependents"} />
          <InequalityNumber labelText={"credit score"} />
          <div className="text-right mt-5">
            <button
              type="button"
              className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <CheckCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RacMatrixConfig;
