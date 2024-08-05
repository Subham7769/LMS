import useFetchData from './useFetchData';

const transformRecoveryInfoData = (data) => {
  return data.map(({ name, recoveryEquationTempId }) => ({
    name: name.replace(/-/g, " "),
    href: "/recovery/" + recoveryEquationTempId,
  }));
};

const useRecoveryInfo = () => {
  const url = "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/recovery-temp";
  return useFetchData(url, transformRecoveryInfoData);
};

export default useRecoveryInfo;
