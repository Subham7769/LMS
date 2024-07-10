export async function createNewProductGroup(
  Name,
  navigate,
  navigateSuccess,
  navigateFail
) {
  try {
    navigate(navigateSuccess, { state: { Name: Name } });
  } catch (error) {
    console.error(error);
  }
}