import ListTable from "../Common/ListTable/ListTable";
import { useSelector } from "react-redux";

const DefaultDetails = () => {
  const { CreditBureauDetails, loading, error } = useSelector(
    (state) => state.customerCare
  );

  const defaultDet =
    CreditBureauDetails?.response?.message?.item[0]?.rspreport?.consumer[0]
      ?.defaults?.default;

  return (
    <div className="mt-4">
      <ListTable
        ListHeader={[
          "No.",
          "Product Type",
          "Applicant Type",
          "Account Number",
          "Creditor",
          "Load Date",
          "Original Amount at Load Date",
          "Outstanding Balance",
          "Status",
          "Settlement Date",
        ]}
        ListItem={defaultDet.map((add, index) => ({
          index: index + 1,
          dfprd: add.dfprd,
          dfcapl: add.dfcapl,
          dfaccno: add.dfaccno,
          dfcrdtr: add.dfcrdtr,
          dfloaddt: add.dfloaddt,
          dforigamt: add.dforigamt,
          dfcub: add.dfcub,
          dfstat: add.dfstat,
          dfsettlddate: add.dfsettlddate,
        }))}
        Divider={true}
        loading={loading}
      />
    </div>
  );
};

export default DefaultDetails;
