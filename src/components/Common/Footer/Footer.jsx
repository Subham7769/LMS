import React from 'react';

const Footer = ({ mgLeft }) => {
  const year = new Date().getFullYear();
  return (
    <footer style={{ marginLeft: mgLeft }} className="mt-auto">
      <div className="text-grey-700 py-3 mt-20 text-sm container flex justify-between">
        <div>© {year} All Rights Reserved</div>
        <div>Powered by PhotonMatters</div>
      </div>
    </footer>
  );
};

export default Footer;
