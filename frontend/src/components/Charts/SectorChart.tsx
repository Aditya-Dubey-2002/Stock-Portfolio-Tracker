import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import useHoldings from '../../hooks/useHoldings';
import axios from 'axios';
import config from '../../config';
import Loader from '../../common/Loader';

// Define types
interface StockInfo {
  name: string;
  sector: string;
  category?: string;
}

interface SectorData {
  name: string;
  currentValue: number;
  investmentValue: number;
}

const SectorChart: React.FC = () => {
  const { holdingStocks, holdingCurrentValues, holdingInvestments,loading } = useHoldings();
  const [sectorData, setSectorData] = useState<SectorData[]>([]);
  const [stockMap, setStockMap] = useState<{ [key: string]: StockInfo }>({});

  useEffect(() => {
    const fetchStockMap = async () => {
      try {
        const response = await axios.get<{ [key: string]: StockInfo }>(
          `${config.SERVER_URL}/api/stock/100list`,
          {
            params: { exchange: 'US' },
          }
        );
        setStockMap(response.data);
      } catch (error) {
        console.error('Error fetching stock map:', error);
      }
    };
    fetchStockMap();
  }, []);

  useEffect(() => {
    if (Object.keys(stockMap).length > 0) {
      calculateSectorData();
    }
  }, [stockMap, holdingStocks, holdingCurrentValues, holdingInvestments]);

  const calculateSectorData = () => {
    const sectorTotals: { [key: string]: { currentValue: number; investmentValue: number } } = {};

    holdingStocks.forEach((symbol) => {
      const currentValue = holdingCurrentValues[symbol] || 0;
      const investmentValue = holdingInvestments[symbol] || 0;
      const stockInfo = stockMap[symbol];

      if (stockInfo) {
        const sector = stockInfo.category || 'Unknown';
        if (!sectorTotals[sector]) {
          sectorTotals[sector] = { currentValue: 0, investmentValue: 0 };
        }
        sectorTotals[sector].currentValue += currentValue;
        sectorTotals[sector].investmentValue += investmentValue;
      } else {
        if (!sectorTotals['Unknown']) {
          sectorTotals['Unknown'] = { currentValue: 0, investmentValue: 0 };
        }
        sectorTotals['Unknown'].currentValue += currentValue;
        sectorTotals['Unknown'].investmentValue += investmentValue;
      }
    });

    const formattedData: SectorData[] = Object.keys(sectorTotals).map((sector) => ({
      name: sector,
      currentValue: sectorTotals[sector].currentValue,
      investmentValue: sectorTotals[sector].investmentValue,
    }));

    setSectorData(formattedData);
  };

  const chartOptions = {
    chart: {
      type: 'bar',
      height: 300,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 5,
        borderRadiusApplication: 'end',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: sectorData.map((item) => item.name),
      labels: {
        style: {
          colors: '#6B7280',
        },
      },
    },
    yaxis: {
      title: {
        text: 'Value (USD)',
        style: {
          color: '#6B7280',
        },
      },
      labels: {
        style: {
          colors: '#6B7280',
        },
      },
    },
    tooltip: {
      y: {
        formatter: (val: number) => `$ ${val.toFixed(2)}`,
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      labels: {
        colors: '#6B7280',
      },
    },
  };

  const chartSeries = [
    {
      name: 'Current Value',
      data: sectorData.map((item) => item.currentValue),
    },
    {
      name: 'Investment Value',
      data: sectorData.map((item) => item.investmentValue),
    },
  ];

  return (loading?<Loader statusMessage={null}/>:<>
    <div className="rounded-lg shadow-default bg-white dark:bg-gray-800 p-4">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 mt-3">Sector Allocation</h2>
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={300}
      />
    </div>
    </>
  );
};

export default SectorChart;
