import useFetchData from './useFetchData';

const transformProjectData = (data) => {
  return data.map(({ name, projectId }) => ({
    name,
    href: "/project/" + projectId,
  }));
};

const useAllProjectInfo = () => {
  const url = "https://lms-api-dev.lmscarbon.com/lms-carbon-rule/api/v1/allprojects?limit=10&offset=0";
  const tokenUrl = "https://lms-api-dev.lmscarbon.com/lms-carbon-client-registration/api/v1/client/DarwinClient/token";
  return useFetchData(url, transformProjectData, { tokenUrl });
};

export default useAllProjectInfo;
