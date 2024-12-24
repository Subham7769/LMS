import React, { useState, useRef, useEffect } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const TableSlider = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const tableRef = useRef(null);

  const headerList = [
    "Product ID",
    "Product Name",
    "Category",
    "Price",
    "Stock",
    "Manufacturer",
    "Rating",
    "Description",
    "Last Updated",
    "Status"
  ];

  const data = [
    {
      "Product ID": "PRD001",
      "Product Name": "Wireless Headphones",
      "Category": "Electronics",
      "Price": "$199.99",
      "Stock": "150",
      "Manufacturer": "SoundTech",
      "Rating": "4.5/5",
      "Description": "Premium wireless headphones with noise cancellation",
      "Last Updated": "2024-01-15",
      "Status": "In Stock"
    },
    {
      "Product ID": "PRD002",
      "Product Name": "Smart Watch Pro",
      "Category": "Wearables",
      "Price": "$299.99",
      "Stock": "75",
      "Manufacturer": "TechWear",
      "Rating": "4.8/5",
      "Description": "Advanced smartwatch with health monitoring",
      "Last Updated": "2024-01-14",
      "Status": "Low Stock"
    },
    {
      "Product ID": "PRD003",
      "Product Name": "Laptop Elite",
      "Category": "Computers",
      "Price": "$1299.99",
      "Stock": "25",
      "Manufacturer": "CompTech",
      "Rating": "4.7/5",
      "Description": "High-performance laptop for professionals",
      "Last Updated": "2024-01-13",
      "Status": "In Stock"
    },
    {
      "Product ID": "PRD004",
      "Product Name": "Gaming Mouse",
      "Category": "Accessories",
      "Price": "$79.99",
      "Stock": "200",
      "Manufacturer": "GameGear",
      "Rating": "4.6/5",
      "Description": "RGB gaming mouse with precision tracking",
      "Last Updated": "2024-01-12",
      "Status": "In Stock"
    },
        {
      "Product ID": "PRD001",
      "Product Name": "Wireless Headphones",
      "Category": "Electronics",
      "Price": "$199.99",
      "Stock": "150",
      "Manufacturer": "SoundTech",
      "Rating": "4.5/5",
      "Description": "Premium wireless headphones with noise cancellation",
      "Last Updated": "2024-01-15",
      "Status": "In Stock"
    },
    {
      "Product ID": "PRD002",
      "Product Name": "Smart Watch Pro",
      "Category": "Wearables",
      "Price": "$299.99",
      "Stock": "75",
      "Manufacturer": "TechWear",
      "Rating": "4.8/5",
      "Description": "Advanced smartwatch with health monitoring",
      "Last Updated": "2024-01-14",
      "Status": "Low Stock"
    },
    {
      "Product ID": "PRD003",
      "Product Name": "Laptop Elite",
      "Category": "Computers",
      "Price": "$1299.99",
      "Stock": "25",
      "Manufacturer": "CompTech",
      "Rating": "4.7/5",
      "Description": "High-performance laptop for professionals",
      "Last Updated": "2024-01-13",
      "Status": "In Stock"
    },
    {
      "Product ID": "PRD004",
      "Product Name": "Gaming Mouse",
      "Category": "Accessories",
      "Price": "$79.99",
      "Stock": "200",
      "Manufacturer": "GameGear",
      "Rating": "4.6/5",
      "Description": "RGB gaming mouse with precision tracking",
      "Last Updated": "2024-01-12",
      "Status": "In Stock"
    }
  ];

  const handleScroll = (direction) => {
    const container = tableRef.current;
    const scrollAmount = 200;
    const newPosition = direction === "left" 
      ? Math.max(0, scrollPosition - scrollAmount)
      : Math.min(container.scrollWidth - container.clientWidth, scrollPosition + scrollAmount);
    
    container.scrollTo({
      left: newPosition,
      behavior: "smooth"
    });
    setScrollPosition(newPosition);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      handleScroll("left");
    } else if (e.key === "ArrowRight") {
      handleScroll("right");
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [scrollPosition]);

  return (
    <div className="w-full max-w-full overflow-hidden bg-white rounded-lg shadow-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Product Database</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => handleScroll("left")}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Scroll left"
          >
            <BsChevronLeft size={24} />
          </button>
          <button
            onClick={() => handleScroll("right")}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Scroll right"
          >
            <BsChevronRight size={24} />
          </button>
        </div>
      </div>

      <div className="relative overflow-x-auto" ref={tableRef}>
        <table className="w-full border-collapse table-auto">
          <tbody className="bg-white">
            {headerList.map((header, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50 transition-colors" role="row">
                <th
                  className="p-4 text-left text-sm font-semibold text-gray-600 border-b bg-gray-50 w-48 sticky left-0"
                  aria-label={header}
                >
                  {header}
                </th>
                {data.map((item, colIndex) => (
                  <td
                    key={`${rowIndex}-${colIndex}`}
                    className="p-4 text-sm text-gray-600 border-b min-w-[200px]"
                    aria-label={`${header}: ${item[header]}`}
                  >
                    <div className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1">
                      {item[header]}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableSlider;