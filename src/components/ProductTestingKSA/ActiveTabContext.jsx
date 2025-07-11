import React, { createContext, useContext, useState } from "react";

const ActiveTabContext = createContext();

export const useActiveTab = () => {
  return useContext(ActiveTabContext);
};

export const ActiveTabProvider = ({ children, setActiveTab }) => {
  const [userId, setUserId] = useState("1244444444");
  return (
    <ActiveTabContext.Provider value={{ setActiveTab, userId, setUserId }}>
      {children}
    </ActiveTabContext.Provider>
  );
};
