const formateDataForExcelFile = (jsonData, columnMapping) => {
    return jsonData.map((item) => {
      const formattedItem = {};
      Object.keys(columnMapping).forEach((key) => {
        formattedItem[columnMapping[key]] = key.split('.').reduce((o, k) => (o || {})[k], item);
      });
      return formattedItem;
    });
  };
  
  export default formateDataForExcelFile;
  