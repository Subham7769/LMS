import React, { useState } from 'react'
import { TclViewListData, TclViewListHeaderList } from '../../data/TclData';
import Body from '../Common/Body/Body';
import ListTable from '../Common/ListTable/ListTable'
import SelectAndAdd from '../Common/SelectAndAdd/SelectAndAdd';

const selectOptions = [
    { value: "Cash Loan TCL", label: "Cash Loan TCL" },
    { value: "BNPL TCL", label: "BNPL TCL" },
    { value: "Overdraft TCL", label: "Overdraft TCL" },
];

const TCLViewList = () => {
    const [fileSelectedOption, setFileSelectedOption] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [message, setMessage] = useState("");

    const handleChange = (selectedOption) => {
        setFileSelectedOption(selectedOption);
        setMessage(""); // Reset message on selection change
    };

    const addData = () => {
        if (!fileSelectedOption) {
            setMessage("Please select a file first.");
            return;
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

    const handleDelete = (index) => {
        setTableData((prevData) => prevData.filter((_, i) => i !== index));
    };


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