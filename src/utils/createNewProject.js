export async function createNewProject(
  Name,
  navigate,
  navigateSuccess,
  navigateFail
) {
  try {
    navigate(`${navigateSuccess}${Name}/basic-details`);
  } catch (error) {
    console.error(error);
  }
}
