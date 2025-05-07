import React, { createContext, useContext, useState } from "react";

const ActiveTabContext = createContext();

export const useActiveTab = () => {
  return useContext(ActiveTabContext);
};

export const ActiveTabProvider = ({ children, setActiveTab }) => {
  const [formData, setFormData] = useState({});
  return (
    <ActiveTabContext.Provider value={{ formData, setFormData }}>
      {children}
    </ActiveTabContext.Provider>
  );
};
