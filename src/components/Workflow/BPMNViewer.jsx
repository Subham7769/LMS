import React, { useEffect, useRef } from "react";
import BpmnViewer from "bpmn-js";

const BpmnDiagram = ({ xml, activeIds = [] }) => {
  const viewerRef = useRef(null);

  useEffect(() => {
    const viewer = new BpmnViewer({ container: viewerRef.current });

    viewer.importXML(xml).then(() => {
      const canvas = viewer.get("canvas");

      canvas.zoom("fit-viewport");

      if (activeIds.length > 0) {
        activeIds.forEach((id) => {
          canvas.addMarker(id, "custom-red-highlight");
        });
      }
    });

    return () => viewer.destroy();
  }, [xml, activeIds]);

  return (
    <div>
      <div
        ref={viewerRef}
        style={{ height: "600px", width: "100%", border: "1px solid #ccc" }}
      />
      <style>
        {`
          /* Target the actual BPMN task shape */
          .djs-element.custom-red-highlight .djs-visual > :nth-child(1) {
            stroke: red !important;
            stroke-width: 4px !important;
            fill: white !important;
          }
        `}
      </style>
    </div>
  );
};

export default BpmnDiagram;
