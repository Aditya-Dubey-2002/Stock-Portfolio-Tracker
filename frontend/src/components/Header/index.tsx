import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
// import { MenuIcon } from '@heroicons/react/outline';/
import LogoIcon from '../../images/logo/logo-icon.svg';
import DarkModeSwitcher from './DarkModeSwitcher';
import DropdownMessage from './DropdownMessage';
import DropdownNotification from './DropdownNotification';
import DropdownUser from './DropdownUser';
import { BsArrow90DegRight, BsArrowRight, BsMenuApp } from 'react-icons/bs';
import config from '../../config';
import StockSelect from '../Forms/SelectGroup/StockSelect';
import SelectGroupTwo from '../Forms/SelectGroup/SelectGroupTwo';

type StockOption = {
  label: string;
  value: string;
};

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const [stockOptions, setStockOptions] = useState<StockOption[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch stock list
  useEffect(() => {
    const fetchStockOptions = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${config.SERVER_URL}/api/stock/100list`);

        // Assuming the response.data is an object where keys are symbols
        const stockMap = response.data; // Example: { AAPL: { name: "Apple Inc.", symbol: "AAPL" }, ... }

        // Map the object to the desired structure
        const options = Object.keys(stockMap).map((symbol) => ({
          label: `${stockMap[symbol].name} (${symbol})`,
          value: symbol,
        }));

        setStockOptions(options);
      } catch (error) {
        console.error('Error fetching stock options:', error);
      } finally {
        setLoading(false);
      }
    };

    // Call the function
    fetchStockOptions();

  }, []);

  const [marketStatus, setMarketStatus] = useState<boolean>();
  const [marketSession, setMarketSession] = useState<string>('');
  const [marketHoliday, setMarketHoliday] = useState<string>('');

  const fetchMarketStatus = async () => {
    try {
      const response = await axios.get(`${config.SERVER_URL}/api/stock/market/status`);
      const statusData = response.data;
      setMarketStatus(statusData.isOpen);
      setMarketSession(statusData.session);
      setMarketHoliday(statusData.holiday);
    } catch (err) {
      console.log('Error Fetching Market Status');
    }
  };

  useEffect(() => {
    fetchMarketStatus();
  }, []);

  const handleStockSelect = (selectedOption: StockOption | null) => {
    if (selectedOption) {
      navigate(`/stock/${selectedOption.value}`);
    }
  };

  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* Hamburger Toggle BTN */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 m-1 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            {/* <MenuIcon/> */}
            <BsArrowRight />
          </button>

          {/* <Link className="block flex-shrink-0 lg:hidden" to="/">
            <img src={LogoIcon} alt="Logo" />
          </Link> */}
        </div>

        {/* Stock Search */}
        <div className="w-full m-1 max-w-md sm:max-w-xs dark:border-strokedark dark:bg-boxdark">
          {/* <Select
            options={stockOptions}
            onChange={handleStockSelect}
            isLoading={loading}
            placeholder="Search a stock for details..."
            className="react-select-container dark:border-strokedark dark:bg-boxdark"
            classNamePrefix="react-select"
          /> */}
          <StockSelect options={stockOptions} />
          {/* <SelectGroupTwo/> */}
        </div>

        {/* Market Status Indicator */}
        <div className="flex m-1 items-center gap-3 sm:flex-row flex-col">
          {marketStatus !== undefined && (
            <div
              className={`flex items-center sm:flex-row flex-col ${marketStatus ? 'text-green-500' : 'text-red-500'
                }`}
            >
              <span className="mr-2 font-bold sm:mr-2 mr-0">
                {marketStatus ? 'Market is Open' : 'Market is Closed'}
              </span>
              <div
                className={`w-4 h-4 rounded-full ${marketStatus ? 'bg-green-500' : 'bg-red-500'
                  }`}
              />
              {!marketStatus && (
                <span className="ml-2 text-sm font-medium sm:ml-2 ml-0 mt-2 sm:mt-0">
                  {marketSession ? marketSession : marketHoliday}
                </span>
              )}
            </div>
          )}
        </div>




        {/* Actions */}
        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <DarkModeSwitcher />
            {/* <DropdownNotification /> */}
            {/* <DropdownMessage /> */}
          </ul>
          <DropdownUser />
        </div>
      </div>
    </header>
  );
};

export default Header;
