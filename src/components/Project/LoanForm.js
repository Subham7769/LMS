import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import Select from "react-select";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import toast, { Toaster } from "react-hot-toast";
import { Failed, Passed } from "../Toasts";

const LoanForm = () => {
  const [ProjectData, setProjectData] = useState([]);
  const { projectId } = useParams();
  const navigate = useNavigate();
  const formattedDate = (date) => {
    return date.substring(0, 10);
  };

  const [name, setName] = useState("");
  const [projectDescription, setprojectDescription] = useState("");
  const [country, setcountry] = useState([]);
  const [location, setlocation] = useState([]);
  const [locationFlag, setLocationFlag] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [currencyName, setcurrencyName] = useState([]);
  const [loanType, setloanType] = useState([]);
  const [minLoanAmt, setMinLoanAmt] = useState("");
  const [maxLoanAmt, setMaxLoanAmt] = useState("");
  const [flatInterestRate, setFlatInterestRate] = useState("");
  const [interestRatePeriod, setInterestRatePeriod] = useState("");
  const [interestPeriodUnit, setInterestPeriodUnit] = useState([]);
  const [gracePeriodDownPayment, setGracePeriodDown] = useState("");
  const [graceForEmis, setGraceForEmis] = useState("");
  const [loanGrace, setLoanGrace] = useState("");
  const [rollOverP, setRollOverP] = useState("");
  const [rollOverF, setRollOverF] = useState("");
  const [rollOverIR, setRollOverIR] = useState("");
  const [lateEMIPenalty, setLateEmiPernalty] = useState("");
  const [maxPaymentAttempt, setMaxPaymentAttempt] = useState("");
  const [rollOverEquation, setRollOverEquation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Card 2
  const [criteria, setCriteria] = useState(ProjectData?.criteria);
  const [minLoanOperator, setMinLoanOperator] = useState("");
  const [minLoanAmount, setMinLoanAmount] = useState(0);
  const [maxLoanOperator, setMaxLoanOperator] = useState("");
  const [maxLoanAmount, setMaxLoanAmount] = useState(0);
  const [tclOperator, setTclOperator] = useState("");
  const [tclAmount, setTclAmount] = useState(0);
  const [minInstallmentsOperator, setMinInstallmentsOperator] = useState("");
  const [minInstallmentsAmount, setMinInstallmentsAmount] = useState(0);
  const [maxInstallmentsOperator, setMaxInstallmentsOperator] = useState("");
  const [maxInstallmentsAmount, setMaxInstallmentsAmount] = useState(0);
  const [serviceFee, setServiceFee] = useState("");
  const [client, setClient] = useState("");
  const [earlyPay, setEarlyPay] = useState(null);
  const [calInterest, setCalInterest] = useState(null);
  const [hasDownPayPer, setHasDownPayPer] = useState(null);
  const [hasDownPayFix, setHasDownPayFix] = useState(null);
  const [tclFee, setTclFee] = useState(true);
  const [tclInterest, setTclInterest] = useState(true);
  const [openLoanOperator, setOpenLoanOperator] = useState("");
  const [openLoanAmount, setOpenLoanAmount] = useState(0);

  const countryOptions = [
    { value: "United States", label: "United States" },
    { value: "Eurozone", label: "Eurozone" },
    { value: "United Kingdom", label: "United Kingdom" },
    { value: "Algeria", label: "Algeria" },
    { value: "Argentina", label: "Argentina" },
    { value: "Australia", label: "Australia" },
    { value: "Austria", label: "Austria" },
    { value: "Bahamas", label: "Bahamas" },
    { value: "Barbados", label: "Barbados" },
    { value: "Belgium", label: "Belgium" },
    { value: "Bermuda", label: "Bermuda" },
    { value: "Brazil", label: "Brazil" },
    { value: "Bulgaria", label: "Bulgaria" },
    { value: "Canada", label: "Canada" },
    { value: "Chile", label: "Chile" },
    { value: "China", label: "China" },
    { value: "Cyprus", label: "Cyprus" },
    { value: "Czech Republic", label: "Czech Republic" },
    { value: "Denmark", label: "Denmark" },
    { value: "Netherlands", label: "Netherlands" },
    { value: "Eastern Caribbean", label: "Eastern Caribbean" },
    { value: "Egypt", label: "Egypt" },
    { value: "Fiji", label: "Fiji" },
    { value: "Finland", label: "Finland" },
    { value: "France", label: "France" },
    { value: "Germany", label: "Germany" },
    { value: "Greece", label: "Greece" },
    { value: "Hong Kong", label: "Hong Kong" },
    { value: "Hungary", label: "Hungary" },
    { value: "Iceland", label: "Iceland" },
    { value: "India", label: "India" },
    { value: "Indonesia", label: "Indonesia" },
    { value: "Ireland", label: "Ireland" },
    { value: "Israel", label: "Israel" },
    { value: "Italy", label: "Italy" },
    { value: "Jamaica", label: "Jamaica" },
    { value: "Japan", label: "Japan" },
    { value: "Jordan", label: "Jordan" },
    { value: "South Korea", label: "South Korea" },
    { value: "Lebanon", label: "Lebanon" },
    { value: "Luxembourg", label: "Luxembourg" },
    { value: "Malaysia", label: "Malaysia" },
    { value: "Mexico", label: "Mexico" },
    { value: "Netherlands", label: "Netherlands" },
    { value: "New Zealand", label: "New Zealand" },
    { value: "Norway", label: "Norway" },
    { value: "Pakistan", label: "Pakistan" },
    { value: "Philippines", label: "Philippines" },
    { value: "Poland", label: "Poland" },
    { value: "Portugal", label: "Portugal" },
    { value: "Romania", label: "Romania" },
    { value: "Russia", label: "Russia" },
    { value: "SA", label: "Saudi Arabia" },
    // { value: "Saudi Arabia", label: "Saudi Arabia" },
    { value: "Singapore", label: "Singapore" },
    { value: "Slovakia", label: "Slovakia" },
    { value: "South Africa", label: "South Africa" },
    { value: "South Korea", label: "South Korea" },
    { value: "Spain", label: "Spain" },
    { value: "Sudan", label: "Sudan" },
    { value: "Sweden", label: "Sweden" },
    { value: "Switzerland", label: "Switzerland" },
    { value: "Taiwan", label: "Taiwan" },
    { value: "Thailand", label: "Thailand" },
    { value: "Trinidad and Tobago", label: "Trinidad and Tobago" },
    { value: "Turkey", label: "Turkey" },
    { value: "Venezuela", label: "Venezuela" },
    { value: "Zambia", label: "Zambia" },
  ];

  const locationOptions = {
    "United States": [
      { value: "NY", label: "New York" },
      { value: "CA", label: "California" },
      { value: "TX", label: "Texas" },
    ],
    Canada: [
      { value: "ON", label: "Ontario" },
      { value: "QC", label: "Quebec" },
      { value: "BC", label: "British Columbia" },
    ],
    Australia: [
      { value: "NSW", label: "New South Wales" },
      { value: "VIC", label: "Victoria" },
      { value: "QLD", label: "Queensland" },
    ],
    SA: [{ value: "Ar Riyad", label: "Ar Riyad" }],
  };

  const currencyOptions = [
    { value: "USD", label: "United States Dollars" },
    { value: "EUR", label: "Euro" },
    { value: "GBP", label: "United Kingdom Pounds" },
    { value: "DZD", label: "Algeria Dinars" },
    { value: "ARP", label: "Argentina Pesos" },
    { value: "AUD", label: "Australia Dollars" },
    { value: "ATS", label: "Austria Schillings" },
    { value: "BSD", label: "Bahamas Dollars" },
    { value: "BBD", label: "Barbados Dollars" },
    { value: "BEF", label: "Belgium Francs" },
    { value: "BMD", label: "Bermuda Dollars" },
    { value: "BRR", label: "Brazil Real" },
    { value: "BGL", label: "Bulgaria Lev" },
    { value: "CAD", label: "Canada Dollars" },
    { value: "CLP", label: "Chile Pesos" },
    { value: "CNY", label: "China Yuan Renmimbi" },
    { value: "CYP", label: "Cyprus Pounds" },
    { value: "CSK", label: "Czech Republic Koruna" },
    { value: "DKK", label: "Denmark Kroner" },
    { value: "NLG", label: "Dutch Guilders" },
    { value: "XCD", label: "Eastern Caribbean Dollars" },
    { value: "EGP", label: "Egypt Pounds" },
    { value: "FJD", label: "Fiji Dollars" },
    { value: "FIM", label: "Finland Markka" },
    { value: "FRF", label: "France Francs" },
    { value: "DEM", label: "Germany Deutsche Marks" },
    { value: "XAU", label: "Gold Ounces" },
    { value: "GRD", label: "Greece Drachmas" },
    { value: "HKD", label: "Hong Kong Dollars" },
    { value: "HUF", label: "Hungary Forint" },
    { value: "ISK", label: "Iceland Krona" },
    { value: "INR", label: "India Rupees" },
    { value: "IDR", label: "Indonesia Rupiah" },
    { value: "IEP", label: "Ireland Punt" },
    { value: "ILS", label: "Israel New Shekels" },
    { value: "ITL", label: "Italy Lira" },
    { value: "JMD", label: "Jamaica Dollars" },
    { value: "JPY", label: "Japan Yen" },
    { value: "JOD", label: "Jordan Dinar" },
    { value: "KRW", label: "Korea (South) Won" },
    { value: "LBP", label: "Lebanon Pounds" },
    { value: "LUF", label: "Luxembourg Francs" },
    { value: "MYR", label: "Malaysia Ringgit" },
    { value: "MXP", label: "Mexico Pesos" },
    { value: "NLG", label: "Netherlands Guilders" },
    { value: "NZD", label: "New Zealand Dollars" },
    { value: "NOK", label: "Norway Kroner" },
    { value: "PKR", label: "Pakistan Rupees" },
    { value: "XPD", label: "Palladium Ounces" },
    { value: "PHP", label: "Philippines Pesos" },
    { value: "XPT", label: "Platinum Ounces" },
    { value: "PLZ", label: "Poland Zloty" },
    { value: "PTE", label: "Portugal Escudo" },
    { value: "ROL", label: "Romania Leu" },
    { value: "RUR", label: "Russia Rubles" },
    { value: "SAR", label: "Saudi Arabia Riyal" },
    { value: "XAG", label: "Silver Ounces" },
    { value: "SGD", label: "Singapore Dollars" },
    { value: "SKK", label: "Slovakia Koruna" },
    { value: "ZAR", label: "South Africa Rand" },
    { value: "KRW", label: "South Korea Won" },
    { value: "ESP", label: "Spain Pesetas" },
    { value: "XDR", label: "Special Drawing Right (IMF)" },
    { value: "SDD", label: "Sudan Dinar" },
    { value: "SEK", label: "Sweden Krona" },
    { value: "CHF", label: "Switzerland Francs" },
    { value: "TWD", label: "Taiwan Dollars" },
    { value: "THB", label: "Thailand Baht" },
    { value: "TTD", label: "Trinidad and Tobago Dollars" },
    { value: "TRL", label: "Turkey Lira" },
    { value: "VEB", label: "Venezuela Bolivar" },
    { value: "ZMK", label: "Zambia Kwacha" },
  ];

  const loanTypeOptions = [
    { value: "asset", label: "Asset" },
    { value: "cash", label: "cash" },
  ];

  const interestPeriodOptions = [
    { value: "Monthly", label: "Monthly" },
    { value: "Weekly", label: "Weekly" },
    { value: "Forthnightly", label: "Forthnightly" },
  ];

  const signsOptions = [
    { value: "==", label: "==" },
    { value: "<", label: "<" },
    { value: ">", label: ">" },
    { value: "<=", label: "<=" },
    { value: ">=", label: ">=" },
  ];

  useEffect(() => {
    getProjectInfo();
  }, [projectId]);

  async function getProjectInfo() {
    try {
      const ptoken = localStorage.getItem("projectToken");
      const data = await fetch(
        "http://194.163.172.33:32400/lms-carbon-rule/api/v1/projects/" +
          projectId,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ptoken}`,
          },
        }
      );
      // Check for token expiration or invalid token
      if (data.status === 401 || data.status === 403) {
        localStorage.removeItem("authToken"); // Clear the token
        navigate("/login"); // Redirect to login page
        return; // Stop further execution
      }
      const projectDetails = await data.json();

      // Transform the RAC data to the desired format

      setProjectData(projectDetails);
      //   // console.log(ProjectData);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (ProjectData.length === 0) {
      console.log("Fetching data");
    } else {
      setName(ProjectData.name);
      setprojectDescription(ProjectData.projectDescription);
      const selectedCountry = countryOptions.find(
        (item) => item.value === ProjectData.country
      );
      const formattedcountry = {
        value: ProjectData.country,
        label: selectedCountry ? selectedCountry.label : ProjectData.country,
      };
      const formattedlocation = {
        value: ProjectData.location,
        label: ProjectData.location,
      };
      const selectedCurrency = currencyOptions.find(
        (item) => item.value === ProjectData.currencyName
      );
      const formattedcurrencyName = {
        value: ProjectData.currencyName,
        label: selectedCurrency
          ? selectedCurrency.label
          : ProjectData.currencyName,
      };
      const formattedloanType = {
        value: ProjectData.loanType,
        label: ProjectData.loanType,
      };
      setcountry(formattedcountry);
      setlocation(formattedlocation);
      setcurrencyName(formattedcurrencyName);
      setloanType(formattedloanType);
      setFlatInterestRate(ProjectData.flatInterestRate);
      setInterestRatePeriod(ProjectData.interestRatePeriod);
      const formattedInterestRatePeriodUnit = {
        value: ProjectData.interestPeriodUnit,
        label: ProjectData.interestPeriodUnit,
      };
      setInterestPeriodUnit(formattedInterestRatePeriodUnit);
      setGracePeriodDown(ProjectData.downRepaymentGracePeriod);
      setGraceForEmis(ProjectData.emiRepaymentGracePeriod);
      setLoanGrace(ProjectData.loanGracePeriod);
      setRollOverP(ProjectData.rollOverGracePeriod);
      setRollOverF(ProjectData.rollOverPenaltyFactor);
      setRollOverIR(ProjectData.rollOverInterestRate);
      setLateEmiPernalty(ProjectData.lateEmiPenaltyFactor);
      setMaxPaymentAttempt(ProjectData.maxPaymetAttemps);
      setRollOverEquation(null);
      setStartDate(formattedDate(ProjectData.startDate));
      setEndDate(formattedDate(ProjectData.endDate));
      // setStartDate(ProjectData.startDate);
      // setEndDate(ProjectData.endDate);
      setCriteria(ProjectData.criteria);
      setServiceFee(ProjectData.serviceFee);
      setClient(ProjectData.clientIds);
      setEarlyPay(ProjectData.hasEarlyLateRepayment);
      setCalInterest(ProjectData.calculateInterest);
      setHasDownPayPer(ProjectData.downPaymentPercentage);
      setHasDownPayFix(ProjectData.downPaymentFixed);
      setTclFee(ProjectData.tclIncludeFee);
      setTclInterest(ProjectData.tclIncludeInterest);
    }
  }, [ProjectData]);

  useEffect(() => {
    const pattern = /([a-zA-Z]+)\s*(<=|>=|<|>|==)\s*(\d+)/g;

    let match;
    while ((match = pattern.exec(criteria)) !== null) {
      const [_, variable, operator, value] = match;

      const parsedValue = parseInt(value);
      if (isNaN(parsedValue)) {
        console.error(
          `Failed to parse value ${value} for variable ${variable}`
        );
        continue;
      }

      switch (variable) {
        case "loanAmount":
          if (operator === ">=" || operator === ">") {
            const formattedMinLoanOperator = {
              value: operator,
              label: operator,
            };
            setMinLoanOperator(formattedMinLoanOperator);
            setMinLoanAmount(parsedValue);
          } else if (operator === "<=" || operator === "<") {
            const formattedMaxLoanOperator = {
              value: operator,
              label: operator,
            };
            setMaxLoanOperator(formattedMaxLoanOperator);
            setMaxLoanAmount(parsedValue);
          }
          break;
        case "tcl":
          const formattedTCL = {
            value: operator,
            label: operator,
          };
          setTclOperator(formattedTCL);
          setTclAmount(parsedValue);
          break;
        case "numberOfInstallments":
          if (operator === ">=" || operator === ">") {
            const formattedMinInstallmentOperator = {
              value: operator,
              label: operator,
            };
            setMinInstallmentsOperator(formattedMinInstallmentOperator);
            setMinInstallmentsAmount(parsedValue);
          } else if (operator === "<=" || operator === "<") {
            const formattedMaxInstallmentOperator = {
              value: operator,
              label: operator,
            };
            setMaxInstallmentsOperator(formattedMaxInstallmentOperator);
            setMaxInstallmentsAmount(parsedValue);
          }
          break;
        case "freqCap":
          const formattedOpenLoanOperator = {
            value: operator,
            label: operator,
          };
          setOpenLoanOperator(formattedOpenLoanOperator);
          setOpenLoanAmount(parsedValue);
          break;
        default:
          break;
      }
    }
  }, [criteria]);

  useEffect(() => {
    if (country) {
      setFilteredLocations(locationOptions[country.value] || []);
      if (locationFlag) {
        setlocation(null);
      }
    } else {
      setFilteredLocations([]);
    }
  }, [country]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const positiveIntegerFields = [
      "interestRatePeriod",
      "gracePeriodDownPayment",
      "gracePeriodEMIs",
      "loanGracePeriod",
      "rollOverPeriod",
    ];

    if (positiveIntegerFields.includes(name)) {
      const isPositiveInteger = /^[1-9]\d*$/.test(value);
      if (!isPositiveInteger) {
        alert("Please enter a positive integer.");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    const formattedstartDate = `${startDate} 00:00:00`;
    const formattedendDate = `${endDate} 00:00:00`;
    const payload = {
      projectId: projectId,
      startDate: formattedstartDate,
      endDate: formattedendDate,
      projectTimeZone: ProjectData.projectTimeZone,
      paymentOption: ProjectData.paymentOption,
      bearers: ProjectData.bearers,
      currencyName: currencyName.value,
      criteria: `tcl ${tclOperator.value} ${tclAmount} and loanAmount ${minLoanOperator.value} ${minLoanAmount} and loanAmount ${maxLoanOperator.value} ${maxLoanAmount} and numberOfInstallments ${minInstallmentsOperator.value} ${minInstallmentsAmount} and numberOfInstallments ${maxInstallmentsOperator.value} ${maxInstallmentsAmount} and freqCap ${openLoanOperator.value} ${openLoanAmount}`,
      flatInterestRate: flatInterestRate,
      interestRatePeriod: interestRatePeriod,
      country: country.value,
      location: location.value,
      projectDescription: projectDescription,
      interestPeriodUnit: interestPeriodUnit.value,
      loanType: loanType.value,
      lateRepaymentPenalty: "0.0%",
      earlyRepaymentDiscount: "0",
      maxPaymetAttemps: maxPaymentAttempt,
      hasDownPayment: ProjectData.hasDownPayment,
      serviceFee: "0",
      clientIds: ProjectData.clientIds,
      downRepaymentGracePeriod: gracePeriodDownPayment,
      emiRepaymentGracePeriod: graceForEmis,
      loanGracePeriod: loanGrace,
      rollOverGracePeriod: rollOverP,
      rollOverPenaltyFactor: rollOverF,
      lateEmiPenaltyFactor: lateEMIPenalty,
      rollOverInterestRate: rollOverIR,
      hasEarlyLateRepayment: earlyPay,
      name: name,
      calculateInterest: calInterest,
      managementFee: "1%",
      vatFee: "15%",

      // projectOption: {
      //   tclOperation: tclOperator,
      //   tclValue: tclAmount,
      //   arpuOperation: "",
      //   arpuValue: null,
      //   aspuOperation: "",
      //   aspuValue: null,
      // },

      // rollOverEquation: {
      //   equation: null,
      //   variables: null,
      // },
      // serviceFee: serviceFee,
      // tclIncludeFee: false,
      // tclIncludeInterest: false,
    };
    try {
      const authToken = localStorage.getItem("projectToken");
      const response = await fetch(
        `http://194.163.172.33:32400/lms-carbon-rule/api/v1/projects`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast.custom((t) => (
          <Failed
            t={t}
            toast={toast}
            title={"Update Failed"}
            message={errorData.message}
          />
        ));
        throw new Error(errorData.message || "Failed to update the project");
      } else if (response.ok) {
        toast.custom((t) => (
          <Passed
            t={t}
            toast={toast}
            title={"Update Successful"}
            message={"The data was updated successfully"}
          />
        ));
      }
      const responseData = await response.json();
      console.log("Project updated successfully:", responseData);
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const handleIRPChange = (e) => {
    if (handleChange(e)) {
      setInterestRatePeriod(e.target.value);
    }
  };

  const handleGPDPChange = (e) => {
    if (handleChange(e)) {
      setGracePeriodDown(e.target.value);
    }
  };

  const handleGPEChange = (e) => {
    if (handleChange(e)) {
      setGraceForEmis(e.target.value);
    }
  };

  const handleLGPChange = (e) => {
    if (handleChange(e)) {
      setLoanGrace(e.target.value);
    }
  };

  const handleROPChange = (e) => {
    if (handleChange(e)) {
      setRollOverP(e.target.value);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("projectToken");
      // First, send a DELETE request
      const deleteResponse = await fetch(
        `http://194.163.172.33:32400/lms-carbon-rule/api/v1/projects/${projectId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!deleteResponse.ok) {
        throw new Error("Failed to delete the item");
      }
      navigate("/project/loan-form");
      // Refresh the page after navigation
      window.location.reload();

      // After deletion, fetch the updated data list
    } catch (error) {
      console.error(error);
      // Optionally, handle the error in the UI, such as showing an error message
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <form className="">
        <h2 className="mb-5">
          Name: <b>{ProjectData.name}</b>
        </h2>
        <div className="w-full mx-auto bg-white p-6 shadow-md rounded-xl border border-red-600">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
            {/* Name */}
            <div className="col-span-1">
              <label className="block text-gray-700" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
            </div>

            {/* Description */}
            <div className="col-span-1">
              <label className="block text-gray-700" htmlFor="description">
                Description
              </label>
              <input
                type="text"
                name="projectDescription"
                value={projectDescription}
                onChange={(e) => setprojectDescription(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            {/* Country */}
            <div className="col-span-1">
              <label className="block text-gray-700" htmlFor="country">
                Country
              </label>
              <Select
                name="country"
                className="focus:ring focus:ring-blue-600 pb-2"
                options={countryOptions}
                value={country}
                // isSearchable={false}
                onChange={(country) => {
                  setcountry(country);
                  setLocationFlag(true);
                }}
              />
            </div>

            {/* Location */}
            <div className="col-span-1">
              <label className="block text-gray-700" htmlFor="location">
                Location
              </label>
              <Select
                name="location"
                className="focus:ring focus:ring-blue-600 pb-2"
                options={filteredLocations}
                value={location}
                isSearchable={false}
                onChange={(location) => {
                  setlocation(location);
                }}
              />
            </div>

            {/* Loan Scheme Currency */}
            <div className="col-span-1">
              <label className="block text-gray-700" htmlFor="currency">
                Loan Scheme Currency
              </label>
              <Select
                name="currency"
                className="focus:ring focus:ring-blue-600 pb-2"
                options={currencyOptions}
                value={currencyName}
                isSearchable={false}
                onChange={(currencyName) => {
                  setcurrencyName(currencyName);
                  console.log(currencyName);
                }}
              />
            </div>

            {/* Loan Scheme Type */}
            <div className="col-span-1">
              <label className="block text-gray-700" htmlFor="loanType">
                Loan Scheme Type
              </label>
              <Select
                name="loanType"
                className="focus:ring focus:ring-blue-600 pb-2"
                options={loanTypeOptions}
                value={loanType}
                isSearchable={false}
                isDisabled
              />
            </div>

            {/* Flat Interest Rate */}
            <div className="col-span-1">
              <label className="block text-gray-700" htmlFor="flatInterestRate">
                Flat Interest Rate
              </label>
              <input
                type="number"
                name="flatInterestRate"
                value={flatInterestRate}
                placeholder="6"
                disabled
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
            </div>

            {/* Interest Period Unit */}
            <div className="col-span-1">
              <label
                className="block text-gray-700"
                htmlFor="interestPeriodUnit"
              >
                Interest Period Unit
              </label>
              <Select
                name="interestPeriodUnit"
                className="focus:ring focus:ring-blue-600 pb-2"
                options={interestPeriodOptions}
                value={interestPeriodUnit}
                isDisabled
              />
            </div>

            {/* Interest Rate Period */}
            <div className="col-span-1">
              <label
                className="block text-gray-700"
                htmlFor="interestRatePeriod"
              >
                Interest Rate Period
              </label>
              <input
                type="number"
                name="interestRatePeriod"
                value={interestRatePeriod}
                onChange={handleIRPChange}
                placeholder="30"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            {/* Grace Period For Down Payment (Days) */}
            <div className="col-span-1">
              <label
                className="block text-gray-700"
                htmlFor="gracePeriodDownPayment"
              >
                Grace Period For Down Payment (Days)
              </label>
              <input
                type="number"
                name="gracePeriodDownPayment"
                value={gracePeriodDownPayment}
                onChange={handleGPDPChange}
                placeholder="30"
                disabled
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            {/* Grace Period For EMIs (Days) */}
            <div className="col-span-1">
              <label className="block text-gray-700" htmlFor="gracePeriodEMIs">
                Grace Period For EMIs (Days)
              </label>
              <input
                type="number"
                name="gracePeriodEMIs"
                value={graceForEmis}
                onChange={handleGPEChange}
                placeholder="30"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            {/* Loan Grace Period (Days) */}
            <div className="col-span-1">
              <label className="block text-gray-700" htmlFor="loanGracePeriod">
                Loan Grace Period (Days)
              </label>
              <input
                type="number"
                name="loanGracePeriod"
                value={loanGrace}
                onChange={handleLGPChange}
                placeholder="30"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            {/* Roll Over Period (Days) */}
            <div className="col-span-1">
              <label className="block text-gray-700" htmlFor="rollOverPeriod">
                Roll Over Period (Days)
              </label>
              <input
                type="number"
                name="rollOverPeriod"
                value={rollOverP}
                onChange={handleROPChange}
                placeholder="30"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            {/* Roll Over Fees */}
            <div className="col-span-1">
              <label className="block text-gray-700" htmlFor="rollOverFees">
                Roll Over Fees
              </label>
              <input
                type="number"
                name="rollOverFees"
                value={rollOverF}
                onChange={(e) => setRollOverF(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            {/* Roll Over Interest Rate */}
            <div className="col-span-1">
              <label
                className="block text-gray-700"
                htmlFor="rollOverInterestRate"
              >
                Roll Over Interest Rate
              </label>
              <input
                type="number"
                name="rollOverInterestRate"
                value={rollOverIR}
                onChange={(e) => setRollOverIR(e.target.value)}
                placeholder="6"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            {/* Late EMI Penalty */}
            <div className="col-span-1">
              <label className="block text-gray-700" htmlFor="lateEMIPenalty">
                Late EMI Penalty
              </label>
              <input
                type="number"
                name="lateEMIPenalty"
                value={lateEMIPenalty}
                onChange={(e) => setLateEmiPernalty(e.target.value)}
                placeholder="6"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            {/* Max. Payment Attempt */}
            <div className="col-span-1">
              <label
                className="block text-gray-700"
                htmlFor="maxPaymentAttempt"
              >
                Max. Payment Attempt
              </label>
              <input
                type="number"
                name="maxPaymentAttempt"
                value={maxPaymentAttempt}
                onChange={(e) => setMaxPaymentAttempt(e.target.value)}
                placeholder="2"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            {/* Roll Over Equation */}
            <div className="col-span-1">
              <label className="block text-gray-700" htmlFor="rollOverEquation">
                Roll Over Equation
              </label>
              <input
                type="number"
                name="rollOverEquation"
                value={rollOverEquation}
                placeholder="Roll Over Equation"
                disabled
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            {/* Start Date */}
            <div className="col-span-1">
              <label className="block text-gray-700" htmlFor="startDate">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            {/* End Date */}
            <div className="col-span-1">
              <label className="block text-gray-700" htmlFor="endDate">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div className="w-full mx-auto bg-white p-6 mt-8 shadow-md rounded-xl border border-red-600">
          <div className="grid grid-cols-2 gap-5 mb-[24px]">
            {/* Loan Amount */}
            <div>
              <label className="block text-gray-700" htmlFor="loanAmount">
                Loan Amount
              </label>
              <div className="flex items-center space-x-2">
                <Select
                  name="loanAmount"
                  defaultValue={signsOptions[0]}
                  className="block w-full max-w-20 rounded-md leading-normal text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm"
                  options={signsOptions}
                  value={minLoanOperator}
                  onChange={(e) => setMinLoanOperator(e)}
                />
                <input
                  type="number"
                  name="minLoanAmt"
                  value={minLoanAmount}
                  onChange={(e) => setMinLoanAmount(e.target.value)}
                  placeholder="Min"
                  className="block w-full rounded-md border-0 py-[8px] leading-normal text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                />
                <Select
                  name="sign2"
                  defaultValue={signsOptions[0]}
                  className="block w-full max-w-20 rounded-md leading-normal text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm"
                  options={signsOptions}
                  value={maxLoanOperator}
                  onChange={(e) => setMaxLoanOperator(e)}
                />
                <input
                  type="number"
                  name="maxLoanAmt"
                  value={maxLoanAmount}
                  onChange={(e) => setMaxLoanAmount(e.target.value)}
                  placeholder="Max"
                  className="block w-full rounded-md border-0 py-[9px] leading-normal text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            {/* Number of Installments */}
            <div>
              <label className="block text-gray-700" htmlFor="loanAmount">
                Number of Installments
              </label>
              <div className="flex items-center space-x-2">
                <Select
                  name="sign1"
                  defaultValue={signsOptions[0]}
                  options={signsOptions}
                  className="block w-full max-w-20 rounded-md leading-normal text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm"
                  value={minInstallmentsOperator}
                  onChange={(e) => {
                    setMinInstallmentsOperator(e);
                  }}
                />
                <input
                  type="number"
                  name="min"
                  value={minInstallmentsAmount}
                  onChange={(e) => setMinInstallmentsAmount(e.target.value)}
                  placeholder="Min"
                  className="block w-full rounded-md border-0 leading-normal text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                />
                <Select
                  name="sign2"
                  defaultValue={signsOptions[0]}
                  className="block w-full max-w-20 rounded-md leading-normal text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm"
                  options={signsOptions}
                  value={maxInstallmentsOperator}
                  onChange={(e) => setMaxInstallmentsOperator(e)}
                />
                <input
                  type="number"
                  name="max"
                  value={maxInstallmentsAmount}
                  onChange={(e) => setMaxInstallmentsAmount(e.target.value)}
                  placeholder="Max"
                  className="block w-full rounded-md border-0 leading-normal text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-5">
            <div className="">
              <label className="block text-gray-700" htmlFor="loanSchemeTCL">
                Loan Scheme TCL
              </label>
              <div className="flex items-center space-x-2">
                <Select
                  name="sign5"
                  defaultValue={signsOptions[0]}
                  className="block w-full max-w-20 rounded-md leading-normal text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm"
                  options={signsOptions}
                  value={tclOperator}
                  onChange={(e) => setTclOperator(e)}
                />
                <input
                  type="number"
                  name="loanSchemeTCL"
                  value={tclAmount}
                  onChange={(e) => setTclAmount(e.target.value)}
                  placeholder="TCL"
                  className="block w-full rounded-md border-0 py-[9px] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="">
              <label className="block text-gray-700" htmlFor="totalOpenLoans">
                Total Open Loans
              </label>
              <div className="flex items-center space-x-2">
                <Select
                  name="sign6"
                  defaultValue={signsOptions[0]}
                  className="block w-full max-w-20 rounded-md leading-normal text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm"
                  options={signsOptions}
                  value={openLoanOperator}
                  onChange={(e) => setOpenLoanOperator(e)}
                />
                <input
                  type="number"
                  name="totalOpenLoans"
                  value={openLoanAmount}
                  onChange={(e) => setOpenLoanAmount(e.target.value)}
                  placeholder="Total Open Loans"
                  className="block w-full rounded-md border-0 py-[9px] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="">
              <label className="block text-gray-700" htmlFor="downPayment">
                Down Payment (Fixed or Percent)
              </label>
              <div className="flex items-center space-x-2">
                <Select
                  name="sign5"
                  defaultValue={signsOptions[0]}
                  className="block w-full max-w-20 rounded-md leading-normal text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm"
                  options={signsOptions}
                />
                <input
                  type="number"
                  name="downPayment"
                  value={hasDownPayPer}
                  onChange={(e) => setHasDownPayPer(e.target.value)}
                  placeholder="Down Payment"
                  className="block w-full rounded-md border-0 py-[9px] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="">
              <label className="block text-gray-700" htmlFor="serviceFee">
                Service Fee
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  name="serviceFee"
                  value={serviceFee}
                  onChange={(e) => setServiceFee(e.target.value)}
                  placeholder="Service Fee"
                  className="block w-full rounded-md border-0 py-[9px] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mx-auto bg-white shadow-md rounded-xl border border-red-600 p-6 mt-8">
          <div className="gap-5">
            <div>
              <label className="block text-gray-700" htmlFor="client">
                Client
              </label>
              <textarea
                type="text"
                name="client"
                rows={3}
                value={client}
                placeholder="DarwinClient"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="flex space-x-4 items-center justify-between mt-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="earlyLatePayment"
                  value="earlyLatePayment"
                  checked={earlyPay}
                  onChange={(e) => setEarlyPay(e.target.value)}
                  className="form-checkbox rounded-md"
                />
                <span>Has Early Late Payment</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="calculateInterest"
                  value="calculateInterest"
                  checked={calInterest}
                  onChange={(e) => setCalInterest(e.target.value)}
                  className="form-checkbox rounded-md"
                />
                <span>Calculate Interest</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="tclIncludeFee"
                  value="tclIncludeFee"
                  checked={tclFee}
                  onChange={(e) => setTclFee(e.target.value)}
                  className="form-checkbox rounded-md"
                />
                <span>TCL Include Fee</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="tclIncludeInterest"
                  value="tclIncludeInterest"
                  checked={tclInterest}
                  onChange={(e) => setTclInterest(e.target.value)}
                  className="form-checkbox rounded-md"
                />
                <span>TCL Include Interest</span>
              </label>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-4 mt-4">
          <button
            type="button"
            onClick={handleSubmit}
            className="inline-flex items-center gap-x-1.5 mt-3 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-44 justify-center"
          >
            <CheckCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
            Update
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="inline-flex items-center gap-x-1.5 mt-3 rounded-md bg-red-600 px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-44 justify-center"
          >
            <XCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
            Delete
          </button>
        </div>

        {/* Submit Button */}
      </form>
    </>
  );
};

export default LoanForm;
