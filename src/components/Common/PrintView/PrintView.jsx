import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Button from "../Button/Button";

const PrintView = ({ children, buttonName = "Print" }) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="flex flex-col">
      <div
        ref={componentRef}
        className={"flex flex-col justify-center align-middle gap-5 m-5"}
      >
        {children}
      </div>
      <div className={"flex justify-end mx-5 items-end"}>
        <Button
          buttonName={buttonName}
          onClick={handlePrint}
          rectangle={true}
        />
      </div>
    </div>
  );
};

export default PrintView;
