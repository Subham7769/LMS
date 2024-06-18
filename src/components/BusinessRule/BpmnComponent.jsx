import { useEffect, useRef } from "react";
import BpmnModeler from "bpmn-js/lib/Modeler";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
import "@bpmn-io/properties-panel/dist/assets/properties-panel.css";
import { BpmnPropertiesPanelModule } from "bpmn-js-properties-panel";
import { BpmnPropertiesProviderModule } from "bpmn-js-properties-panel";

export default function BpmnComponent() {
  const modelerRef = useRef(null);
  const propertiesPanelRef = useRef(null);

  useEffect(() => {
    const modeler = new BpmnModeler({
      container: modelerRef.current,
      propertiesPanel: {
        parent: propertiesPanelRef.current,
      },
      additionalModules: [
        BpmnPropertiesPanelModule,
        BpmnPropertiesProviderModule,
      ],
    });

    const diagramUrl = "/diagram.bpmn";

    fetch(diagramUrl)
      .then((response) => response.text())
      .then((diagramXML) => {
        modeler
          .importXML(diagramXML)
          .then(({ warnings }) => {
            if (warnings.length) {
              console.warn("Warnings", warnings);
            }
            console.log("Rendered");
          })
          .catch((err) => {
            console.error("Error rendering", err);
          });
      });

    return () => {
      modeler.destroy();
    };
  }, []);

  return (
    <div className="flex min-h-[75vh]">
      <div ref={modelerRef} className="flex-1" />
      <div ref={propertiesPanelRef} className="properties-panel -z-10" />
    </div>
  );
}
