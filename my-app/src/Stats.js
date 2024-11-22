import React from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';

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
    <div className='flex flex-row p-6 w-full h-96 mx-auto'>
      <div className='flex flex-col w-full'>
        <div className='h-5'>
          147 species since March 2024
        </div>
        <div className='h-64 w-full'>
          <Pie data={pieChartData} />
        </div>
      </div>
      <div>
        <h2>Cumulative Number of Species by Month</h2>
        <div className='h-96 w-full'>
          <Line data={lineChartData} />
        </div>
      </div>
    </div>
  );
};

export default Stats;