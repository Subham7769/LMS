import React, { useCallback, useEffect, useState } from 'react';
import SelectAndNumber from '../Common/SelectAndNumber/SelectAndNumber';
import { CheckCircleIcon } from '@heroicons/react/20/solid';
import { signsOptions } from '../../data/OptionsData';
import useRacRules from '../../utils/useRACRules';
import { RowChanged } from '../Toasts';
import Button from '../Common/Button/Button';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const useWriteOffData = (woURL1, woURL2) => {
  const [data, setData] = useState({
    writeOffFlag: false,
    appFirstWriteOff: '',
    appSecondWriteOff: '',
    resFirstWriteOff: '',
    resSecondWriteOff: '',
    firstWriteOffOperatorOption: null,
    secondWriteOffOperator: null,
    AWOruleNameID: '0',
    RWOruleNameID: '0',
  });

  const writeOffData = useRacRules(woURL1, woURL2);
  useEffect(() => {
    if (writeOffData.rules && writeOffData.rules.length > 1) {
      const [resRules, appRules] = writeOffData.rules;
      setData({
        writeOffFlag: true,
        appFirstWriteOff: appRules.firstWriteOff,
        appSecondWriteOff: appRules.secondWriteOff,
        resFirstWriteOff: resRules.firstWriteOff,
        resSecondWriteOff: resRules.secondWriteOff,
        firstWriteOffOperatorOption: writeOffData.operators.firstWriteOffOperator,
        secondWriteOffOperator: writeOffData.operators.secondWriteOffOperator,
        AWOruleNameID: appRules.ruleName,
        RWOruleNameID: resRules.ruleName,
      });
    }
  }, [writeOffData]);

  return [data, setData];
};

const Block5 = () => {
  const woURL1 = '/write-off-rule/';
  const woURL2 = 'writeOff';
  const { racID } = useParams();

  const [data, setData] = useWriteOffData(woURL1, woURL2);
  console.log(data)
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setData((prev) => ({ ...prev, [name]: value }));
    },
    [setData]
  );

  const handleAddWriteOff = useCallback(async () => {
    const token = localStorage.getItem('authToken');
    const postData = {
      operators: {
        firstWriteOffOperator: data.firstWriteOffOperatorOption,
        secondWriteOffOperator: data.secondWriteOffOperator,
      },
      ruleUsage: [
        {
          racId: racID,
          ruleUsage: 'USED',
        },
      ],
      writeOffRules: [
        {
          fieldType: 'Employer',
          firstWriteOff: data.appFirstWriteOff,
          isSaudi: 0,
          racId: racID,
          result: 1,
          ruleName: data.AWOruleNameID,
          ruleUsed: 'USED',
          secondWriteOff: data.appSecondWriteOff,
        },
        {
          fieldType: 'Employer',
          firstWriteOff: data.resFirstWriteOff,
          isSaudi: 1,
          racId: racID,
          result: 1,
          ruleName: data.RWOruleNameID,
          ruleUsed: 'USED',
          secondWriteOff: data.resSecondWriteOff,
        },
      ],
    };
    console.log(postData)
    try {
      const response = await fetch(
        'http://10.10.10.70:32014/carbon-product-service/lmscarbon/rules/write-off-rule',
        {
          method: data.writeOffFlag ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      toast.custom((t) => <RowChanged t={t} toast={toast} />);
    } catch (error) {
      console.error('Failed to update data:', error);
    }
  }, [data, racID]);

  return (
    <>
      <SelectAndNumber
        labelName={'Applicants Minimum Write Off'}
        inputSelectName={'firstWriteOffOperatorOption'}
        inputSelectOptions={signsOptions}
        inputSelectValue={data.firstWriteOffOperatorOption}
        onChangeSelect={handleChange}
        inputNumberName={'appFirstWriteOff'}
        inputNumberValue={data.appFirstWriteOff}
        onChangeNumber={handleChange}
        placeHolderNumber={'4000'}
      />
      <SelectAndNumber
        labelName={'Applicants Maximum Write Off'}
        inputSelectName={'secondWriteOffOperator'}
        inputSelectOptions={signsOptions}
        inputSelectValue={data.secondWriteOffOperator}
        onChangeSelect={handleChange}
        inputNumberName={'appSecondWriteOff'}
        inputNumberValue={data.appSecondWriteOff}
        onChangeNumber={handleChange}
        placeHolderNumber={'4000'}
      />
      <SelectAndNumber
        labelName={'Resident Minimum Write Off'}
        inputSelectName={'firstWriteOffOperatorOption'}
        inputSelectOptions={signsOptions}
        inputSelectValue={data.firstWriteOffOperatorOption}
        onChangeSelect={handleChange}
        inputNumberName={'resFirstWriteOff'}
        inputNumberValue={data.resFirstWriteOff}
        onChangeNumber={handleChange}
        placeHolderNumber={'4000'}
      />
      <SelectAndNumber
        labelName={'Resident Maximum Write Off'}
        inputSelectName={'secondWriteOffOperator'}
        inputSelectOptions={signsOptions}
        inputSelectValue={data.secondWriteOffOperator}
        onChangeSelect={handleChange}
        inputNumberName={'resSecondWriteOff'}
        inputNumberValue={data.resSecondWriteOff}
        onChangeNumber={handleChange}
        placeHolderNumber={'4000'}
      />
      <div className="flex flex-col">
        <Button
          buttonIcon={CheckCircleIcon}
          buttonName={'Save'}
          onClick={handleAddWriteOff}
          rectangle={true}
          className={'self-end mt-auto'}
        />
      </div>
    </>
  );
};

export default Block5;
