import { CBDetails } from "../../config";
import { useEffect, useState } from "react";

const CustomerAddress = () => {
  const address =
    CBDetails.response.message.item[0].rspreport.consumer[0].addresses.address;
  // const [addressarr, setAddressarr] = useState(
  //   address.map((add) => ({
  //     ...add,
  //     formattedLoadDate: "",
  //   }))
  // );
  // useEffect(() => {
  //   const formattedAddress = addressarr.map((add) => {
  //     const dateObjSubmit = new Date(add.caloaddt);
  //     const yearSubmit = dateObjSubmit.getFullYear();

  //     // Month formatting with leading zero and to lowercase
  //     const monthSubmit = String(dateObjSubmit.getMonth() + 1).padStart(2, "0");
  //     const monthNameSubmit = new Date(
  //       yearSubmit,
  //       monthSubmit - 1
  //     ).toLocaleString("en-US", { month: "short" });
  //     const daySubmit = String(dateObjSubmit.getDate()).padStart(2, "0");
  //     const formattedLoadDate = `${daySubmit} ${monthNameSubmit} ${yearSubmit}`;

  //     return {
  //       ...add,
  //       formattedLoadDate: formattedLoadDate,
  //     };
  //   });
  //   setAddressarr(formattedAddress);
  // }, []);
  return (
    <>
      <table className="divide-y divide-gray-300">
        <thead>
          <tr className="divide-x divide-gray-200">
            <th className="py-3.5 px-4 text-center">No.</th>
            <th className="py-3.5 px-4 text-center "> Load date</th>
            <th className="py-3.5 px-4 text-center text-gray-900">
              National Address
            </th>
            <th className="py-3.5 px-4 text-center text-gray-900">
              Address Field 1
            </th>
            <th className="py-3.5 px-4 text-center text-gray-900">
              Postal Box Number
            </th>
            <th className="py-3.5 px-4 text-center text-gray-900">
              Postal Code
            </th>
            <th className="py-3.5 px-4 text-center text-gray-900">
              State / City Name
            </th>
            <th className="py-3.5 px-4 text-center text-gray-900">
              Country Code
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {address.map((add, index) => {
            return (
              <tr
                key={index}
                className="divide-x divide-gray-200 text-center w-full"
              >
                <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                  <div className=" mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                    {index + 1}
                  </div>
                </td>
                <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                  <div className=" mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                    {add.caloaddt}
                  </div>
                </td>
                <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                  <div className=" mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                    {add.cacadt}
                  </div>
                </td>
                <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                  <div className=" mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                    {add.cacad1E}
                  </div>
                </td>
                <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                  <div className=" mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                    {add.cacad6}
                  </div>
                </td>
                <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                  <div className=" mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                    {add.cacad7}
                  </div>
                </td>
                <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                  <div className=" mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                    {add.cacad8E}
                  </div>
                </td>
                <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                  <div className=" mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                    {add.cacad9}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default CustomerAddress;
