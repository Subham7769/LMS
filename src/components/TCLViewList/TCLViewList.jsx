import React, { useEffect, useState } from 'react'
import { TclViewListHeaderList } from '../../data/TclData';
import Body from '../Common/Body/Body';
import ListTable from '../Common/ListTable/ListTable'
import SelectAndAdd from '../Common/SelectAndAdd/SelectAndAdd';
import { useParams } from 'react-router-dom';

// const selectOptions = [
//     { value: "Cash Loan TCL", label: "Cash Loan TCL" },
//     { value: "BNPL TCL", label: "BNPL TCL" },
//     { value: "Overdraft TCL", label: "Overdraft TCL" },
// ];

const TCLViewList = () => {
  const [fileSelectedOption, setFileSelectedOption] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [TclViewListData, setTclViewListData] = useState([]);
  const [selectOptions, setSelectOptions] = useState([]);
  const [message, setMessage] = useState("");
  const { tclId } = useParams();

  const handleChange = (selectedOption) => {
    setFileSelectedOption(selectedOption);
    setMessage(""); // Reset message on selection change
  };

  const addData = async () => {
    if (!fileSelectedOption) {
      setMessage("Please select a file first.");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/tcl/files/by-id/" + fileSelectedOption.value,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Check for token expiration or invalid token
      if (data.status === 401 || data.status === 403) {
        localStorage.removeItem("authToken"); // Clear the token
        navigate("/login"); // Redirect to login page
        return; // Stop further execution
      }
      const TCLDetails = await data.json();

      // Transform the Product data to the desired format


      setTclViewListData(prevData => [...prevData, TCLDetails]);
    } catch (error) {
      console.error(error);
    }

    const selectedFileData = TclViewListData.find(
      (item) => item.name === fileSelectedOption.value
    );

    if (selectedFileData) {
      const alreadyExists = tableData.some(
        (item) => item.name === selectedFileData.name
      );

      if (alreadyExists) {
        setMessage("The selected file is already added to the table.");
      } else {
        setTableData((prevData) => [selectedFileData, ...prevData]);
        setMessage(""); // Clear message if data is successfully added
      }
    }
  };

  console.log(TclViewListData);

  const handleDelete = (index) => {
    setTableData((prevData) => prevData.filter((_, i) => i !== index));
  };

  useEffect(() => {
    getTCLFileNames();
  }, [tclId])

  async function getTCLFileNames() {
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/tcl/all-files/" + tclId,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Check for token expiration or invalid token
      if (data.status === 401 || data.status === 403) {
        localStorage.removeItem("authToken"); // Clear the token
        navigate("/login"); // Redirect to login page
        return; // Stop further execution
      }
      const TCLDetails = await data.json();

      // Transform the Product data to the desired format
      const formattedTCLInfoData = TCLDetails.map(
        ({ fileName, tclFileId }) => ({
          value: tclFileId,
          label: fileName.replace(/.csv/g, " "),

        })
      );

      setSelectOptions(formattedTCLInfoData);
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <Body>
      {/* Select & Add to List */}
      <SelectAndAdd
        ListName={'Select TCL List'}
        SelectOptions={selectOptions}
        SelectedOption={fileSelectedOption}
        HandleChange={handleChange}
        ButtonName={'Add to List'}
        onClick={addData}
      />

      {/* Message */}
      {message && <div className="mb-4 text-red-500">{message}</div>}

      {/* List */}
      <ListTable
        ListName={"TCL List"}
        ListHeader={TclViewListHeaderList}
        ListItem={tableData}
        HandleAction={handleDelete}
        Searchable={false}
      />
    </Body>
  )
}

export default TCLViewList