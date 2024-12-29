import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import LogoIcon from '../../images/logo/logo-icon.svg';
import DarkModeSwitcher from './DarkModeSwitcher';
import DropdownMessage from './DropdownMessage';
import DropdownNotification from './DropdownNotification';
import DropdownUser from './DropdownUser';

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
        const response = await axios.get('http://localhost:5000/api/stock/100list');
        const options = response.data.map((stock: { name: string; symbol: string }) => ({
          label: `${stock.name} (${stock.symbol})`,
          value: stock.symbol,
        }));
        setStockOptions(options);
      } catch (error) {
        console.error('Error fetching stock options:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStockOptions();
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
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            {/* Hamburger Icon */}
          </button>

          <Link className="block flex-shrink-0 lg:hidden" to="/">
            <img src={LogoIcon} alt="Logo" />
          </Link>
        </div>

        {/* Stock Search */}
        <div className="w-full max-w-xl">
          <Select
            options={stockOptions}
            onChange={handleStockSelect}
            isLoading={loading}
            placeholder="Search for a stock..."
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <DarkModeSwitcher />
            <DropdownNotification />
            <DropdownMessage />
          </ul>
          <DropdownUser />
        </div>
      </div>
    </header>
  );
};

export default Header;
