import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const useFetchData = (url, transformData, options = {}) => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { tokenKey = "authToken", redirectPath = "/login", tokenUrl = null } = options;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let token = localStorage.getItem(tokenKey);
        if (tokenUrl) {
          const tokenResponse = await fetch(tokenUrl);
          const tokenValue = await tokenResponse.json();
          token = tokenValue.value;
          localStorage.setItem("projectToken", tokenValue.value);
        }

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem(tokenKey);
          navigate(redirectPath);
          return;
        }

        const result = await response.json();
        const transformedData = transformData(result);
        setData(transformedData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [url, transformData, tokenUrl, tokenKey, redirectPath, navigate]);

  return data;
};

export default useFetchData;
