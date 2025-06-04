import React from "react";
import { Outlet, useParams } from "react-router-dom";
import DynamicHeader from "../Common/DynamicHeader/DynamicHeader";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import Button from "../Common/Button/Button";
import SectionSidebar from "../Common/Sidebar/SectionSidebar";
import { CheckIcon } from "../../assets/icons";

const DRLRuleset = () => {
  const { racId } = useParams();

  const basePath = `/loan/drl-ruleset/${racId}`;

  const navItems = [
      {
        label: "Basic Info",
        path: "/basic-info",
      },
      {
        label: "Rule Manager",
        path: "/rule-manager",
      },
    ];
  return (
    <>
      <DynamicHeader
        itemName={"DRL Ruleset"}
        // isEditable={true}
        // handleNameUpdate={updateName}
        // handleDelete={handleDelete}
        // loading={loading}
      />
      <ContainerTile >
        <div className="flex flex-col md:flex-row md:-mr-px">
          <SectionSidebar navItems={navItems} basePath={basePath} />
          <div className="flex-grow flex flex-col justify-between">
            <div className="p-5">
              <Outlet
                // context={{
                //   projectData,
                //   handleChange,
                //   clientIdsString,
                //   setClientIdsString,
                // }}
              />
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700/60 px-6 py-5">
              {/* {!hasViewOnlyAccess(roleName) && ( */}
                <div className="text-right">
                  {/* {!loading && ( */}
                    <Button
                      buttonName={"Update"}
                      buttonIcon={CheckIcon}
                      // onClick={handleUpdate}
                      buttonType={"primary"}
                      // loading={loading}
                    />
                  {/* )} */}
                </div>
              {/* )} */}
            </div>
          </div>
        </div>
      </ContainerTile>
    </>
  );
};

export default DRLRuleset;
