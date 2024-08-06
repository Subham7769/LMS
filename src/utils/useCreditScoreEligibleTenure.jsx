import useFetchData from "./useFetchData";

const transformCreditScoreEligibleTenureData = (data) => {
  return data.map(({ creditScoreEtTempId, name }) => ({
    name: name.replace(/-/g, " "),
    href: "/credit-score-eligible-tenure/" + creditScoreEtTempId,
  }));
};

const useCreditScoreEligibleTenure = () => {
  const url =
    "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/cset-temp";
  return useFetchData(url, transformCreditScoreEligibleTenureData);
};

export default useCreditScoreEligibleTenure;
