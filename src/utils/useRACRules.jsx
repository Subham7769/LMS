import { useParams } from "react-router-dom";
import useFetchData from './useFetchData';

const transformRacRulesData = (data) => data;

const useRacRules = (url1, url2) => {
  const { racID } = useParams();
  const fullUrl = `https://api-decimal.lmscarbon.com/carbon-product-service/lmscarbon/rules/rac/${racID}${url1}${url2}`;

  return useFetchData(fullUrl, transformRacRulesData);
};

export default useRacRules;
