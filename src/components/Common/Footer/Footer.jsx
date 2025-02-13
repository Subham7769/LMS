import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="text-grey-700 py-3 h-10 w-full text-[12px] px-5 flex justify-between bg-background-light-tertiary">
      <div>© {year} All Rights Reserved</div>
      <div>Simplify Lending, Amplify Growth</div>
    </footer>
  );
};

export default Footer;
