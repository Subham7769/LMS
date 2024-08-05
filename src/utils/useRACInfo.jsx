import useFetchData from './useFetchData';

const transformRACData = (data) => {
  return data.map(({ name, racId }) => ({
    name,
    href: "/newrac/" + racId,
  }));
};

const useRACInfo = () => {
  const url = "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/rac/";
  return useFetchData(url, transformRACData);
};

export default useRACInfo;
