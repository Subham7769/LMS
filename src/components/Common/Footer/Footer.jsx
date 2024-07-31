import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="text-grey-700 py-3 h-10 text-sm flex-shrink-0 container flex justify-between bg-white">
      <div>© {year} All Rights Reserved</div>
      <div>Powered by PhotonMatters</div>
    </footer>
  );
};

export default Footer;
