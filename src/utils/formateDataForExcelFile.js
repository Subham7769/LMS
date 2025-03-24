const formateDataForExcelFile = (jsonData, mapping) => {
    return jsonData.map((item) => {
      const formattedItem = {};
      Object.keys(mapping).forEach((key) => {
        formattedItem[mapping[key]] = key.split('.').reduce((o, k) => (o || {})[k], item);
      });
      return formattedItem;
    });
  };
  
  export default formateDataForExcelFile;
  