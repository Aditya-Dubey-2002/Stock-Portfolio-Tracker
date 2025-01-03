import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import config from '../../../config';

interface SelectStockProps {
  options: { value: string; label: string }[];
//   selectedStock : string;
}

const SelectStock: React.FC<SelectStockProps> = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );
//   useEffect(() => {
//       if (selectedStock) {
//         const matchingStock = options.find((option) => option.value === selectedStock);
//         if (matchingStock) {
//         //   setSelectedStock(matchingStock);
//           setSelectedOption(matchingStock.value);
//         //   setStockName(matchingStock.label);
//         //   fetchStockPrice(selectedStockSymbol);
//         }
//       }
//     }, [selectedStockSymbol, options]);

  const handleOptionClick = (value: string, label: string) => {
    setSelectedOption(label);
    setIsOptionSelected(true);
    setSearchTerm('');
    setIsDropdownOpen(false);
    navigate(`/stock/${value}`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative  bg-white dark:bg-form-input">
        <span className="absolute  top-1/2 left-4 z-30 -translate-y-1/2">
          {/* <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 10L8 14L16 6"
              stroke="#637381"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg> */}
          <BsSearch/>
        </span>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          placeholder={
            isDropdownOpen ? "Select an option below" : "Search or select stock"
          }
          className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input text-black dark:text-white"
        />

        <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2 cursor-pointer">
          {isDropdownOpen ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 12L10 8L14 12"
                stroke="#637381"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 8L10 12L14 8"
                stroke="#637381"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>

        {isDropdownOpen && (
          <ul className="absolute z-30 w-full max-h-48 overflow-y-auto rounded border border-stroke bg-white shadow-md dark:bg-form-input">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option.value}
                  onClick={() => handleOptionClick(option.value, option.label)}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {option.label}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500 dark:text-gray-400">
                No options found
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SelectStock;
