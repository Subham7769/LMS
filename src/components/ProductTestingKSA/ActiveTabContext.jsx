import React, { createContext, useContext } from "react";

const ActiveTabContext = createContext();

export const useActiveTab = () => {
  return useContext(ActiveTabContext);
};

export const ActiveTabProvider = ({ children, setActiveTab }) => {
  return (
    <ActiveTabContext.Provider value={{ setActiveTab }}>
      {children}
    </ActiveTabContext.Provider>
  );
};
