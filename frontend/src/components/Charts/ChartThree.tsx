import { ApexOptions } from 'apexcharts';
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import useHoldings from '../../hooks/useHoldings';
import Loader from '../../common/Loader';

interface ChartThreeState {
  series: number[];
  labels: string[];
}

const ChartThree: React.FC = () => {
  const {
    holdingStocks,
    holdingInvestments,
    holdingCurrentValues,
    loading,
    error,
  } = useHoldings();

  const [state, setState] = useState<ChartThreeState>({
    series: [],
    labels: [],
  });

  const [viewMode, setViewMode] = useState<'currentValue' | 'investment'>(
    'currentValue'
  );

  // Function to generate unique colors for the chart
  const generateColors = (count: number): string[] => {
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      const hue = (i * 360) / count; // Distribute colors evenly across the hue spectrum
      colors.push(`hsl(${hue}, 70%, 60%)`); // Adjust saturation and lightness as needed
    }
    return colors;
  };

  useEffect(() => {
    if (!loading && !error) {
      // Get the stock names from holdingStocks
      const stockNames = holdingStocks;

      // Calculate values based on the selected viewMode and the order of stockNames
      const values = stockNames.map((stockName) =>
        viewMode === 'currentValue'
          ? holdingCurrentValues[stockName]
          : holdingInvestments[stockName]
      );

      // console.log(stockNames);

      // Calculate the total value
      const total = values.reduce((sum, value) => sum + value, 0);

      // Calculate series percentages
      const series = values.map((value) => (total ? (value / total) * 100 : 0));

      // Create labels based on stockNames and calculated series
      const labels = stockNames.map(
        (stockName, index) =>
          `${stockName} (${series[index].toFixed(1)}%)`
      );
      // console.log(series);
      setState({ series, labels });
    }
  }, [holdingStocks, holdingInvestments, holdingCurrentValues, viewMode, loading, error]);


  // Dynamically generate colors based on the number of stocks
  const chartColors = generateColors(Object.keys(holdingStocks).length);

  const options: ApexOptions = {
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'donut',
      width: '100%',
      height: 500,
    },
    colors: chartColors,
    labels: state.labels,
    legend: {
      show: true,
      position: 'bottom',
      labels: {
        colors: ['#000', '#000', '#000', '#000'],
      },
    },
    tooltip: {
      y: {
        formatter: (value, { seriesIndex }) => {
          const stockKeys = (holdingStocks); // Assuming holdingStocks is an object
          const stockKey = stockKeys[seriesIndex];
          // console.log(stockKey);
          if (!stockKey) {
            return 'N/A'; // Handle undefined stock keys gracefully
          }

          const dataValue =
            viewMode === 'currentValue'
              ? holdingCurrentValues[stockKey]
              : holdingInvestments[stockKey];

          // Ensure dataValue is a valid number
          return `$${dataValue}`;
        },
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          background: 'transparent',
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 400,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 300,
          },
        },
      },
    ],
  };

  return (loading?<Loader statusMessage={null}/>:<>
    <div className="sm:px-7.5 col-span-12 rounded-lg border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-5">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Portfolio Distribution
          </h5>
        </div>
        <div>
          <select
            onChange={(e) =>
              setViewMode(e.target.value as 'currentValue' | 'investment')
            }
            value={viewMode}
            className="relative z-20 inline-flex appearance-none bg-transparent py-1 pl-3 pr-8 text-sm font-medium outline-none dark:text-white dark:bg-boxdark"
          >
            <option value="currentValue">By Current Value</option>
            <option value="investment">By Investment</option>
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
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
          </span>

        </div>
      </div>

      <div className="mb-3">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={options}
            series={state.series}
            type="donut"

          />
        </div>
      </div>
    </div>
    </>
  );
};

export default ChartThree;
