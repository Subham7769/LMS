export async function createNewProduct(
  Name,
  navigate,
  navigateSuccess,
  navigateFail
) {
  try {
    navigate(navigateSuccess + Name);
  } catch (error) {
    console.error(error);
  }
}
