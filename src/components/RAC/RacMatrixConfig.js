import DeliquencyEq from "../DeliquencyEq";
// import TagsDropdown from "../TagsDropdown";
import ToggleSwitch from "../ToggleSwitch";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useParams } from "react-router-dom";
import useRacRules from "../utils/useRACRules";
import toast, { Toaster } from "react-hot-toast";
import { RowChanged } from "../Toasts";

const animatedComponents = makeAnimated();

const options = [
  { value: "Indian", label: "Indian" },
  { value: "American", label: "American" },
  { value: "Russian", label: "Russian" },
  { value: "African", label: "African" },
  { value: "Japanese", label: "Japanese" },
  { value: "Chinise", label: "Chinise" },
];
const gender = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];
const maritalStatus = [
  { value: "Single", label: "Single" },
  { value: "Married", label: "Married" },
  { value: "Divorced", label: "Divorced" },
  { value: "Widowed", label: "Widowed" },
  { value: "Separated", label: "Separated" },
  { value: "Unknown", label: "Unknown" },
];
const residantialStatus = [
  { value: "Rent", label: "Rent" },
  { value: "Own", label: "Own" },
];
const operatorOptions = [
  { value: "==", label: "==" },
  { value: "<", label: "<" },
  { value: ">", label: ">" },
  { value: "<=", label: "<=" },
  { value: ">=", label: ">=" },
];

