import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const useAllProjectInfo = () => {
  const [ProjectData, setProjectData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getRACInfo();
  }, []);

  async function getRACInfo() {
    try {
      const token = await fetch(
        "https://lms-api-dev.lmscarbon.com/lms-carbon-client-registration/api/v1/client/DarwinClient/token"
      );
      const tokenValue = await token.json();

      localStorage.setItem("projectToken", tokenValue.value);
      //   console.log(tokenValue.value);
      const data = await fetch(
        "https://lms-api-dev.lmscarbon.com/lms-carbon-rule/api/v1/allprojects?limit=10&offset=0",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenValue.value}`,
          },
        }
      );
      // Check for token expiration or invalid token
      if (data.status === 401 || data.status === 403) {
        localStorage.removeItem("authToken"); // Clear the token
        navigate("/login"); // Redirect to login page
        return; // Stop further execution
      }
      const projectDetails = await data.json();

      // Transform the RAC data to the desired format
      const formattedProjectData = projectDetails.map(
        ({ name, projectId }) => ({
          name,
          href: "/project/" + projectId,
        })
      );

      setProjectData(formattedProjectData);
      //   // console.log(ProjectData);
    } catch (error) {
      console.error(error);
    }
  }
  return ProjectData;
};

export default useAllProjectInfo;
