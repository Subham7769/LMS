import React from 'react'

const Block4 = () => {
  return (
    <>
      <div className="grid grid-cols-[2fr_1fr_6fr_3fr] gap-1 ">
        <div className="text-[14px]">Basic Wage</div>
        <div className="text-[14px]">{">"}=</div>
        <InputNumber
          labelName={"Applicants Basic Salary Percentage From Gross:"}
          inputName="periodInMonths"
          inputValue={appBaseSalary}
          onChange={(e) => setAppBaseSalary(e.target.value)}
          placeholder="0.54"
        />
        <div className="text-[14px]">*Gross Salary</div>
      </div>

      <div className="grid grid-cols-[2fr_1fr_6fr_3fr] gap-1">
        <div className="text-[14px]">Basic Wage</div>
        <div className="text-[14px]">{">"}=</div>
        <InputNumber
          labelName={"Resident Basic Salary Percentage From Gross:"}
          inputName="periodInMonths"
          inputValue={resBaseSalary}
          onChange={(e) => setResBaseSalary(e.target.value)}
          placeholder="0.54"
        />
        <div className="text-[14px]">*Gross Salary</div>
      </div>

      <div className="flex flex-col">
        <Button buttonIcon={CheckCircleIcon} buttonName={"Save"} onClick={handleAddBaseSalary} rectangle={true} className={"self-end mt-auto"} />
      </div>
    </>
  )
}

export default Block4