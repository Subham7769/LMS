import React, { useEffect } from 'react'
import InputSelect from "../Common/InputSelect/InputSelect";
import InputNumber from "../Common/InputNumber/InputNumber";
import { currencySymbolOptions, dateFormateOptions, thousandSeparatorsOptions, isdCodesOptions } from '../../data/CountryData';
import { fetchAppConfigData, updateAppConfigData, updateAppConfigField } from '../../redux/Slices/appConfigSlice';
import { hasViewOnlyAccess } from '../../utils/roleUtils';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import ContainerTile from '../Common/ContainerTile/ContainerTile';
import Button from "../Common/Button/Button";
import { PlusIcon } from "@heroicons/react/20/solid";



const AppConfig = () => {
  const dispatch = useDispatch();
  const { appConfig,loading } = useSelector((state) => state.appConfig);
  const { roleName } = useSelector((state) => state.auth);


  useEffect(() => {
    dispatch(fetchAppConfigData());
  }, [])

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    dispatch(updateAppConfigField({ name, value: fieldValue }));
  };

  const handleSave = () => {
    dispatch(updateAppConfigData({appConfig}));
  };


  return (
    <>
    <h2 className="text-2xl text-gray-800 dark:text-gray-100 font-bold mb-5">Application Configuration</h2>
    
    <ContainerTile className={"p-5 mb-5"} loading={loading}>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        <InputSelect
          labelName="Currency Symbol"
          inputOptions={currencySymbolOptions}
          inputName="currencySymbol"
          inputValue={appConfig?.currencySymbol}
          onChange={handleChange}
          disabled={hasViewOnlyAccess(roleName)}
          searchable={true}
        />
        <InputNumber
          labelName="Currency Decimal Places"
          inputName="currencyDecimalPlaces"
          inputValue={appConfig?.currencyDecimalPlaces}
          onChange={handleChange}
          placeHolder="3"
          disabled={hasViewOnlyAccess(roleName)}
        />
        <InputSelect
          labelName="Date Format"
          inputOptions={dateFormateOptions}
          inputName="dateFormat"
          inputValue={appConfig?.dateFormat}
          onChange={handleChange}
          disabled={hasViewOnlyAccess(roleName)}
          searchable={true}
        />
        <InputSelect
          labelName="Thousand Separator"
          inputOptions={thousandSeparatorsOptions}
          inputName="thousandSeparator"
          inputValue={appConfig?.thousandSeparator}
          onChange={handleChange}
          disabled={hasViewOnlyAccess(roleName)}
          searchable={true}
        />
        <InputSelect
          labelName="Default ISD Code"
          inputOptions={isdCodesOptions}
          inputName="isdcode"
          inputValue={appConfig?.isdcode}
          onChange={handleChange}
          disabled={hasViewOnlyAccess(roleName)}
          searchable={true}
        />
        <InputNumber
          labelName="Mobile Number Digits"
          inputName="mobileNumberDigits"
          inputValue={appConfig?.mobileNumberDigits}
          onChange={handleChange}
          placeHolder="10"
          maxLength={15} //15 digits
          disabled={hasViewOnlyAccess(roleName)}
        />
      </div>
      <div className='flex justify-end'>
        <Button
          buttonName="Save"
          onClick={() => handleSave()}
          rectangle={true}
        />
      </div>
    </ContainerTile>
    </>
  )
}

export default AppConfig