import React from 'react';
import PlaceOrderForm from '../../components/Forms/PlaceOrderForm';
import HoldingsTable from '../../components/Tables/HoldingsTable';
import { useParams } from 'react-router-dom';

const Portfolio = () => {
  return (
    <div className="flex flex-row gap-6 ">
      {/* Left Column: Place Order Form */}
      <div className="w-1/4 bg-white rounded-lg shadow-lg ">
        <PlaceOrderForm />
      </div>

      {/* Right Column: Holdings Table */}
      {/* <div className="w-3/4 bg-white rounded-lg shadow-lg p-4"> */}
        <HoldingsTable />
      {/* </div> */}
    </div>
  );
};

export default Portfolio;
