import React from "react";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();
  const { pathname } = useLocation();
  console.log(pathname)
  if (pathname === "/loan/AI-agent" ){
    return null; // Hide footer on Agentic AI
  }
  return (
    <footer className="text-grey-700 py-3 h-10 w-full text-[12px] px-5 flex justify-between">
      <div>© {year} All Rights Reserved</div>
      <div>Simplify Lending, Amplify Growth</div>
    </footer>
  );
};

export default Footer;
