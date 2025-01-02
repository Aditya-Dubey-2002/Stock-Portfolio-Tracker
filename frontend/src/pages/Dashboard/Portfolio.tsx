import { useLocation } from 'react-router-dom';
import PlaceOrderForm from '../../components/Forms/PlaceOrderForm';
import HoldingsTable from '../../components/Tables/HoldingsTable';

const Portfolio = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const stockSymbol = queryParams.get('stockSymbol') || '';
  return (
    <>
      {/* <Breadcrumb pageName="Portfolio" /> */}
      <div className="flex flex-col lg:flex-row gap-6 mt-3 mb-3">
        {/* Left Column: Place Order Form */}
        <div className="w-full lg:w-1/4   ">
          <PlaceOrderForm selectedStockSymbol={stockSymbol}/>
        </div>

        {/* Right Column: Holdings Table */}
        <div className="w-full lg:w-3/4   ">
          <HoldingsTable />
        </div>
      </div>
    </>
  );
};

export default Portfolio;
