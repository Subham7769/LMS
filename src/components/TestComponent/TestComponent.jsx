import React, { useState } from 'react'
import InputSelect from '../Common/InputSelect/InputSelect'
import InputCheckbox from '../Common/InputCheckbox/InputCheckbox'
import Button from '../Common/Button/Button'
import InputNumber from '../Common/InputNumber/InputNumber'

const TestComponent = () => {
  const StringArray = [
    { label: 'nationality', value: 'nationality' },
    { label: 'gender', value: 'gender' },
    { label: 'maritalStatus', value: 'maritalStatus' },
    { label: 'occupation', value: 'occupation' },
    { label: 'region', value: 'region' },
    { label: 'sector', value: 'sector' },
    { label: 'panVerified', value: 'panVerified' },
    { label: 'panStatus', value: 'panStatus' }
  ];

  const NumberArray = [
    { label: 'grossSalary', value: 'grossSalary' },
    { label: 'age', value: 'age' },
    { label: 'creditScore', value: 'creditScore' },
    { label: 'dependents', value: 'dependents' },
    { label: 'disposableIncome', value: 'disposableIncome' },
    { label: 'basicToGross', value: 'basicToGross' },
    { label: 'lengthOfService', value: 'lengthOfService' },
    { label: 'simahScore', value: 'simahScore' },
    { label: 'writeOff', value: 'writeOff' },
    { label: 'activeRule', value: 'activeRule' }
  ];

  const [formData, setFormData] = useState({
    fieldType: '',
    criteriaType: '',
    name: '',
    ruleUsageMap: {
      REGISTRATION: true,
      ELIGIBILITY: true,
      BORROWER_OFFERS: true
    },
    numberCriteriaRangeList: [] // Initially empty, we'll add entries here
  });

  // Handle range input changes
  const handleRangeChange = (e, index) => {
    const { name, checked, type, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      numberCriteriaRangeList: prevData.numberCriteriaRangeList.map((item, idx) => {
        if (index === idx) {
          return {
            ...item,
            [name]: type === 'checkbox' ? checked : value
          };
        }
        return item;
      })
    }));
  };

  // Handle form input changes (like fieldType, criteriaType, and name)
  const handleChange = (e) => {
    const { name, checked, type, value } = e.target;

    if (type === 'checkbox') {
      setFormData({
        ...formData,
        ruleUsageMap: {
          ...formData.ruleUsageMap,
          [name]: checked
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Add a new range entry when the plus button is clicked
  const addRangeEntry = () => {
    setFormData((prevData) => ({
      ...prevData,
      numberCriteriaRangeList: [
        ...prevData.numberCriteriaRangeList,
        {
          minimum: 0,
          maximum: 0,
          resident: false
        }
      ]
    }));
  };

  // Delete a specific range entry based on its index
  const deleteRangeEntry = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      numberCriteriaRangeList: prevData.numberCriteriaRangeList.filter((_, idx) => idx !== index)
    }));
  };

  // Handle the Add Field button click
  const handleAddField = () => {
    if (formData.fieldType === 'NUMBER') {
      addRangeEntry(); // Adds a new range entry when field type is NUMBER
    }
    console.log(formData);
  };
  console.log(formData);

  return (
    <div className='border-2 rounded-lg py-5'>
      <div className='grid grid-cols-1 gap-4 flex-1'>
        <div className={`grid gap-5 px-5 grid-cols-3`}>
          <InputSelect
            labelName='Field Type'
            inputOptions={[
              { label: 'STRING', value: 'STRING' },
              { label: 'NUMBER', value: 'NUMBER' }
            ]}
            inputName='fieldType'
            inputValue={formData?.fieldType}
            onChange={handleChange}
          />
          <InputSelect
            labelName='Criteria Type'
            inputOptions={[
              { label: 'BORROWER_PROFILE', value: 'BORROWER_PROFILE' },
              { label: 'CALCULATED', value: 'CALCULATED' }
            ]}
            inputName='criteriaType'
            inputValue={formData?.criteriaType}
            onChange={handleChange}
          />
          <InputSelect
            labelName='Name'
            inputOptions={formData?.fieldType === 'STRING' ? StringArray : NumberArray}
            inputName='name'
            inputValue={formData?.name}
            onChange={handleChange}
          />
        </div>
        <div className={`grid gap-5 px-5 grid-cols-3`}>
          <InputCheckbox
            labelName='REGISTRATION'
            inputChecked={formData?.ruleUsageMap?.REGISTRATION}
            onChange={handleChange}
            inputName='REGISTRATION'
          />
          <InputCheckbox
            labelName='ELIGIBILITY'
            inputChecked={formData?.ruleUsageMap?.ELIGIBILITY}
            onChange={handleChange}
            inputName='ELIGIBILITY'
          />
          <InputCheckbox
            labelName='BORROWER_OFFERS'
            inputChecked={formData?.ruleUsageMap?.BORROWER_OFFERS}
            onChange={handleChange}
            inputName='BORROWER_OFFERS'
          />
        </div>
        <div className={`grid gap-5 px-5 grid-cols-3 border-b-2 pb-5`}>
        {formData?.fieldType === 'NUMBER' && (
            <Button
              buttonName={'+ Add Range'}
              onClick={addRangeEntry}
              rectangle={true}
            />
          )}
          <Button
            buttonName={'+ Add Section'}
            onClick={() => console.log(formData)}
            rectangle={true}
            className={'bg-yellow-500 hover:bg-yellow-400'}
          />
          <Button
            buttonName={'+ Add Field'}
            onClick={handleAddField}
            rectangle={true}
            className={'bg-green-600 hover:bg-green-500'}
          />
        </div>
      </div>
        {/* Conditional rendering for numberCriteriaRangeList if Field Type is NUMBER */}
        {formData?.fieldType === 'NUMBER' && (
          <div className='flex justify-start flex-wrap gap-5 p-5'>
            {formData.numberCriteriaRangeList.map((range, index) => (
              <div key={index} className={`grid gap-3 p-2 grid-cols-3 border-2 rounded-xl min-w-[250px] w-fit max-w-[400px] relative`}>
                <InputNumber
                  labelName='Minimum'
                  inputName='minimum'
                  inputValue={range.minimum}
                  onChange={(e) => handleRangeChange(e, index)}
                  placeHolder='0'
                />
                <InputNumber
                  labelName='Maximum'
                  inputName='maximum'
                  inputValue={range.maximum}
                  onChange={(e) => handleRangeChange(e, index)}
                  placeHolder='0'
                />
                <InputCheckbox
                  labelName='Resident'
                  inputChecked={range.resident}
                  onChange={(e) => handleRangeChange(e, index)}
                  inputName='resident'
                />
                {formData?.fieldType === 'NUMBER' && (
                  <div className={'flex justify-center items-center absolute -top-3 -right-2 px-2 bg-red-500 rounded-xl font-bold hover:bg-red-400'}
                    onClick={() => deleteRangeEntry(index)}
                    rectangle={true}
                    key={'delete'+index}
                    >
                    x
                  </div>
                )}
              </div>
            ))}

          </div>
        )}
    </div>
  );
};

export default TestComponent;
