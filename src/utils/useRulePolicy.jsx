import useFetchData from './useFetchData';

const transformRulePolicyData = (data) => {
  return data.map(({ rulePolicyTempId, name }) => ({
    name: name.replace(/-/g, " "),
    href: "/rule-policy/" + rulePolicyTempId,
  }));
};

const useRulePolicy = () => {
  const url = "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/rule-policy-temp";
  return useFetchData(url, transformRulePolicyData);
};

export default useRulePolicy;
