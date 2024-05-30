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
  const [lateRepaymentPenalty, setLateRepaymentPenalty] = useState("");
  const [earlyRepaymentDiscount, setEarlyRepaymentDiscount] = useState("");
  const [rollOverPenaltyFactor, setRollOverPenaltyFactor] = useState("");

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
  const [tclFee, setTclFee] = useState(null);
  const [tclInterest, setTclInterest] = useState(null);
  const [openLoanOperator, setOpenLoanOperator] = useState("");
  const [openLoanAmount, setOpenLoanAmount] = useState(0);
  const [managementFee, setManagementFee] = useState("");
  const [vatFee, setVatFee] = useState("");

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
    { value: "Singapore", label: "Singapore" },
    { value: "Slovakia", label: "Slovakia" },
    { value: "South Africa", label: "South Africa" },
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
    Zambia: [
      { value: "Lusaka", label: "Lusaka" },
      { value: "Ndola", label: "Ndola" },
      { value: "Kitwe", label: "Kitwe" },
      { value: "Kabwe", label: "Kabwe" },
      { value: "Chingola", label: "Chingola" },
      { value: "Mufulira", label: "Mufulira" },
      { value: "Livingstone", label: "Livingstone" },
      { value: "Luanshya", label: "Luanshya" },
      { value: "Kasama", label: "Kasama" },
      { value: "Chipata", label: "Chipata" },
      { value: "Kalulushi", label: "Kalulushi" },
      { value: "Mazabuka", label: "Mazabuka" },
      { value: "Chililabombwe", label: "Chililabombwe" },
      { value: "Mongu", label: "Mongu" },
      { value: "Kafue", label: "Kafue" },
      { value: "Choma", label: "Choma" },
      { value: "Kasama", label: "Kasama" },
      { value: "Kapiri Mposhi", label: "Kapiri Mposhi" },
      { value: "Kawambwa", label: "Kawambwa" },
      { value: "Kansanshi", label: "Kansanshi" },
      { value: "Mbala", label: "Mbala" },
      { value: "Chambishi", label: "Chambishi" },
      { value: "Monze", label: "Monze" },
      { value: "Serenje", label: "Serenje" },
      { value: "Mpika", label: "Mpika" },
      { value: "Sesheke", label: "Sesheke" },
      { value: "Mansa", label: "Mansa" },
      { value: "Samfya", label: "Samfya" },
      { value: "Petauke", label: "Petauke" },
      { value: "Chinsali", label: "Chinsali" },
      { value: "Isoka", label: "Isoka" },
      { value: "Choma", label: "Choma" },
      { value: "Kalabo", label: "Kalabo" },
      { value: "Kasempa", label: "Kasempa" },
      { value: "Lundazi", label: "Lundazi" },
      { value: "Mwinilunga", label: "Mwinilunga" },
      { value: "Siavonga", label: "Siavonga" },
      { value: "Chirundu", label: "Chirundu" },
    ],
    Venezuela: [
      { value: "Caracas", label: "Caracas" },
      { value: "Maracaibo", label: "Maracaibo" },
      { value: "Valencia", label: "Valencia" },
      { value: "Barquisimeto", label: "Barquisimeto" },
      { value: "Maracay", label: "Maracay" },
      { value: "Ciudad Guayana", label: "Ciudad Guayana" },
      { value: "San Cristóbal", label: "San Cristóbal" },
      { value: "Maturín", label: "Maturín" },
      { value: "Barcelona", label: "Barcelona" },
      { value: "Puerto La Cruz", label: "Puerto La Cruz" },
      { value: "Los Teques", label: "Los Teques" },
      { value: "Carúpano", label: "Carúpano" },
      { value: "Guarenas", label: "Guarenas" },
      { value: "Barinas", label: "Barinas" },
      { value: "Cabimas", label: "Cabimas" },
      { value: "Ciudad Bolívar", label: "Ciudad Bolívar" },
      { value: "Cumaná", label: "Cumaná" },
      { value: "Mérida", label: "Mérida" },
      { value: "Guanare", label: "Guanare" },
      { value: "Punto Fijo", label: "Punto Fijo" },
      { value: "Puerto Cabello", label: "Puerto Cabello" },
      { value: "Guacara", label: "Guacara" },
      { value: "Los Guayos", label: "Los Guayos" },
      { value: "San Fernando de Apure", label: "San Fernando de Apure" },
      { value: "Santa Teresa del Tuy", label: "Santa Teresa del Tuy" },
      { value: "Cumana", label: "Cumana" },
      { value: "Charallave", label: "Charallave" },
      { value: "Tariba", label: "Tariba" },
      { value: "Coro", label: "Coro" },
      { value: "Trujillo", label: "Trujillo" },
      { value: "La Victoria", label: "La Victoria" },
      { value: "Valera", label: "Valera" },
      { value: "Acarigua", label: "Acarigua" },
      { value: "El Tigre", label: "El Tigre" },
      { value: "Palo Negro", label: "Palo Negro" },
      { value: "Santa Rita", label: "Santa Rita" },
      { value: "Guatire", label: "Guatire" },
      { value: "San Juan de los Morros", label: "San Juan de los Morros" },
      { value: "Machiques", label: "Machiques" },
      { value: "San Felipe", label: "San Felipe" },
      { value: "El Limón", label: "El Limón" },
      { value: "Upata", label: "Upata" },
      { value: "El Vigía", label: "El Vigía" },
    ],
    Turkey: [
      { value: "Istanbul", label: "Istanbul" },
      { value: "Ankara", label: "Ankara" },
      { value: "Izmir", label: "Izmir" },
      { value: "Bursa", label: "Bursa" },
      { value: "Antalya", label: "Antalya" },
      { value: "Adana", label: "Adana" },
      { value: "Konya", label: "Konya" },
      { value: "Gaziantep", label: "Gaziantep" },
      { value: "Diyarbakir", label: "Diyarbakir" },
      { value: "Mersin", label: "Mersin" },
      { value: "Kayseri", label: "Kayseri" },
      { value: "Eskisehir", label: "Eskisehir" },
      { value: "Diyarbakir", label: "Diyarbakir" },
      { value: "Samsun", label: "Samsun" },
      { value: "Denizli", label: "Denizli" },
      { value: "Sanliurfa", label: "Sanliurfa" },
      { value: "Malatya", label: "Malatya" },
      { value: "Sakarya", label: "Sakarya" },
      { value: "Kahramanmaras", label: "Kahramanmaras" },
      { value: "Erzurum", label: "Erzurum" },
      { value: "Van", label: "Van" },
      { value: "Batman", label: "Batman" },
      { value: "Elazig", label: "Elazig" },
      { value: "Sivas", label: "Sivas" },
      { value: "Manisa", label: "Manisa" },
      { value: "Balikesir", label: "Balikesir" },
      { value: "Adiyaman", label: "Adiyaman" },
      { value: "Osmaniye", label: "Osmaniye" },
      { value: "Isparta", label: "Isparta" },
      { value: "Aydin", label: "Aydin" },
      { value: "Trabzon", label: "Trabzon" },
      { value: "Ordu", label: "Ordu" },
      { value: "Corum", label: "Corum" },
      { value: "Aksaray", label: "Aksaray" },
      { value: "Erzincan", label: "Erzincan" },
      { value: "Kutahya", label: "Kutahya" },
      { value: "Siirt", label: "Siirt" },
      { value: "Igdir", label: "Igdir" },
      { value: "Kastamonu", label: "Kastamonu" },
      { value: "Bolu", label: "Bolu" },
      { value: "Sinop", label: "Sinop" },
      { value: "Zonguldak", label: "Zonguldak" },
      { value: "Yozgat", label: "Yozgat" },
      { value: "Rize", label: "Rize" },
      { value: "Tokat", label: "Tokat" },
      { value: "Nigde", label: "Nigde" },
      { value: "Bilecik", label: "Bilecik" },
      { value: "Karaman", label: "Karaman" },
      { value: "Kirikkale", label: "Kirikkale" },
      { value: "Yalova", label: "Yalova" },
      { value: "Edirne", label: "Edirne" },
      { value: "Giresun", label: "Giresun" },
      { value: "Nevsehir", label: "Nevsehir" },
      { value: "Agri", label: "Agri" },
      { value: "Amasya", label: "Amasya" },
      { value: "Mus", label: "Mus" },
      { value: "Artvin", label: "Artvin" },
      { value: "Bayburt", label: "Bayburt" },
      { value: "Kars", label: "Kars" },
      { value: "Kirklareli", label: "Kirklareli" },
      { value: "Bitlis", label: "Bitlis" },
      { value: "Siirt", label: "Siirt" },
      { value: "Sirnak", label: "Sirnak" },
      { value: "Bingol", label: "Bingol" },
      { value: "Tunceli", label: "Tunceli" },
      { value: "Duzce", label: "Duzce" },
    ],
    "Trinidad and Tobago": [
      { value: "Port of Spain", label: "Port of Spain" },
      { value: "San Fernando", label: "San Fernando" },
      { value: "Chaguanas", label: "Chaguanas" },
      { value: "Arima", label: "Arima" },
      { value: "Point Fortin", label: "Point Fortin" },
      { value: "Scarborough", label: "Scarborough" },
      { value: "Tunapuna", label: "Tunapuna" },
      { value: "Sangre Grande", label: "Sangre Grande" },
      { value: "Princes Town", label: "Princes Town" },
      { value: "Rio Claro", label: "Rio Claro" },
      { value: "Penal", label: "Penal" },
      { value: "Siparia", label: "Siparia" },
      { value: "Couva", label: "Couva" },
      { value: "Arouca", label: "Arouca" },
      { value: "Saint Augustine", label: "Saint Augustine" },
      { value: "Mucurapo", label: "Mucurapo" },
      { value: "Petit Valley", label: "Petit Valley" },
      { value: "Mara Valley", label: "Mara Valley" },
      { value: "Toco", label: "Toco" },
      { value: "Carenage", label: "Carenage" },
    ],
    Thailand: [
      { value: "Bangkok", label: "Bangkok" },
      { value: "Nonthaburi", label: "Nonthaburi" },
      { value: "Samut Prakan", label: "Samut Prakan" },
      { value: "Chiang Mai", label: "Chiang Mai" },
      { value: "Udon Thani", label: "Udon Thani" },
      { value: "Nakhon Ratchasima", label: "Nakhon Ratchasima" },
      { value: "Hat Yai", label: "Hat Yai" },
      { value: "Pak Kret", label: "Pak Kret" },
      { value: "Si Racha", label: "Si Racha" },
      { value: "Phuket", label: "Phuket" },
      { value: "Chaophraya Surasak", label: "Chaophraya Surasak" },
      { value: "Nakhon Si Thammarat", label: "Nakhon Si Thammarat" },
      { value: "Bang Yai", label: "Bang Yai" },
      { value: "Khon Kaen", label: "Khon Kaen" },
      { value: "Pak Chong", label: "Pak Chong" },
      { value: "Ubon Ratchathani", label: "Ubon Ratchathani" },
      { value: "Surat Thani", label: "Surat Thani" },
      { value: "Nakhon Pathom", label: "Nakhon Pathom" },
      { value: "Chiang Rai", label: "Chiang Rai" },
      { value: "Rayong", label: "Rayong" },
      { value: "Phra Pradaeng", label: "Phra Pradaeng" },
      { value: "Sakhon Nakhon", label: "Sakhon Nakhon" },
      { value: "Maha Sarakham", label: "Maha Sarakham" },
      { value: "Ratchaburi", label: "Ratchaburi" },
      { value: "Trang", label: "Trang" },
      { value: "Phitsanulok", label: "Phitsanulok" },
      { value: "Ban Lam Luk Ka", label: "Ban Lam Luk Ka" },
      { value: "Samut Sakhon", label: "Samut Sakhon" },
      { value: "Chachoengsao", label: "Chachoengsao" },
      { value: "Clementi", label: "Clementi" },
      { value: "Bang Sao Thong", label: "Bang Sao Thong" },
      { value: "Yala", label: "Yala" },
      { value: "Roi Et", label: "Roi Et" },
      { value: "Phra Nakhon Si Ayutthaya", label: "Phra Nakhon Si Ayutthaya" },
      { value: "Phetchabun", label: "Phetchabun" },
      { value: "Chon Buri", label: "Chon Buri" },
      { value: "Songkhla", label: "Songkhla" },
      { value: "Bang Lamung", label: "Bang Lamung" },
      { value: "Bang Kruai", label: "Bang Kruai" },
      { value: "Pattaya", label: "Pattaya" },
      { value: "Pattani", label: "Pattani" },
      { value: "Lop Buri", label: "Lop Buri" },
      { value: "Ban Phai", label: "Ban Phai" },
      { value: "Ko Samui", label: "Ko Samui" },
      { value: "Sattahip", label: "Sattahip" },
      { value: "Kanchanaburi", label: "Kanchanaburi" },
      { value: "Krathum Baen", label: "Krathum Baen" },
      { value: "Surin", label: "Surin" },
      { value: "Uttaradit", label: "Uttaradit" },
    ],
    Taiwan: [
      { value: "Taipei", label: "Taipei" },
      { value: "New Taipei City", label: "New Taipei City" },
      { value: "Kaohsiung", label: "Kaohsiung" },
      { value: "Taichung", label: "Taichung" },
      { value: "Tainan", label: "Tainan" },
      { value: "Taoyuan City", label: "Taoyuan City" },
      { value: "Hsinchu", label: "Hsinchu" },
      { value: "Keelung", label: "Keelung" },
      { value: "Chiayi", label: "Chiayi" },
      { value: "Changhua City", label: "Changhua City" },
      { value: "Pingtung City", label: "Pingtung City" },
      { value: "Yilan City", label: "Yilan City" },
      { value: "Zhubei", label: "Zhubei" },
      { value: "Douliu", label: "Douliu" },
      { value: "Nantou City", label: "Nantou City" },
      { value: "Taitung City", label: "Taitung City" },
      { value: "Hualien City", label: "Hualien City" },
      { value: "Miaoli City", label: "Miaoli City" },
      { value: "Yilan", label: "Yilan" },
      { value: "Puzi City", label: "Puzi City" },
      { value: "Jincheng", label: "Jincheng" },
      { value: "Magong", label: "Magong" },
      { value: "Changhua", label: "Changhua" },
      { value: "Puli", label: "Puli" },
      { value: "Hualien", label: "Hualien" },
      { value: "Toufen", label: "Toufen" },
      { value: "Chiayi City", label: "Chiayi City" },
      { value: "Nantou", label: "Nantou" },
      { value: "Taitung", label: "Taitung" },
      { value: "Yilan", label: "Yilan" },
      { value: "Penghu", label: "Penghu" },
      { value: "Kinmen", label: "Kinmen" },
      { value: "Lienchiang", label: "Lienchiang" },
    ],
    Switzerland: [
      { value: "Zurich", label: "Zurich" },
      { value: "Geneva", label: "Geneva" },
      { value: "Basel", label: "Basel" },
      { value: "Lausanne", label: "Lausanne" },
      { value: "Bern", label: "Bern" },
      { value: "Winterthur", label: "Winterthur" },
      { value: "Lucerne", label: "Lucerne" },
      { value: "St. Gallen", label: "St. Gallen" },
      { value: "Lugano", label: "Lugano" },
      { value: "Biel/Bienne", label: "Biel/Bienne" },
      { value: "Thun", label: "Thun" },
      { value: "Köniz", label: "Köniz" },
      { value: "La Chaux-de-Fonds", label: "La Chaux-de-Fonds" },
      { value: "Schaffhausen", label: "Schaffhausen" },
      { value: "Fribourg", label: "Fribourg" },
      { value: "Chur", label: "Chur" },
      { value: "Neuchâtel", label: "Neuchâtel" },
      { value: "Vernier", label: "Vernier" },
      { value: "Uster", label: "Uster" },
      { value: "Sion", label: "Sion" },
      { value: "Emmen", label: "Emmen" },
      { value: "Thurgau", label: "Thurgau" },
      { value: "Zug", label: "Zug" },
      { value: "Yverdon-les-Bains", label: "Yverdon-les-Bains" },
      { value: "Schlieren", label: "Schlieren" },
      { value: "Dübendorf", label: "Dübendorf" },
      { value: "Baar", label: "Baar" },
      { value: "Kriens", label: "Kriens" },
      { value: "Rapperswil-Jona", label: "Rapperswil-Jona" },
      { value: "Allschwil", label: "Allschwil" },
      { value: "Bellinzona", label: "Bellinzona" },
      { value: "Wil", label: "Wil" },
      { value: "Renens", label: "Renens" },
      { value: "Nyon", label: "Nyon" },
      { value: "Muttenz", label: "Muttenz" },
      { value: "Vevey", label: "Vevey" },
      { value: "Pully", label: "Pully" },
      {
        value: "Zürich (Kreis 11) / Oerlikon",
        label: "Zürich (Kreis 11) / Oerlikon",
      },
      { value: "Riehen", label: "Riehen" },
      { value: "Volketswil", label: "Volketswil" },
      { value: "Seen (Kreis 3)", label: "Seen (Kreis 3)" },
      {
        value: "Zürich (Kreis 2) / Wollishofen",
        label: "Zürich (Kreis 2) / Wollishofen",
      },
      { value: "Bülach", label: "Bülach" },
    ],
    Sweden: [
      { value: "Stockholm", label: "Stockholm" },
      { value: "Gothenburg", label: "Gothenburg" },
      { value: "Malmö", label: "Malmö" },
      { value: "Uppsala", label: "Uppsala" },
      { value: "Västerås", label: "Västerås" },
      { value: "Örebro", label: "Örebro" },
      { value: "Linköping", label: "Linköping" },
      { value: "Helsingborg", label: "Helsingborg" },
      { value: "Jönköping", label: "Jönköping" },
      { value: "Norrköping", label: "Norrköping" },
      { value: "Lund", label: "Lund" },
      { value: "Umeå", label: "Umeå" },
      { value: "Gävle", label: "Gävle" },
      { value: "Borås", label: "Borås" },
      { value: "Södertälje", label: "Södertälje" },
      { value: "Växjö", label: "Växjö" },
      { value: "Halmstad", label: "Halmstad" },
      { value: "Karlstad", label: "Karlstad" },
      { value: "Eskilstuna", label: "Eskilstuna" },
      { value: "Västerås", label: "Västerås" },
      { value: "Täby", label: "Täby" },
      { value: "Sollentuna", label: "Sollentuna" },
      { value: "Tumba", label: "Tumba" },
      { value: "Trollhättan", label: "Trollhättan" },
      { value: "Borlänge", label: "Borlänge" },
      { value: "Upplands Väsby", label: "Upplands Väsby" },
      { value: "Falun", label: "Falun" },
      { value: "Östersund", label: "Östersund" },
      { value: "Sundsvall", label: "Sundsvall" },
      { value: "Trelleborg", label: "Trelleborg" },
      { value: "Luleå", label: "Luleå" },
      { value: "Huddinge", label: "Huddinge" },
      { value: "Kungsbacka", label: "Kungsbacka" },
      { value: "Kristianstad", label: "Kristianstad" },
      { value: "Kalmar", label: "Kalmar" },
      { value: "Skövde", label: "Skövde" },
      { value: "Karlskrona", label: "Karlskrona" },
      { value: "Varberg", label: "Varberg" },
      { value: "Växjö", label: "Växjö" },
      { value: "Hässleholm", label: "Hässleholm" },
      { value: "Nyköping", label: "Nyköping" },
      { value: "Karlskoga", label: "Karlskoga" },
    ],
    Sudan: [
      { value: "Khartoum", label: "Khartoum" },
      { value: "Omdurman", label: "Omdurman" },
      { value: "Port Sudan", label: "Port Sudan" },
      { value: "Kassala", label: "Kassala" },
      { value: "El Obeid", label: "El Obeid" },
      { value: "Kosti", label: "Kosti" },
      { value: "Wad Madani", label: "Wad Madani" },
      { value: "Nyala", label: "Nyala" },
      { value: "Al Ubayyid", label: "Al Ubayyid" },
      { value: "Kūstī", label: "Kūstī" },
      { value: "Rabak", label: "Rabak" },
      { value: "Sennar", label: "Sennar" },
      { value: "Gedaref", label: "Gedaref" },
      { value: "Atbara", label: "Atbara" },
      { value: "Ad-Damazin", label: "Ad-Damazin" },
      { value: "Kadugli", label: "Kadugli" },
      { value: "Zalingei", label: "Zalingei" },
      { value: "Geneina", label: "Geneina" },
      { value: "Umm Ruwaba", label: "Umm Ruwaba" },
      { value: "As Suki", label: "As Suki" },
      { value: "Būr Sūdān", label: "Būr Sūdān" },
      { value: "Ed Dueim", label: "Ed Dueim" },
      { value: "Haiya", label: "Haiya" },
      { value: "Al-Qadarif", label: "Al-Qadarif" },
      { value: "Maiurno", label: "Maiurno" },
      { value: "Ar Rahad", label: "Ar Rahad" },
      { value: "Al-Fashir", label: "Al-Fashir" },
      { value: "Al-Damazin", label: "Al-Damazin" },
      { value: "Dilling", label: "Dilling" },
      { value: "Tokar", label: "Tokar" },
    ],
    Spain: [
      { value: "Madrid", label: "Madrid" },
      { value: "Barcelona", label: "Barcelona" },
      { value: "Valencia", label: "Valencia" },
      { value: "Seville", label: "Seville" },
      { value: "Zaragoza", label: "Zaragoza" },
      { value: "Málaga", label: "Málaga" },
      { value: "Murcia", label: "Murcia" },
      { value: "Palma", label: "Palma" },
      {
        value: "Las Palmas de Gran Canaria",
        label: "Las Palmas de Gran Canaria",
      },
      { value: "Bilbao", label: "Bilbao" },
      { value: "Alicante", label: "Alicante" },
      { value: "Córdoba", label: "Córdoba" },
      { value: "Valladolid", label: "Valladolid" },
      { value: "Vigo", label: "Vigo" },
      { value: "Gijón", label: "Gijón" },
      {
        value: "L'Hospitalet de Llobregat",
        label: "L'Hospitalet de Llobregat",
      },
      { value: "A Coruña", label: "A Coruña" },
      { value: "Vitoria-Gasteiz", label: "Vitoria-Gasteiz" },
      { value: "Granada", label: "Granada" },
      { value: "Elche", label: "Elche" },
      { value: "Oviedo", label: "Oviedo" },
      { value: "Badalona", label: "Badalona" },
      { value: "Terrassa", label: "Terrassa" },
      { value: "Cartagena", label: "Cartagena" },
      { value: "Jerez de la Frontera", label: "Jerez de la Frontera" },
      { value: "Sabadell", label: "Sabadell" },
      { value: "Móstoles", label: "Móstoles" },
      { value: "Santa Cruz de Tenerife", label: "Santa Cruz de Tenerife" },
      { value: "Alcalá de Henares", label: "Alcalá de Henares" },
      { value: "Fuenlabrada", label: "Fuenlabrada" },
      { value: "Almería", label: "Almería" },
      { value: "Pamplona", label: "Pamplona" },
      { value: "Leganés", label: "Leganés" },
      { value: "San Sebastián", label: "San Sebastián" },
      { value: "Getafe", label: "Getafe" },
      { value: "Burgos", label: "Burgos" },
      { value: "Huelva", label: "Huelva" },
      { value: "Salamanca", label: "Salamanca" },
      { value: "Albacete", label: "Albacete" },
      { value: "Logroño", label: "Logroño" },
      { value: "Badajoz", label: "Badajoz" },
      { value: "Huesca", label: "Huesca" },
      { value: "Tarragona", label: "Tarragona" },
      { value: "León", label: "León" },
      { value: "Cádiz", label: "Cádiz" },
      { value: "Jaén", label: "Jaén" },
      { value: "Ourense", label: "Ourense" },
      { value: "Mérida", label: "Mérida" },
      { value: "Ávila", label: "Ávila" },
      { value: "Segovia", label: "Segovia" },
      { value: "Cuenca", label: "Cuenca" },
      { value: "Lleida", label: "Lleida" },
      { value: "Girona", label: "Girona" },
      { value: "Toledo", label: "Toledo" },
      { value: "Soria", label: "Soria" },
      { value: "Melilla", label: "Melilla" },
      { value: "Ceuta", label: "Ceuta" },
    ],
    "South Africa": [
      { value: "Johannesburg", label: "Johannesburg" },
      { value: "Cape Town", label: "Cape Town" },
      { value: "Durban", label: "Durban" },
      { value: "Pretoria", label: "Pretoria" },
      { value: "Port Elizabeth", label: "Port Elizabeth" },
      { value: "Bloemfontein", label: "Bloemfontein" },
      { value: "East London", label: "East London" },
      { value: "Polokwane", label: "Polokwane" },
      { value: "Nelspruit", label: "Nelspruit" },
      { value: "Kimberley", label: "Kimberley" },
      { value: "Upington", label: "Upington" },
      { value: "Pietermaritzburg", label: "Pietermaritzburg" },
      { value: "Mthatha", label: "Mthatha" },
      { value: "Rustenburg", label: "Rustenburg" },
      { value: "George", label: "George" },
      { value: "Witbank", label: "Witbank" },
      { value: "Mafikeng", label: "Mafikeng" },
      { value: "Vryheid", label: "Vryheid" },
      { value: "Potchefstroom", label: "Potchefstroom" },
      { value: "Welkom", label: "Welkom" },
      { value: "Umtata", label: "Umtata" },
      { value: "Grahamstown", label: "Grahamstown" },
      { value: "Klerksdorp", label: "Klerksdorp" },
      { value: "Vereeniging", label: "Vereeniging" },
      { value: "Sasolburg", label: "Sasolburg" },
      { value: "Queenstown", label: "Queenstown" },
      { value: "Bethlehem", label: "Bethlehem" },
      { value: "Ladysmith", label: "Ladysmith" },
      { value: "Richards Bay", label: "Richards Bay" },
      { value: "Mossel Bay", label: "Mossel Bay" },
      { value: "Kroonstad", label: "Kroonstad" },
      { value: "Knysna", label: "Knysna" },
      { value: "Krugersdorp", label: "Krugersdorp" },
      { value: "Carletonville", label: "Carletonville" },
      { value: "Thohoyandou", label: "Thohoyandou" },
      { value: "Graaff-Reinet", label: "Graaff-Reinet" },
      { value: "Piet Retief", label: "Piet Retief" },
      { value: "Standerton", label: "Standerton" },
      { value: "Boksburg", label: "Boksburg" },
      { value: "Vryburg", label: "Vryburg" },
      { value: "Komatipoort", label: "Komatipoort" },
      { value: "Middelburg", label: "Middelburg" },
      { value: "Hermanus", label: "Hermanus" },
      { value: "Aliwal North", label: "Aliwal North" },
      { value: "KwaDukuza", label: "KwaDukuza" },
      { value: "Lichtenburg", label: "Lichtenburg" },
      { value: "Moorreesburg", label: "Moorreesburg" },
      { value: "Mthatha", label: "Mthatha" },
      { value: "Plettenberg Bay", label: "Plettenberg Bay" },
      { value: "Senekal", label: "Senekal" },
      { value: "Thaba Nchu", label: "Thaba Nchu" },
    ],
    Slovakia: [
      { value: "Bratislava", label: "Bratislava" },
      { value: "Košice", label: "Košice" },
      { value: "Prešov", label: "Prešov" },
      { value: "Žilina", label: "Žilina" },
      { value: "Banská Bystrica", label: "Banská Bystrica" },
      { value: "Nitra", label: "Nitra" },
      { value: "Trnava", label: "Trnava" },
      { value: "Trenčín", label: "Trenčín" },
      { value: "Martin", label: "Martin" },
      { value: "Poprad", label: "Poprad" },
      { value: "Prievidza", label: "Prievidza" },
      { value: "Zvolen", label: "Zvolen" },
      { value: "Žiar nad Hronom", label: "Žiar nad Hronom" },
      { value: "Michalovce", label: "Michalovce" },
      { value: "Spišská Nová Ves", label: "Spišská Nová Ves" },
      { value: "Komárno", label: "Komárno" },
      { value: "Levice", label: "Levice" },
      { value: "Humenné", label: "Humenné" },
      { value: "Bardejov", label: "Bardejov" },
      { value: "Liptovský Mikuláš", label: "Liptovský Mikuláš" },
      { value: "Rimavská Sobota", label: "Rimavská Sobota" },
      { value: "Dunajská Streda", label: "Dunajská Streda" },
      { value: "Veľký Krtíš", label: "Veľký Krtíš" },
      { value: "Senica", label: "Senica" },
      { value: "Považská Bystrica", label: "Považská Bystrica" },
      { value: "Galanta", label: "Galanta" },
      { value: "Nové Zámky", label: "Nové Zámky" },
      { value: "Šaľa", label: "Šaľa" },
      { value: "Brezno", label: "Brezno" },
      { value: "Snina", label: "Snina" },
      { value: "Skalica", label: "Skalica" },
      { value: "Štúrovo", label: "Štúrovo" },
      { value: "Kežmarok", label: "Kežmarok" },
      { value: "Detva", label: "Detva" },
      { value: "Medzilaborce", label: "Medzilaborce" },
      { value: "Svidník", label: "Svidník" },
      { value: "Kysucké Nové Mesto", label: "Kysucké Nové Mesto" },
      { value: "Hlohovec", label: "Hlohovec" },
      { value: "Partizánske", label: "Partizánske" },
      { value: "Dolný Kubín", label: "Dolný Kubín" },
      { value: "Púchov", label: "Púchov" },
      { value: "Žarnovica", label: "Žarnovica" },
      { value: "Ilava", label: "Ilava" },
      { value: "Levoča", label: "Levoča" },
      { value: "Stropkov", label: "Stropkov" },
      { value: "Stará Ľubovňa", label: "Stará Ľubovňa" },
      { value: "Polta", label: "Polta" },
    ],
    SA: [
      { value: "Riyadh", label: "Riyadh" },
      { value: "Jeddah", label: "Jeddah" },
      { value: "Mecca", label: "Mecca" },
      { value: "Medina", label: "Medina" },
      { value: "Dammam", label: "Dammam" },
      { value: "Tabuk", label: "Tabuk" },
      { value: "Al-Khobar", label: "Al-Khobar" },
      { value: "Jubail", label: "Jubail" },
      { value: "Abha", label: "Abha" },
      { value: "Buraidah", label: "Buraidah" },
      { value: "Najran", label: "Najran" },
      { value: "Taif", label: "Taif" },
      { value: "Al Bahah", label: "Al Bahah" },
      { value: "Hail", label: "Hail" },
      { value: "Khamis Mushait", label: "Khamis Mushait" },
      { value: "Al Qunfudhah", label: "Al Qunfudhah" },
      { value: "Al Kharj", label: "Al Kharj" },
      { value: "Al Majma'ah", label: "Al Majma'ah" },
      { value: "Al-Hofuf", label: "Al-Hofuf" },
      { value: "Al-Mubarraz", label: "Al-Mubarraz" },
      { value: "Arar", label: "Arar" },
      { value: "Sakakah", label: "Sakakah" },
      { value: "Jizan", label: "Jizan" },
      { value: "Rafha", label: "Rafha" },
      { value: "Dhahran", label: "Dhahran" },
      { value: "Yanbu", label: "Yanbu" },
      { value: "Al-Bukayriyah", label: "Al-Bukayriyah" },
      { value: "Al-Dawadmi", label: "Al-Dawadmi" },
      { value: "Al-Diriyah", label: "Al-Diriyah" },
      { value: "Badr", label: "Badr" },
      { value: "Baljurashi", label: "Baljurashi" },
      { value: "Bisha", label: "Bisha" },
      { value: "Dumat Al-Jandal", label: "Dumat Al-Jandal" },
      { value: "Dubaiyyah", label: "Dubaiyyah" },
      { value: "Hafr Al-Batin", label: "Hafr Al-Batin" },
      { value: "Khobar", label: "Khobar" },
      { value: "Makkah", label: "Makkah" },
      { value: "Najaf", label: "Najaf" },
      { value: "Onaizah", label: "Onaizah" },
      { value: "Qatif", label: "Qatif" },
      { value: "Qunfudhah", label: "Qunfudhah" },
      { value: "Sabya", label: "Sabya" },
      { value: "Salwa", label: "Salwa" },
      { value: "Sulayyil", label: "Sulayyil" },
      { value: "Turaif", label: "Turaif" },
      { value: "Ula", label: "Ula" },
      { value: "Unaizah", label: "Unaizah" },
      { value: "Yanbu' al Bahr", label: "Yanbu' al Bahr" },
      { value: "Zulfi", label: "Zulfi" },
    ],
    Singapore: [
      { value: "Singapore", label: "Singapore" },
      { value: "Jurong", label: "Jurong" },
      { value: "Woodlands", label: "Woodlands" },
      { value: "Tampines", label: "Tampines" },
      { value: "Ang Mo Kio", label: "Ang Mo Kio" },
      { value: "Hougang", label: "Hougang" },
      { value: "Punggol", label: "Punggol" },
      { value: "Bedok", label: "Bedok" },
      { value: "Choa Chu Kang", label: "Choa Chu Kang" },
      { value: "Bukit Batok", label: "Bukit Batok" },
      { value: "Sengkang", label: "Sengkang" },
      { value: "Yishun", label: "Yishun" },
      { value: "Pasir Ris", label: "Pasir Ris" },
      { value: "Serangoon", label: "Serangoon" },
      { value: "Clementi", label: "Clementi" },
      { value: "Bukit Merah", label: "Bukit Merah" },
      { value: "Bukit Panjang", label: "Bukit Panjang" },
      { value: "Toa Payoh", label: "Toa Payoh" },
      { value: "Queenstown", label: "Queenstown" },
      { value: "Sembawang", label: "Sembawang" },
      { value: "Marine Parade", label: "Marine Parade" },
      { value: "Central Area", label: "Central Area" },
      { value: "Bishan", label: "Bishan" },
      { value: "Geylang", label: "Geylang" },
      { value: "Kallang", label: "Kallang" },
      { value: "Bukit Timah", label: "Bukit Timah" },
      { value: "Novena", label: "Novena" },
      { value: "Outram", label: "Outram" },
      { value: "Rochor", label: "Rochor" },
      { value: "River Valley", label: "River Valley" },
      { value: "Newton", label: "Newton" },
      { value: "Orchard", label: "Orchard" },
      { value: "Tanglin", label: "Tanglin" },
      { value: "Singapore River", label: "Singapore River" },
      { value: "Downtown Core", label: "Downtown Core" },
      { value: "Marina East", label: "Marina East" },
      { value: "Marina South", label: "Marina South" },
      { value: "Marine Parade", label: "Marine Parade" },
      { value: "Straits View", label: "Straits View" },
      { value: "Marina South", label: "Marina South" },
      { value: "Marina East", label: "Marina East" },
      { value: "Bukit Merah", label: "Bukit Merah" },
      { value: "Southern Islands", label: "Southern Islands" },
    ],
    Russia: [
      { value: "Moscow", label: "Moscow" },
      { value: "Saint Petersburg", label: "Saint Petersburg" },
      { value: "Novosibirsk", label: "Novosibirsk" },
      { value: "Yekaterinburg", label: "Yekaterinburg" },
      { value: "Nizhny Novgorod", label: "Nizhny Novgorod" },
      { value: "Kazan", label: "Kazan" },
      { value: "Chelyabinsk", label: "Chelyabinsk" },
      { value: "Omsk", label: "Omsk" },
      { value: "Samara", label: "Samara" },
      { value: "Rostov-on-Don", label: "Rostov-on-Don" },
      { value: "Ufa", label: "Ufa" },
      { value: "Krasnoyarsk", label: "Krasnoyarsk" },
      { value: "Voronezh", label: "Voronezh" },
      { value: "Perm", label: "Perm" },
      { value: "Volgograd", label: "Volgograd" },
      { value: "Krasnodar", label: "Krasnodar" },
      { value: "Saratov", label: "Saratov" },
      { value: "Tyumen", label: "Tyumen" },
      { value: "Tolyatti", label: "Tolyatti" },
      { value: "Izhevsk", label: "Izhevsk" },
      { value: "Barnaul", label: "Barnaul" },
      { value: "Ulyanovsk", label: "Ulyanovsk" },
      { value: "Irkutsk", label: "Irkutsk" },
      { value: "Yaroslavl", label: "Yaroslavl" },
      { value: "Khabarovsk", label: "Khabarovsk" },
      { value: "Vladivostok", label: "Vladivostok" },
      { value: "Makhachkala", label: "Makhachkala" },
      { value: "Tomsk", label: "Tomsk" },
      { value: "Orenburg", label: "Orenburg" },
      { value: "Kemerovo", label: "Kemerovo" },
      { value: "Novokuznetsk", label: "Novokuznetsk" },
      { value: "Ryazan", label: "Ryazan" },
      { value: "Astrakhan", label: "Astrakhan" },
      { value: "Penza", label: "Penza" },
      { value: "Naberezhnye Chelny", label: "Naberezhnye Chelny" },
      { value: "Lipetsk", label: "Lipetsk" },
      { value: "Tula", label: "Tula" },
      { value: "Kirov", label: "Kirov" },
      { value: "Cheboksary", label: "Cheboksary" },
      { value: "Kaliningrad", label: "Kaliningrad" },
      { value: "Bryansk", label: "Bryansk" },
      { value: "Ivanovo", label: "Ivanovo" },
      { value: "Magnitogorsk", label: "Magnitogorsk" },
      { value: "Belgorod", label: "Belgorod" },
      { value: "Surgut", label: "Surgut" },
    ],
    Romania: [
      { value: "Bucharest", label: "Bucharest" },
      { value: "Cluj-Napoca", label: "Cluj-Napoca" },
      { value: "Timișoara", label: "Timișoara" },
      { value: "Iași", label: "Iași" },
      { value: "Constanța", label: "Constanța" },
      { value: "Craiova", label: "Craiova" },
      { value: "Brașov", label: "Brașov" },
      { value: "Galați", label: "Galați" },
      { value: "Ploiești", label: "Ploiești" },
      { value: "Oradea", label: "Oradea" },
      { value: "Brăila", label: "Brăila" },
      { value: "Arad", label: "Arad" },
      { value: "Pitești", label: "Pitești" },
      { value: "Sibiu", label: "Sibiu" },
      { value: "Bacău", label: "Bacău" },
      { value: "Târgu Mureș", label: "Târgu Mureș" },
      { value: "Baia Mare", label: "Baia Mare" },
      { value: "Buzău", label: "Buzău" },
      { value: "Botoșani", label: "Botoșani" },
      { value: "Satu Mare", label: "Satu Mare" },
      { value: "Râmnicu Vâlcea", label: "Râmnicu Vâlcea" },
      { value: "Suceava", label: "Suceava" },
      { value: "Focșani", label: "Focșani" },
      { value: "Piatra Neamț", label: "Piatra Neamț" },
      { value: "Drobeta-Turnu Severin", label: "Drobeta-Turnu Severin" },
      { value: "Târgu Jiu", label: "Târgu Jiu" },
      { value: "Tulcea", label: "Tulcea" },
      { value: "Târgoviște", label: "Târgoviște" },
      { value: "Bistrița", label: "Bistrița" },
      { value: "Reșița", label: "Reșița" },
      { value: "Slatina", label: "Slatina" },
      { value: "Călărași", label: "Călărași" },
      { value: "Alba Iulia", label: "Alba Iulia" },
      { value: "Giurgiu", label: "Giurgiu" },
      { value: "Deva", label: "Deva" },
      { value: "Hunedoara", label: "Hunedoara" },
      { value: "Zalău", label: "Zalău" },
      { value: "Sfântu Gheorghe", label: "Sfântu Gheorghe" },
      { value: "Vaslui", label: "Vaslui" },
      { value: "Roman", label: "Roman" },
      { value: "Miercurea Ciuc", label: "Miercurea Ciuc" },
      { value: "Slobozia", label: "Slobozia" },
      { value: "Alexandria", label: "Alexandria" },
      { value: "Petroșani", label: "Petroșani" },
      { value: "Medgidia", label: "Medgidia" },
      { value: "Lugoj", label: "Lugoj" },
      { value: "Tecuci", label: "Tecuci" },
      { value: "Turda", label: "Turda" },
      { value: "Moreni", label: "Moreni" },
    ],
    Portugal: [
      { value: "Lisbon", label: "Lisbon" },
      { value: "Porto", label: "Porto" },
      { value: "Vila Nova de Gaia", label: "Vila Nova de Gaia" },
      { value: "Amadora", label: "Amadora" },
      { value: "Braga", label: "Braga" },
      { value: "Setúbal", label: "Setúbal" },
      { value: "Coimbra", label: "Coimbra" },
      { value: "Queluz", label: "Queluz" },
      { value: "Funchal", label: "Funchal" },
      { value: "Cacém", label: "Cacém" },
      { value: "Vila Nova de Famalicão", label: "Vila Nova de Famalicão" },
      { value: "Viseu", label: "Viseu" },
      { value: "Agualva-Cacém", label: "Agualva-Cacém" },
      { value: "Rio Tinto", label: "Rio Tinto" },
      { value: "Odivelas", label: "Odivelas" },
      { value: "Aveiro", label: "Aveiro" },
      { value: "Barreiro", label: "Barreiro" },
      { value: "Póvoa de Varzim", label: "Póvoa de Varzim" },
      { value: "Vila Franca de Xira", label: "Vila Franca de Xira" },
      { value: "Matosinhos", label: "Matosinhos" },
      { value: "Maia", label: "Maia" },
      { value: "Gondomar", label: "Gondomar" },
      { value: "Ermesinde", label: "Ermesinde" },
      { value: "Felgueiras", label: "Felgueiras" },
      { value: "Castelo Branco", label: "Castelo Branco" },
      { value: "Bragança", label: "Bragança" },
      { value: "Portimão", label: "Portimão" },
      { value: "Leiria", label: "Leiria" },
      { value: "Ponte de Lima", label: "Ponte de Lima" },
      { value: "Faro", label: "Faro" },
      { value: "Santa Maria da Feira", label: "Santa Maria da Feira" },
      { value: "Évora", label: "Évora" },
      { value: "Guarda", label: "Guarda" },
      { value: "Almada", label: "Almada" },
      { value: "Cascais", label: "Cascais" },
      { value: "Viana do Castelo", label: "Viana do Castelo" },
      { value: "Machico", label: "Machico" },
      { value: "Montijo", label: "Montijo" },
      { value: "Beja", label: "Beja" },
      { value: "Loures", label: "Loures" },
      { value: "Ribeira Brava", label: "Ribeira Brava" },
      { value: "Águeda", label: "Águeda" },
      { value: "Santarém", label: "Santarém" },
      { value: "Ponta Delgada", label: "Ponta Delgada" },
      { value: "Oliveira de Azeméis", label: "Oliveira de Azeméis" },
      { value: "Estoril", label: "Estoril" },
      { value: "Penafiel", label: "Penafiel" },
    ],
    Poland: [
      { value: "Warsaw", label: "Warsaw" },
      { value: "Kraków", label: "Kraków" },
      { value: "Łódź", label: "Łódź" },
      { value: "Wrocław", label: "Wrocław" },
      { value: "Poznań", label: "Poznań" },
      { value: "Gdańsk", label: "Gdańsk" },
      { value: "Szczecin", label: "Szczecin" },
      { value: "Bydgoszcz", label: "Bydgoszcz" },
      { value: "Lublin", label: "Lublin" },
      { value: "Białystok", label: "Białystok" },
      { value: "Katowice", label: "Katowice" },
      { value: "Gdynia", label: "Gdynia" },
      { value: "Częstochowa", label: "Częstochowa" },
      { value: "Radom", label: "Radom" },
      { value: "Sosnowiec", label: "Sosnowiec" },
      { value: "Toruń", label: "Toruń" },
      { value: "Kielce", label: "Kielce" },
      { value: "Rzeszów", label: "Rzeszów" },
      { value: "Gliwice", label: "Gliwice" },
      { value: "Zabrze", label: "Zabrze" },
      { value: "Olsztyn", label: "Olsztyn" },
      { value: "Bielsko-Biała", label: "Bielsko-Biała" },
      { value: "Bytom", label: "Bytom" },
      { value: "Zielona Góra", label: "Zielona Góra" },
      { value: "Rybnik", label: "Rybnik" },
      { value: "Ruda Śląska", label: "Ruda Śląska" },
      { value: "Tychy", label: "Tychy" },
      { value: "Gorzów Wielkopolski", label: "Gorzów Wielkopolski" },
      { value: "Dąbrowa Górnicza", label: "Dąbrowa Górnicza" },
      { value: "Płock", label: "Płock" },
      { value: "Elbląg", label: "Elbląg" },
      { value: "Opole", label: "Opole" },
      { value: "Wałbrzych", label: "Wałbrzych" },
      { value: "Głogów", label: "Głogów" },
      { value: "Słupsk", label: "Słupsk" },
      { value: "Jastrzębie-Zdrój", label: "Jastrzębie-Zdrój" },
      { value: "Jaworzno", label: "Jaworzno" },
      { value: "Jelenia Góra", label: "Jelenia Góra" },
      { value: "Nowy Sącz", label: "Nowy Sącz" },
      { value: "Konin", label: "Konin" },
      { value: "Piotrków Trybunalski", label: "Piotrków Trybunalski" },
      { value: "Tarnów", label: "Tarnów" },
      { value: "Przemyśl", label: "Przemyśl" },
      { value: "Stalowa Wola", label: "Stalowa Wola" },
      { value: "Mysłowice", label: "Mysłowice" },
    ],
    Philippines: [
      { value: "Manila", label: "Manila" },
      { value: "Quezon City", label: "Quezon City" },
      { value: "Caloocan", label: "Caloocan" },
      { value: "Davao City", label: "Davao City" },
      { value: "Cebu City", label: "Cebu City" },
      { value: "Antipolo", label: "Antipolo" },
      { value: "Pasig", label: "Pasig" },
      { value: "Taguig", label: "Taguig" },
      { value: "Cagayan de Oro", label: "Cagayan de Oro" },
      { value: "Parañaque", label: "Parañaque" },
      { value: "Makati", label: "Makati" },
      { value: "Bacolod", label: "Bacolod" },
      { value: "Muntinlupa", label: "Muntinlupa" },
      { value: "Pasay", label: "Pasay" },
      { value: "Dasmariñas", label: "Dasmariñas" },
      { value: "Valenzuela", label: "Valenzuela" },
      { value: "Las Piñas", label: "Las Piñas" },
      { value: "General Santos", label: "General Santos" },
      { value: "San Jose del Monte", label: "San Jose del Monte" },
      { value: "Bacoor", label: "Bacoor" },
      { value: "Iloilo City", label: "Iloilo City" },
      { value: "Dagupan", label: "Dagupan" },
      { value: "Mandaue", label: "Mandaue" },
      { value: "Baguio", label: "Baguio" },
      { value: "Tarlac City", label: "Tarlac City" },
      { value: "Lapu-Lapu", label: "Lapu-Lapu" },
      { value: "Butuan", label: "Butuan" },
      { value: "Imus", label: "Imus" },
      { value: "Angeles", label: "Angeles" },
      { value: "Naga", label: "Naga" },
      { value: "Cavite City", label: "Cavite City" },
      { value: "Marikina", label: "Marikina" },
      { value: "San Pedro", label: "San Pedro" },
      { value: "Mabalacat", label: "Mabalacat" },
      { value: "San Fernando", label: "San Fernando" },
      { value: "Lipa", label: "Lipa" },
      { value: "Navotas", label: "Navotas" },
      { value: "Lucena", label: "Lucena" },
      { value: "Tacloban", label: "Tacloban" },
      { value: "Olongapo", label: "Olongapo" },
      { value: "Ormoc", label: "Ormoc" },
      { value: "Calamba", label: "Calamba" },
      { value: "Malolos", label: "Malolos" },
      { value: "Panabo", label: "Panabo" },
      { value: "Digos", label: "Digos" },
      { value: "Koronadal", label: "Koronadal" },
      { value: "Santiago", label: "Santiago" },
      { value: "Toledo", label: "Toledo" },
      { value: "Iriga", label: "Iriga" },
      { value: "Roxas", label: "Roxas" },
      { value: "Tabaco", label: "Tabaco" },
    ],
    Pakistan: [
      { value: "Karachi", label: "Karachi" },
      { value: "Lahore", label: "Lahore" },
      { value: "Faisalabad", label: "Faisalabad" },
      { value: "Rawalpindi", label: "Rawalpindi" },
      { value: "Multan", label: "Multan" },
      { value: "Gujranwala", label: "Gujranwala" },
      { value: "Islamabad", label: "Islamabad" },
      { value: "Quetta", label: "Quetta" },
      { value: "Peshawar", label: "Peshawar" },
      { value: "Sargodha", label: "Sargodha" },
      { value: "Sialkot", label: "Sialkot" },
      { value: "Bahawalpur", label: "Bahawalpur" },
      { value: "Sukkur", label: "Sukkur" },
      { value: "Jhang", label: "Jhang" },
      { value: "Sheikhupura", label: "Sheikhupura" },
      { value: "Larkana", label: "Larkana" },
      { value: "Gujrat", label: "Gujrat" },
      { value: "Mardan", label: "Mardan" },
      { value: "Kasur", label: "Kasur" },
      { value: "Rahim Yar Khan", label: "Rahim Yar Khan" },
      { value: "Sahiwal", label: "Sahiwal" },
      { value: "Okara", label: "Okara" },
      { value: "Wah Cantonment", label: "Wah Cantonment" },
      { value: "Dera Ghazi Khan", label: "Dera Ghazi Khan" },
      { value: "Mirpur Khas", label: "Mirpur Khas" },
      { value: "Nawabshah", label: "Nawabshah" },
      { value: "Buner", label: "Buner" },
      { value: "Khanewal", label: "Khanewal" },
      { value: "Hafizabad", label: "Hafizabad" },
      { value: "Kohat", label: "Kohat" },
      { value: "Jacobabad", label: "Jacobabad" },
      { value: "Shikarpur", label: "Shikarpur" },
      { value: "Muzaffargarh", label: "Muzaffargarh" },
      { value: "Khanpur", label: "Khanpur" },
      { value: "Gojra", label: "Gojra" },
      { value: "Bahawalnagar", label: "Bahawalnagar" },
      { value: "Muridke", label: "Muridke" },
      { value: "Pakpattan", label: "Pakpattan" },
      { value: "Abottabad", label: "Abottabad" },
      { value: "Tando Allahyar", label: "Tando Allahyar" },
      { value: "Jhelum", label: "Jhelum" },
      { value: "Kasur", label: "Kasur" },
      { value: "Dera Ismail Khan", label: "Dera Ismail Khan" },
      { value: "Chiniot", label: "Chiniot" },
      { value: "Charsadda", label: "Charsadda" },
    ],
    Norway: [
      { value: "Oslo", label: "Oslo" },
      { value: "Bergen", label: "Bergen" },
      { value: "Trondheim", label: "Trondheim" },
      { value: "Stavanger", label: "Stavanger" },
      { value: "Drammen", label: "Drammen" },
      { value: "Fredrikstad", label: "Fredrikstad" },
      { value: "Kristiansand", label: "Kristiansand" },
      { value: "Sandnes", label: "Sandnes" },
      { value: "Tromsø", label: "Tromsø" },
      { value: "Sarpsborg", label: "Sarpsborg" },
      { value: "Skien", label: "Skien" },
      { value: "Ålesund", label: "Ålesund" },
      { value: "Sandefjord", label: "Sandefjord" },
      { value: "Haugesund", label: "Haugesund" },
      { value: "Tønsberg", label: "Tønsberg" },
      { value: "Moss", label: "Moss" },
      { value: "Porsgrunn", label: "Porsgrunn" },
      { value: "Bodø", label: "Bodø" },
      { value: "Arendal", label: "Arendal" },
      { value: "Hamar", label: "Hamar" },
      { value: "Ytrebygda", label: "Ytrebygda" },
      { value: "Halden", label: "Halden" },
      { value: "Larvik", label: "Larvik" },
      { value: "Askøy", label: "Askøy" },
      { value: "Kongsberg", label: "Kongsberg" },
      { value: "Molde", label: "Molde" },
      { value: "Harstad", label: "Harstad" },
      { value: "Horten", label: "Horten" },
      { value: "Lillehammer", label: "Lillehammer" },
      { value: "Gjøvik", label: "Gjøvik" },
      { value: "Mandal", label: "Mandal" },
      { value: "Narvik", label: "Narvik" },
      { value: "Kristiansund", label: "Kristiansund" },
      { value: "Tromsdalen", label: "Tromsdalen" },
      { value: "Mosjøen", label: "Mosjøen" },
      { value: "Sarpsborg", label: "Sarpsborg" },
      { value: "Leirvik", label: "Leirvik" },
      { value: "Ørsta", label: "Ørsta" },
      { value: "Grimstad", label: "Grimstad" },
      { value: "Notodden", label: "Notodden" },
      { value: "Bryne", label: "Bryne" },
      { value: "Vennesla", label: "Vennesla" },
      { value: "Ålgård", label: "Ålgård" },
      { value: "Elverum", label: "Elverum" },
    ],
    Mexico: [
      { value: "Mexico City", label: "Mexico City" },
      { value: "Guadalajara", label: "Guadalajara" },
      { value: "Monterrey", label: "Monterrey" },
      { value: "Puebla", label: "Puebla" },
      { value: "Tijuana", label: "Tijuana" },
      { value: "Ciudad Juárez", label: "Ciudad Juárez" },
      { value: "León", label: "León" },
      { value: "Zapopan", label: "Zapopan" },
      { value: "Guadalupe", label: "Guadalupe" },
      { value: "Hermosillo", label: "Hermosillo" },
      { value: "Querétaro", label: "Querétaro" },
      { value: "Toluca", label: "Toluca" },
      { value: "Mérida", label: "Mérida" },
      { value: "Aguascalientes", label: "Aguascalientes" },
      { value: "San Luis Potosí", label: "San Luis Potosí" },
      { value: "Mexicali", label: "Mexicali" },
      { value: "Culiacán", label: "Culiacán" },
      { value: "Acapulco", label: "Acapulco" },
      { value: "Chihuahua", label: "Chihuahua" },
      { value: "Tuxtla Gutiérrez", label: "Tuxtla Gutiérrez" },
      { value: "Saltillo", label: "Saltillo" },
      { value: "Cancún", label: "Cancún" },
      { value: "Morelia", label: "Morelia" },
      { value: "Reynosa", label: "Reynosa" },
      { value: "Torreón", label: "Torreón" },
      { value: "Tlaquepaque", label: "Tlaquepaque" },
      { value: "Durango", label: "Durango" },
      { value: "Veracruz", label: "Veracruz" },
      { value: "Tampico", label: "Tampico" },
      { value: "Cuernavaca", label: "Cuernavaca" },
      { value: "Xalapa", label: "Xalapa" },
      { value: "Tepic", label: "Tepic" },
      { value: "Ciudad Victoria", label: "Ciudad Victoria" },
      { value: "Oaxaca", label: "Oaxaca" },
      { value: "Campeche", label: "Campeche" },
      { value: "Tuxtla", label: "Tuxtla" },
      { value: "La Paz", label: "La Paz" },
      { value: "Colima", label: "Colima" },
      { value: "Chilpancingo", label: "Chilpancingo" },
      { value: "Tlaxcala", label: "Tlaxcala" },
      { value: "Ciudad Victoria", label: "Ciudad Victoria" },
      { value: "Pachuca", label: "Pachuca" },
      { value: "Ciudad del Carmen", label: "Ciudad del Carmen" },
      { value: "Ciudad Madero", label: "Ciudad Madero" },
      { value: "Nuevo Laredo", label: "Nuevo Laredo" },
      {
        value: "San Francisco de Campeche",
        label: "San Francisco de Campeche",
      },
      { value: "Matamoros", label: "Matamoros" },
    ],
    Malaysia: [
      { value: "Kuala Lumpur", label: "Kuala Lumpur" },
      { value: "George Town", label: "George Town" },
      { value: "Ipoh", label: "Ipoh" },
      { value: "Kuching", label: "Kuching" },
      { value: "Johor Bahru", label: "Johor Bahru" },
      { value: "Kota Kinabalu", label: "Kota Kinabalu" },
      { value: "Shah Alam", label: "Shah Alam" },
      { value: "Malacca City", label: "Malacca City" },
      { value: "Alor Setar", label: "Alor Setar" },
      { value: "Miri", label: "Miri" },
      { value: "Petaling Jaya", label: "Petaling Jaya" },
      { value: "Kuala Terengganu", label: "Kuala Terengganu" },
      { value: "Seremban", label: "Seremban" },
      { value: "Kuantan", label: "Kuantan" },
      { value: "Kota Bharu", label: "Kota Bharu" },
      { value: "Sandakan", label: "Sandakan" },
      { value: "Taiping", label: "Taiping" },
      { value: "Butterworth", label: "Butterworth" },
      { value: "Sungai Petani", label: "Sungai Petani" },
      { value: "Sibu", label: "Sibu" },
      { value: "Tawau", label: "Tawau" },
      { value: "Batu Pahat", label: "Batu Pahat" },
      { value: "Raub", label: "Raub" },
      { value: "Kluang", label: "Kluang" },
      { value: "Kangar", label: "Kangar" },
      { value: "Bintulu", label: "Bintulu" },
      { value: "Temerloh", label: "Temerloh" },
      { value: "Taiping", label: "Taiping" },
      { value: "Kuala Kangsar", label: "Kuala Kangsar" },
      { value: "Kuala Langat", label: "Kuala Langat" },
      { value: "Segamat", label: "Segamat" },
      { value: "Langkawi", label: "Langkawi" },
      { value: "Teluk Intan", label: "Teluk Intan" },
      { value: "Simpang Empat", label: "Simpang Empat" },
      { value: "Kampar", label: "Kampar" },
      { value: "Kulim", label: "Kulim" },
      { value: "Sekudai", label: "Sekudai" },
      { value: "Pekan", label: "Pekan" },
      { value: "Jitra", label: "Jitra" },
      { value: "Papar", label: "Papar" },
      { value: "Muar", label: "Muar" },
      { value: "Sungai Besar", label: "Sungai Besar" },
      { value: "Banting", label: "Banting" },
      { value: "Lahad Datu", label: "Lahad Datu" },
      { value: "Perlis", label: "Perlis" },
      { value: "Bentong", label: "Bentong" },
    ],
    Luxembourg: [
      { value: "Luxembourg City", label: "Luxembourg City" },
      { value: "Esch-sur-Alzette", label: "Esch-sur-Alzette" },
      { value: "Differdange", label: "Differdange" },
      { value: "Dudelange", label: "Dudelange" },
      { value: "Ettelbruck", label: "Ettelbruck" },
      { value: "Diekirch", label: "Diekirch" },
      { value: "Wiltz", label: "Wiltz" },
      { value: "Echternach", label: "Echternach" },
      { value: "Rumelange", label: "Rumelange" },
      { value: "Grevenmacher", label: "Grevenmacher" },
      { value: "Remich", label: "Remich" },
      { value: "Vianden", label: "Vianden" },
      { value: "Mersch", label: "Mersch" },
      { value: "Redange-sur-Attert", label: "Redange-sur-Attert" },
      { value: "Capellen", label: "Capellen" },
      { value: "Wiltz", label: "Wiltz" },
      { value: "Schifflange", label: "Schifflange" },
      { value: "Bettembourg", label: "Bettembourg" },
      { value: "Petange", label: "Petange" },
      { value: "Strassen", label: "Strassen" },
      { value: "Bertrange", label: "Bertrange" },
      { value: "Sanem", label: "Sanem" },
      { value: "Mondercange", label: "Mondercange" },
      { value: "Mondorf-les-Bains", label: "Mondorf-les-Bains" },
      { value: "Junglinster", label: "Junglinster" },
      { value: "Remich", label: "Remich" },
      { value: "Grosbous", label: "Grosbous" },
      { value: "Steinsel", label: "Steinsel" },
      { value: "Kehlen", label: "Kehlen" },
      { value: "Steinfort", label: "Steinfort" },
      { value: "Mamer", label: "Mamer" },
      { value: "Wormeldange", label: "Wormeldange" },
      { value: "Saeul", label: "Saeul" },
      { value: "Walferdange", label: "Walferdange" },
      { value: "Schieren", label: "Schieren" },
      { value: "Kayl", label: "Kayl" },
      { value: "Weiler-la-Tour", label: "Weiler-la-Tour" },
    ],
    Lebanon: [
      { value: "Beirut", label: "Beirut" },
      { value: "Tripoli", label: "Tripoli" },
      { value: "Sidon", label: "Sidon" },
      { value: "Tyre", label: "Tyre" },
      { value: "Byblos", label: "Byblos" },
      { value: "Jounieh", label: "Jounieh" },
      { value: "Baabda", label: "Baabda" },
      { value: "Nabatieh", label: "Nabatieh" },
      { value: "Zahle", label: "Zahle" },
      { value: "Batroun", label: "Batroun" },
      { value: "Baalbek", label: "Baalbek" },
      { value: "Zahleh", label: "Zahleh" },
      { value: "Jbeil", label: "Jbeil" },
      { value: "Saida", label: "Saida" },
      { value: "Bint Jbeil", label: "Bint Jbeil" },
      { value: "Bekaa", label: "Bekaa" },
      { value: "Marjayoun", label: "Marjayoun" },
      { value: "Aley", label: "Aley" },
      { value: "Akkar", label: "Akkar" },
      { value: "Rashaya", label: "Rashaya" },
    ],
    "South Korea": [
      { value: "Seoul", label: "Seoul" },
      { value: "Busan", label: "Busan" },
      { value: "Incheon", label: "Incheon" },
      { value: "Daegu", label: "Daegu" },
      { value: "Daejeon", label: "Daejeon" },
      { value: "Gwangju", label: "Gwangju" },
      { value: "Ulsan", label: "Ulsan" },
      { value: "Suwon", label: "Suwon" },
      { value: "Seongnam", label: "Seongnam" },
      { value: "Goyang", label: "Goyang" },
      { value: "Bucheon", label: "Bucheon" },
      { value: "Yongin", label: "Yongin" },
      { value: "Cheongju", label: "Cheongju" },
      { value: "Ansan", label: "Ansan" },
      { value: "Jeonju", label: "Jeonju" },
      { value: "Cheonan", label: "Cheonan" },
      { value: "Gimhae", label: "Gimhae" },
      { value: "Hwaseong", label: "Hwaseong" },
      { value: "Sacheon", label: "Sacheon" },
      { value: "Gumi", label: "Gumi" },
      { value: "Gwacheon", label: "Gwacheon" },
      { value: "Iksan", label: "Iksan" },
      { value: "Pohang", label: "Pohang" },
      { value: "Suncheon", label: "Suncheon" },
      { value: "Jeju", label: "Jeju" },
      { value: "Gangneung", label: "Gangneung" },
      { value: "Chuncheon", label: "Chuncheon" },
      { value: "Yeosu", label: "Yeosu" },
      { value: "Asan", label: "Asan" },
      { value: "Gwangmyeong", label: "Gwangmyeong" },
      { value: "Naju", label: "Naju" },
      { value: "Uijeongbu", label: "Uijeongbu" },
      { value: "Anyang", label: "Anyang" },
      { value: "Changwon", label: "Changwon" },
      { value: "Sejong", label: "Sejong" },
      { value: "Mokpo", label: "Mokpo" },
      { value: "Paju", label: "Paju" },
      { value: "Andong", label: "Andong" },
      { value: "Namyangju", label: "Namyangju" },
      { value: "Yangsan", label: "Yangsan" },
      { value: "Yangju", label: "Yangju" },
      { value: "Kimhae", label: "Kimhae" },
      { value: "Seosan", label: "Seosan" },
    ],
    Jordan: [
      { value: "Amman", label: "Amman" },
      { value: "Zarqa", label: "Zarqa" },
      { value: "Irbid", label: "Irbid" },
      { value: "Salt", label: "Salt" },
      { value: "Ar Ramtha", label: "Ar Ramtha" },
      { value: "Madaba", label: "Madaba" },
      { value: "Aqaba", label: "Aqaba" },
      { value: "Jerash", label: "Jerash" },
      { value: "Karak", label: "Karak" },
      { value: "Ma'an", label: "Ma'an" },
      { value: "Tafilah", label: "Tafilah" },
      { value: "Mafraq", label: "Mafraq" },
      { value: "Sahab", label: "Sahab" },
      { value: "Al Quwaysimah", label: "Al Quwaysimah" },
      { value: "Ajloun", label: "Ajloun" },
      { value: "Al Husn", label: "Al Husn" },
      { value: "At Tafilah", label: "At Tafilah" },
      { value: "Azraq", label: "Azraq" },
      { value: "Bayir", label: "Bayir" },
      { value: "Dhiban", label: "Dhiban" },
      { value: "Fuheis", label: "Fuheis" },
      { value: "Kofranjah", label: "Kofranjah" },
      { value: "Safawi", label: "Safawi" },
      { value: "Sakhrah", label: "Sakhrah" },
      { value: "Sama as Sarhan", label: "Sama as Sarhan" },
      { value: "Umm as Summaq", label: "Umm as Summaq" },
    ],
    Japan: [
      { value: "Tokyo", label: "Tokyo" },
      { value: "Yokohama", label: "Yokohama" },
      { value: "Osaka", label: "Osaka" },
      { value: "Nagoya", label: "Nagoya" },
      { value: "Sapporo", label: "Sapporo" },
      { value: "Fukuoka", label: "Fukuoka" },
      { value: "Kobe", label: "Kobe" },
      { value: "Kyoto", label: "Kyoto" },
      { value: "Kawasaki", label: "Kawasaki" },
      { value: "Saitama", label: "Saitama" },
      { value: "Hiroshima", label: "Hiroshima" },
      { value: "Sendai", label: "Sendai" },
      { value: "Kitakyushu", label: "Kitakyushu" },
      { value: "Chiba", label: "Chiba" },
      { value: "Sakai", label: "Sakai" },
      { value: "Niigata", label: "Niigata" },
      { value: "Hamamatsu", label: "Hamamatsu" },
      { value: "Okayama", label: "Okayama" },
      { value: "Sagamihara", label: "Sagamihara" },
      { value: "Kumamoto", label: "Kumamoto" },
      { value: "Kagoshima", label: "Kagoshima" },
      { value: "Funabashi", label: "Funabashi" },
      { value: "Higashiosaka", label: "Higashiosaka" },
      { value: "Hachioji", label: "Hachioji" },
      { value: "Nerima", label: "Nerima" },
      { value: "Kurashiki", label: "Kurashiki" },
      { value: "Gifu", label: "Gifu" },
      { value: "Akita", label: "Akita" },
      { value: "Miyazaki", label: "Miyazaki" },
      { value: "Toyota", label: "Toyota" },
      { value: "Maebashi", label: "Maebashi" },
      { value: "Otsu", label: "Otsu" },
      { value: "Ichikawa", label: "Ichikawa" },
      { value: "Yokosuka", label: "Yokosuka" },
      { value: "Kakogawa", label: "Kakogawa" },
      { value: "Mito", label: "Mito" },
      { value: "Matsudo", label: "Matsudo" },
      { value: "Takamatsu", label: "Takamatsu" },
      { value: "Takasaki", label: "Takasaki" },
      { value: "Yokkaichi", label: "Yokkaichi" },
      { value: "Toyohashi", label: "Toyohashi" },
      { value: "Morioka", label: "Morioka" },
      { value: "Fukushima", label: "Fukushima" },
      { value: "Nara", label: "Nara" },
      { value: "Asahikawa", label: "Asahikawa" },
      { value: "Oita", label: "Oita" },
    ],
    Jamaica: [
      { value: "Kingston", label: "Kingston" },
      { value: "Montego Bay", label: "Montego Bay" },
      { value: "Spanish Town", label: "Spanish Town" },
      { value: "Portmore", label: "Portmore" },
      { value: "May Pen", label: "May Pen" },
      { value: "Mandeville", label: "Mandeville" },
      { value: "Old Harbour", label: "Old Harbour" },
      { value: "Linstead", label: "Linstead" },
      { value: "Half Way Tree", label: "Half Way Tree" },
      { value: "Savanna-la-Mar", label: "Savanna-la-Mar" },
      { value: "Saint Ann's Bay", label: "Saint Ann's Bay" },
      { value: "Port Antonio", label: "Port Antonio" },
      { value: "Morant Bay", label: "Morant Bay" },
      { value: "Stony Hill", label: "Stony Hill" },
      { value: "Santa Cruz", label: "Santa Cruz" },
      { value: "Old Harbour Bay", label: "Old Harbour Bay" },
      { value: "Ocho Rios", label: "Ocho Rios" },
      { value: "Port Maria", label: "Port Maria" },
      { value: "Falmouth", label: "Falmouth" },
      { value: "Yallahs", label: "Yallahs" },
      { value: "Bog Walk", label: "Bog Walk" },
    ],
    Italy: [
      { value: "Rome", label: "Rome" },
      { value: "Milan", label: "Milan" },
      { value: "Naples", label: "Naples" },
      { value: "Turin", label: "Turin" },
      { value: "Palermo", label: "Palermo" },
      { value: "Genoa", label: "Genoa" },
      { value: "Bologna", label: "Bologna" },
      { value: "Florence", label: "Florence" },
      { value: "Bari", label: "Bari" },
      { value: "Catania", label: "Catania" },
      { value: "Venice", label: "Venice" },
      { value: "Verona", label: "Verona" },
      { value: "Messina", label: "Messina" },
      { value: "Padua", label: "Padua" },
      { value: "Trieste", label: "Trieste" },
      { value: "Brescia", label: "Brescia" },
      { value: "Taranto", label: "Taranto" },
      { value: "Prato", label: "Prato" },
      { value: "Modena", label: "Modena" },
      { value: "Reggio Calabria", label: "Reggio Calabria" },
      { value: "Reggio Emilia", label: "Reggio Emilia" },
      { value: "Perugia", label: "Perugia" },
      { value: "Ravenna", label: "Ravenna" },
      { value: "Livorno", label: "Livorno" },
      { value: "Cagliari", label: "Cagliari" },
      { value: "Foggia", label: "Foggia" },
      { value: "Rimini", label: "Rimini" },
      { value: "Salerno", label: "Salerno" },
      { value: "Ferrara", label: "Ferrara" },
      { value: "Sassari", label: "Sassari" },
      { value: "Latina", label: "Latina" },
      { value: "Giugliano in Campania", label: "Giugliano in Campania" },
      { value: "Monza", label: "Monza" },
      { value: "Syracuse", label: "Syracuse" },
      { value: "Bergamo", label: "Bergamo" },
      { value: "Pescara", label: "Pescara" },
      { value: "Trento", label: "Trento" },
      { value: "Forlì", label: "Forlì" },
      { value: "Vicenza", label: "Vicenza" },
      { value: "Terni", label: "Terni" },
      { value: "Bolzano", label: "Bolzano" },
      { value: "Novara", label: "Novara" },
      { value: "Piacenza", label: "Piacenza" },
      { value: "Ancona", label: "Ancona" },
      { value: "Arezzo", label: "Arezzo" },
      { value: "Udine", label: "Udine" },
    ],
    Israel: [
      { value: "Jerusalem", label: "Jerusalem" },
      { value: "Tel Aviv", label: "Tel Aviv" },
      { value: "Haifa", label: "Haifa" },
      { value: "Rishon LeZion", label: "Rishon LeZion" },
      { value: "Petah Tikva", label: "Petah Tikva" },
      { value: "Ashdod", label: "Ashdod" },
      { value: "Netanya", label: "Netanya" },
      { value: "Beer Sheva", label: "Beer Sheva" },
      { value: "Holon", label: "Holon" },
      { value: "Bnei Brak", label: "Bnei Brak" },
      { value: "Ramat Gan", label: "Ramat Gan" },
      { value: "Bat Yam", label: "Bat Yam" },
      { value: "Rehovot", label: "Rehovot" },
      { value: "Herzliya", label: "Herzliya" },
      { value: "Kfar Saba", label: "Kfar Saba" },
      { value: "Modi'in-Maccabim-Re'ut", label: "Modi'in-Maccabim-Re'ut" },
      { value: "Nazareth", label: "Nazareth" },
      { value: "Beit Shemesh", label: "Beit Shemesh" },
      { value: "Lod", label: "Lod" },
      { value: "Ashkelon", label: "Ashkelon" },
      { value: "Nahariya", label: "Nahariya" },
      { value: "Hadera", label: "Hadera" },
      { value: "Ramla", label: "Ramla" },
      { value: "Kiryat Gat", label: "Kiryat Gat" },
      { value: "Lahavim", label: "Lahavim" },
      { value: "Modi'in Illit", label: "Modi'in Illit" },
      { value: "Qiryat Shemona", label: "Qiryat Shemona" },
      { value: "Dimona", label: "Dimona" },
      { value: "Eilat", label: "Eilat" },
      { value: "Tiberias", label: "Tiberias" },
      { value: "Safed", label: "Safed" },
      { value: "Yavne", label: "Yavne" },
      { value: "Sderot", label: "Sderot" },
      { value: "Hod HaSharon", label: "Hod HaSharon" },
      { value: "Ra'anana", label: "Ra'anana" },
      { value: "Nof HaGalil", label: "Nof HaGalil" },
      { value: "Giv'atayim", label: "Giv'atayim" },
      { value: "Qalansawe", label: "Qalansawe" },
      { value: "Rosh HaAyin", label: "Rosh HaAyin" },
      { value: "Kiryat Ata", label: "Kiryat Ata" },
      { value: "Judea and Samaria Area", label: "Judea and Samaria Area" },
      { value: "West Jerusalem", label: "West Jerusalem" },
      { value: "Afula", label: "Afula" },
      { value: "Kiryat Bialik", label: "Kiryat Bialik" },
      { value: "Kiryat Motzkin", label: "Kiryat Motzkin" },
      { value: "Tamra", label: "Tamra" },
    ],
    Ireland: [
      { value: "Dublin", label: "Dublin" },
      { value: "Cork", label: "Cork" },
      { value: "Galway", label: "Galway" },
      { value: "Limerick", label: "Limerick" },
      { value: "Waterford", label: "Waterford" },
      { value: "Drogheda", label: "Drogheda" },
      { value: "Dundalk", label: "Dundalk" },
      { value: "Bray", label: "Bray" },
      { value: "Swords", label: "Swords" },
      { value: "Navan", label: "Navan" },
      { value: "Ennis", label: "Ennis" },
      { value: "Kilkenny", label: "Kilkenny" },
      { value: "Tralee", label: "Tralee" },
      { value: "Carlow", label: "Carlow" },
      { value: "Newbridge", label: "Newbridge" },
      { value: "Naas", label: "Naas" },
      { value: "Athlone", label: "Athlone" },
      { value: "Mullingar", label: "Mullingar" },
      { value: "Wexford", label: "Wexford" },
      { value: "Letterkenny", label: "Letterkenny" },
      { value: "Sligo", label: "Sligo" },
      { value: "Clonmel", label: "Clonmel" },
      { value: "Greystones", label: "Greystones" },
      { value: "Malahide", label: "Malahide" },
      { value: "Leixlip", label: "Leixlip" },
      { value: "Carrigaline", label: "Carrigaline" },
      { value: "Castlebar", label: "Castlebar" },
      { value: "Midleton", label: "Midleton" },
      { value: "Mallow", label: "Mallow" },
      { value: "Ballina", label: "Ballina" },
      { value: "Enniscorthy", label: "Enniscorthy" },
      { value: "Shannon", label: "Shannon" },
      { value: "Arklow", label: "Arklow" },
      { value: "Tullamore", label: "Tullamore" },
      { value: "Tramore", label: "Tramore" },
      { value: "New Ross", label: "New Ross" },
      { value: "Thurles", label: "Thurles" },
      { value: "Youghal", label: "Youghal" },
      { value: "Portlaoise", label: "Portlaoise" },
      { value: "Mullingar", label: "Mullingar" },
      { value: "Gorey", label: "Gorey" },
    ],
    Indonesia: [
      { value: "Jakarta", label: "Jakarta" },
      { value: "Surabaya", label: "Surabaya" },
      { value: "Bandung", label: "Bandung" },
      { value: "Medan", label: "Medan" },
      { value: "Semarang", label: "Semarang" },
      { value: "Makassar", label: "Makassar" },
      { value: "Palembang", label: "Palembang" },
      { value: "Tangerang", label: "Tangerang" },
      { value: "Depok", label: "Depok" },
      { value: "Batam", label: "Batam" },
      { value: "Bekasi", label: "Bekasi" },
      { value: "Surakarta", label: "Surakarta" },
      { value: "Padang", label: "Padang" },
      { value: "Bandar Lampung", label: "Bandar Lampung" },
      { value: "Denpasar", label: "Denpasar" },
      { value: "Bogor", label: "Bogor" },
      { value: "Pekanbaru", label: "Pekanbaru" },
      { value: "Malang", label: "Malang" },
      { value: "Yogyakarta", label: "Yogyakarta" },
      { value: "Samarinda", label: "Samarinda" },
      { value: "Makassar", label: "Makassar" },
      { value: "Tarakan", label: "Tarakan" },
      { value: "Manado", label: "Manado" },
      { value: "Balikpapan", label: "Balikpapan" },
      { value: "Jambi", label: "Jambi" },
      { value: "Cimahi", label: "Cimahi" },
      { value: "Pontianak", label: "Pontianak" },
      { value: "Banjarmasin", label: "Banjarmasin" },
      { value: "Banda Aceh", label: "Banda Aceh" },
      { value: "Tegal", label: "Tegal" },
      { value: "Percut Sei Tuan", label: "Percut Sei Tuan" },
      { value: "Binjai", label: "Binjai" },
      { value: "Padangsidempuan", label: "Padangsidempuan" },
      { value: "Bogor", label: "Bogor" },
      { value: "Tanjung Balai", label: "Tanjung Balai" },
      { value: "Pekalongan", label: "Pekalongan" },
      { value: "Cirebon", label: "Cirebon" },
      { value: "Bukittinggi", label: "Bukittinggi" },
      { value: "Mataram", label: "Mataram" },
      { value: "Probolinggo", label: "Probolinggo" },
      { value: "Kupang", label: "Kupang" },
      { value: "Sukabumi", label: "Sukabumi" },
      { value: "Purwokerto", label: "Purwokerto" },
      { value: "Singkawang", label: "Singkawang" },
      { value: "Serang", label: "Serang" },
      { value: "Tasikmalaya", label: "Tasikmalaya" },
      { value: "Pematangsiantar", label: "Pematangsiantar" },
      { value: "Palu", label: "Palu" },
      { value: "Bengkulu", label: "Bengkulu" },
      { value: "Langsa", label: "Langsa" },
      { value: "Mojokerto", label: "Mojokerto" },
      { value: "Madiun", label: "Madiun" },
      { value: "Kediri", label: "Kediri" },
      { value: "Jayapura", label: "Jayapura" },
    ],
    Iceland: [
      { value: "Reykjavik", label: "Reykjavik" },
      { value: "Kópavogur", label: "Kópavogur" },
      { value: "Hafnarfjörður", label: "Hafnarfjörður" },
      { value: "Akureyri", label: "Akureyri" },
      { value: "Keflavík", label: "Keflavík" },
      { value: "Garðabær", label: "Garðabær" },
      { value: "Mosfellsbær", label: "Mosfellsbær" },
      { value: "Árborg", label: "Árborg" },
      { value: "Akranes", label: "Akranes" },
      { value: "Selfoss", label: "Selfoss" },
      { value: "Vestmannaeyjar", label: "Vestmannaeyjar" },
      { value: "Sauðárkrókur", label: "Sauðárkrókur" },
      { value: "Fjarðabyggð", label: "Fjarðabyggð" },
      { value: "Egilsstaðir", label: "Egilsstaðir" },
      { value: "Vík í Mýrdal", label: "Vík í Mýrdal" },
      { value: "Húsavík", label: "Húsavík" },
      { value: "Borgarnes", label: "Borgarnes" },
      { value: "Ísafjörður", label: "Ísafjörður" },
      { value: "Dalvík", label: "Dalvík" },
      { value: "Grindavík", label: "Grindavík" },
      { value: "Hveragerði", label: "Hveragerði" },
      { value: "Blönduós", label: "Blönduós" },
      { value: "Sandgerði", label: "Sandgerði" },
      { value: "Stykkishólmur", label: "Stykkishólmur" },
      { value: "Seyðisfjörður", label: "Seyðisfjörður" },
      { value: "Vogar", label: "Vogar" },
      { value: "Höfn í Hornafirði", label: "Höfn í Hornafirði" },
      { value: "Seltjarnarnes", label: "Seltjarnarnes" },
      { value: "Hafnir", label: "Hafnir" },
      { value: "Hvanneyri", label: "Hvanneyri" },
      { value: "Þorlákshöfn", label: "Þorlákshöfn" },
      { value: "Reyðarfjörður", label: "Reyðarfjörður" },
      { value: "Fáskrúðsfjörður", label: "Fáskrúðsfjörður" },
      { value: "Eskifjörður", label: "Eskifjörður" },
      { value: "Bolungarvík", label: "Bolungarvík" },
      { value: "Raufarhöfn", label: "Raufarhöfn" },
      { value: "Bíldudalur", label: "Bíldudalur" },
      { value: "Djúpivogur", label: "Djúpivogur" },
      { value: "Njarðvík", label: "Njarðvík" },
    ],
    Hungary: [
      { value: "Budapest", label: "Budapest" },
      { value: "Debrecen", label: "Debrecen" },
      { value: "Szeged", label: "Szeged" },
      { value: "Miskolc", label: "Miskolc" },
      { value: "Pécs", label: "Pécs" },
      { value: "Győr", label: "Győr" },
      { value: "Nyíregyháza", label: "Nyíregyháza" },
      { value: "Kecskemét", label: "Kecskemét" },
      { value: "Székesfehérvár", label: "Székesfehérvár" },
      { value: "Szombathely", label: "Szombathely" },
      { value: "Érd", label: "Érd" },
      { value: "Tatabánya", label: "Tatabánya" },
      { value: "Sopron", label: "Sopron" },
      { value: "Kaposvár", label: "Kaposvár" },
      { value: "Veszprém", label: "Veszprém" },
      { value: "Békéscsaba", label: "Békéscsaba" },
      { value: "Zalaegerszeg", label: "Zalaegerszeg" },
      { value: "Eger", label: "Eger" },
      { value: "Nagykanizsa", label: "Nagykanizsa" },
      { value: "Dunaújváros", label: "Dunaújváros" },
      { value: "Hódmezővásárhely", label: "Hódmezővásárhely" },
      { value: "Szekszárd", label: "Szekszárd" },
      { value: "Salgótarján", label: "Salgótarján" },
      { value: "Vác", label: "Vác" },
      { value: "Gödöllő", label: "Gödöllő" },
      { value: "Szolnok", label: "Szolnok" },
      { value: "Baja", label: "Baja" },
      { value: "Hajdúböszörmény", label: "Hajdúböszörmény" },
      { value: "Kazincbarcika", label: "Kazincbarcika" },
      { value: "Orosháza", label: "Orosháza" },
      { value: "Szentes", label: "Szentes" },
      { value: "Mosonmagyaróvár", label: "Mosonmagyaróvár" },
      { value: "Pápa", label: "Pápa" },
      { value: "Szekszárd", label: "Szekszárd" },
      { value: "Tatabánya", label: "Tatabánya" },
      { value: "Vác", label: "Vác" },
      { value: "Várpalota", label: "Várpalota" },
      { value: "Zalaegerszeg", label: "Zalaegerszeg" },
    ],
    "Hong Kong": [
      { value: "Central and Western", label: "Central and Western" },
      { value: "Eastern", label: "Eastern" },
      { value: "Southern", label: "Southern" },
      { value: "Wan Chai", label: "Wan Chai" },
      { value: "Sham Shui Po", label: "Sham Shui Po" },
      { value: "Kowloon City", label: "Kowloon City" },
      { value: "Kwun Tong", label: "Kwun Tong" },
      { value: "Wong Tai Sin", label: "Wong Tai Sin" },
      { value: "Yau Tsim Mong", label: "Yau Tsim Mong" },
      { value: "Islands", label: "Islands" },
      { value: "Kwai Tsing", label: "Kwai Tsing" },
      { value: "North", label: "North" },
      { value: "Sai Kung", label: "Sai Kung" },
      { value: "Sha Tin", label: "Sha Tin" },
      { value: "Tai Po", label: "Tai Po" },
      { value: "Tsuen Wan", label: "Tsuen Wan" },
      { value: "Tuen Mun", label: "Tuen Mun" },
      { value: "Yuen Long", label: "Yuen Long" },
    ],
    Germany: [
      { value: "Berlin", label: "Berlin" },
      { value: "Hamburg", label: "Hamburg" },
      { value: "Munich", label: "Munich" },
      { value: "Cologne", label: "Cologne" },
      { value: "Frankfurt", label: "Frankfurt" },
      { value: "Stuttgart", label: "Stuttgart" },
      { value: "Düsseldorf", label: "Düsseldorf" },
      { value: "Dortmund", label: "Dortmund" },
      { value: "Essen", label: "Essen" },
      { value: "Leipzig", label: "Leipzig" },
      { value: "Bremen", label: "Bremen" },
      { value: "Dresden", label: "Dresden" },
      { value: "Hanover", label: "Hanover" },
      { value: "Nuremberg", label: "Nuremberg" },
      { value: "Duisburg", label: "Duisburg" },
      { value: "Bochum", label: "Bochum" },
      { value: "Wuppertal", label: "Wuppertal" },
      { value: "Bielefeld", label: "Bielefeld" },
      { value: "Bonn", label: "Bonn" },
      { value: "Münster", label: "Münster" },
      { value: "Karlsruhe", label: "Karlsruhe" },
      { value: "Mannheim", label: "Mannheim" },
      { value: "Augsburg", label: "Augsburg" },
      { value: "Wiesbaden", label: "Wiesbaden" },
      { value: "Gelsenkirchen", label: "Gelsenkirchen" },
      { value: "Mönchengladbach", label: "Mönchengladbach" },
      { value: "Braunschweig", label: "Braunschweig" },
      { value: "Chemnitz", label: "Chemnitz" },
      { value: "Kiel", label: "Kiel" },
      { value: "Aachen", label: "Aachen" },
      { value: "Halle", label: "Halle" },
      { value: "Magdeburg", label: "Magdeburg" },
      { value: "Freiburg", label: "Freiburg" },
      { value: "Krefeld", label: "Krefeld" },
      { value: "Lübeck", label: "Lübeck" },
      { value: "Oberhausen", label: "Oberhausen" },
      { value: "Erfurt", label: "Erfurt" },
      { value: "Mainz", label: "Mainz" },
      { value: "Rostock", label: "Rostock" },
      { value: "Kassel", label: "Kassel" },
      { value: "Hagen", label: "Hagen" },
      { value: "Saarbrücken", label: "Saarbrücken" },
      { value: "Hamm", label: "Hamm" },
      { value: "Potsdam", label: "Potsdam" },
      { value: "Ludwigshafen", label: "Ludwigshafen" },
      { value: "Oldenburg", label: "Oldenburg" },
      { value: "Leverkusen", label: "Leverkusen" },
    ],
    Greece: [
      { value: "Athens", label: "Athens" },
      { value: "Thessaloniki", label: "Thessaloniki" },
      { value: "Patras", label: "Patras" },
      { value: "Heraklion", label: "Heraklion" },
      { value: "Larissa", label: "Larissa" },
      { value: "Volos", label: "Volos" },
      { value: "Rhodes", label: "Rhodes" },
      { value: "Ioannina", label: "Ioannina" },
      { value: "Chania", label: "Chania" },
      { value: "Chalcis", label: "Chalcis" },
      { value: "Heraklion", label: "Heraklion" },
      { value: "Sparta", label: "Sparta" },
      { value: "Kalamata", label: "Kalamata" },
      { value: "Tripoli", label: "Tripoli" },
      { value: "Heraklion", label: "Heraklion" },
      { value: "Corinth", label: "Corinth" },
      { value: "Mytilene", label: "Mytilene" },
      { value: "Chalcis", label: "Chalcis" },
      { value: "Chalkida", label: "Chalkida" },
      { value: "Kavala", label: "Kavala" },
      { value: "Veria", label: "Veria" },
      { value: "Serres", label: "Serres" },
      { value: "Drama", label: "Drama" },
      { value: "Komotini", label: "Komotini" },
      { value: "Alexandroupoli", label: "Alexandroupoli" },
      { value: "Kozani", label: "Kozani" },
      { value: "Katerini", label: "Katerini" },
      { value: "Karditsa", label: "Karditsa" },
      { value: "Trikala", label: "Trikala" },
      { value: "Lamia", label: "Lamia" },
      { value: "Pyrgos", label: "Pyrgos" },
      { value: "Rethymno", label: "Rethymno" },
      { value: "Preveza", label: "Preveza" },
      { value: "Corfu", label: "Corfu" },
      { value: "Argos", label: "Argos" },
      { value: "Piraeus", label: "Piraeus" },
      { value: "Kerkyra", label: "Kerkyra" },
      { value: "Syros", label: "Syros" },
      { value: "Zakynthos", label: "Zakynthos" },
      { value: "Nafplio", label: "Nafplio" },
      { value: "Chios", label: "Chios" },
      { value: "Pyrgos", label: "Pyrgos" },
      { value: "Lamia", label: "Lamia" },
      { value: "Samos", label: "Samos" },
      { value: "Kavala", label: "Kavala" },
    ],
    France: [
      { value: "Paris", label: "Paris" },
      { value: "Marseille", label: "Marseille" },
      { value: "Lyon", label: "Lyon" },
      { value: "Toulouse", label: "Toulouse" },
      { value: "Nice", label: "Nice" },
      { value: "Nantes", label: "Nantes" },
      { value: "Strasbourg", label: "Strasbourg" },
      { value: "Montpellier", label: "Montpellier" },
      { value: "Bordeaux", label: "Bordeaux" },
      { value: "Lille", label: "Lille" },
      { value: "Rennes", label: "Rennes" },
      { value: "Reims", label: "Reims" },
      { value: "Le Havre", label: "Le Havre" },
      { value: "Saint-Étienne", label: "Saint-Étienne" },
      { value: "Toulon", label: "Toulon" },
      { value: "Grenoble", label: "Grenoble" },
      { value: "Dijon", label: "Dijon" },
      { value: "Angers", label: "Angers" },
      { value: "Nîmes", label: "Nîmes" },
      { value: "Villeurbanne", label: "Villeurbanne" },
      { value: "Le Mans", label: "Le Mans" },
      { value: "Aix-en-Provence", label: "Aix-en-Provence" },
      { value: "Clermont-Ferrand", label: "Clermont-Ferrand" },
      { value: "Brest", label: "Brest" },
      { value: "Limoges", label: "Limoges" },
      { value: "Tours", label: "Tours" },
      { value: "Amiens", label: "Amiens" },
      { value: "Perpignan", label: "Perpignan" },
      { value: "Metz", label: "Metz" },
      { value: "Besançon", label: "Besançon" },
      { value: "Orléans", label: "Orléans" },
      { value: "Mulhouse", label: "Mulhouse" },
      { value: "Rouen", label: "Rouen" },
      { value: "Caen", label: "Caen" },
      { value: "Nancy", label: "Nancy" },
      { value: "Saint-Denis", label: "Saint-Denis" },
      { value: "Le Saint-Pierre", label: "Le Saint-Pierre" },
      { value: "Boulogne-Billancourt", label: "Boulogne-Billancourt" },
      { value: "Argenteuil", label: "Argenteuil" },
      { value: "Montreuil", label: "Montreuil" },
      { value: "Roubaix", label: "Roubaix" },
      { value: "Nanterre", label: "Nanterre" },
      { value: "Vitry-sur-Seine", label: "Vitry-sur-Seine" },
      { value: "Avignon", label: "Avignon" },
      { value: "Créteil", label: "Créteil" },
      { value: "Versailles", label: "Versailles" },
      { value: "Poitiers", label: "Poitiers" },
    ],
    Finland: [
      { value: "Helsinki", label: "Helsinki" },
      { value: "Espoo", label: "Espoo" },
      { value: "Tampere", label: "Tampere" },
      { value: "Vantaa", label: "Vantaa" },
      { value: "Oulu", label: "Oulu" },
      { value: "Turku", label: "Turku" },
      { value: "Jyväskylä", label: "Jyväskylä" },
      { value: "Lahti", label: "Lahti" },
      { value: "Kuopio", label: "Kuopio" },
      { value: "Kouvola", label: "Kouvola" },
      { value: "Pori", label: "Pori" },
      { value: "Joensuu", label: "Joensuu" },
      { value: "Lappeenranta", label: "Lappeenranta" },
      { value: "Hämeenlinna", label: "Hämeenlinna" },
      { value: "Vaasa", label: "Vaasa" },
      { value: "Seinäjoki", label: "Seinäjoki" },
      { value: "Rovaniemi", label: "Rovaniemi" },
      { value: "Mikkeli", label: "Mikkeli" },
      { value: "Salo", label: "Salo" },
      { value: "Kokkola", label: "Kokkola" },
      { value: "Porvoo", label: "Porvoo" },
      { value: "Lohja", label: "Lohja" },
      { value: "Hyvinkää", label: "Hyvinkää" },
      { value: "Nurmijärvi", label: "Nurmijärvi" },
      { value: "Järvenpää", label: "Järvenpää" },
      { value: "Rauma", label: "Rauma" },
      { value: "Kerava", label: "Kerava" },
      { value: "Kajaani", label: "Kajaani" },
      { value: "Laukaa", label: "Laukaa" },
      { value: "Imatra", label: "Imatra" },
      { value: "Kangasala", label: "Kangasala" },
      { value: "Riihimäki", label: "Riihimäki" },
      { value: "Savonlinna", label: "Savonlinna" },
      { value: "Ylöjärvi", label: "Ylöjärvi" },
      { value: "Kaarina", label: "Kaarina" },
      { value: "Tornio", label: "Tornio" },
      { value: "Raisio", label: "Raisio" },
      { value: "Hollola", label: "Hollola" },
      { value: "Nokia", label: "Nokia" },
      { value: "Vihti", label: "Vihti" },
      { value: "Kristiinankaupunki", label: "Kristiinankaupunki" },
      { value: "Äänekoski", label: "Äänekoski" },
      { value: "Valkeakoski", label: "Valkeakoski" },
      { value: "Kemi", label: "Kemi" },
      { value: "Iisalmi", label: "Iisalmi" },
      { value: "Varkaus", label: "Varkaus" },
    ],
    Fiji: [
      { value: "Suva", label: "Suva" },
      { value: "Lautoka", label: "Lautoka" },
      { value: "Nadi", label: "Nadi" },
      { value: "Labasa", label: "Labasa" },
      { value: "Ba", label: "Ba" },
      { value: "Levuka", label: "Levuka" },
      { value: "Nausori", label: "Nausori" },
      { value: "Savusavu", label: "Savusavu" },
      { value: "Tavua", label: "Tavua" },
      { value: "Sigatoka", label: "Sigatoka" },
      { value: "Rakiraki", label: "Rakiraki" },
      { value: "Nadi", label: "Nadi" },
      { value: "Ba", label: "Ba" },
      { value: "Lami", label: "Lami" },
      { value: "Savusavu", label: "Savusavu" },
      { value: "Rakiraki", label: "Rakiraki" },
      { value: "Lami", label: "Lami" },
      { value: "Savusavu", label: "Savusavu" },
      { value: "Nasinu", label: "Nasinu" },
      { value: "Nausori", label: "Nausori" },
    ],
    Egypt: [
      { value: "Cairo", label: "Cairo" },
      { value: "Alexandria", label: "Alexandria" },
      { value: "Giza", label: "Giza" },
      { value: "Shubra El-Kheima", label: "Shubra El-Kheima" },
      { value: "Port Said", label: "Port Said" },
      { value: "Suez", label: "Suez" },
      { value: "Luxor", label: "Luxor" },
      { value: "El-Mansoura", label: "El-Mansoura" },
      { value: "Tanta", label: "Tanta" },
      { value: "Asyut", label: "Asyut" },
      { value: "Ismailia", label: "Ismailia" },
      { value: "Fayyum", label: "Fayyum" },
      { value: "Zagazig", label: "Zagazig" },
      { value: "Aswan", label: "Aswan" },
      { value: "Damietta", label: "Damietta" },
      { value: "Damanhur", label: "Damanhur" },
      { value: "El-Mahalla El-Kubra", label: "El-Mahalla El-Kubra" },
      { value: "Qena", label: "Qena" },
      { value: "Sohag", label: "Sohag" },
      { value: "Hurghada", label: "Hurghada" },
      { value: "Banha", label: "Banha" },
      { value: "Kafr El-Sheikh", label: "Kafr El-Sheikh" },
      { value: "Mansoura", label: "Mansoura" },
      { value: "Beni Suef", label: "Beni Suef" },
      { value: "Tanta", label: "Tanta" },
      { value: "Shibin El Kom", label: "Shibin El Kom" },
      { value: "El Arish", label: "El Arish" },
      { value: "Arish", label: "Arish" },
      { value: "Qalyub", label: "Qalyub" },
      { value: "Desouk", label: "Desouk" },
      { value: "Abu Kabir", label: "Abu Kabir" },
      { value: "Damietta", label: "Damietta" },
      { value: "Luxor", label: "Luxor" },
      { value: "Mallawi", label: "Mallawi" },
      { value: "Kafr El-Dawwar", label: "Kafr El-Dawwar" },
      { value: "Elsahel", label: "Elsahel" },
      { value: "Kom Ombo", label: "Kom Ombo" },
      { value: "Dikirnis", label: "Dikirnis" },
      { value: "Armant", label: "Armant" },
      { value: "Quesna", label: "Quesna" },
      { value: "Al-Balyana", label: "Al-Balyana" },
      { value: "Matay", label: "Matay" },
      { value: "Balasara", label: "Balasara" },
      { value: "Al-Hamra", label: "Al-Hamra" },
      { value: "Tamy al-Amdid", label: "Tamy al-Amdid" },
    ],
    "Eastern Caribbean": [
      { value: "Bridgetown", label: "Bridgetown" },
      { value: "Castries", label: "Castries" },
      { value: "Kingstown", label: "Kingstown" },
      { value: "St. John's", label: "St. John's" },
      { value: "Roseau", label: "Roseau" },
      { value: "Basseterre", label: "Basseterre" },
      { value: "St. George's", label: "St. George's" },
      { value: "Port of Spain", label: "Port of Spain" },
      { value: "Road Town", label: "Road Town" },
      { value: "Charlotte Amalie", label: "Charlotte Amalie" },
      { value: "Philipsburg", label: "Philipsburg" },
      { value: "Saint-Pierre", label: "Saint-Pierre" },
      { value: "The Valley", label: "The Valley" },
    ],
    "New Zealand": [
      { value: "Auckland", label: "Auckland" },
      { value: "Wellington", label: "Wellington" },
      { value: "Christchurch", label: "Christchurch" },
      { value: "Hamilton", label: "Hamilton" },
      { value: "Tauranga", label: "Tauranga" },
      { value: "Napier-Hastings", label: "Napier-Hastings" },
      { value: "Dunedin", label: "Dunedin" },
      { value: "Palmerston North", label: "Palmerston North" },
      { value: "Nelson", label: "Nelson" },
      { value: "Rotorua", label: "Rotorua" },
      { value: "Whangarei", label: "Whangarei" },
      { value: "New Plymouth", label: "New Plymouth" },
      { value: "Invercargill", label: "Invercargill" },
      { value: "Whanganui", label: "Whanganui" },
      { value: "Gisborne", label: "Gisborne" },
      { value: "Masterton", label: "Masterton" },
      { value: "Levin", label: "Levin" },
      { value: "Tokoroa", label: "Tokoroa" },
      { value: "Ashburton", label: "Ashburton" },
      { value: "Timaru", label: "Timaru" },
      { value: "Taupo", label: "Taupo" },
      { value: "Pukekohe East", label: "Pukekohe East" },
      { value: "Masterton", label: "Masterton" },
      { value: "Whakatane", label: "Whakatane" },
      { value: "Nelson", label: "Nelson" },
      { value: "Blenheim", label: "Blenheim" },
      { value: "Gore", label: "Gore" },
      { value: "Takanini", label: "Takanini" },
      { value: "Taumarunui", label: "Taumarunui" },
      { value: "Picton", label: "Picton" },
      { value: "Kerikeri", label: "Kerikeri" },
      { value: "Waiuku", label: "Waiuku" },
      { value: "Wanaka", label: "Wanaka" },
      { value: "Waihi", label: "Waihi" },
      { value: "Katikati", label: "Katikati" },
      { value: "Queenstown", label: "Queenstown" },
      { value: "Te Anau", label: "Te Anau" },
      { value: "Waipawa", label: "Waipawa" },
      { value: "Feilding", label: "Feilding" },
      { value: "Winton", label: "Winton" },
      { value: "Te Kuiti", label: "Te Kuiti" },
      { value: "Huntly", label: "Huntly" },
      { value: "Warkworth", label: "Warkworth" },
      { value: "Turangi", label: "Turangi" },
    ],
    Netherlands: [
      { value: "Amsterdam", label: "Amsterdam" },
      { value: "Rotterdam", label: "Rotterdam" },
      { value: "The Hague", label: "The Hague" },
      { value: "Utrecht", label: "Utrecht" },
      { value: "Eindhoven", label: "Eindhoven" },
      { value: "Tilburg", label: "Tilburg" },
      { value: "Groningen", label: "Groningen" },
      { value: "Almere", label: "Almere" },
      { value: "Breda", label: "Breda" },
      { value: "Nijmegen", label: "Nijmegen" },
      { value: "Enschede", label: "Enschede" },
      { value: "Haarlem", label: "Haarlem" },
      { value: "Arnhem", label: "Arnhem" },
      { value: "Zaanstad", label: "Zaanstad" },
      { value: "Amersfoort", label: "Amersfoort" },
      { value: "Apeldoorn", label: "Apeldoorn" },
      { value: "s-Hertogenbosch", label: "s-Hertogenbosch" },
      { value: "Hoofddorp", label: "Hoofddorp" },
      { value: "Maastricht", label: "Maastricht" },
      { value: "Leiden", label: "Leiden" },
      { value: "Dordrecht", label: "Dordrecht" },
      { value: "Zoetermeer", label: "Zoetermeer" },
      { value: "Zwolle", label: "Zwolle" },
      { value: "Deventer", label: "Deventer" },
      { value: "Delft", label: "Delft" },
      { value: "Alkmaar", label: "Alkmaar" },
      { value: "Heerlen", label: "Heerlen" },
      { value: "Venlo", label: "Venlo" },
      { value: "Leeuwarden", label: "Leeuwarden" },
      { value: "Amstelveen", label: "Amstelveen" },
      { value: "Hilversum", label: "Hilversum" },
      { value: "Hengelo", label: "Hengelo" },
      { value: "Purmerend", label: "Purmerend" },
      { value: "Roosendaal", label: "Roosendaal" },
      { value: "Oss", label: "Oss" },
      { value: "Schiedam", label: "Schiedam" },
      { value: "Spijkenisse", label: "Spijkenisse" },
      { value: "Vlaardingen", label: "Vlaardingen" },
      { value: "Almelo", label: "Almelo" },
      { value: "Gouda", label: "Gouda" },
      { value: "Zaandam", label: "Zaandam" },
      { value: "Lelystad", label: "Lelystad" },
      { value: "Alphen aan den Rijn", label: "Alphen aan den Rijn" },
      { value: "Helmond", label: "Helmond" },
      { value: "Heerhugowaard", label: "Heerhugowaard" },
      { value: "Hilversum", label: "Hilversum" },
      { value: "Zeist", label: "Zeist" },
    ],
    Denmark: [
      { value: "Copenhagen", label: "Copenhagen" },
      { value: "Aarhus", label: "Aarhus" },
      { value: "Odense", label: "Odense" },
      { value: "Aalborg", label: "Aalborg" },
      { value: "Esbjerg", label: "Esbjerg" },
      { value: "Randers", label: "Randers" },
      { value: "Kolding", label: "Kolding" },
      { value: "Horsens", label: "Horsens" },
      { value: "Vejle", label: "Vejle" },
      { value: "Roskilde", label: "Roskilde" },
      { value: "Helsingør", label: "Helsingør" },
      { value: "Herning", label: "Herning" },
      { value: "Silkeborg", label: "Silkeborg" },
      { value: "Næstved", label: "Næstved" },
      { value: "Greve", label: "Greve" },
      { value: "Tårnby", label: "Tårnby" },
      { value: "Fredericia", label: "Fredericia" },
      { value: "Ballerup", label: "Ballerup" },
      { value: "Rødovre", label: "Rødovre" },
      { value: "Viborg", label: "Viborg" },
      { value: "Køge", label: "Køge" },
      { value: "Holstebro", label: "Holstebro" },
      { value: "Taastrup", label: "Taastrup" },
      { value: "Slagelse", label: "Slagelse" },
      { value: "Hillerød", label: "Hillerød" },
      { value: "Helsingborg", label: "Helsingborg" },
      { value: "Frederikshavn", label: "Frederikshavn" },
      { value: "Hjørring", label: "Hjørring" },
      { value: "Nørresundby", label: "Nørresundby" },
      { value: "Holbæk", label: "Holbæk" },
      { value: "Sønderborg", label: "Sønderborg" },
      { value: "Frederikssund", label: "Frederikssund" },
      { value: "Ringsted", label: "Ringsted" },
      { value: "Århus", label: "Århus" },
      { value: "Frederiksværk", label: "Frederiksværk" },
      { value: "Køge", label: "Køge" },
      { value: "Nyborg", label: "Nyborg" },
      { value: "Farum", label: "Farum" },
      { value: "Ikast", label: "Ikast" },
      { value: "Vordingborg", label: "Vordingborg" },
      { value: "Nykøbing Falster", label: "Nykøbing Falster" },
    ],
    "Czech Republic": [
      { value: "Prague", label: "Prague" },
      { value: "Brno", label: "Brno" },
      { value: "Ostrava", label: "Ostrava" },
      { value: "Plzeň", label: "Plzeň" },
      { value: "Liberec", label: "Liberec" },
      { value: "Olomouc", label: "Olomouc" },
      { value: "České Budějovice", label: "České Budějovice" },
      { value: "Hradec Králové", label: "Hradec Králové" },
      { value: "Ústí nad Labem", label: "Ústí nad Labem" },
      { value: "Pardubice", label: "Pardubice" },
      { value: "Zlín", label: "Zlín" },
      { value: "Havířov", label: "Havířov" },
      { value: "Kladno", label: "Kladno" },
      { value: "Most", label: "Most" },
      { value: "Opava", label: "Opava" },
      { value: "Frýdek-Místek", label: "Frýdek-Místek" },
      { value: "Karviná", label: "Karviná" },
      { value: "Jihlava", label: "Jihlava" },
      { value: "Teplice", label: "Teplice" },
      { value: "Děčín", label: "Děčín" },
      { value: "Karlovy Vary", label: "Karlovy Vary" },
      { value: "Chomutov", label: "Chomutov" },
      { value: "Jablonec nad Nisou", label: "Jablonec nad Nisou" },
      { value: "Mladá Boleslav", label: "Mladá Boleslav" },
      { value: "Prostějov", label: "Prostějov" },
      { value: "Třebíč", label: "Třebíč" },
      { value: "Třinec", label: "Třinec" },
      { value: "Česká Lípa", label: "Česká Lípa" },
      { value: "Tábor", label: "Tábor" },
      { value: "Znojmo", label: "Znojmo" },
      { value: "Přerov", label: "Přerov" },
      { value: "Cheb", label: "Cheb" },
      { value: "Kolin", label: "Kolin" },
      { value: "Trutnov", label: "Trutnov" },
      { value: "Kroměříž", label: "Kroměříž" },
      { value: "Jindřichův Hradec", label: "Jindřichův Hradec" },
      { value: "Prostějov", label: "Prostějov" },
      { value: "Písek", label: "Písek" },
      { value: "Šumperk", label: "Šumperk" },
      { value: "Jirkov", label: "Jirkov" },
      { value: "Litvínov", label: "Litvínov" },
      { value: "Havlíčkův Brod", label: "Havlíčkův Brod" },
    ],
    Cyprus: [
      { value: "Nicosia", label: "Nicosia" },
      { value: "Limassol", label: "Limassol" },
      { value: "Larnaca", label: "Larnaca" },
      { value: "Famagusta", label: "Famagusta" },
      { value: "Paphos", label: "Paphos" },
      { value: "Kyrenia", label: "Kyrenia" },
      { value: "Protaras", label: "Protaras" },
      { value: "Ayia Napa", label: "Ayia Napa" },
      { value: "Paralimni", label: "Paralimni" },
      { value: "Polis", label: "Polis" },
      { value: "Lefka", label: "Lefka" },
      { value: "Morphou", label: "Morphou" },
      { value: "Xylophagou", label: "Xylophagou" },
      { value: "Deryneia", label: "Deryneia" },
      { value: "Sotira", label: "Sotira" },
      { value: "Mouttagiaka", label: "Mouttagiaka" },
      { value: "Dherynia", label: "Dherynia" },
      { value: "Kato Pyrgos", label: "Kato Pyrgos" },
      { value: "Pyla", label: "Pyla" },
      { value: "Peristerona", label: "Peristerona" },
      { value: "Vrysoulles", label: "Vrysoulles" },
      { value: "Avgorou", label: "Avgorou" },
      { value: "Lysos", label: "Lysos" },
      { value: "Pachyammos", label: "Pachyammos" },
      { value: "Zygi", label: "Zygi" },
      { value: "Kornos", label: "Kornos" },
      { value: "Athienou", label: "Athienou" },
      { value: "Arsos", label: "Arsos" },
      { value: "Achna", label: "Achna" },
      { value: "Argaka", label: "Argaka" },
      { value: "Lageia", label: "Lageia" },
      { value: "Neo Chorio", label: "Neo Chorio" },
      { value: "Kissonerga", label: "Kissonerga" },
      { value: "Pissouri", label: "Pissouri" },
      { value: "Agros", label: "Agros" },
      { value: "Tala", label: "Tala" },
      { value: "Platres", label: "Platres" },
      { value: "Kato Akourdalia", label: "Kato Akourdalia" },
      { value: "Episkopi", label: "Episkopi" },
      { value: "Kakopetria", label: "Kakopetria" },
    ],
    Chile: [
      { value: "Santiago", label: "Santiago" },
      { value: "Valparaíso", label: "Valparaíso" },
      { value: "Concepción", label: "Concepción" },
      { value: "Viña del Mar", label: "Viña del Mar" },
      { value: "Antofagasta", label: "Antofagasta" },
      { value: "Valdivia", label: "Valdivia" },
      { value: "La Serena", label: "La Serena" },
      { value: "Arica", label: "Arica" },
      { value: "Iquique", label: "Iquique" },
      { value: "Rancagua", label: "Rancagua" },
      { value: "Talca", label: "Talca" },
      { value: "Temuco", label: "Temuco" },
      { value: "Puerto Montt", label: "Puerto Montt" },
      { value: "Chillán", label: "Chillán" },
      { value: "Curicó", label: "Curicó" },
      { value: "Osorno", label: "Osorno" },
      { value: "Calama", label: "Calama" },
      { value: "Iquique", label: "Iquique" },
      { value: "Coquimbo", label: "Coquimbo" },
      { value: "Puente Alto", label: "Puente Alto" },
      { value: "San Bernardo", label: "San Bernardo" },
      { value: "La Florida", label: "La Florida" },
      { value: "Peñalolén", label: "Peñalolén" },
      { value: "Maipú", label: "Maipú" },
      { value: "Puente Alto", label: "Puente Alto" },
      { value: "Talcahuano", label: "Talcahuano" },
      { value: "Ñuñoa", label: "Ñuñoa" },
      { value: "Quilpué", label: "Quilpué" },
      { value: "Valdivia", label: "Valdivia" },
      { value: "San Felipe", label: "San Felipe" },
      { value: "Los Ángeles", label: "Los Ángeles" },
      { value: "Copiapó", label: "Copiapó" },
      { value: "Chicureo", label: "Chicureo" },
      { value: "La Pintana", label: "La Pintana" },
      { value: "Huechuraba", label: "Huechuraba" },
      { value: "Viña del Mar", label: "Viña del Mar" },
      { value: "Conchalí", label: "Conchalí" },
      { value: "Melipilla", label: "Melipilla" },
      { value: "Coyhaique", label: "Coyhaique" },
      { value: "Punta Arenas", label: "Punta Arenas" },
      { value: "Quillota", label: "Quillota" },
      { value: "Pucón", label: "Pucón" },
      { value: "Puerto Natales", label: "Puerto Natales" },
      { value: "San Antonio", label: "San Antonio" },
    ],
    China: [
      { value: "Beijing", label: "Beijing" },
      { value: "Shanghai", label: "Shanghai" },
      { value: "Guangzhou", label: "Guangzhou" },
      { value: "Shenzhen", label: "Shenzhen" },
      { value: "Chengdu", label: "Chengdu" },
      { value: "Hangzhou", label: "Hangzhou" },
      { value: "Xi'an", label: "Xi'an" },
      { value: "Tianjin", label: "Tianjin" },
      { value: "Nanjing", label: "Nanjing" },
      { value: "Wuhan", label: "Wuhan" },
      { value: "Chongqing", label: "Chongqing" },
      { value: "Suzhou", label: "Suzhou" },
      { value: "Qingdao", label: "Qingdao" },
      { value: "Dalian", label: "Dalian" },
      { value: "Shenyang", label: "Shenyang" },
      { value: "Zhengzhou", label: "Zhengzhou" },
      { value: "Ningbo", label: "Ningbo" },
      { value: "Xiamen", label: "Xiamen" },
      { value: "Changsha", label: "Changsha" },
      { value: "Kunming", label: "Kunming" },
      { value: "Wuxi", label: "Wuxi" },
      { value: "Foshan", label: "Foshan" },
      { value: "Harbin", label: "Harbin" },
      { value: "Shijiazhuang", label: "Shijiazhuang" },
      { value: "Urumqi", label: "Urumqi" },
      { value: "Hefei", label: "Hefei" },
      { value: "Jinan", label: "Jinan" },
      { value: "Changchun", label: "Changchun" },
      { value: "Nanchang", label: "Nanchang" },
      { value: "Taiyuan", label: "Taiyuan" },
      { value: "Guiyang", label: "Guiyang" },
      { value: "Xuzhou", label: "Xuzhou" },
      { value: "Lanzhou", label: "Lanzhou" },
      { value: "Hohhot", label: "Hohhot" },
      { value: "Nanning", label: "Nanning" },
      { value: "Yinchuan", label: "Yinchuan" },
      { value: "Changzhou", label: "Changzhou" },
      { value: "Zhongshan", label: "Zhongshan" },
      { value: "Huizhou", label: "Huizhou" },
      { value: "Baotou", label: "Baotou" },
      { value: "Jilin", label: "Jilin" },
      { value: "Huangshi", label: "Huangshi" },
      { value: "Xining", label: "Xining" },
      { value: "Anshan", label: "Anshan" },
      { value: "Fuzhou", label: "Fuzhou" },
    ],
    Bermuda: [
      { value: "Hamilton", label: "Hamilton" },
      { value: "St. George's", label: "St. George's" },
      { value: "Somerset Village", label: "Somerset Village" },
      { value: "Flatts Village", label: "Flatts Village" },
      { value: "Smith's Parish", label: "Smith's Parish" },
      { value: "Paget Parish", label: "Paget Parish" },
      { value: "Warwick Parish", label: "Warwick Parish" },
      { value: "Southampton Parish", label: "Southampton Parish" },
      { value: "Sandys Parish", label: "Sandys Parish" },
      { value: "Devonshire Parish", label: "Devonshire Parish" },
      { value: "Pembroke Parish", label: "Pembroke Parish" },
      { value: "St. David's Island", label: "St. David's Island" },
    ],
    Belgium: [
      { value: "Brussels", label: "Brussels" },
      { value: "Antwerp", label: "Antwerp" },
      { value: "Ghent", label: "Ghent" },
      { value: "Bruges", label: "Bruges" },
      { value: "Leuven", label: "Leuven" },
      { value: "Liège", label: "Liège" },
      { value: "Namur", label: "Namur" },
      { value: "Mons", label: "Mons" },
      { value: "Aalst", label: "Aalst" },
      { value: "Mechelen", label: "Mechelen" },
      { value: "Kortrijk", label: "Kortrijk" },
      { value: "Hasselt", label: "Hasselt" },
      { value: "Ostend", label: "Ostend" },
      { value: "Sint-Niklaas", label: "Sint-Niklaas" },
      { value: "Tournai", label: "Tournai" },
      { value: "Genk", label: "Genk" },
      { value: "Seraing", label: "Seraing" },
      { value: "Roeselare", label: "Roeselare" },
      { value: "Verviers", label: "Verviers" },
      { value: "Mouscron", label: "Mouscron" },
      { value: "La Louvière", label: "La Louvière" },
      { value: "Harelbeke", label: "Harelbeke" },
      { value: "Turnhout", label: "Turnhout" },
      { value: "Louvain-la-Neuve", label: "Louvain-la-Neuve" },
      { value: "Beringen", label: "Beringen" },
      { value: "Bilzen", label: "Bilzen" },
      { value: "Bastogne", label: "Bastogne" },
      { value: "Châtelet", label: "Châtelet" },
      { value: "Eeklo", label: "Eeklo" },
      { value: "Lokeren", label: "Lokeren" },
      { value: "Ninove", label: "Ninove" },
      { value: "Waregem", label: "Waregem" },
      { value: "Vilvoorde", label: "Vilvoorde" },
      { value: "Ieper", label: "Ieper" },
      { value: "Herstal", label: "Herstal" },
      { value: "Braine-l'Alleud", label: "Braine-l'Alleud" },
      { value: "Lommel", label: "Lommel" },
      { value: "Arlon", label: "Arlon" },
      { value: "Waterloo", label: "Waterloo" },
    ],
    Barbados: [
      { value: "Bridgetown", label: "Bridgetown" },
      { value: "Speightstown", label: "Speightstown" },
      { value: "Oistins", label: "Oistins" },
      { value: "Holetown", label: "Holetown" },
      { value: "Bathsheba", label: "Bathsheba" },
      { value: "Crane", label: "Crane" },
      { value: "Greenland", label: "Greenland" },
      { value: "Four Cross Roads", label: "Four Cross Roads" },
      { value: "Black Rock", label: "Black Rock" },
      { value: "The Garden", label: "The Garden" },
      { value: "Hillaby", label: "Hillaby" },
      { value: "Crab Hill", label: "Crab Hill" },
      { value: "Checker Hall", label: "Checker Hall" },
      { value: "Rock Dundo", label: "Rock Dundo" },
      { value: "Hastings", label: "Hastings" },
      { value: "Silver Sands", label: "Silver Sands" },
      { value: "Saint Martins", label: "Saint Martins" },
      { value: "Church View", label: "Church View" },
      { value: "Boscobel", label: "Boscobel" },
      { value: "Brighton", label: "Brighton" },
    ],
    Bahamas: [
      { value: "Nassau", label: "Nassau" },
      { value: "Freeport", label: "Freeport" },
      { value: "West End", label: "West End" },
      { value: "Coopers Town", label: "Coopers Town" },
      { value: "Marsh Harbour", label: "Marsh Harbour" },
      { value: "George Town", label: "George Town" },
      { value: "Alice Town", label: "Alice Town" },
      { value: "Dunmore Town", label: "Dunmore Town" },
      { value: "Rock Sound", label: "Rock Sound" },
      { value: "Arthur's Town", label: "Arthur's Town" },
      { value: "Clarence Town", label: "Clarence Town" },
      { value: "Matthew Town", label: "Matthew Town" },
      {
        value: "Nichollstown and Berry Islands",
        label: "Nichollstown and Berry Islands",
      },
      { value: "Freetown", label: "Freetown" },
      { value: "High Rock", label: "High Rock" },
      { value: "The Bight", label: "The Bight" },
      { value: "Andros Town", label: "Andros Town" },
      { value: "San Andros", label: "San Andros" },
      { value: "Spanish Wells", label: "Spanish Wells" },
      { value: "Kemps Bay", label: "Kemps Bay" },
    ],
    Austria: [
      { value: "Vienna", label: "Vienna" },
      { value: "Graz", label: "Graz" },
      { value: "Linz", label: "Linz" },
      { value: "Salzburg", label: "Salzburg" },
      { value: "Innsbruck", label: "Innsbruck" },
      { value: "Klagenfurt", label: "Klagenfurt" },
      { value: "Villach", label: "Villach" },
      { value: "Wels", label: "Wels" },
      { value: "Sankt Pölten", label: "Sankt Pölten" },
      { value: "Dornbirn", label: "Dornbirn" },
      { value: "Wiener Neustadt", label: "Wiener Neustadt" },
      { value: "Steyr", label: "Steyr" },
      { value: "Feldkirch", label: "Feldkirch" },
      { value: "Bregenz", label: "Bregenz" },
      { value: "Leonding", label: "Leonding" },
      { value: "Klosterneuburg", label: "Klosterneuburg" },
      { value: "Baden", label: "Baden" },
      { value: "Wolfsberg", label: "Wolfsberg" },
      { value: "Leoben", label: "Leoben" },
      { value: "Krems an der Donau", label: "Krems an der Donau" },
      { value: "Traun", label: "Traun" },
      { value: "Amstetten", label: "Amstetten" },
      { value: "Lustenau", label: "Lustenau" },
      { value: "Kapfenberg", label: "Kapfenberg" },
      { value: "Hallein", label: "Hallein" },
      { value: "Mödling", label: "Mödling" },
      { value: "Kufstein", label: "Kufstein" },
      { value: "Traiskirchen", label: "Traiskirchen" },
      { value: "Schwechat", label: "Schwechat" },
      { value: "Tulln an der Donau", label: "Tulln an der Donau" },
      { value: "Perchtoldsdorf", label: "Perchtoldsdorf" },
      { value: "Hohenems", label: "Hohenems" },
      { value: "Spittal an der Drau", label: "Spittal an der Drau" },
      { value: "Bad Ischl", label: "Bad Ischl" },
      { value: "Stockerau", label: "Stockerau" },
      { value: "Ternitz", label: "Ternitz" },
      { value: "Bludenz", label: "Bludenz" },
      {
        value: "Saalfelden am Steinernen Meer",
        label: "Saalfelden am Steinernen Meer",
      },
      { value: "Braunau am Inn", label: "Braunau am Inn" },
      { value: "Knittelfeld", label: "Knittelfeld" },
      { value: "Eisenstadt", label: "Eisenstadt" },
      { value: "Feldkirchen in Kärnten", label: "Feldkirchen in Kärnten" },
      { value: "Telfs", label: "Telfs" },
      { value: "Bischofshofen", label: "Bischofshofen" },
      { value: "Gmunden", label: "Gmunden" },
      { value: "Hard", label: "Hard" },
      { value: "Korneuburg", label: "Korneuburg" },
      { value: "Neunkirchen", label: "Neunkirchen" },
      { value: "Enns", label: "Enns" },
      { value: "Schwaz", label: "Schwaz" },
    ],
    Argentina: [
      { value: "Buenos Aires", label: "Buenos Aires" },
      { value: "Córdoba", label: "Córdoba" },
      { value: "Rosario", label: "Rosario" },
      { value: "Mendoza", label: "Mendoza" },
      { value: "San Miguel de Tucumán", label: "San Miguel de Tucumán" },
      { value: "La Plata", label: "La Plata" },
      { value: "Mar del Plata", label: "Mar del Plata" },
      { value: "Salta", label: "Salta" },
      { value: "Santa Fe", label: "Santa Fe" },
      { value: "San Juan", label: "San Juan" },
      { value: "Resistencia", label: "Resistencia" },
      { value: "Neuquén", label: "Neuquén" },
      { value: "Santiago del Estero", label: "Santiago del Estero" },
      { value: "Corrientes", label: "Corrientes" },
      { value: "Avellaneda", label: "Avellaneda" },
      { value: "Bahía Blanca", label: "Bahía Blanca" },
      { value: "San Salvador de Jujuy", label: "San Salvador de Jujuy" },
      { value: "Quilmes", label: "Quilmes" },
      { value: "Lanús", label: "Lanús" },
      { value: "Comodoro Rivadavia", label: "Comodoro Rivadavia" },
    ],
    Algeria: [
      { value: "Algiers", label: "Algiers" },
      { value: "Oran", label: "Oran" },
      { value: "Constantine", label: "Constantine" },
      { value: "Annaba", label: "Annaba" },
      { value: "Blida", label: "Blida" },
      { value: "Batna", label: "Batna" },
      { value: "Djelfa", label: "Djelfa" },
      { value: "Sétif", label: "Sétif" },
      { value: "Sidi bel Abbès", label: "Sidi bel Abbès" },
      { value: "Biskra", label: "Biskra" },
      { value: "Tébessa", label: "Tébessa" },
      { value: "Skikda", label: "Skikda" },
      { value: "Tiaret", label: "Tiaret" },
      { value: "Béjaïa", label: "Béjaïa" },
      { value: "Tlemcen", label: "Tlemcen" },
      { value: "Béchar", label: "Béchar" },
      { value: "Mostaganem", label: "Mostaganem" },
      { value: "Bordj Bou Arreridj", label: "Bordj Bou Arreridj" },
      { value: "Chlef", label: "Chlef" },
      { value: "Souk Ahras", label: "Souk Ahras" },
    ],
    "United Kingdom": [
      { value: "London", label: "London" },
      { value: "Edinburgh", label: "Edinburgh" },
      { value: "Manchester", label: "Manchester" },
      { value: "Glasgow", label: "Glasgow" },
      { value: "Birmingham", label: "Birmingham" },
      { value: "Liverpool", label: "Liverpool" },
      { value: "Bristol", label: "Bristol" },
      { value: "York", label: "York" },
      { value: "Oxford", label: "Oxford" },
      { value: "Cardiff", label: "Cardiff" },
      { value: "Belfast", label: "Belfast" },
      { value: "Brighton", label: "Brighton" },
      { value: "Bath", label: "Bath" },
      { value: "Newcastle Upon Tyne", label: "Newcastle Upon Tyne" },
      { value: "Blackpool", label: "Blackpool" },
      { value: "Cornwall", label: "Cornwall" },
      { value: "Bournemouth", label: "Bournemouth" },
      { value: "Leeds", label: "Leeds" },
      { value: "Sheffield", label: "Sheffield" },
      { value: "Isle of Wight", label: "Isle of Wight" },
    ],
    "United States": [
      { value: "Alabama", label: "Alabama" },
      { value: "Alaska", label: "Alaska" },
      { value: "Arizona", label: "Arizona" },
      { value: "Arkansas", label: "Arkansas" },
      { value: "California", label: "California" },
      { value: "Colorado", label: "Colorado" },
      { value: "Connecticut", label: "Connecticut" },
      { value: "Delaware", label: "Delaware" },
      { value: "Florida", label: "Florida" },
      { value: "Georgia", label: "Georgia" },
      { value: "Hawaii", label: "Hawaii" },
      { value: "Idaho", label: "Idaho" },
      { value: "Illinois", label: "Illinois" },
      { value: "Indiana", label: "Indiana" },
      { value: "Iowa", label: "Iowa" },
      { value: "Kansas", label: "Kansas" },
      { value: "Kentucky", label: "Kentucky" },
      { value: "Louisiana", label: "Louisiana" },
      { value: "Maine", label: "Maine" },
      { value: "Maryland", label: "Maryland" },
      { value: "Massachusetts", label: "Massachusetts" },
      { value: "Michigan", label: "Michigan" },
      { value: "Minnesota", label: "Minnesota" },
      { value: "Mississippi", label: "Mississippi" },
      { value: "Missouri", label: "Missouri" },
      { value: "Montana", label: "Montana" },
      { value: "Nebraska", label: "Nebraska" },
      { value: "Nevada", label: "Nevada" },
      { value: "New Hampshire", label: "New Hampshire" },
      { value: "New Jersey", label: "New Jersey" },
      { value: "New Mexico", label: "New Mexico" },
      { value: "New York", label: "New York" },
      { value: "North Carolina", label: "North Carolina" },
      { value: "North Dakota", label: "North Dakota" },
      { value: "Ohio", label: "Ohio" },
      { value: "Oklahoma", label: "Oklahoma" },
      { value: "Oregon", label: "Oregon" },
      { value: "Pennsylvania", label: "Pennsylvania" },
      { value: "Rhode Island", label: "Rhode Island" },
      { value: "South Carolina", label: "South Carolina" },
      { value: "South Dakota", label: "South Dakota" },
      { value: "Tennessee", label: "Tennessee" },
      { value: "Texas", label: "Texas" },
      { value: "Utah", label: "Utah" },
      { value: "Vermont", label: "Vermont" },
      { value: "Virginia", label: "Virginia" },
      { value: "Washington", label: "Washington" },
      { value: "West Virginia", label: "West Virginia" },
      { value: "Wisconsin", label: "Wisconsin" },
      { value: "Wyoming", label: "Wyoming" },
    ],
    Eurozone: [
      { value: "Austria", label: "Austria" },
      { value: "Belgium", label: "Belgium" },
      { value: "Croatia", label: "Croatia" },
      { value: "Cyprus", label: "Cyprus" },
      { value: "Estonia", label: "Estonia" },
      { value: "Finland", label: "Finland" },
      { value: "France", label: "France" },
      { value: "Germany", label: "Germany" },
      { value: "Greece", label: "Greece" },
      { value: "Ireland", label: "Ireland" },
      { value: "Italy", label: "Italy" },
      { value: "Latvia", label: "Latvia" },
      { value: "Lithuania", label: "Lithuania" },
      { value: "Luxembourg", label: "Luxembourg" },
      { value: "Malta", label: "Malta" },
      { value: "Netherlands", label: "Netherlands" },
      { value: "Portugal", label: "Portugal" },
      { value: "Slovakia", label: "Slovakia" },
      { value: "Slovenia", label: "Slovenia" },
      { value: "Spain", label: "Spain" },
    ],
    Canada: [
      { value: "Alberta", label: "Alberta" },
      { value: "British Columbia", label: "British Columbia" },
      { value: "Manitoba", label: "Manitoba" },
      { value: "New Brunswick", label: "New Brunswick" },
      {
        value: "Newfoundland and Labrador",
        label: "Newfoundland and Labrador",
      },
      { value: "Northwest Territories", label: "Northwest Territories" },
      { value: "Nova Scotia", label: "Nova Scotia" },
      { value: "Nunavut", label: "Nunavut" },
      { value: "Ontario", label: "Ontario" },
      { value: "Prince Edward Island", label: "Prince Edward Island" },
      { value: "Quebec", label: "Quebec" },
      { value: "Saskatchewan", label: "Saskatchewan" },
      { value: "Yukon", label: "Yukon" },
    ],
    Australia: [
      { value: "Perth", label: "Perth" },
      {
        value: "Australian Capital Territory",
        label: "Australian Capital Territory",
      },
      { value: "New South Wales", label: "New South Wales" },
      { value: "Northern Territory", label: "Northern Territory" },
      { value: "Queensland", label: "Queensland" },
      { value: "South Australia", label: "South Australia" },
      { value: "Tasmania", label: "Tasmania" },
      { value: "Victoria", label: "Victoria" },
      { value: "Western Australia", label: "Western Australia" },
    ],
    India: [
      { value: "Andhra Pradesh", label: "Andhra Pradesh" },
      { value: "Arunachal Pradesh", label: "Arunachal Pradesh" },
      { value: "Assam", label: "Assam" },
      { value: "Bihar", label: "Bihar" },
      { value: "Chhattisgarh", label: "Chhattisgarh" },
      { value: "Goa", label: "Goa" },
      { value: "Gujarat", label: "Gujarat" },
      { value: "Haryana", label: "Haryana" },
      { value: "Himachal Pradesh", label: "Himachal Pradesh" },
      { value: "Jharkhand", label: "Jharkhand" },
      { value: "Karnataka", label: "Karnataka" },
      { value: "Kerala", label: "Kerala" },
      { value: "Madhya Pradesh", label: "Madhya Pradesh" },
      { value: "Maharashtra", label: "Maharashtra" },
      { value: "Manipur", label: "Manipur" },
      { value: "Meghalaya", label: "Meghalaya" },
      { value: "Mizoram", label: "Mizoram" },
      { value: "Nagaland", label: "Nagaland" },
      { value: "Odisha", label: "Odisha" },
      { value: "Punjab", label: "Punjab" },
      { value: "Rajasthan", label: "Rajasthan" },
      { value: "Sikkim", label: "Sikkim" },
      { value: "Tamil Nadu", label: "Tamil Nadu" },
      { value: "Telangana", label: "Telangana" },
      { value: "Tripura", label: "Tripura" },
      { value: "Uttar Pradesh", label: "Uttar Pradesh" },
      { value: "Uttarakhand", label: "Uttarakhand" },
      { value: "West Bengal", label: "West Bengal" },
    ],
    Brazil: [
      { value: "Acre", label: "Acre" },
      { value: "Alagoas", label: "Alagoas" },
      { value: "Amapá", label: "Amapá" },
      { value: "Amazonas", label: "Amazonas" },
      { value: "Bahia", label: "Bahia" },
      { value: "Ceará", label: "Ceará" },
      { value: "Distrito Federal", label: "Distrito Federal" },
      { value: "Espírito Santo", label: "Espírito Santo" },
      { value: "Goiás", label: "Goiás" },
      { value: "Maranhão", label: "Maranhão" },
      { value: "Mato Grosso", label: "Mato Grosso" },
      { value: "Mato Grosso do Sul", label: "Mato Grosso do Sul" },
      { value: "Minas Gerais", label: "Minas Gerais" },
      { value: "Pará", label: "Pará" },
      { value: "Paraíba", label: "Paraíba" },
      { value: "Paraná", label: "Paraná" },
      { value: "Pernambuco", label: "Pernambuco" },
      { value: "Piauí", label: "Piauí" },
      { value: "Rio de Janeiro", label: "Rio de Janeiro" },
      { value: "Rio Grande do Norte", label: "Rio Grande do Norte" },
      { value: "Rio Grande do Sul", label: "Rio Grande do Sul" },
      { value: "Rondônia", label: "Rondônia" },
      { value: "Roraima", label: "Roraima" },
      { value: "Santa Catarina", label: "Santa Catarina" },
      { value: "São Paulo", label: "São Paulo" },
      { value: "Sergipe", label: "Sergipe" },
      { value: "Tocantins", label: "Tocantins" },
    ],
    Bulgaria: [
      { value: "Sofia", label: "Sofia" },
      { value: "Plovdiv", label: "Plovdiv" },
      { value: "Varna", label: "Varna" },
      { value: "Burgas", label: "Burgas" },
      { value: "Ruse", label: "Ruse" },
      { value: "Stara Zagora", label: "Stara Zagora" },
      { value: "Pleven", label: "Pleven" },
      { value: "Sliven", label: "Sliven" },
      { value: "Dobrich", label: "Dobrich" },
      { value: "Shumen", label: "Shumen" },
      { value: "Pernik", label: "Pernik" },
      { value: "Haskovo", label: "Haskovo" },
      { value: "Yambol", label: "Yambol" },
      { value: "Pazardzhik", label: "Pazardzhik" },
      { value: "Blagoevgrad", label: "Blagoevgrad" },
      { value: "Veliko Tarnovo", label: "Veliko Tarnovo" },
      { value: "Vratsa", label: "Vratsa" },
      { value: "Gabrovo", label: "Gabrovo" },
      { value: "Asenovgrad", label: "Asenovgrad" },
      { value: "Vidin", label: "Vidin" },
      { value: "Kazanlak", label: "Kazanlak" },
      { value: "Kyustendil", label: "Kyustendil" },
      { value: "Kardzhali", label: "Kardzhali" },
      { value: "Montana", label: "Montana" },
      { value: "Dimitrovgrad", label: "Dimitrovgrad" },
      { value: "Targovishte", label: "Targovishte" },
      { value: "Silistra", label: "Silistra" },
      { value: "Lovech", label: "Lovech" },
      { value: "Petrich", label: "Petrich" },
      { value: "Sandanski", label: "Sandanski" },
      { value: "Sevlievo", label: "Sevlievo" },
      { value: "Nova Zagora", label: "Nova Zagora" },
      { value: "Velingrad", label: "Velingrad" },
      { value: "Cherven Bryag", label: "Cherven Bryag" },
      { value: "Troyan", label: "Troyan" },
      { value: "Svilengrad", label: "Svilengrad" },
      { value: "Samokov", label: "Samokov" },
      { value: "Lom", label: "Lom" },
      { value: "Dupnitsa", label: "Dupnitsa" },
      { value: "Popovo", label: "Popovo" },
      { value: "Razgrad", label: "Razgrad" },
      { value: "Botevgrad", label: "Botevgrad" },
      { value: "Gotse Delchev", label: "Gotse Delchev" },
      { value: "Karlovo", label: "Karlovo" },
    ],
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
        "https://lms-api-dev.lmscarbon.com/lms-carbon-rule/api/v1/projects/" +
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
      setCriteria(ProjectData.criteria);
      setServiceFee(ProjectData.serviceFee);
      setClient(ProjectData.clientIds);
      setEarlyPay(ProjectData.hasEarlyLateRepayment);
      setCalInterest(ProjectData.calculateInterest);
      setHasDownPayPer(ProjectData.downPaymentPercentage);
      setHasDownPayFix(ProjectData.downPaymentFixed);
      setTclFee(ProjectData.tclIncludeFee);
      setTclInterest(ProjectData.tclIncludeInterest);
      setLateRepaymentPenalty(ProjectData.lateRepaymentPenalty);
      setEarlyRepaymentDiscount(ProjectData.earlyRepaymentDiscount);
      setRollOverPenaltyFactor(ProjectData.rollOverPenaltyFactor);
      setManagementFee(ProjectData.managementFee);
      setVatFee(ProjectData.vatFee);
    }
  }, [ProjectData]);

  useEffect(() => {
    const parseCriteria = (criteria) => {
      const regex = /(\w+)\s*(<=|>=|<|>|==)\s*(\d+)/g;
      let match;

      const results = {};

      while ((match = regex.exec(criteria)) !== null) {
        const [_, field, operator, amount] = match;
        results[field] = results[field] || [];
        results[field].push({ operator, amount });
      }

      if (results.tcl) {
        const formattedOperator = {
          value: results.tcl[0].operator,
          label: results.tcl[0].operator,
        };
        setTclOperator(formattedOperator);
        setTclAmount(results.tcl[0].amount);
      }

      if (results.loanAmount) {
        const formattedMinOperator = {
          value: results.loanAmount[0].operator,
          label: results.loanAmount[0].operator,
        };
        setMinLoanOperator(formattedMinOperator);
        setMinLoanAmount(results.loanAmount[0].amount);
        const formattedMaxOperator = {
          value: results.loanAmount[1].operator,
          label: results.loanAmount[1].operator,
        };
        setMaxLoanOperator(formattedMaxOperator);
        setMaxLoanAmount(results.loanAmount[1].amount);
      }

      if (results.numberOfInstallments) {
        const formattedMinOperator = {
          value: results.numberOfInstallments[0].operator,
          label: results.numberOfInstallments[0].operator,
        };
        setMinInstallmentsOperator(formattedMinOperator);
        setMinInstallmentsAmount(results.numberOfInstallments[0].amount);
        const formattedMaxOperator = {
          value: results.numberOfInstallments[1].operator,
          label: results.numberOfInstallments[1].operator,
        };
        setMaxInstallmentsOperator(formattedMaxOperator);
        setMaxInstallmentsAmount(results.numberOfInstallments[1].amount);
      }

      if (results.freqCap) {
        const formattedOLOperator = {
          value: results.freqCap[0].operator,
          label: results.freqCap[0].operator,
        };
        setOpenLoanOperator(formattedOLOperator);
        setOpenLoanAmount(results.freqCap[0].amount);
      }
    };

    parseCriteria(criteria);
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
      lateRepaymentPenalty: lateRepaymentPenalty, // Add to UI
      earlyRepaymentDiscount: earlyRepaymentDiscount, // Add to UI
      maxPaymetAttemps: maxPaymentAttempt,
      hasDownPayment: ProjectData.hasDownPayment,
      serviceFee: serviceFee,
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
      managementFee: managementFee,
      vatFee: vatFee,
    };
    try {
      const authToken = localStorage.getItem("projectToken");
      const response = await fetch(
        `https://lms-api-dev.lmscarbon.com/lms-carbon-rule/api/v1/projects`,
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
        `https://lms-api-dev.lmscarbon.com/lms-carbon-rule/api/v1/projects/${projectId}`,
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

  if (ProjectData.length === 0) {
    return <>Fetching Data</>;
  }
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <form className="">
        <h2 className="mb-5">
          Name: <b>{ProjectData.name}</b>
        </h2>
        <div className="w-full mx-auto bg-white p-6 shadow-md rounded-xl border border-red-600">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {/* Name */}
            <div className="col-span-1">
              <label
                className="block text-gray-700 px-1 text-[14px]"
                htmlFor="name"
              >
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
              <label
                className="block text-gray-700 px-1 text-[14px]"
                htmlFor="description"
              >
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
              <label
                className="block text-gray-700 px-1 text-[14px]"
                htmlFor="country"
              >
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
              <label
                className="block text-gray-700 px-1 text-[14px]"
                htmlFor="location"
              >
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
              <label
                className="block text-gray-700 px-1 text-[14px]"
                htmlFor="currency"
              >
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
              <label
                className="block text-gray-700 px-1 text-[14px]"
                htmlFor="loanType"
              >
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
              <label
                className="block text-gray-700 px-1 text-[14px]"
                htmlFor="flatInterestRate"
              >
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
                className="block text-gray-700 px-1 text-[14px]"
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
                className="block text-gray-700 px-1 text-[14px]"
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
                className="block text-gray-700 px-1 text-[14px]"
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
              <label
                className="block text-gray-700 px-1 text-[14px]"
                htmlFor="gracePeriodEMIs"
              >
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
              <label
                className="block text-gray-700 px-1 text-[14px]"
                htmlFor="loanGracePeriod"
              >
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
              <label
                className="block text-gray-700 px-1 text-[14px]"
                htmlFor="rollOverPeriod"
              >
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
              <label
                className="block text-gray-700 px-1 text-[14px]"
                htmlFor="rollOverFees"
              >
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
                className="block text-gray-700 px-1 text-[14px]"
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
              <label
                className="block text-gray-700 px-1 text-[14px]"
                htmlFor="lateEMIPenalty"
              >
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
                className="block text-gray-700 px-1 text-[14px]"
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
              <label
                className="block text-gray-700 px-1 text-[14px]"
                htmlFor="rollOverEquation"
              >
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
              <label
                className="block text-gray-700 px-1 text-[14px]"
                htmlFor="startDate"
              >
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
              <label
                className="block text-gray-700 px-1 text-[14px]"
                htmlFor="endDate"
              >
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

            {/* Late Repayment Penalty */}
            <div className="col-span-1">
              <label
                className="block text-gray-700 px-1 text-[14px]"
                htmlFor="lateRepaymentPenalty"
              >
                Late Repayment Penalty
              </label>
              <input
                type="number"
                name="lateRepaymentPenalty"
                value={lateRepaymentPenalty}
                placeholder="10%"
                onChange={(e) => setLateRepaymentPenalty(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            {/* Early Repayment Discount */}
            <div className="col-span-1">
              <label
                className="block text-gray-700 px-1 text-[14px]"
                htmlFor="lateRepaymentPenalty"
              >
                Early Repayment Discount
              </label>
              <input
                type="number"
                name="earlyRepaymentDiscount"
                value={earlyRepaymentDiscount}
                placeholder="0"
                onChange={(e) => setEarlyRepaymentDiscount(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            {/* RollOver Penalty Factor */}
            <div className="col-span-1">
              <label
                className="block text-gray-700 px-1 text-[14px]"
                htmlFor="rollOverPenaltyFactor"
              >
                RollOver Penalty Factor
              </label>
              <input
                type="number"
                name="rollOverPenaltyFactor"
                value={rollOverPenaltyFactor}
                placeholder="0"
                onChange={(e) => setRollOverPenaltyFactor(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div className="w-full mx-auto bg-white p-6 mt-8 shadow-md rounded-xl border border-red-600">
          <div className="grid grid-cols-2 gap-5 mb-[24px]">
            {/* Loan Amount */}
            <div>
              <label
                className="block text-gray-700 px-1 text-[14px]"
                htmlFor="loanAmount"
              >
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
              <label
                className="block text-gray-700 px-1 text-[14px]"
                htmlFor="loanAmount"
              >
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
              <label
                className="block text-gray-700 px-1 text-[14px]"
                htmlFor="loanSchemeTCL"
              >
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
              <label
                className="block text-gray-700 px-1 text-[14px]"
                htmlFor="totalOpenLoans"
              >
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
              <label
                className="block text-gray-700 px-1 text-[14px]"
                htmlFor="downPayment"
              >
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
              <label
                className="block text-gray-700 px-1 text-[14px]"
                htmlFor="serviceFee"
              >
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

          <div className="grid grid-cols-4 gap-5 mt-4">
            <div className="">
              <label
                className="block text-gray-700 px-1 text-[14px]"
                htmlFor="managementFee"
              >
                Management Fee
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  name="managementFee"
                  value={managementFee}
                  onChange={(e) => setManagementFee(e.target.value)}
                  placeholder="14%"
                  className="block w-full rounded-md border-0 py-[9px] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="">
              <label
                className="block text-gray-700 px-1 text-[14px]"
                htmlFor="vatFee"
              >
                Vat Fee
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  name="vatFee"
                  value={vatFee}
                  onChange={(e) => setVatFee(e.target.value)}
                  placeholder="15%"
                  className="block w-full rounded-md border-0 py-[9px] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mx-auto bg-white shadow-md rounded-xl border border-red-600 p-6 mt-8">
          <div className="gap-5">
            <div>
              <label
                className="block text-gray-700 px-1 text-[14px]"
                htmlFor="client"
              >
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
