import React from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
import { FaBinoculars, FaCamera } from "react-icons/fa";

// Register the required components
ChartJS.register(LineElement, PointElement, ArcElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

const Stats = ({ data }) => {
  // Aggregate data by state/province
  const stateCounts = data.reduce((acc, { state }) => {
    acc[state] = (acc[state] || 0) + 1;
    return acc;
  }, {});

  // Aggregate data by month and year
  const monthCounts = data.reduce((acc, { date }) => {
    const yearMonth = new Date(date).toISOString().slice(0, 7); // Get YYYY-MM format
    acc[yearMonth] = (acc[yearMonth] || 0) + 1;
    return acc;
  }, {});

  // Calculate cumulative counts
  const months = Object.keys(monthCounts).sort();
  let cumulativeCount = 0;
  const cumulativeCounts = months.map(month => {
    cumulativeCount += monthCounts[month];
    return cumulativeCount;
  });

  // Prepare data for the pie chart
  const pieChartData = {
    labels: Object.keys(stateCounts),
    datasets: [
      {
        data: Object.values(stateCounts),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  };


  // Prepare data for the line chart
  const lineChartData = {
    labels: months,
    datasets: [
      {
        label: 'Cumulative Number of Species',
        data: cumulativeCounts,
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className='flex flex-row gap-12 p-6 w-full mx-auto rounded-2xl bg-blue-900 bg-dark-blue'>
      <div className='flex flex-col content-center gap-6'>
        <div className='flex flex-col lg:flex-row gap-3'>
          <div className='flex flex-row justify-between content-center bg-numbers pt-2 pb-3 px-5 rounded-2xl'>
            <div className='flex flex-col gap-0 content-start'>
              <span className='text-3xl'>147</span> 
              <p className='text-sm'>species observed</p>
            </div>
            <FaBinoculars className='text-4xl text-white mt-3' />
          </div>
          <div className='flex flex-row justify-between content-center bg-numbers pt-2 pb-3 px-5 rounded-2xl'>
            <div className='flex flex-col gap-0 content-start'>
              <span className='text-3xl'>100</span> 
              <p className='text-sm'>species photographed</p>
            </div>
            <FaCamera className='text-4xl text-white mt-3' />
          </div>
        </div>
        <div className='h-64 w-min'>
          <Pie data={pieChartData} />
        </div>
      </div>
      <div className='flex-grow'>
        <h2>Cumulative Number of Species by Month</h2>
        <div className='h-96 w-full'>
          <Line data={lineChartData} />
        </div>
      </div>
    </div>
  );
};

export default Stats;