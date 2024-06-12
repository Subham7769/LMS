import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import {
  ClipboardDocumentListIcon,
  CurrencyRupeeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

const stats = [
  {
    id: 1,
    name: "Total Borrowers",
    stat: "71,897",
    icon: UsersIcon,
    change: "122",
    changeType: "increase",
  },
  {
    id: 2,
    name: "Active Borrowers",
    stat: "58,167",
    icon: CurrencyRupeeIcon,
    change: "5.4%",
    changeType: "increase",
  },
  {
    id: 3,
    name: "Inactive Borrowers",
    stat: "13,730",
    icon: ClipboardDocumentListIcon,
    change: "3.2%",
    changeType: "decrease",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const UserPage = () => {
  const [borrowerID, setBorrowerID] = useState("");
  const [borrowerNotFound, setBorrowerNotFound] = useState(false);
  const navigate = useNavigate(); // Adding useNavigate  for navigation

  async function checkBorrowerInfo(borrowerID) {
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "http://10.10.10.70:32014/carbon-registration-service/xcbe/api/v1/borrowers/" +
          borrowerID +
          "/check-availability/14-11-1981",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.status === 404) {
        console.log("User Not Found"); // Clear the token
        setBorrowerNotFound(true);
        navigate("/user"); // Redirect to login page
        return; // Stop further execution
      }
      // Check for token expiration or invalid token
      if (data.status === 401 || data.status === 403) {
        localStorage.removeItem("authToken"); // Clear the token
        navigate("/login"); // Redirect to login page
        return; // Stop further execution
      }
      navigate("/user/" + borrowerID + "/user-info");
      setBorrowerNotFound(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {/* Cards */}
      <div className="bg-gray-100 rounded-xl">
        <div className="mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div>
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Last 30 days
            </h3>
            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {stats.map((item) => (
                <div
                  key={item.id}
                  className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
                >
                  <dt>
                    <div className="absolute rounded-md bg-indigo-500 p-3">
                      <item.icon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="ml-16 truncate text-sm font-medium text-gray-500">
                      {item.name}
                    </p>
                  </dt>
                  <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                    <p className="text-2xl font-semibold text-gray-900">
                      {item.stat}
                    </p>
                    <p
                      className={classNames(
                        item.changeType === "increase"
                          ? "text-green-600"
                          : "text-red-600",
                        "ml-2 flex items-baseline text-sm font-semibold"
                      )}
                    >
                      {item.changeType === "increase" ? (
                        <ArrowUpIcon
                          className="h-5 w-5 flex-shrink-0 self-center text-green-500"
                          aria-hidden="true"
                        />
                      ) : (
                        <ArrowDownIcon
                          className="h-5 w-5 flex-shrink-0 self-center text-red-500"
                          aria-hidden="true"
                        />
                      )}

                      <span className="sr-only">
                        {" "}
                        {item.changeType === "increase"
                          ? "Increased"
                          : "Decreased"}{" "}
                        by{" "}
                      </span>
                      {item.change}
                    </p>
                    <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                      <div className="text-sm">
                        <a
                          href="#"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          View all
                          <span className="sr-only"> {item.name} stats</span>
                        </a>
                      </div>
                    </div>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
      {/* --------------------------Search Bar------------------------------------- */}
      <div className="flex items-center gap-5 justify-center mt-10">
        <div>Borrower ID</div>
        <div>
          <input
            type="number"
            name="borrowerID"
            id="borrowerID"
            value={borrowerID}
            onChange={(e) => {
              setBorrowerID(e.target.value);
            }}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="10000000000"
          />
        </div>
        <div>
          <button
            onClick={() => checkBorrowerInfo(borrowerID)}
            type="button"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Search
          </button>
        </div>
      </div>
      {borrowerNotFound && (
        <div className="text-red-600 mt-4 text-center">Borrower Not Found</div>
      )}
    </>
  );
};

export default UserPage;
