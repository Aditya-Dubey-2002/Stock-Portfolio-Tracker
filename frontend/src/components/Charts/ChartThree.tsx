import { ApexOptions } from 'apexcharts';
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import useHoldings from '../../hooks/useHoldings';

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

  useEffect(() => {
    if (!loading && !error) {
      const values =
        viewMode === 'currentValue' ? holdingCurrentValues : holdingInvestments;
      const total = values.reduce((sum, value) => sum + value, 0);

      const series = values.map((value) => (value / total) * 100);
      const labels = holdingStocks.map(
        (stock, index) => `${stock} (${series[index].toFixed(1)}%)`
      );

      setState({ series, labels });
    }
  }, [holdingStocks, holdingInvestments, holdingCurrentValues, viewMode, loading, error]);

  const options: ApexOptions = {
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'donut',
      width: '100%', // Adjust the width to make the chart responsive
      height: 500, // Increase the height of the chart
    },
    colors: ['#3C50E0', '#6577F3', '#8FD0EF', '#0FADCF'],
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
        formatter: (value, { seriesIndex }) =>
          `$${viewMode === 'currentValue' ? holdingCurrentValues[seriesIndex] : holdingInvestments[seriesIndex]}`,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%', // Adjust donut size for better appearance
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
            width: 400, // Wider chart for larger screens
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 300, // Maintain smaller width for small screens
          },
        },
      },
    ],
  };
  

  return (
    <div className="sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-5">
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
            className="relative z-20 inline-flex appearance-none bg-transparent py-1 pl-3 pr-8 text-sm font-medium outline-medium"
          >
            <option value="currentValue">By Current Value</option>
            <option value="investment">By Investment</option>
          </select>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={options}
            series={state.series}
            type="donut"
          />
        </div>
      </div>
    </div>
  );
};

export default ChartThree;
