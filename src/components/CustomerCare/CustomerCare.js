import { useState } from "react";
import { Link } from "react-router-dom";
const CustomerCare = () => {
  const [subscriberID, setSubscriberID] = useState();
  return (
    <>
      <div className="flex items-center gap-5 justify-center mt-10">
        <div>Subscriber ID</div>
        <div>
          <input
            type="number"
            name="subscriberID"
            id="subscriberID"
            value={subscriberID}
            onChange={(e) => {
              setSubscriberID(e.target.value);
            }}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="10000000000"
          />
        </div>
        <div>
          <Link to={"/subscriber/" + subscriberID}>
            <button
              type="button"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Search
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CustomerCare;
