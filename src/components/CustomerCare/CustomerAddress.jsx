import LoadingState from "../LoadingState/LoadingState";
import useBorrowerInfo from "../../utils/useBorrowerInfo";

const AddressRow = ({ index, address }) => {
  const { caloaddt, cacadt, cacad1E, cacad6, cacad7, cacad8E, cacad9 } =
    address;

  return (
    <tr className="divide-x divide-gray-200 text-center w-full">
      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
        <div className="mx-auto whitespace-nowrap overflow-hidden text-ellipsis">
          {index + 1}
        </div>
      </td>
      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
        <div className="mx-auto whitespace-nowrap overflow-hidden text-ellipsis">
          {caloaddt}
        </div>
      </td>
      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
        <div className="mx-auto whitespace-nowrap overflow-hidden text-ellipsis">
          {cacadt}
        </div>
      </td>
      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
        <div className="mx-auto whitespace-nowrap overflow-hidden text-ellipsis">
          {cacad1E}
        </div>
      </td>
      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
        <div className="mx-auto whitespace-nowrap overflow-hidden text-ellipsis">
          {cacad6}
        </div>
      </td>
      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
        <div className="mx-auto whitespace-nowrap overflow-hidden text-ellipsis">
          {cacad7}
        </div>
      </td>
      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
        <div className="mx-auto whitespace-nowrap overflow-hidden text-ellipsis">
          {cacad8E}
        </div>
      </td>
      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
        <div className="mx-auto whitespace-nowrap overflow-hidden text-ellipsis">
          {cacad9}
        </div>
      </td>
    </tr>
  );
};

const CustomerAddress = () => {
  const url = "/simah-recent-response";
  const CBDetilsData = useBorrowerInfo(url);

  if (CBDetilsData.length === 0) {
    return <LoadingState />;
  }

  const { address } =
    CBDetilsData.response.message.item[0].rspreport.consumer[0].addresses;

  return (
    <table className="divide-y divide-gray-300">
      <thead>
        <tr className="divide-x divide-gray-200">
          <th className="py-3.5 px-4 text-center">No.</th>
          <th className="py-3.5 px-4 text-center">Load date</th>
          <th className="py-3.5 px-4 text-center text-gray-900">
            National Address
          </th>
          <th className="py-3.5 px-4 text-center text-gray-900">
            Address Field 1
          </th>
          <th className="py-3.5 px-4 text-center text-gray-900">
            Postal Box Number
          </th>
          <th className="py-3.5 px-4 text-center text-gray-900">Postal Code</th>
          <th className="py-3.5 px-4 text-center text-gray-900">
            State / City Name
          </th>
          <th className="py-3.5 px-4 text-center text-gray-900">
            Country Code
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {address.map((add, index) => (
          <AddressRow key={index} index={index} address={add} />
        ))}
      </tbody>
    </table>
  );
};

export default CustomerAddress;
