export async function createNewProject(
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
