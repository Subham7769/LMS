import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import ListTableClassic from "../Common/ListTable/ListTableClassic";

const Incidents = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_CAMUNDA_API_BASE}/api/monitoring/incidents`
        );
        if (!response.ok) throw new Error("Failed to fetch incidents");
        const data = await response.json();
        setIncidents(data);
      } catch (error) {
        console.error("Error fetching incidents:", error);
        toast.error("Failed to load incidents.");
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  const ListHeader = [
    { name: "Incident ID", sortKey: null },
    { name: "Process Instance ID", sortKey: null },
    { name: "Definition ID", sortKey: null },
    { name: "Activity ID", sortKey: null },
    { name: "Type", sortKey: null },
    { name: "Error Message", sortKey: null },
    { name: "Time", sortKey: null },
    { name: "Tenant ID", sortKey: null },
  ];

  return (
    <ContainerTile loading={loading} className="px-5 pt-5 pb-1">
      <div className="block md:flex justify-between items-center mb-4 md:mb-0">
        <h2 className="mb-6">
          <b className="text-xl font-semibold">Process Incidents</b>
          <div className="text-gray-600 text-sm">
            Review BPMN process errors and unresolved issues
          </div>
        </h2>
      </div>

      <ListTableClassic
        ListName="List of Incidents"
        ListNameLength={incidents?.length}
        ListHeader={ListHeader}
      >
        {incidents?.map((item) => (
          <tr key={item?.id}>
            <td className="p-4">{item?.id}</td>
            <td className="p-4">{item?.processInstanceId}</td>
            <td className="p-4">{item?.processDefinitionId}</td>
            <td className="p-4">{item?.activityId}</td>
            <td className="p-4 capitalize">{item?.incidentType}</td>
            <td className="p-4 text-red-600">{item?.incidentMessage || "-"}</td>
            <td className="p-4">
              {new Date(item?.incidentTimestamp).toLocaleString()}
            </td>
            <td className="p-4">{item?.tenantId || "-"}</td>
          </tr>
        ))}
      </ListTableClassic>
    </ContainerTile>
  );
};

export default Incidents;
