import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import ListTableClassic from "../Common/ListTable/ListTableClassic";

const Instances = () => {
  const [instances, setInstances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProcessInstances = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_CAMUNDA_API_BASE}/api/process/process-instances`
        );
        if (!response.ok) throw new Error("Failed to fetch process instances");
        const data = await response.json();
        setInstances(data);
      } catch (error) {
        console.error("Error fetching process instances:", error);
        toast.error("Failed to load process instances.");
      } finally {
        setLoading(false);
      }
    };

    fetchProcessInstances();
  }, []);

  const ListHeader = [
    { name: "Process Instance ID", sortKey: null },
    { name: "Business Key", sortKey: null },
    { name: "Definition ID", sortKey: null },
    { name: "Is Ended", sortKey: null },
    { name: "Tenant ID", sortKey: null },
  ];

  return (
    <ContainerTile loading={loading} className="px-5 pt-5 pb-1">
      <div className="block md:flex justify-between items-center mb-4 md:mb-0">
        <h2 className="mb-6">
          <b className="text-xl font-semibold">Active Process Instances</b>
          <div className="text-gray-600 text-sm">
            View running and completed process instances from Camunda engine
          </div>
        </h2>
      </div>

      <ListTableClassic
        ListName="List of Process Instances"
        ListNameLength={instances?.length}
        ListHeader={ListHeader}
      >
        {instances?.map((item) => (
          <tr key={item?.processInstanceId}>
            <td className="p-4">{item?.processInstanceId}</td>
            <td className="p-4">{item?.businessKey || "-"}</td>
            <td className="p-4">{item?.processDefinitionId}</td>
            <td className="p-4">
              <span
                className={`inline-block min-w-20 rounded-full font-medium py-0.5 text-center ${
                  item?.isEnded
                    ? "bg-gray-400/20 text-gray-700"
                    : "bg-green-500/20 text-green-700"
                }`}
              >
                {item?.isEnded ? "Ended" : "Running"}
              </span>
            </td>
            <td className="p-4">{item?.tenantId || "-"}</td>
          </tr>
        ))}
      </ListTableClassic>
    </ContainerTile>
  );
};

export default Instances;