const RacMatrixConfig = () => {
  const [selectedOption, setSelctedOption] = useState([]);
  const [GEselectedOption, setGESelctedOption] = useState([]);
  const [MSselectedOption, setMSSelctedOption] = useState([]);
  const [RSselectedOption, setRSSelctedOption] = useState([]);

  // Block 2
  const [selectedOccupation, setSelectedOccupation] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState([]);
  const [selectedSector, setSelectedSector] = useState([]);

  //Block 5,9
  const [GSoperator, setGSoperator] = useState(operatorOptions[3]);
  const [SSoperator, setSSoperator] = useState(operatorOptions[3]);
  const [minActiveOperator, setMinActiveOperator] = useState(
    operatorOptions[3]
  );
  const [maxActiveOperator, setMaxActiveOperator] = useState(
    operatorOptions[3]
  );
  const [losOperator, setLosOperator] = useState(operatorOptions[3]);
  const [dispOperator, setDispOperator] = useState(operatorOptions[3]);
  const [depOperator, setDepOperator] = useState(operatorOptions[3]);
  const [csOperator, setCSOperator] = useState(operatorOptions[3]);
  const [firstWriteOffOperatorOption, setfirstWriteOffOperatorOption] =
    useState(operatorOptions[3]);
  const [secondWriteOffOperator, setSecondWriteOffOperator] = useState(
    operatorOptions[3]
  );
  const [firstAgeOperator, setfirstAgeOperator] = useState(operatorOptions[3]);
  const [secondAgeOperator, setSecondAgeOperator] = useState(
    operatorOptions[3]
  );

  const naURL1 = "/nationality-rule/";
  const naURL2 = "nationality";
  const geURL1 = "/gender-rule/";
  const geURL2 = "gender";
  const msURL1 = "/marital-status-rule/";
  const msURL2 = "maritalStatus";
  const rsURL1 = "/residential-Status-rule/";
  const rsURL2 = "residentialStatus";

  // Block 2
  const occuURL1 = "/occupation-rule/";
  const occuURL2 = "occupation";
  const regURL1 = "/region-rule/";
  const regURL2 = "region";
  const secURL1 = "/sector-rule/";
  const secURL2 = "sector";

  //Block 4,5,9
  const grossURL1 = "/gross-salary-rule/";
  const grossURL2 = "grossSalary";
  const simahURL1 = "/simah-score-rule/";
  const simahURL2 = "simahScore";
  const activeURL1 = "/active-rule/";
  const activeURL2 = "activeRule";
  const losURL1 = "/los-rule/";
  const losURL2 = "los";
  const dispURL1 = "/disposable-income-rule/";
  const dispURL2 = "disposableIncome";
  const depURL1 = "/dependents-rule/";
  const depURL2 = "dependents";
  const csURL1 = "/credit-score-rule/";
  const csURL2 = "creditScore";
  const bsURL1 = "/basic-to-gross-rule/";
  const bsURL2 = "basicToGross";
  const woURL1 = "/write-off-rule/";
  const woURL2 = "writeOff";
  const ageURL1 = "/age-rule/";
  const ageURL2 = "age";

  const [updateFlag, setUpdateFlag] = useState(false);
  const [GEupdateFlag, setGEUpdateFlag] = useState(false);
  const [MSupdateFlag, setMSUpdateFlag] = useState(false);
  const [RSupdateFlag, setRSUpdateFlag] = useState(false);

  // Block 2
  const [OccupationFlag, setOccupationFlag] = useState(false);
  const [RegionFlag, setRegionFlag] = useState(false);
  const [SectorFlag, setSectorFlag] = useState(false);

  //Block 4,5,9
  const [grossFlag, setGrossFlag] = useState(false);
  const [simahFlag, setSimahFlag] = useState(false);
  const [activeFlag, setActiveFlag] = useState(false);
  const [losFlag, setLosFlag] = useState(false);
  const [dispFlag, setDispFlag] = useState(false);
  const [depFlag, setDepFlag] = useState(false);
  const [csFlag, setCsFlag] = useState(false);
  const [baseSalaryFlag, setBaseSalaryFlag] = useState(false);
  const [writeOffFlag, setWriteOffFlag] = useState(false);
  const [ageFlag, setAgeFlag] = useState(false);

  const nationalityData = useRacRules(naURL1, naURL2);
  const genderData = useRacRules(geURL1, geURL2);
  const maritialStatusData = useRacRules(msURL1, msURL2);
  const residentialStatusData = useRacRules(rsURL1, rsURL2);

  // Block 2
  const occupationData = useRacRules(occuURL1, occuURL2);
  const regionData = useRacRules(regURL1, regURL2);
  const sectorData = useRacRules(secURL1, secURL2);

  //Block 4,5,9
  const grossSalaryData = useRacRules(grossURL1, grossURL2);
  const simahScoreData = useRacRules(simahURL1, simahURL2);
  const activeData = useRacRules(activeURL1, activeURL2);
  const losData = useRacRules(losURL1, losURL2);
  const dispData = useRacRules(dispURL1, dispURL2);
  const depData = useRacRules(depURL1, depURL2);
  const csData = useRacRules(csURL1, csURL2);
  const basicToGrossData = useRacRules(bsURL1, bsURL2);
  const writeOffData = useRacRules(woURL1, woURL2);
  const ageData = useRacRules(ageURL1, ageURL2);

  const { racID } = useParams();

  const valuesArray = selectedOption.map((item) => item.value);
  const availableNationalityData = valuesArray;
  const GEvaluesArray = GEselectedOption.map((item) => item.value);
  const availableGenderData = GEvaluesArray;
  const MSvaluesArray = MSselectedOption.map((item) => item.value);
  const availableMaritalStatusData = MSvaluesArray;
  const RSvaluesArray = RSselectedOption.map((item) => item.value);
  const availableResidentialStatusData = RSvaluesArray;

  // Block 2
  const occupationArray = selectedOccupation.map((item) => item.value);
  const regionArray = selectedRegion.map((item) => item.value);
  const sectorArray = selectedSector.map((item) => item.value);

  //Block 5,9
  const availableFirstWriteOffData = firstWriteOffOperatorOption.value;
  const availableSecondWriteOffData = secondWriteOffOperator.value;
  const availableFirstAgeData = firstAgeOperator.value;
  const availableSecondAgeData = secondAgeOperator.value;

  const [ruleNameID, setRuleNameID] = useState("0");
  const [GEruleNameID, setGERuleNameID] = useState("0");
  const [MSruleNameID, setMSRuleNameID] = useState("0");
  const [RSruleNameID, setRSRuleNameID] = useState("0");

  // Block 2
  const [occuRuleNameID, setOccuRuleNameID] = useState("0");
  const [regRuleNameID, setRegRuleNameID] = useState("0");
  const [sectRuleNameID, setSectRuleNameID] = useState("0");

  //Block 4,5,9
  const [appGrossRuleNameID, setAppGrossRuleNameID] = useState("0");
  const [resGrossRuleNameID, setResGrossRuleNameID] = useState("0");
  const [appSimahRuleNameID, setAppSimahRuleNameID] = useState("0");
  const [resSimahRuleNameID, setResSimahRuleNameID] = useState("0");
  const [activeRuleNameID, setActiveRuleNameID] = useState("0");
  const [appLosRuleNameID, setAppLosRuleNameID] = useState("0");
  const [resLosRuleNameID, setResLosRuleNameID] = useState("0");
  const [appDispRuleNameID, setAppDispRuleNameID] = useState("0");
  const [resDispRuleNameID, setResDispRuleNameID] = useState("0");
  const [depRuleNameID, setDepRuleNameID] = useState("0");
  const [csRuleNameID, setCsRuleNameID] = useState("0");
  const [ABSruleNameID, setABSRuleNameID] = useState("0");
  const [RBSruleNameID, setRBSRuleNameID] = useState("0");
  const [AWOruleNameID, setAWORuleNameID] = useState("0");
  const [RWOruleNameID, setRWORuleNameID] = useState("0");
  const [AAgeruleNameID, setAAgeRuleNameID] = useState("0");
  const [RAgeruleNameID, setRAgeRuleNameID] = useState("0");

  // Toggle States
  const [enabledNationality, setEnabledNationality] = useState(false);
  const [enabledGender, setEnabledGender] = useState(false);
  const [enabledMaritalStatus, setEnabledMaritalStatus] = useState(false);
  const [enabledResidential, setEnabledResidential] = useState(false);
  const [enabledOccupation, setEnabledOccupation] = useState(false);
  const [enabledRegion, setEnabledRegion] = useState(false);
  const [enabledSector, setEnabledSector] = useState(false);

  // Block 4,5,9
  const [appBaseSalary, setAppBaseSalary] = useState("");
  const [resBaseSalary, setResBaseSalary] = useState("");
  const [appFirstWriteOff, setAppFirstWriteOff] = useState("");
  const [appSecondWriteOff, setAppSecondWriteOff] = useState("");
  const [resFirstWriteOff, setResFirstWriteOff] = useState("");
  const [resSecondWriteOff, setResSecondWriteOff] = useState("");
  const [appFirstAge, setAppFirstAge] = useState("");
  const [appSecondAge, setAppSecondAge] = useState("");
  const [resFirstAge, setResFirstAge] = useState("");
  const [resSecondAge, setResSecondAge] = useState("");
  const [appGrossSalary, setAppGrossSalary] = useState("");
  const [resGrossSalary, setResGrossSalary] = useState("");
  const [appSimahScore, setAppSimahScore] = useState("");
  const [resSimahScore, setResSimahScore] = useState("");
  const [minActive, setMinActive] = useState("");
  const [maxActive, setMaxActive] = useState("");
  const [appLos, setAppLos] = useState("");
  const [resLos, setResLos] = useState("");
  const [appDisp, setAppDisp] = useState("");
  const [resDisp, setResDisp] = useState("");
  const [dependents, setDependents] = useState("");
  const [cScore, setCScore] = useState("");

  useEffect(() => {
    if (nationalityData.rules && nationalityData.rules.length > 0) {
      const availableNationalities =
        nationalityData.rules[0].availableNationality;
      setUpdateFlag(true);
      if (availableNationalities && availableNationalities.length > 0) {
        const formattedNationalityDataArr = availableNationalities.map(
          (an) => ({
            value: an,
            label: an,
          })
        );
        setSelctedOption(formattedNationalityDataArr);
        setRuleNameID(nationalityData.rules[0].ruleName);
        setEnabledNationality(
          nationalityData.rules[0].ruleUsed === "USED" ? true : false
        );
      }
    }
  }, [nationalityData]);
  useEffect(() => {
    if (genderData.rules && genderData.rules.length > 0) {
      const availableGenderStatuses = genderData.rules[0].availableGender;
      setGEUpdateFlag(true);
      if (availableGenderStatuses && availableGenderStatuses.length > 0) {
        const formattedGenderStatustDataArr = availableGenderStatuses.map(
          (an) => ({
            value: an,
            label: an,
          })
        );
        setGESelctedOption(formattedGenderStatustDataArr);
        setGERuleNameID(genderData.rules[0].ruleName);
        setEnabledGender(
          genderData.rules[0].ruleUsed === "USED" ? true : false
        );
      }
    }
  }, [genderData]);
  useEffect(() => {
    if (maritialStatusData.rules && maritialStatusData.rules.length > 0) {
      const availableMaritalStatuses =
        maritialStatusData.rules[0].availableMaritalStatus;
      setMSUpdateFlag(true);
      if (availableMaritalStatuses && availableMaritalStatuses.length > 0) {
        const formattedMaritalStatustDataArr = availableMaritalStatuses.map(
          (an) => ({
            value: an,
            label: an,
          })
        );
        setMSSelctedOption(formattedMaritalStatustDataArr);
        setMSRuleNameID(maritialStatusData.rules[0].ruleName);
        setEnabledMaritalStatus(
          maritialStatusData.rules[0].ruleUsed === "USED" ? true : false
        );
      }
    }
  }, [maritialStatusData]);
  useEffect(() => {
    if (residentialStatusData.rules && residentialStatusData.rules.length > 0) {
      const availableResidentialStatuses =
        residentialStatusData.rules[0].availableResidentialStatus;
      setRSUpdateFlag(true);
      if (
        availableResidentialStatuses &&
        availableResidentialStatuses.length > 0
      ) {
        const formattedResidentialStatustDataArr =
          availableResidentialStatuses.map((an) => ({
            value: an,
            label: an,
          }));
        setRSSelctedOption(formattedResidentialStatustDataArr);
        setRSRuleNameID(residentialStatusData.rules[0].ruleName);
        setEnabledResidential(
          residentialStatusData.rules[0].ruleUsed === "USED" ? true : false
        );
      }
    }
  }, [residentialStatusData]);
  useEffect(() => {
    if (occupationData.rules && occupationData.rules.length > 0) {
      const availableOccupations = occupationData.rules[0].blockedOccupation;
      setOccupationFlag(true);
      if (availableOccupations && availableOccupations.length > 0) {
        const formattedOccupationDataArr = availableOccupations.map((an) => ({
          value: an,
          label: an,
        }));
        setSelectedOccupation(formattedOccupationDataArr);
        setOccuRuleNameID(occupationData.rules[0].ruleName);
        setEnabledOccupation(
          occupationData.rules[0].ruleUsed === "USED" ? true : false
        );
      }
    }
  }, [occupationData]);
  useEffect(() => {
    if (regionData.rules && regionData.rules.length > 0) {
      const availableRegions = regionData.rules[0].blockedRegions;
      setRegionFlag(true);
      if (availableRegions && availableRegions.length > 0) {
        const formattedRegionDataArr = availableRegions.map((an) => ({
          value: an,
          label: an,
        }));
        setSelectedRegion(formattedRegionDataArr);
        setRegRuleNameID(regionData.rules[0].ruleName);
        setEnabledRegion(
          regionData.rules[0].ruleUsed === "USED" ? true : false
        );
      }
    }
  }, [regionData]);
  useEffect(() => {
    if (sectorData.rules && sectorData.rules.length > 0) {
      const availableSectors = sectorData.rules[0].blockedSectors;
      setSectorFlag(true);
      if (availableSectors && availableSectors.length > 0) {
        const formattedSectorDataArr = availableSectors.map((an) => ({
          value: an,
          label: an,
        }));
        setSelectedSector(formattedSectorDataArr);
        setSectRuleNameID(sectorData.rules[0].ruleName);
        setEnabledSector(
          sectorData.rules[0].ruleUsed === "USED" ? true : false
        );
      }
    }
  }, [sectorData]);
  useEffect(() => {
    if (basicToGrossData.rules && basicToGrossData.rules.length > 1) {
      const availableAppBaseSalary =
        basicToGrossData.rules[1].basicWageToGrossSalary;
      const availableResBaseSalary =
        basicToGrossData.rules[0].basicWageToGrossSalary;
      setBaseSalaryFlag(true);
      if (availableAppBaseSalary && availableResBaseSalary) {
        setAppBaseSalary(availableAppBaseSalary);
        setResBaseSalary(availableResBaseSalary);
        setABSRuleNameID(basicToGrossData.rules[1].ruleName);
        setRBSRuleNameID(basicToGrossData.rules[0].ruleName);
      }
    }
  }, [basicToGrossData]);
  useEffect(() => {
    if (writeOffData.rules && writeOffData.rules.length > 1) {
      const availableAppFirstWriteOff = writeOffData.rules[1].firstWriteOff;
      const availableAppSecondWriteOff = writeOffData.rules[1].secondWriteOff;
      const availableResFirstWriteOff = writeOffData.rules[0].firstWriteOff;
      const availableResSecondWriteOff = writeOffData.rules[0].secondWriteOff;

      setWriteOffFlag(true);

      if (availableAppFirstWriteOff && availableResFirstWriteOff) {
        setAppFirstWriteOff(availableAppFirstWriteOff);
        setAppSecondWriteOff(availableAppSecondWriteOff);
        setResFirstWriteOff(availableResFirstWriteOff);
        setResSecondWriteOff(availableResSecondWriteOff);
        const formattedFirstWriteOf = {
          value: writeOffData.operators.firstWriteOffOperator,
          label: writeOffData.operators.firstWriteOffOperator,
        };
        const formattedSecondWriteOf = {
          value: writeOffData.operators.secondWriteOffOperator,
          label: writeOffData.operators.secondWriteOffOperator,
        };
        setfirstWriteOffOperatorOption(formattedFirstWriteOf);
        setSecondWriteOffOperator(formattedSecondWriteOf);
        setAWORuleNameID(writeOffData.rules[1].ruleName);
        setRWORuleNameID(writeOffData.rules[0].ruleName);
      }
    }
  }, [writeOffData]);
  useEffect(() => {
    if (ageData.rules && ageData.rules.length > 1) {
      const availableAppFirstAge = ageData.rules[1].firstAge;
      const availableAppSecondAge = ageData.rules[1].secondAge;
      const availableResFirstAge = ageData.rules[0].firstAge;
      const availableResSecondAge = ageData.rules[0].secondAge;

      setAgeFlag(true);

      if (availableAppFirstAge && availableResFirstAge) {
        setAppFirstAge(availableAppFirstAge);
        setAppSecondAge(availableAppSecondAge);
        setResFirstAge(availableResFirstAge);
        setResSecondAge(availableResSecondAge);
        const formattedFirstAge = {
          value: ageData.operators.firstAgeOperator,
          label: ageData.operators.firstAgeOperator,
        };
        const formattedSecondAge = {
          value: ageData.operators.secondAgeOperator,
          label: ageData.operators.secondAgeOperator,
        };
        setfirstAgeOperator(formattedFirstAge);
        setSecondAgeOperator(formattedSecondAge);
        setAAgeRuleNameID(ageData.rules[1].ruleName);
        setRAgeRuleNameID(ageData.rules[0].ruleName);
      }
    }
  }, [ageData]);
  useEffect(() => {
    if (grossSalaryData.rules && grossSalaryData.rules.length > 1) {
      const availableAppGrossSalary = grossSalaryData.rules[1].grossSalary;
      const availableResGrossSalary = grossSalaryData.rules[0].grossSalary;
      setGrossFlag(true);
      if (availableAppGrossSalary && availableResGrossSalary) {
        setAppGrossSalary(availableAppGrossSalary);
        setResGrossSalary(availableResGrossSalary);
        const formattedGSO = {
          label: grossSalaryData.operators.grossSalaryOperator,
          value: grossSalaryData.operators.grossSalaryOperator,
        };
        setGSoperator(formattedGSO);
        setAppGrossRuleNameID(grossSalaryData.rules[1].ruleName);
        setResGrossRuleNameID(grossSalaryData.rules[0].ruleName);
      }
    }
  }, [grossSalaryData]);
  useEffect(() => {
    if (simahScoreData.rules && simahScoreData.rules.length > 1) {
      const availableAppSimahScore = simahScoreData.rules[1].simahScore;
      const availableResSimahScore = simahScoreData.rules[0].simahScore;
      setSimahFlag(true);
      if (availableAppSimahScore && availableResSimahScore) {
        setAppSimahScore(availableAppSimahScore);
        setResSimahScore(availableResSimahScore);
        const formattedSSOperator = {
          label: simahScoreData.operators.simahScoreOperator,
          value: simahScoreData.operators.simahScoreOperator,
        };
        setSSoperator(formattedSSOperator);
        setAppSimahRuleNameID(simahScoreData.rules[1].ruleName);
        setResSimahRuleNameID(simahScoreData.rules[0].ruleName);
      }
    }
  }, [simahScoreData]);
  useEffect(() => {
    if (activeData.rules && activeData.rules.length > 0) {
      const availableMinActive = activeData.rules[0].firstGrossSalary;
      const availableMaxActive = activeData.rules[0].secondGrossSalary;
      setActiveFlag(true);
      if (availableMinActive && availableMaxActive) {
        setMinActive(availableMinActive);
        setMaxActive(availableMaxActive);
        const formattedMAOperator = {
          label: activeData.operators.firstGrossSalaryOperator,
          value: activeData.operators.firstGrossSalaryOperator,
        };
        setMinActiveOperator(formattedMAOperator);
        const formattedMaxOperator = {
          label: activeData.operators.secondGrossSalaryOperator,
          value: activeData.operators.secondGrossSalaryOperator,
        };
        setMaxActiveOperator(formattedMaxOperator);
        setActiveRuleNameID(activeData.rules[0].ruleName);
      }
    }
  }, [activeData]);
  useEffect(() => {
    if (losData.rules && losData.rules.length > 1) {
      const availableAppLos = losData.rules[1].lengthOfService;
      const availableResLos = losData.rules[0].lengthOfService;
      setLosFlag(true);
      if (availableAppLos && availableResLos) {
        setAppLos(availableAppLos);
        setResLos(availableResLos);
        const formattedLOSoperator = {
          label: losData.operators.losOperator,
          value: losData.operators.losOperator,
        };
        setLosOperator(formattedLOSoperator);
        setAppLosRuleNameID(losData.rules[1].ruleName);
        setResLosRuleNameID(losData.rules[0].ruleName);
      }
    }
  }, [losData]);
  useEffect(() => {
    if (dispData.rules && dispData.rules.length > 1) {
      const availableAppDisp = dispData.rules[1].disposableIncome;
      const availableResDisp = dispData.rules[0].disposableIncome;
      setDispFlag(true);
      if (availableAppDisp && availableResDisp) {
        setAppDisp(availableAppDisp);
        setResDisp(availableResDisp);
        const formattedDispOperator = {
          label: dispData.operators.disposableIncomeOperator,
          value: dispData.operators.disposableIncomeOperator,
        };
        setDispOperator(formattedDispOperator);
        setAppDispRuleNameID(dispData.rules[1].ruleName);
        setResDispRuleNameID(dispData.rules[0].ruleName);
      }
    }
  }, [dispData]);
  useEffect(() => {
    if (depData.rules && depData.rules.length > 0) {
      const availableDep = depData.rules[0].dependents;
      setDepFlag(true);
      if (availableDep) {
        setDependents(availableDep);
        const formattedDepOperator = {
          label: depData.operators.dependentsOperator,
          value: depData.operators.dependentsOperator,
        };
        setDepOperator(formattedDepOperator);
        setDepRuleNameID(depData.rules[0].ruleName);
      }
    }
  }, [depData]);
  useEffect(() => {
    if (csData.rules && csData.rules.length > 0) {
      const availableCS = csData.rules[0].creditScore;
      setCsFlag(true);
      if (availableCS) {
        setCScore(availableCS);
        const formattedCSoperator = {
          label: csData.operators.creditScoreOperator,
          value: csData.operators.creditScoreOperator,
        };
        setCSOperator(formattedCSoperator);
        setCsRuleNameID(csData.rules[0].ruleName);
      }
    }
  }, [csData]);

  const handleAddFields = async () => {
    const token = localStorage.getItem("authToken"); // Retrieve the authentication token

    // Define the data to be sent with the POST request
    const postData = {
      nationalityRules: [
        {
          availableNationality: availableNationalityData,
          fieldType: "Employer",
          racId: racID,
          result: 1,
          ruleName: ruleNameID,
          ruleUsed: "USED",
        },
      ],
      ruleUsage: [
        {
          racId: racID,
          ruleUsage: enabledNationality ? "USED" : "NOT_USED",
        },
      ],
    };

    try {
      // POST request to add new fields
      const postResponse = await fetch(
        "https://api-dev.lmscarbon.com/carbon-product-service/xtracash/rules/nationality-rule",
        {
          method: updateFlag ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        }
      );

      if (!postResponse.ok) {
        throw new Error(`HTTP error! Status: ${postResponse.status}`);
      } else if (postResponse.ok) {
        toast.custom((t) => <RowChanged t={t} toast={toast} />);
      }
    } catch (error) {
      console.error("Failed to update data:", error);
    }
  };
  const handleAddGEFields = async () => {
    const token = localStorage.getItem("authToken"); // Retrieve the authentication token

    // Define the data to be sent with the POST request
    const postData = {
      genderRules: [
        {
          availableGender: availableGenderData,
          fieldType: "Employer",
          racId: racID,
          result: 1,
          ruleName: GEruleNameID,
          ruleUsed: "USED",
        },
      ],
      ruleUsage: [
        {
          racId: racID,
          ruleUsage: enabledGender ? "USED" : "NOT_USED",
        },
      ],
    };

    try {
      // POST request to add new fields
      const postResponse = await fetch(
        "https://api-dev.lmscarbon.com/carbon-product-service/xtracash/rules/gender-rule",
        {
          method: GEupdateFlag ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        }
      );

      if (!postResponse.ok) {
        throw new Error(`HTTP error! Status: ${postResponse.status}`);
      } else if (postResponse.ok) {
        toast.custom((t) => <RowChanged t={t} toast={toast} />);
      }
    } catch (error) {
      console.error("Failed to update data:", error);
    }
  };
  const handleAddMSFields = async () => {
    const token = localStorage.getItem("authToken"); // Retrieve the authentication token

    // Define the data to be sent with the POST request
    const postData = {
      maritalStatusRules: [
        {
          availableMaritalStatus: availableMaritalStatusData,
          fieldType: "Employer",
          racId: racID,
          result: 1,
          ruleName: MSruleNameID,
          ruleUsed: "USED",
        },
      ],
      ruleUsage: [
        {
          racId: racID,
          ruleUsage: enabledMaritalStatus ? "USED" : "NOT_USED",
        },
      ],
    };

    try {
      // POST request to add new fields
      const postResponse = await fetch(
        "https://api-dev.lmscarbon.com/carbon-product-service/xtracash/rules/marital-status-rule",
        {
          method: MSupdateFlag ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        }
      );

      if (!postResponse.ok) {
        throw new Error(`HTTP error! Status: ${postResponse.status}`);
      } else if (postResponse.ok) {
        toast.custom((t) => <RowChanged t={t} toast={toast} />);
      }
    } catch (error) {
      console.error("Failed to update data:", error);
    }
  };
  const handleAddRSFields = async () => {
    const token = localStorage.getItem("authToken"); // Retrieve the authentication token

    // Define the data to be sent with the POST request
    const postData = {
      residentialStatusRules: [
        {
          availableResidentialStatus: availableResidentialStatusData,
          fieldType: "Employer",
          racId: racID,
          result: 1,
          ruleName: RSruleNameID,
          ruleUsed: "USED",
        },
      ],
      ruleUsage: [
        {
          racId: racID,
          ruleUsage: enabledResidential ? "USED" : "NOT_USED",
        },
      ],
    };

    try {
      // POST request to add new fields
      const postResponse = await fetch(
        "https://api-dev.lmscarbon.com/carbon-product-service/xtracash/rules/residential-Status-rule",
        {
          method: RSupdateFlag ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        }
      );

      if (!postResponse.ok) {
        throw new Error(`HTTP error! Status: ${postResponse.status}`);
      } else if (postResponse.ok) {
        toast.custom((t) => <RowChanged t={t} toast={toast} />);
      }
    } catch (error) {
      console.error("Failed to update data:", error);
    }
  };
  const handleAddBOFields = async () => {
    const token = localStorage.getItem("authToken");

    const postData = {
      occupationRules: [
        {
          blockedOccupation: occupationArray,
          fieldType: "Employer",
          racId: racID,
          result: 1,
          ruleName: occuRuleNameID,
          ruleUsed: "USED",
        },
      ],
      ruleUsage: [
        {
          racId: racID,
          ruleUsage: enabledOccupation ? "USED" : "NOT_USED",
        },
      ],
    };

    try {
      // POST request to add new fields
      const postResponse = await fetch(
        "https://api-dev.lmscarbon.com/carbon-product-service/xtracash/rules/occupation-rule",
        {
          method: OccupationFlag ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        }
      );

      if (!postResponse.ok) {
        throw new Error(`HTTP error! Status: ${postResponse.status}`);
      } else if (postResponse.ok) {
        toast.custom((t) => <RowChanged t={t} toast={toast} />);
      }
    } catch (error) {
      console.error("Failed to update data:", error);
    }
  };
  const handleAddBRFields = async () => {
    const token = localStorage.getItem("authToken");

    const postData = {
      regionRules: [
        {
          blockedRegions: regionArray,
          fieldType: "Employer",
          racId: racID,
          result: 1,
          ruleName: regRuleNameID,
          ruleUsed: "USED",
        },
      ],
      ruleUsage: [
        {
          racId: racID,
          ruleUsage: enabledRegion ? "USED" : "NOT_USED",
        },
      ],
    };

    try {
      // POST request to add new fields
      const postResponse = await fetch(
        "https://api-dev.lmscarbon.com/carbon-product-service/xtracash/rules/region-rule",
        {
          method: RegionFlag ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        }
      );

      if (!postResponse.ok) {
        throw new Error(`HTTP error! Status: ${postResponse.status}`);
      } else if (postResponse.ok) {
        toast.custom((t) => <RowChanged t={t} toast={toast} />);
      }
    } catch (error) {
      console.error("Failed to update data:", error);
    }
  };
  const handleAddBSFields = async () => {
    const token = localStorage.getItem("authToken");

    const postData = {
      ruleUsage: [
        {
          racId: racID,
          ruleUsage: enabledSector ? "USED" : "NOT_USED",
        },
      ],
      sectorRules: [
        {
          blockedSectors: sectorArray,
          fieldType: "Employer",
          racId: racID,
          result: 1,
          ruleName: sectRuleNameID,
          ruleUsed: "USED",
        },
      ],
    };

    try {
      // POST request to add new fields
      const postResponse = await fetch(
        "https://api-dev.lmscarbon.com/carbon-product-service/xtracash/rules/sector-rule",
        {
          method: SectorFlag ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        }
      );

      if (!postResponse.ok) {
        throw new Error(`HTTP error! Status: ${postResponse.status}`);
      } else if (postResponse.ok) {
        toast.custom((t) => <RowChanged t={t} toast={toast} />);
      }
    } catch (error) {
      console.error("Failed to update data:", error);
    }
  };
  const handleAddBaseSalary = async () => {
    const token = localStorage.getItem("authToken"); // Retrieve the authentication token

    // Define the data to be sent with the POST request
    const postData = {
      btgRules: [
        {
          basicWageToGrossSalary: appBaseSalary,
          fieldType: "Employer",
          isSaudi: 0,
          racId: racID,
          result: 1,
          ruleName: ABSruleNameID,
          ruleUsed: "USED",
        },
        {
          basicWageToGrossSalary: resBaseSalary,
          fieldType: "Employer",
          isSaudi: 1,
          racId: racID,
          result: 1,
          ruleName: RBSruleNameID,
          ruleUsed: "USED",
        },
      ],
      operators: {
        basicToGrossOperator: ">=",
      },
      ruleUsage: [
        {
          racId: racID,
          ruleUsage: "USED",
        },
      ],
    };

    try {
      // POST request to add new fields
      const postResponse = await fetch(
        "https://api-dev.lmscarbon.com/carbon-product-service/xtracash/rules/basic-to-gross-rule",
        {
          method: baseSalaryFlag ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        }
      );

      if (!postResponse.ok) {
        throw new Error(`HTTP error! Status: ${postResponse.status}`);
      } else if (postResponse.ok) {
        toast.custom((t) => <RowChanged t={t} toast={toast} />);
      }
    } catch (error) {
      console.error("Failed to update data:", error);
    }
  };
  const handleAddWriteOff = async () => {
    const token = localStorage.getItem("authToken"); // Retrieve the authentication token

    // Define the data to be sent with the POST request
    const postData = {
      operators: {
        firstWriteOffOperator: availableFirstWriteOffData,
        secondWriteOffOperator: availableSecondWriteOffData,
      },
      ruleUsage: [
        {
          racId: racID,
          ruleUsage: "USED",
        },
      ],
      writeOffRules: [
        {
          fieldType: "Employer",
          firstWriteOff: appFirstWriteOff,
          isSaudi: 0,
          racId: racID,
          result: 1,
          ruleName: AWOruleNameID,
          ruleUsed: "USED",
          secondWriteOff: appSecondWriteOff,
        },
        {
          fieldType: "Employer",
          firstWriteOff: resFirstWriteOff,
          isSaudi: 1,
          racId: racID,
          result: 1,
          ruleName: RWOruleNameID,
          ruleUsed: "USED",
          secondWriteOff: resSecondWriteOff,
        },
      ],
    };

    try {
      // POST request to add new fields
      const postResponse = await fetch(
        "https://api-dev.lmscarbon.com/carbon-product-service/xtracash/rules/write-off-rule",
        {
          method: writeOffFlag ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        }
      );

      if (!postResponse.ok) {
        throw new Error(`HTTP error! Status: ${postResponse.status}`);
      } else if (postResponse.ok) {
        toast.custom((t) => <RowChanged t={t} toast={toast} />);
      }
    } catch (error) {
      console.error("Failed to update data:", error);
    }
  };
  const handleAddAge = async () => {
    const token = localStorage.getItem("authToken"); // Retrieve the authentication token

    // Define the data to be sent with the POST request
    const postData = {
      ageRules: [
        {
          fieldType: "Employer",
          firstAge: appFirstAge,
          isSaudi: 0,
          racId: racID,
          result: 1,
          ruleName: AAgeruleNameID,
          ruleUsed: "USED",
          secondAge: appSecondAge,
        },
        {
          fieldType: "Employer",
          firstAge: resFirstAge,
          isSaudi: 1,
          racId: racID,
          result: 1,
          ruleName: RAgeruleNameID,
          ruleUsed: "USED",
          secondAge: resSecondAge,
        },
      ],
      operators: {
        firstAgeOperator: availableFirstAgeData,
        secondAgeOperator: availableSecondAgeData,
      },
      ruleUsage: [
        {
          racId: racID,
          ruleUsage: "USED",
        },
      ],
    };

    try {
      // POST request to add new fields
      const postResponse = await fetch(
        "https://api-dev.lmscarbon.com/carbon-product-service/xtracash/rules/age-rule",
        {
          method: ageFlag ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        }
      );

      if (!postResponse.ok) {
        throw new Error(`HTTP error! Status: ${postResponse.status}`);
      } else if (postResponse.ok) {
        toast.custom((t) => <RowChanged t={t} toast={toast} />);
      }
    } catch (error) {
      console.error("Failed to update data:", error);
    }
  };
  const handleAddGrossSalary = async () => {
    const token = localStorage.getItem("authToken"); // Retrieve the authentication token

    // Define the data to be sent with the POST request
    const postData = {
      grossSalaryRules: [
        {
          fieldType: "Employer",
          grossSalary: appGrossSalary,
          isSaudi: 0,
          racId: racID,
          result: 1,
          ruleName: appGrossRuleNameID,
          ruleUsed: "USED",
        },
        {
          fieldType: "Employer",
          grossSalary: resGrossSalary,
          isSaudi: 1,
          racId: racID,
          result: 1,
          ruleName: resGrossRuleNameID,
          ruleUsed: "USED",
        },
      ],
      operators: {
        grossSalaryOperator: GSoperator.value,
      },
      ruleUsage: [
        {
          racId: racID,
          ruleUsage: "USED",
        },
      ],
    };

    try {
      // POST request to add new fields
      const postResponse = await fetch(
        "https://api-dev.lmscarbon.com/carbon-product-service/xtracash/rules/gross-salary-rule",
        {
          method: grossFlag ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        }
      );

      if (!postResponse.ok) {
        throw new Error(`HTTP error! Status: ${postResponse.status}`);
      } else if (postResponse.ok) {
        toast.custom((t) => <RowChanged t={t} toast={toast} />);
      }
    } catch (error) {
      console.error("Failed to update data:", error);
    }
  };
  const handleAddSimahScore = async () => {
    const token = localStorage.getItem("authToken"); // Retrieve the authentication token

    // Define the data to be sent with the POST request
    const postData = {
      operators: {
        simahScoreOperator: SSoperator.value,
      },
      ruleUsage: [
        {
          racId: racID,
          ruleUsage: "USED",
        },
      ],
      simahScoreRules: [
        {
          fieldType: "Employer",
          isSaudi: 1,
          racId: racID,
          result: 0,
          ruleName: appSimahRuleNameID,
          ruleUsed: "USED",
          simahScore: appSimahScore,
        },
        {
          fieldType: "Employer",
          isSaudi: 1,
          racId: racID,
          result: 1,
          ruleName: resSimahRuleNameID,
          ruleUsed: "USED",
          simahScore: resSimahScore,
        },
      ],
    };

    try {
      // POST request to add new fields
      const postResponse = await fetch(
        "https://api-dev.lmscarbon.com/carbon-product-service/xtracash/rules/simah-score-rule",
        {
          method: simahFlag ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        }
      );

      if (!postResponse.ok) {
        throw new Error(`HTTP error! Status: ${postResponse.status}`);
      } else if (postResponse.ok) {
        toast.custom((t) => <RowChanged t={t} toast={toast} />);
      }
    } catch (error) {
      console.error("Failed to update data:", error);
    }
  };
  const handleAddActive = async () => {
    const token = localStorage.getItem("authToken"); // Retrieve the authentication token

    // Define the data to be sent with the POST request
    const postData = {
      activeRules: [
        {
          fieldType: "Employer",
          firstGrossSalary: minActive,
          racId: racID,
          result: 1,
          ruleName: activeRuleNameID,
          ruleUsed: "USED",
          secondGrossSalary: maxActive,
        },
      ],
      operators: {
        firstGrossSalaryOperator: minActiveOperator.value,
        secondGrossSalaryOperator: maxActiveOperator.value,
      },
      ruleUsage: [
        {
          racId: racID,
          ruleUsage: "USED",
        },
      ],
    };

    try {
      // POST request to add new fields
      const postResponse = await fetch(
        "https://api-dev.lmscarbon.com/carbon-product-service/xtracash/rules/active-rule",
        {
          method: activeFlag ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        }
      );

      if (!postResponse.ok) {
        throw new Error(`HTTP error! Status: ${postResponse.status}`);
      } else if (postResponse.ok) {
        toast.custom((t) => <RowChanged t={t} toast={toast} />);
      }
    } catch (error) {
      console.error("Failed to update data:", error);
    }
  };
  const handleAddLos = async () => {
    const token = localStorage.getItem("authToken"); // Retrieve the authentication token

    // Define the data to be sent with the POST request
    const postData = {
      losRules: [
        {
          fieldType: "Employer",
          isSaudi: 0,
          lengthOfService: appLos,
          racId: racID,
          result: 1,
          ruleName: appLosRuleNameID,
          ruleUsed: "USED",
        },
        {
          fieldType: "Employer",
          isSaudi: 1,
          lengthOfService: resLos,
          racId: racID,
          result: 1,
          ruleName: resLosRuleNameID,
          ruleUsed: "USED",
        },
      ],
      operators: {
        losOperator: losOperator.value,
      },
      ruleUsage: [
        {
          racId: racID,
          ruleUsage: "USED",
        },
      ],
    };

    try {
      // POST request to add new fields
      const postResponse = await fetch(
        "https://api-dev.lmscarbon.com/carbon-product-service/xtracash/rules/los-rule",
        {
          method: losFlag ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        }
      );

      if (!postResponse.ok) {
        throw new Error(`HTTP error! Status: ${postResponse.status}`);
      } else if (postResponse.ok) {
        toast.custom((t) => <RowChanged t={t} toast={toast} />);
      }
    } catch (error) {
      console.error("Failed to update data:", error);
    }
  };
  const handleAddDisp = async () => {
    const token = localStorage.getItem("authToken"); // Retrieve the authentication token

    // Define the data to be sent with the POST request
    const postData = {
      disposableIncomeRules: [
        {
          disposableIncome: appDisp,
          fieldType: "Employer",
          isSaudi: 0,
          racId: racID,
          result: 1,
          ruleName: appDispRuleNameID,
          ruleUsed: "USED",
        },
        {
          disposableIncome: resDisp,
          fieldType: "Employer",
          isSaudi: 1,
          racId: racID,
          result: 1,
          ruleName: resDispRuleNameID,
          ruleUsed: "USED",
        },
      ],
      operators: {
        disposableIncomeOperator: dispOperator.value,
      },
      ruleUsage: [
        {
          racId: racID,
          ruleUsage: "USED",
        },
      ],
    };

    try {
      // POST request to add new fields
      const postResponse = await fetch(
        "https://api-dev.lmscarbon.com/carbon-product-service/xtracash/rules/disposable-income-rule",
        {
          method: dispFlag ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        }
      );

      if (!postResponse.ok) {
        throw new Error(`HTTP error! Status: ${postResponse.status}`);
      } else if (postResponse.ok) {
        toast.custom((t) => <RowChanged t={t} toast={toast} />);
      }
    } catch (error) {
      console.error("Failed to update data:", error);
    }
  };
  const handleAddDependents = async () => {
    const token = localStorage.getItem("authToken"); // Retrieve the authentication token

    // Define the data to be sent with the POST request
    const postData = {
      dependentsRules: [
        {
          dependents: dependents,
          fieldType: "Employer",
          racId: racID,
          result: 1,
          ruleName: depRuleNameID,
          ruleUsed: "USED",
        },
      ],
      operators: {
        dependentsOperator: depOperator.value,
      },
      ruleUsage: [
        {
          racId: racID,
          ruleUsage: "USED",
        },
      ],
    };

    try {
      // POST request to add new fields
      const postResponse = await fetch(
        "https://api-dev.lmscarbon.com/carbon-product-service/xtracash/rules/dependents-rule",
        {
          method: depFlag ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        }
      );

      if (!postResponse.ok) {
        throw new Error(`HTTP error! Status: ${postResponse.status}`);
      } else if (postResponse.ok) {
        toast.custom((t) => <RowChanged t={t} toast={toast} />);
      }
    } catch (error) {
      console.error("Failed to update data:", error);
    }
  };
  const handleAddCscore = async () => {
    const token = localStorage.getItem("authToken"); // Retrieve the authentication token

    // Define the data to be sent with the POST request
    const postData = {
      creditScoreRules: [
        {
          creditScore: cScore,
          fieldType: "Employer",
          racId: racID,
          result: 1,
          ruleName: csRuleNameID,
          ruleUsed: "USED",
        },
      ],
      operators: {
        creditScoreOperator: csOperator.value,
      },
      ruleUsage: [
        {
          racId: racID,
          ruleUsage: "USED",
        },
      ],
    };

    try {
      // POST request to add new fields
      const postResponse = await fetch(
        "https://api-dev.lmscarbon.com/carbon-product-service/xtracash/rules/credit-score-rule",
        {
          method: csFlag ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        }
      );

      if (!postResponse.ok) {
        throw new Error(`HTTP error! Status: ${postResponse.status}`);
      } else if (postResponse.ok) {
        toast.custom((t) => <RowChanged t={t} toast={toast} />);
      }
    } catch (error) {
      console.error("Failed to update data:", error);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex gap-5">
        <div className="flex flex-col max-w-[660px] flex-auto gap-y-5">
          <div className="shadow-md rounded-xl py-6 px-5 border border-red-600">
            <div className="">
              <label htmlFor="nationality" className="block">
                Nationality
              </label>
              <div className="flex items-center justify-between">
                <Select
                  className="w-[230px]"
                  options={options}
                  components={animatedComponents}
                  value={selectedOption}
                  onChange={(selectedOption) => {
                    setSelctedOption(selectedOption);
                  }}
                  isMulti={true}
                />
                <ToggleSwitch
                  enabled={enabledNationality}
                  setEnabled={setEnabledNationality}
                />
                <div className="text-right">
                  <button
                    onClick={handleAddFields}
                    type="button"
                    className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    <CheckCircleIcon
                      className="-ml-0.5 h-5 w-5"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <label htmlFor="gender" className="block">
                Gender
              </label>
              <div className="flex items-center justify-between">
                <Select
                  className="w-[230px]"
                  options={gender}
                  components={animatedComponents}
                  value={GEselectedOption}
                  onChange={(GEselectedOption) => {
                    setGESelctedOption(GEselectedOption);
                  }}
                  isMulti={true}
                />
                <ToggleSwitch
                  enabled={enabledGender}
                  setEnabled={setEnabledGender}
                />
                <div className="text-right">
                  <button
                    onClick={handleAddGEFields}
                    type="button"
                    className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    <CheckCircleIcon
                      className="-ml-0.5 h-5 w-5"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <label htmlFor="maritalStatus" className="block">
                Marital Status
              </label>
              <div className="flex items-center justify-between">
                <Select
                  className="w-[230px]"
                  options={maritalStatus}
                  components={animatedComponents}
                  value={MSselectedOption}
                  onChange={(MSselectedOption) => {
                    setMSSelctedOption(MSselectedOption);
                  }}
                  isMulti={true}
                />
                <ToggleSwitch
                  enabled={enabledMaritalStatus}
                  setEnabled={setEnabledMaritalStatus}
                />
                <div className="text-right">
                  <button
                    onClick={handleAddMSFields}
                    type="button"
                    className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    <CheckCircleIcon
                      className="-ml-0.5 h-5 w-5"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <label htmlFor="residantialStatus" className="block">
                Residential Status
              </label>
              <div className="flex items-center justify-between">
                <Select
                  className="w-[230px]"
                  options={residantialStatus}
                  components={animatedComponents}
                  value={RSselectedOption}
                  onChange={(RSselectedOption) => {
                    setRSSelctedOption(RSselectedOption);
                  }}
                  isMulti={true}
                />
                <ToggleSwitch
                  enabled={enabledResidential}
                  setEnabled={setEnabledResidential}
                />
                <div className="text-right">
                  <button
                    onClick={handleAddRSFields}
                    type="button"
                    className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    <CheckCircleIcon
                      className="-ml-0.5 h-5 w-5"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="shadow-md rounded-xl py-6 px-5 border border-red-600">
            <div>
              <label htmlFor="blockedOccupation" className="block">
                Blocked Occupation
              </label>
              <div className="flex items-center justify-between">
                <Select
                  className="w-[230px]"
                  options={options}
                  components={animatedComponents}
                  value={selectedOccupation}
                  onChange={(selectedOccupation) => {
                    setSelectedOccupation(selectedOccupation);
                  }}
                  isMulti={true}
                />
                <ToggleSwitch
                  enabled={enabledOccupation}
                  setEnabled={setEnabledOccupation}
                />

                <div className="text-right">
                  <button
                    onClick={handleAddBOFields}
                    type="button"
                    className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    <CheckCircleIcon
                      className="-ml-0.5 h-5 w-5"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <label htmlFor="blockedRegion" className="block">
                Blocked Region
              </label>
              <div className="flex items-center justify-between">
                <Select
                  className="w-[230px]"
                  options={options}
                  components={animatedComponents}
                  value={selectedRegion}
                  onChange={(selectedRegion) => {
                    setSelectedRegion(selectedRegion);
                  }}
                  isMulti={true}
                />
                <ToggleSwitch
                  enabled={enabledRegion}
                  setEnabled={setEnabledRegion}
                />

                <div className="text-right">
                  <button
                    onClick={handleAddBRFields}
                    type="button"
                    className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    <CheckCircleIcon
                      className="-ml-0.5 h-5 w-5"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <label htmlFor="blockedSector" className="block">
                Blocked Sector
              </label>
              <div className="flex items-center justify-between">
                <Select
                  className="w-[230px]"
                  options={options}
                  components={animatedComponents}
                  value={selectedSector}
                  onChange={(selectedSector) => {
                    setSelectedSector(selectedSector);
                  }}
                  isMulti={true}
                />
                <ToggleSwitch
                  enabled={enabledSector}
                  setEnabled={setEnabledSector}
                />

                <div className="text-right">
                  <button
                    onClick={handleAddBSFields}
                    type="button"
                    className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    <CheckCircleIcon
                      className="-ml-0.5 h-5 w-5"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <DeliquencyEq />
          <div className="shadow-md rounded-xl py-6 px-5 border border-red-600">
            <div>
              <label htmlFor="nationality" className="block">
                Applicants Basic Salary Percentage From Gross:
              </label>
              <div className="flex gap-5 items-center mt-2">
                <div>basic wage</div>
                <div>{">"}=</div>
                <div>
                  <input
                    type="number"
                    name="appBaseSalary"
                    value={appBaseSalary}
                    onChange={(e) => setAppBaseSalary(e.target.value)}
                    className="w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="0.54"
                  />
                </div>
                <div>*gross salary</div>
              </div>
            </div>
            <div className="mt-5">
              <label htmlFor="nationality" className="block">
                Resident Basic Salary Percentage From Gross:
              </label>
              <div className="flex gap-3 items-center mt-2">
                <div>basic wage</div>
                <div>{">"}=</div>
                <div>
                  <input
                    type="number"
                    name="number"
                    value={resBaseSalary}
                    onChange={(e) => setResBaseSalary(e.target.value)}
                    className="w-24 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="0.54"
                  />
                </div>
                <div>*gross salary</div>
              </div>
            </div>
            <div className="text-right mt-5">
              <button
                type="button"
                onClick={handleAddBaseSalary}
                className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <CheckCircleIcon
                  className="-ml-0.5 h-5 w-5"
                  aria-hidden="true"
                />
                Save
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-auto gap-y-5 ">
          <div className="shadow-md rounded-xl py-6 px-5 border border-red-600">
            <div className="mb-3">
              <label htmlFor="number" className="block">
                Applicants Minimum Write Off
              </label>
              <div className="flex gap-4">
                <Select
                  className="min-w-20"
                  defaultValue={operatorOptions[3]}
                  options={operatorOptions}
                  value={firstWriteOffOperatorOption}
                  isSearchable={false}
                  onChange={(firstWriteOffOperatorOption) => {
                    setfirstWriteOffOperatorOption(firstWriteOffOperatorOption);
                  }}
                />
                <input
                  type="number"
                  name="number"
                  value={appFirstWriteOff}
                  onChange={(e) => setAppFirstWriteOff(e.target.value)}
                  className="block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="4000"
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="number" className="block">
                Applicants Maximum Write Off
              </label>
              <div className="flex gap-4">
                <Select
                  className="min-w-20"
                  // defaultValue={operatorOptions[3]}
                  options={operatorOptions}
                  value={secondWriteOffOperator}
                  isSearchable={false}
                  onChange={(secondWriteOffOperator) => {
                    setSecondWriteOffOperator(secondWriteOffOperator);
                  }}
                />
                <input
                  type="number"
                  name="number"
                  value={appSecondWriteOff}
                  onChange={(e) => setAppSecondWriteOff(e.target.value)}
                  className="block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="4000"
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="number" className="block">
                Resident Minimum Write Off
              </label>
              <div className="flex gap-4">
                <Select
                  className="min-w-20"
                  // defaultValue={operatorOptions[3]}
                  options={operatorOptions}
                  value={firstWriteOffOperatorOption}
                  isSearchable={false}
                  onChange={(firstWriteOffOperatorOption) => {
                    setfirstWriteOffOperatorOption(firstWriteOffOperatorOption);
                  }}
                />
                <input
                  type="number"
                  name="number"
                  value={resFirstWriteOff}
                  onChange={(e) => setResFirstWriteOff(e.target.value)}
                  className="block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="4000"
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="number" className="block">
                Resident Maximum Write Off
              </label>
              <div className="flex gap-4">
                <Select
                  className="min-w-20"
                  // defaultValue={operatorOptions[3]}
                  options={operatorOptions}
                  value={secondWriteOffOperator}
                  isSearchable={false}
                  onChange={(secondWriteOffOperator) => {
                    setSecondWriteOffOperator(secondWriteOffOperator);
                  }}
                />
                <input
                  type="number"
                  name="number"
                  value={resSecondWriteOff}
                  onChange={(e) => setResSecondWriteOff(e.target.value)}
                  className="block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="4000"
                />
              </div>
            </div>
            <div className="text-right mt-5">
              <button
                type="button"
                onClick={handleAddWriteOff}
                className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <CheckCircleIcon
                  className="-ml-0.5 h-5 w-5"
                  aria-hidden="true"
                />
                Save
              </button>
            </div>
          </div>
          <div className="shadow-md rounded-xl py-6 px-5 border border-red-600">
            <div className="mb-3">
              <label htmlFor="number" className="block">
                Applicants gross salary
              </label>
              <div className="flex gap-4">
                <Select
                  className="min-w-20"
                  options={operatorOptions}
                  value={GSoperator}
                  isSearchable={false}
                  onChange={(selectedOption) => setGSoperator(selectedOption)}
                />
                <input
                  type="number"
                  name="gsnumber1"
                  value={appGrossSalary}
                  onChange={(e) => setAppGrossSalary(e.target.value)}
                  className="block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder={"4000"}
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="number" className="block">
                Resident gross salary
              </label>
              <div className="flex gap-4">
                <Select
                  className="min-w-20"
                  options={operatorOptions}
                  value={GSoperator}
                  isSearchable={false}
                  onChange={(selectedOption) => setGSoperator(selectedOption)}
                />
                <input
                  type="number"
                  name="gsnumber1"
                  value={resGrossSalary}
                  onChange={(e) => setResGrossSalary(e.target.value)}
                  className="block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder={"4000"}
                />
              </div>
            </div>
            <div className="text-right mt-5">
              <button
                type="button"
                onClick={handleAddGrossSalary}
                className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <CheckCircleIcon
                  className="-ml-0.5 h-5 w-5"
                  aria-hidden="true"
                />
                Save
              </button>
            </div>
          </div>
          <div className="shadow-md rounded-xl py-6 px-5 border border-red-600">
            <div className="mb-3">
              <label htmlFor="number" className="block">
                Applicants Credit Bureau Score
              </label>
              <div className="flex gap-4">
                <Select
                  className="min-w-20"
                  options={operatorOptions}
                  value={SSoperator}
                  isSearchable={false}
                  onChange={(selectedOption) => setSSoperator(selectedOption)}
                />
                <input
                  type="number"
                  name="gsnumber1"
                  value={appSimahScore}
                  onChange={(e) => setAppSimahScore(e.target.value)}
                  className="block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder={"4000"}
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="number" className="block">
                Resident Credit Bureau Score
              </label>
              <div className="flex gap-4">
                <Select
                  className="min-w-20"
                  options={operatorOptions}
                  value={SSoperator}
                  isSearchable={false}
                  onChange={(selectedOption) => setSSoperator(selectedOption)}
                />
                <input
                  type="number"
                  name="gsnumber1"
                  value={resSimahScore}
                  onChange={(e) => setResSimahScore(e.target.value)}
                  className="block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder={"4000"}
                />
              </div>
            </div>
            <div className="text-right mt-5">
              <button
                type="button"
                onClick={handleAddSimahScore}
                className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <CheckCircleIcon
                  className="-ml-0.5 h-5 w-5"
                  aria-hidden="true"
                />
                Save
              </button>
            </div>
          </div>
          <div className="shadow-md rounded-xl py-6 px-5 border border-red-600">
            <div className="mb-3">
              <label htmlFor="number" className="block">
                Minimum Active Rule
              </label>
              <div className="flex gap-4">
                <Select
                  className="min-w-20"
                  options={operatorOptions}
                  value={minActiveOperator}
                  isSearchable={false}
                  onChange={(selectedOption) =>
                    setMinActiveOperator(selectedOption)
                  }
                />
                <input
                  type="number"
                  name="gsnumber1"
                  value={minActive}
                  onChange={(e) => setMinActive(e.target.value)}
                  className="block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder={"4000"}
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="number" className="block">
                Maximum Active Rule
              </label>
              <div className="flex gap-4">
                <Select
                  className="min-w-20"
                  options={operatorOptions}
                  value={maxActiveOperator}
                  isSearchable={false}
                  onChange={(selectedOption) =>
                    setMaxActiveOperator(selectedOption)
                  }
                />
                <input
                  type="number"
                  name="gsnumber1"
                  value={maxActive}
                  onChange={(e) => setMaxActive(e.target.value)}
                  className="block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder={"4000"}
                />
              </div>
            </div>
            <div className="text-right mt-5">
              <button
                type="button"
                onClick={handleAddActive}
                className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <CheckCircleIcon
                  className="-ml-0.5 h-5 w-5"
                  aria-hidden="true"
                />
                Save
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-auto gap-y-5">
          <div className="shadow-md rounded-xl py-6 px-5 border border-red-600">
            <div className="mb-3">
              <label htmlFor="number" className="block">
                Applicants Minimum Age
              </label>
              <div className="flex gap-4">
                <Select
                  className="min-w-20"
                  options={operatorOptions}
                  value={firstAgeOperator}
                  isSearchable={false}
                  onChange={(firstAgeOperator) => {
                    setfirstAgeOperator(firstAgeOperator);
                  }}
                />
                <input
                  type="number"
                  name="number"
                  value={appFirstAge}
                  onChange={(e) => setAppFirstAge(e.target.value)}
                  className="block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="40"
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="number" className="block">
                Applicants Maximum Age
              </label>
              <div className="flex gap-4">
                <Select
                  className="min-w-20"
                  options={operatorOptions}
                  value={secondAgeOperator}
                  isSearchable={false}
                  onChange={(secondAgeOperator) => {
                    setSecondAgeOperator(secondAgeOperator);
                  }}
                />
                <input
                  type="number"
                  name="number"
                  value={appSecondAge}
                  onChange={(e) => setAppSecondAge(e.target.value)}
                  className="block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="40"
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="number" className="block">
                Resident Minimum Age
              </label>
              <div className="flex gap-4">
                <Select
                  className="min-w-20"
                  options={operatorOptions}
                  value={firstAgeOperator}
                  isSearchable={false}
                  onChange={(firstAgeOperator) => {
                    setfirstAgeOperator(firstAgeOperator);
                  }}
                />
                <input
                  type="number"
                  name="number"
                  value={resFirstAge}
                  onChange={(e) => setResFirstAge(e.target.value)}
                  className="block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="4000"
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="number" className="block">
                Resident Maximum Age
              </label>
              <div className="flex gap-4">
                <Select
                  className="min-w-20"
                  options={operatorOptions}
                  value={secondAgeOperator}
                  isSearchable={false}
                  onChange={(secondAgeOperator) => {
                    setSecondAgeOperator(secondAgeOperator);
                  }}
                />
                <input
                  type="number"
                  name="number"
                  value={resSecondAge}
                  onChange={(e) => setResSecondAge(e.target.value)}
                  className="block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="4000"
                />
              </div>
            </div>
            <div className="text-right mt-5">
              <button
                onClick={handleAddAge}
                type="button"
                className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <CheckCircleIcon
                  className="-ml-0.5 h-5 w-5"
                  aria-hidden="true"
                />
                Save
              </button>
            </div>
          </div>
          <div className="shadow-md rounded-xl py-6 px-5 border border-red-600">
            <div className="mb-3">
              <label htmlFor="number" className="block">
                Applicants Number Of Working Months
              </label>
              <div className="flex gap-4">
                <Select
                  className="min-w-20"
                  options={operatorOptions}
                  value={losOperator}
                  isSearchable={false}
                  onChange={(selectedOption) => setLosOperator(selectedOption)}
                />
                <input
                  type="number"
                  name="gsnumber1"
                  value={appLos}
                  onChange={(e) => setAppLos(e.target.value)}
                  className="block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder={"4000"}
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="number" className="block">
                Resident Number Of Working Months
              </label>
              <div className="flex gap-4">
                <Select
                  className="min-w-20"
                  options={operatorOptions}
                  value={losOperator}
                  isSearchable={false}
                  onChange={(selectedOption) => setLosOperator(selectedOption)}
                />
                <input
                  type="number"
                  name="gsnumber1"
                  value={resLos}
                  onChange={(e) => setResLos(e.target.value)}
                  className="block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder={"4000"}
                />
              </div>
            </div>
            <div className="text-right mt-5">
              <button
                type="button"
                onClick={handleAddLos}
                className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <CheckCircleIcon
                  className="-ml-0.5 h-5 w-5"
                  aria-hidden="true"
                />
                Save
              </button>
            </div>
          </div>
          <div className="shadow-md rounded-xl py-6 px-5 border border-red-600">
            <div className="mb-3">
              <label htmlFor="number" className="block">
                Applicants Disposableincome
              </label>
              <div className="flex gap-4">
                <Select
                  className="min-w-20"
                  options={operatorOptions}
                  value={dispOperator}
                  isSearchable={false}
                  onChange={(selectedOption) => setDispOperator(selectedOption)}
                />
                <input
                  type="number"
                  name="gsnumber1"
                  value={appDisp}
                  onChange={(e) => setAppDisp(e.target.value)}
                  className="block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder={"4000"}
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="number" className="block">
                Resident Disposableincome
              </label>
              <div className="flex gap-4">
                <Select
                  className="min-w-20"
                  options={operatorOptions}
                  value={dispOperator}
                  isSearchable={false}
                  onChange={(selectedOption) => setDispOperator(selectedOption)}
                />
                <input
                  type="number"
                  name="gsnumber1"
                  value={resDisp}
                  onChange={(e) => setResDisp(e.target.value)}
                  className="block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder={"4000"}
                />
              </div>
            </div>
            <div className="text-right mt-5">
              <button
                type="button"
                onClick={handleAddDisp}
                className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <CheckCircleIcon
                  className="-ml-0.5 h-5 w-5"
                  aria-hidden="true"
                />
                Save
              </button>
            </div>
          </div>
          <div className="shadow-md rounded-xl py-6 px-5 border border-red-600">
            <label htmlFor="number" className="block">
              Dependents
            </label>
            <div className="flex items-center gap-4 justify-between">
              <div className="flex gap-4">
                <Select
                  className="min-w-20"
                  options={operatorOptions}
                  value={depOperator}
                  isSearchable={false}
                  onChange={(selectedOption) => setDepOperator(selectedOption)}
                />
                <input
                  type="number"
                  name="gsnumber1"
                  value={dependents}
                  onChange={(e) => setDependents(e.target.value)}
                  className="block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder={"4000"}
                />
              </div>
            </div>
            <div className="text-right mt-5">
              <button
                onClick={handleAddDependents}
                type="button"
                className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <CheckCircleIcon
                  className="-ml-0.5 h-5 w-5"
                  aria-hidden="true"
                />
                Save
              </button>
            </div>
          </div>
          <div className="shadow-md rounded-xl py-6 px-5 border border-red-600">
            <label htmlFor="number" className="block">
              Credit Score
            </label>
            <div className="flex items-center gap-4 justify-between">
              <div className="flex gap-4">
                <Select
                  className="min-w-20"
                  options={operatorOptions}
                  value={csOperator}
                  isSearchable={false}
                  onChange={(selectedOption) => setCSOperator(selectedOption)}
                />
                <input
                  type="number"
                  name="gsnumber1"
                  value={cScore}
                  onChange={(e) => setCScore(e.target.value)}
                  className="block w-44 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder={"4000"}
                />
              </div>
            </div>
            <div className="text-right mt-5">
              <button
                onClick={handleAddCscore}
                type="button"
                className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <CheckCircleIcon
                  className="-ml-0.5 h-5 w-5"
                  aria-hidden="true"
                />
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RacMatrixConfig;
