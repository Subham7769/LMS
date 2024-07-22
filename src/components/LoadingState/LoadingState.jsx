import React from 'react';
import Loader from '../../assets/image/loader1.gif';

const LoadingState = React.memo(() => {
  return (
    <div className="min-h-[70vh] w-full flex flex-col items-center justify-center">
      <img
        className="w-52 h-52"
        src={Loader}
        alt="Loading Icon"
        aria-label="Loading"
      />
      <p className="text-center font-bold text-xl">Fetching Data</p>
    </div>
  );
});

export default LoadingState;
