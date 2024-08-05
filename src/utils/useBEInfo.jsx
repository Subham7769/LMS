import useFetchData from './useFetchData';

const transformBEData = (data) => {
  return data.map(({ name, blockEmployerTempId }) => ({
    name: name.replace(/-/g, " "),
    href: "/blocked-employer/" + blockEmployerTempId,
  }));
};

const useBEInfo = () => {
  const url = "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/be-temp/";
  return useFetchData(url, transformBEData);
};

export default useBEInfo;
