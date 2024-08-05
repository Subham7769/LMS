import useFetchData from './useFetchData';

const transformProductData = (data) => {
  return data.map(({ productType, projectId, loanProductId }) => ({
    name: productType.replace(/_/g, " "),
    href: `/product/${productType}/loan-product-config/${projectId}/${loanProductId}`,
  }));
};

const useProductInfo = () => {
  const url = "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/api/v1/configs/loan-products";
  return useFetchData(url, transformProductData);
};

export default useProductInfo;
