const Footer = ({ mgLeft }) => {
  const year = new Date().getFullYear();
  return (
    <>
      <footer style={{ marginLeft: `${mgLeft}px` }} className="mt-auto">
        <div className=" text-grey-700 py-3 mt-20 text-sm">
          <div className="container">
            <div className="flex justify-between">
              <div> © {year} All Rights Reserved</div>
              <div>powered by PhotonMatters</div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
