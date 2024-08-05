import useFetchData from './useFetchData';

const transformTCLInfoData = (data) => {
  return data.map(({ tclId, tclName }) => ({
    name: tclName.replace(/_/g, " "),
    href: "/tcl/" + tclId,
  }));
};

const useTCLInfo = () => {
  const url = "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/tcl/all-tcl";
  return useFetchData(url, transformTCLInfoData);
};

export default useTCLInfo;
