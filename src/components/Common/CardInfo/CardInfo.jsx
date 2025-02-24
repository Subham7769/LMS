import React from "react";

const CardInfo = ({
  cardIcon: CardIcon,
  cardTitle,
  children,
  className,
  cardNumber,
  colorBG,
  colorText,
  numberBG,
  loading = false,
  error = false,
}) => {
  return (
    <div
      className={`shadow-md p-3 rounded-md ${colorBG}  ${
        !loading && !error ? className : ""
      }`}
    >
      {loading ? (
        <div className="flex flex-col gap-3 animate-pulse">
          <div className="h-4 bg-background-light-primary rounded w-full"></div>
          <div className="h-4 bg-background-light-primary rounded w-3/4"></div>
          <div className="h-4 bg-background-light-primary rounded w-1/2"></div>
          <div className="h-4 bg-background-light-primary rounded w-1/3"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center py-4">
          <p>Oops! Something went wrong. Please try again later.</p>
        </div>
      ) : (
        <>
          <div
            className={`flex  justify-between items-baseline mb-3 ${colorText}`}
          >
            <div className={`text-xl font-semibold flex gap-2 items-center`}>
              {CardIcon && (
                <CardIcon className={`-ml-0.5 h-5 w-5`} aria-hidden="true" />
              )}
              {cardTitle}
            </div>
            {cardNumber && (
              <div
                className={`rounded-full h-7 w-7 text-center pt-0.5 ${numberBG} `}
              >
                {cardNumber}
              </div>
            )}
          </div>
          {children}
        </>
      )}
    </div>
  );
};

export default CardInfo;
