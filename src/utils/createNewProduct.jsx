export async function createNewProduct(
  Name,
  navigate,
  navigateSuccess,
  navigateFail
) {
  try {
    navigate(`${navigateSuccess}${Name}/product-config`);
  } catch (error) {
    console.error(error);
  }
}
