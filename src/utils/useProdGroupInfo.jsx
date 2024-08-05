import useFetchData from './useFetchData';

const transformProdGroupData = (data) => {
  const ProdDetailsArray = Array.isArray(data) ? data : [data];
  return ProdDetailsArray.map(({ configId }) => ({
    name: configId.replace(/-/g, " "),
    href: "/product_group/" + configId,
  }));
};

const useProdGroupInfo = () => {
  const url = "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/concurrent-loans/config";
  return useFetchData(url, transformProdGroupData);
};

export default useProdGroupInfo;
