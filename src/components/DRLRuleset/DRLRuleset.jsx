import React, { useEffect } from "react";
import { Outlet, useParams, useLocation, useNavigate } from "react-router-dom";
import DynamicHeader from "../Common/DynamicHeader/DynamicHeader";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import Button from "../Common/Button/Button";
import SectionSidebar from "../Common/Sidebar/SectionSidebar";
import { hasViewOnlyAccess } from "../../utils/roleUtils";
import {
  createDrools,
  deleteDrlRuleset,
  fetchDruleData,
  fetchDrulesName,
  handleChangeBasicInfoData,
  updateDrools,
  updateDrulesName,
} from "../../redux/Slices/drlRulesetSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchDrlRulesetData } from "../../redux/Slices/sidebarSlice";

const DRLRuleset = () => {
  const { droolsRuleSetId } = useParams();
  const location = useLocation();
  const navigate = useNavigate(); // <== Required for "Next" button
  const { itemName, dRulesData, loading, error } = useSelector(
    (state) => state.drlRuleset
  );
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
  const roleName = userData?.roles[0]?.name;

  useEffect(() => {
    if (droolsRuleSetId) {
      dispatch(fetchDrulesName(droolsRuleSetId));
      dispatch(fetchDruleData(droolsRuleSetId));
    }
  }, [droolsRuleSetId, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (!hasViewOnlyAccess(roleName)) {
      dispatch(handleChangeBasicInfoData({ name, value }));
    }
  };

  const handleNameUpdate = async (newName, isDescriptionUpdate) => {
    await dispatch(
      updateDrulesName({
        droolsRuleSetId,
        newName,
        description: dRulesData.basicInfoData.description,
        isDescriptionUpdate,
      })
    );
    dispatch(fetchDrulesName(droolsRuleSetId));
    dispatch(fetchDrlRulesetData());
  };

  const handleDelete = async () => {
    await dispatch(deleteDrlRuleset(droolsRuleSetId)).unwrap();
    await dispatch(fetchDrlRulesetData());
    navigate("/loan/drl-ruleset");
  };

  const handleSave = async () => {
    const { basicInfoData, ruleManagerData, id } = dRulesData;

    // Flatten all rules into a single array
    const flattenedRules = ruleManagerData.ruleManagerConfig.flatMap(
      (section) =>
        section.rules.map((rule) => ({
          ...rule, // Keep all existing fields intact
        }))
    );

    const transformedPayload = {
      droolsRuleSetId: droolsRuleSetId,
      name: itemName,
      id,
      basicInfoData,
      ruleManagerData: {
        ...ruleManagerData,
        ruleManagerConfig: flattenedRules, // Overwrite with flat rule list
      },
    };

    console.log("Update Payload:", transformedPayload);
    if (transformedPayload.id) {
      await dispatch(updateDrools(transformedPayload)).unwrap();
      const isDescriptionUpdate = true
      handleNameUpdate(itemName, isDescriptionUpdate);
    } else {
      await dispatch(createDrools(transformedPayload)).unwrap();
    }
    await dispatch(fetchDruleData(droolsRuleSetId)).unwrap();
  };

  console.log(dRulesData);

  const handleNext = () => {
    navigate(`${basePath}/rule-manager`);
  };

  const basePath = `/loan/drl-ruleset/${droolsRuleSetId}`;
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

  const isOnBasicInfo = location.pathname.includes("basic-info");
  return (
    <>
      <DynamicHeader
        itemName={itemName}
        isEditable={true}
        handleNameUpdate={handleNameUpdate}
        handleDelete={handleDelete}
        loading={loading}
      />
      <ContainerTile>
        <div className="flex flex-col md:flex-row md:-mr-px">
          <SectionSidebar navItems={navItems} basePath={basePath} />
          <div className="flex-grow flex flex-col justify-between">
            <div className="p-5">
              <Outlet
                context={{
                  dRulesData,
                  handleChange,
                }}
              />
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700/60 px-6 py-5">
              {!hasViewOnlyAccess(roleName) && (
                <div className="text-right">
                  {!loading &&
                    (isOnBasicInfo && !dRulesData.id ? (
                      <Button
                        buttonName="Next"
                        onClick={handleNext}
                        buttonType="secondary"
                      />
                    ) : (
                      <Button
                        buttonName={dRulesData.id ? "Update" : "Create"}
                        onClick={handleSave}
                        buttonType={"primary"}
                        loading={loading}
                      />
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </ContainerTile>
    </>
  );
};

export default DRLRuleset;
