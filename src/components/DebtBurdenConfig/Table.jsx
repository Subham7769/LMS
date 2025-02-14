import { CheckCircleIcon } from "@heroicons/react/20/solid";
import Select from "react-select";
import Button from "../Common/Button/Button";
import { setValidationError } from "../../redux/Slices/validationSlice";
import { useDispatch, useSelector } from "react-redux";
import { hasViewOnlyAccess } from "../../utils/roleUtils";

export default function Table({
  getSortIcon,
  handleSort,
  handleChange,
  handleDelete,
  currentItems,
  editingIndex,
  PencilIcon,
  TrashIcon,
  toggleEdit,
  empOptions,
}) {
  const dispatch = useDispatch();
  const { validationError } = useSelector((state) => state.validation);
  const { userData } = useSelector((state) => state.auth);
  const roleName = userData?.roles[0]?.name;

  const tableColumns = [
    {
      name: "Min Net Income Bracket",
      sortKey: "startNetIncomeBracketInSARule",
    },
    { name: "Max Net Income Bracket", sortKey: "endNetIncomeBracketInSARule" },
    { name: "Product Level", sortKey: "productLevel" },
    { name: "Consumer DBR", sortKey: "consumerDBR" },
    { name: "GDBR (Without MTG)", sortKey: "gdbrWithoutMTG" },
    { name: "Employer Retired", sortKey: "employerRetired" },
    { name: "GDBR (with MTG)", sortKey: "gdbrWithMTG" },
  ];

  if (!hasViewOnlyAccess(roleName)) {
    tableColumns.push({ name: "Actions", sortKey: null });
  }
  return (
    <table className="w-full table-auto border">
      <thead className="bg-gray-50">
        <tr>
          {tableColumns.map((column, idx) => (
            <th
              key={idx}
              scope="col"
              className={`px-4 py-2 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider ${
                column.sortKey ? "cursor-pointer" : ""
              }`}
              onClick={
                column.sortKey ? () => handleSort(column.sortKey) : undefined
              }
            >
              <div
                className={`flex items-center ${
                  column.sortKey ? "justify-between" : ""
                }`}
              >
                {column.name}
                {column.sortKey && getSortIcon(column.sortKey)}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {currentItems.length < 1 ? (
          <tr>
            <td colSpan="8" className="px-4 py-2 text-center text-gray-500">
              No Data To Show Yet
            </td>
          </tr>
        ) : (
          currentItems?.map((rule, index) => (
            <tr key={rule.ruleName || index}>
              {[
                {
                  value: rule?.startNetIncomeBracketInSARule?.trim(),
                  type: "number",
                  name: "startNetIncomeBracketInSARule",
                  dataIndex: rule?.dataIndex,
                },
                {
                  value: rule?.endNetIncomeBracketInSARule?.trim(),
                  type: "number",
                  name: "endNetIncomeBracketInSARule",
                  dataIndex: rule?.dataIndex,
                },
                {
                  value: rule?.productLevel?.trim(),
                  type: "text",
                  name: "productLevel",
                  dataIndex: rule?.dataIndex,
                },
                {
                  value: rule?.consumerDBR?.trim(),
                  type: "text",
                  name: "consumerDBR",
                  dataIndex: rule?.dataIndex,
                },
                {
                  value: rule?.gdbrWithoutMTG?.trim(),
                  type: "text",
                  name: "gdbrWithoutMTG",
                  dataIndex: rule?.dataIndex,
                },
                {
                  value: rule?.employerRetired,
                  type: "select",
                  name: "employerRetired",
                  options: empOptions,
                  dataIndex: rule?.dataIndex,
                },
                {
                  value: rule?.gdbrWithMTG?.trim(),
                  type: "text",
                  name: "gdbrWithMTG",
                  dataIndex: rule?.dataIndex,
                },
              ].map((col, idx) => (
                <td key={idx} className="px-4 py-2 text-sm text-gray-900">
                  {editingIndex === index ? (
                    col.type === "select" ? (
                      <Select
                        className="w-full"
                        value={col.options.find(
                          (option) => option.value === col.value
                        )}
                        options={col.options}
                        onChange={(selected) =>
                          handleChange(index, col.name, selected.value)
                        }
                        isSearchable={false}
                      />
                    ) : (
                      <input
                        type={col.type}
                        name={`${col.name}${index}`}
                        id={`${col.name}${index}`}
                        className={`block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
          ${
            validationError[`${col.name}_${col.dataIndex}`]
              ? "ring-red-600 focus:ring-red-600"
              : "ring-gray-300 focus:ring-indigo-600"
          } 
          sm:text-sm sm:leading-6 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200`}
                        value={col.value}
                        onChange={(e) =>
                          handleChange(index, col.name, e.target.value)
                        }
                        placeholder="Enter value"
                        onFocus={() =>
                          dispatch(
                            setValidationError(`${col.name}_${col.dataIndex}`)
                          )
                        }
                      />
                    )
                  ) : (
                    <span className="block w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                      {col.value}
                    </span>
                  )}
                </td>
              ))}
              {!hasViewOnlyAccess(roleName) ? (
                <td className="px-4 py-2 text-sm font-medium flex gap-2 justify-center">
                  <div onClick={() => toggleEdit(index)} type="button">
                    <Button
                      buttonIcon={
                        editingIndex === index ? CheckCircleIcon : PencilIcon
                      }
                      // onClick={editingIndex === index ? informUser : informUser1}
                      circle={true}
                      buttonType="secondary"
                    />
                  </div>
                  <Button
                    buttonIcon={TrashIcon}
                    onClick={() => handleDelete(index)}
                    circle={true}
                    buttonType="destructive"
                  />
                </td>
              ) : (
                ""
              )}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
