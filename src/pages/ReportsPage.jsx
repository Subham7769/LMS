import Reports from "../components/Reports/Reports";
import { useEffect } from "react";
import { fetchReportsConfigData } from "../redux/Slices/reportsSlice";
import { useDispatch } from "react-redux";

const ReportsPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchReportsConfigData());
  }, []);
  return (
    <>
      <Reports />
    </>
  );
};

export default ReportsPage;
