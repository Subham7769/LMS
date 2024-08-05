import useFetchData from './useFetchData';

const transformCreditScoreEqData = (data) => {
  return data.map(({ creditScoreEqTempId, name }) => ({
    name: name.replace(/-/g, " "),
    href: "/credit-score/" + creditScoreEqTempId,
  }));
};

const useCreditScoreEq = () => {
  const url = "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/cse-temp";
  return useFetchData(url, transformCreditScoreEqData);
};

export default useCreditScoreEq;
