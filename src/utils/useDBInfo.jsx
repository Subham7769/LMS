import useFetchData from './useFetchData';

const transformDBCData = (data) => {
  return data.map(({ name, dbcTempId }) => ({
    name: name.replace(/-/g, " "),
    href: "/newdbc/" + dbcTempId,
  }));
};

const useDBInfo = () => {
  const url = "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/dbc-temp/";
  return useFetchData(url, transformDBCData);
};

export default useDBInfo;
