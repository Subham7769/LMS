import { CheckCircleIcon } from "@heroicons/react/20/solid";
import InequalityNumber from "./InequalityNumber";

const CreditScore = () => {
  return (
    <>
      <div className="border-b border-gray-300 pb-8 mb-8">
        <h2 className="text-xl text-center">Nationality Score</h2>
        <div className=" text-center my-4">
          ((simahScore-300)*A/550) + (nationality*B) + (netIncome*C) +
          (dependents*D) + (maritalStatus*E) + (residentialStatus*F)
        </div>
        <div className="flex justify-center">
          <table className="divide-y divide-gray-300 w-5/6">
            <thead>
              <tr className="divide-x divide-gray-200">
                <th className="py-3.5 px-2 text-center text-gray-900">A</th>
                <th className="py-3.5 px-2 text-center text-gray-900">B</th>
                <th className="py-3.5 px-2 text-center text-gray-900">C</th>
                <th className="py-3.5 px-2 text-center text-gray-900">D</th>
                <th className="py-3.5 px-2 text-center text-gray-900">E</th>
                <th className="py-3.5 px-2 text-center text-gray-900">F</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              <tr className="divide-x divide-gray-200 text-center">
                <td className="whitespace-nowrap py-4 px-2 text-gray-900">
                  <input
                    type="number"
                    name="number"
                    // id="number"
                    className="w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="0.54"
                  />
                </td>
                <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                  <input
                    type="number"
                    name="number"
                    // id="number"
                    className="w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                    placeholder="0.54"
                  />
                </td>
                <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                  <input
                    type="number"
                    name="number"
                    // id="number"
                    className="w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                    placeholder="0.54"
                  />
                </td>
                <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                  <input
                    type="number"
                    name="number"
                    // id="number"
                    className="w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                    placeholder="0.54"
                  />
                </td>
                <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                  <input
                    type="number"
                    name="number"
                    // id="number"
                    className="w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                    placeholder="0.54"
                  />
                </td>
                <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                  <input
                    type="number"
                    name="number"
                    // id="number"
                    className="w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="0.54"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center gap-24 border-b border-gray-300 pb-8 mb-8">
        <div>
          <h2 className="text-xl mb-5 text-center">Nationality Score</h2>
          <table className="divide-y divide-gray-300">
            <thead>
              <tr className="divide-x divide-gray-200">
                <th className="py-3.5 px-2 text-center text-gray-900">
                  Saudis Credit Score
                </th>
                <th className="py-3.5 px-2 text-center text-gray-900">
                  Expatriates Credit Score
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              <tr className="divide-x divide-gray-200 text-center">
                <td className="whitespace-nowrap py-4 px-2 text-gray-900">
                  <input
                    type="number"
                    name="number"
                    // id="number"
                    className="w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="0.54"
                  />
                </td>
                <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                  <input
                    type="number"
                    name="number"
                    // id="number"
                    className="w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                    placeholder="0.54"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="border border-gray-200"></div>
        <div>
          <h2 className="text-xl mb-5 text-center">Residential Status Score</h2>
          <table className="divide-y divide-gray-300">
            <thead>
              <tr className="divide-x divide-gray-200">
                <th className="py-3.5 px-2 text-center text-gray-900">
                  Rent Status Score
                </th>
                <th className="py-3.5 px-2 text-center text-gray-900">
                  Own Status Score
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              <tr className="divide-x divide-gray-200 text-center">
                <td className="whitespace-nowrap py-4 px-2 text-gray-900">
                  <input
                    type="number"
                    name="number"
                    // id="number"
                    className="w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="0.54"
                  />
                </td>
                <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                  <input
                    type="number"
                    name="number"
                    // id="number"
                    className="w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                    placeholder="0.54"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="border-b border-gray-300 pb-8 mb-8">
        <h2 className="text-xl mb-5 text-center">Maritial Status Score</h2>
        <div className="flex justify-center">
          <table className="divide-y divide-gray-300">
            <thead>
              <tr className="divide-x divide-gray-200">
                <th className="py-3.5 px-2 text-center ">
                  Married Status Score
                </th>
                <th className="py-3.5 px-2 text-center ">
                  Single Status Score
                </th>
                <th className="py-3.5 px-2 text-center text-gray-900">
                  Divorced Status Score
                </th>
                <th className="py-3.5 px-2 text-center text-gray-900">
                  Widowed Status Score
                </th>
                <th className="py-3.5 px-2 text-center text-gray-900">
                  Separated Status Score
                </th>
                <th className="py-3.5 px-2 text-center text-gray-900">
                  Unknown Status Score
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              <tr className="divide-x divide-gray-200 text-center">
                <td className="whitespace-nowrap py-4 px-2 text-gray-900">
                  <input
                    type="number"
                    name="number"
                    // id="number"
                    className="w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="0.54"
                  />
                </td>
                <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                  <input
                    type="number"
                    name="number"
                    // id="number"
                    className="w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                    placeholder="0.54"
                  />
                </td>
                <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                  <input
                    type="number"
                    name="number"
                    // id="number"
                    className="w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                    placeholder="0.54"
                  />
                </td>
                <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                  <input
                    type="number"
                    name="number"
                    // id="number"
                    className="w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                    placeholder="0.54"
                  />
                </td>
                <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                  <input
                    type="number"
                    name="number"
                    // id="number"
                    className="w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                    placeholder="0.54"
                  />
                </td>
                <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                  <input
                    type="number"
                    name="number"
                    // id="number"
                    className="w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="0.54"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <h2 className="text-xl mb-5 text-center">Dependents Rules</h2>
        <div className="flex justify-center gap-12">
          <div>
            <InequalityNumber />
            <InequalityNumber />
            <InequalityNumber />
          </div>
          <div>
            <InequalityNumber />
            <InequalityNumber />
          </div>
          <div>
            <div className="flex items-center gap-4 mb-3">
              <div>Value: </div>
              <div>
                <input
                  type="number"
                  name="number"
                  // id="number"
                  className="block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="4000"
                />
              </div>
            </div>
            <div className="flex items-center gap-4 mb-3">
              <div>Value: </div>
              <div>
                <input
                  type="number"
                  name="number"
                  // id="number"
                  className="block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="4000"
                />
              </div>
            </div>
            <div className="flex items-center gap-4 mb-3">
              <div>Value: </div>
              <div>
                <input
                  type="number"
                  name="number"
                  // id="number"
                  className="block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="4000"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-right mt-8 mr-12">
        <button
          type="button"
          className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <CheckCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
          Update
        </button>
      </div>
    </>
  );
};
export default CreditScore;
