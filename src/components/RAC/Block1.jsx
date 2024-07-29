import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/20/solid';
import toast from "react-hot-toast";
import InputSelect from '../Common/InputSelect/InputSelect';
import ToggleSwitch from '../Common/ToggleSwitch/ToggleSwitch';
import Button from '../Common/Button/Button';
import useRacRules from "../../utils/useRACRules";
import { RowChanged } from "../Toasts";

import {
  nationalityOptions,
  genderOptions,
  maritalStatusOptions,
  residantialStatusOptions,
} from '../../data/OptionsData';

const Block1 = () => {
  const { racID } = useParams();
  console.log(racID)

  // Consolidated State
  const [state, setState] = useState({
    NEselectedOption: [],
    GEselectedOption: [],
    MSselectedOption: [],
    RSselectedOption: [],
    enabledNE: false,
    enabledGE: false,
    enabledMS: false,
    enabledRS: false,
    ruleNameID: "0",
    GEruleNameID: "0",
    MSruleNameID: "0",
    RSruleNameID: "0",
    updateFlag: false,
    GEupdateFlag: false,
    MSupdateFlag: false,
    RSupdateFlag: false,
  });




  // URLs
  const URL_MAP = {
    nationality: { url1: "/nationality-rule/", url2: "nationality", key: 'NE' },
    gender: { url1: "/gender-rule/", url2: "gender", key: 'GE' },
    maritalStatus: { url1: "/marital-status-rule/", url2: "maritalStatus", key: 'MS' },
    residentialStatus: { url1: "/residential-Status-rule/", url2: "residentialStatus", key: 'RS' },
  };

  // Hooks
  const nationalityData = useRacRules(URL_MAP.nationality.url1, URL_MAP.nationality.url2);
  const genderData = useRacRules(URL_MAP.gender.url1, URL_MAP.gender.url2);
  const maritalStatusData = useRacRules(URL_MAP.maritalStatus.url1, URL_MAP.maritalStatus.url2);
  const residentialStatusData = useRacRules(URL_MAP.residentialStatus.url1, URL_MAP.residentialStatus.url2);

  const setOptionsAndFlags = (data, key, availableKey) => {
    if (data.rules && data.rules.length > 0) {
      const availableOptions = data.rules[0][availableKey];
      const ruleNameID = data.rules[0].ruleName;
      const ruleUsed = data.rules[0].ruleUsed === "USED";

      setState(prevState => ({
        ...prevState,
        [`${key}selectedOption`]: availableOptions.map(option => ({ value: option, label: option })),
        [`${key}RuleNameID`]: ruleNameID,
        [`enabled${key}`]: ruleUsed,
        [`${key}UpdateFlag`]: true,
      }));
    }
  };

  useEffect(() => {
    setOptionsAndFlags(nationalityData, 'NE', 'availableNationality');
  }, [nationalityData]);

  useEffect(() => {
    setOptionsAndFlags(genderData, 'GE', 'availableGender');
  }, [genderData]);

  useEffect(() => {
    setOptionsAndFlags(maritalStatusData, 'MS', 'availableMaritalStatus');
  }, [maritalStatusData]);

  useEffect(() => {
    setOptionsAndFlags(residentialStatusData, 'RS', 'availableResidentialStatus');
  }, [residentialStatusData]);

  const handleAddFields = async (type) => {
    const token = localStorage.getItem("authToken"); 
    const ruleNameID = state[`${key}RuleNameID`];
    const enabled = state[`enabled${key}`];
    const availableData = state[`${key}selectedOption`].map(item => item.value);

    const postData = {
      [`${type}Rules`]: [{
        [`available${type.charAt(0).toUpperCase() + type.slice(1)}`]: availableData,
        fieldType: "Employer",
        racId: racID,
        result: 1,
        ruleName: ruleNameID,
        ruleUsed: "USED",
      }],
      ruleUsage: [{
        racId: racID,
        ruleUsage: enabled ? "USED" : "NOT_USED",
      }],
    };

    try {
      const response = await fetch(
        `http://10.10.10.70:32014/carbon-product-service/lmscarbon/rules/${type}-rule`,
        {
          method: updateFlag ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        }
      );

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      toast.custom(t => <RowChanged t={t} toast={toast} />);
    } catch (error) {
      console.error("Failed to update data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState(prev => ({ ...prev, [name]: value }));
  };

  const containerDiv = "grid grid-cols-[3fr_2fr_1fr] items-center gap-1";
  console.log(state)
  return (
    <>
      <div className={containerDiv}>
        <div className='max-w-[230px]'>
          <InputSelect
            labelName={"Nationality"}
            inputName={"NEselectedOption"}
            inputOptions={nationalityOptions}
            inputValue={state.NEselectedOption}
            onChange={handleChange}
            isMulti={true}
          />
        </div>

        <ToggleSwitch
          enabled={state.enabledNE}
          setEnabled={(enabled) => setState(prev => ({ ...prev, enabledNE: enabled }))}
        />
        <Button buttonIcon={CheckCircleIcon} onClick={() => handleAddFields('nationality')} rectangle={true} className={"ml-auto"} />
      </div>

      <div className={containerDiv}>
        <div className='max-w-[230px]'>
          <InputSelect
            labelName={"Gender"}
            inputName={"GEselectedOption"}
            inputOptions={genderOptions}
            inputValue={state.GEselectedOption}
            onChange={handleChange}
            isMulti={true}
          />
        </div>
        <ToggleSwitch
          enabled={state.enabledGE}
          setEnabled={(enabled) => setState(prev => ({ ...prev, enabledGE: enabled }))}
        />
        <Button buttonIcon={CheckCircleIcon} onClick={() => handleAddFields('gender')} rectangle={true} className={"ml-auto"} />
      </div>

      <div className={containerDiv}>
        <div className='max-w-[230px]'>
          <InputSelect
            labelName={"Marital Status"}
            inputName={"MSselectedOption"}
            inputOptions={maritalStatusOptions}
            inputValue={state.MSselectedOption}
            onChange={handleChange}
            isMulti={true}
          />
        </div>
        <ToggleSwitch
          enabled={state.enabledMS}
          setEnabled={(enabled) => setState(prev => ({ ...prev, enabledMS: enabled }))}
        />
        <Button buttonIcon={CheckCircleIcon} onClick={() => handleAddFields('maritalStatus')} rectangle={true} className={"ml-auto"} />
      </div>

      <div className={containerDiv}>
        <div className='max-w-[230px]'>
          <InputSelect
            labelName={"Residential Status"}
            inputName={"RSselectedOption"}
            inputOptions={residantialStatusOptions}
            inputValue={state.RSselectedOption}
            onChange={handleChange}
            isMulti={true}
          />
        </div>
        <ToggleSwitch
          enabled={state.enabledRS}
          setEnabled={(enabled) => setState(prev => ({ ...prev, enabledRS: enabled }))}
        />
        <Button buttonIcon={CheckCircleIcon} onClick={() => handleAddFields('residentialStatus')} rectangle={true} className={"ml-auto"} />
      </div>
    </>
  );
};

export default Block1;
