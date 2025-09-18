import React, { useEffect, useState, useCallback } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { CONSTANTDASHBOARD } from '../../Constants/Constant';
import './BarChart.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const [data] = useState({
    labels: ['Store 1', 'Store 2', 'Store 3', 'Store 4', 'Store 5', 'Store 6', 'Store 7', 'Store 8', 'Store 9', 'Store 10'],
    datasets: [
      {
        label: 'Week 1',
        data: [65, 59, 80, 81, 56, 55, 40, 60, 70, 65],
        backgroundColor: '#178036',
        hoverBackgroundColor: '#1A9540',
        barPercentage: 0.8,
        categoryPercentage: 0.9,
      },
      {
        label: 'Week 2',
        data: [28, 48, 40, 19, 86, 27, 90, 45, 40, 35],
        backgroundColor: 'rgba(23, 140, 61, 0.98)',
        hoverBackgroundColor: 'rgba(23, 140, 61, 1)',
        barPercentage: 0.8,
        categoryPercentage: 0.9,
      },
      {
        label: 'Week 3',
        data: [45, 55, 65, 35, 75, 50, 60, 65, 50, 45],
        backgroundColor: '#33b569',
        hoverBackgroundColor: '#3DCB78',
        barPercentage: 0.8,
        categoryPercentage: 0.9,
      },
      {
        label: 'Week 4',
        data: [35, 45, 50, 60, 40, 75, 65, 55, 45, 50],
        backgroundColor: '#7FD4A4',
        hoverBackgroundColor: '#92E9B7',
        barPercentage: 0.8,
        categoryPercentage: 0.9,
      },
    ],
  });

  const [options] = useState({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#333333',
        bodyColor: '#333333',
        borderColor: '#DDDDDD',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.raw} t`;
          }
        }
      },
    },
    animation: { duration: 1000 },
    hover: { mode: 'index', intersect: false },
    scales: {
      y: {
        beginAtZero: true,
        grid: { display: true, drawBorder: false, drawOnChartArea: true },
        ticks: { font: { size: 10 } },
        title: { display: true, text: 'Carbon Saving (tonnes)', font: { size: 12, weight: 'bold' }, padding: { top: 0, bottom: 10 } }
      },
      x: {
        grid: { display: false },
        ticks: { font: { size: 10 }, maxRotation: 0, autoSkip: true }
      }
    }
  });

  const handleClose = useCallback(() => {
    console.log('Closing bar chart');
  }, []);

  useEffect(() => {
    const handleResize = () => {
      // noop to mirror class-based forceUpdate behaviour
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Check if data is empty (no datasets or all datasets have empty data)
  const isDataEmpty = !data.datasets || data.datasets.length === 0 || data.datasets.every(d => !d.data || d.data.length === 0);

  return (
    <div className="bar-chart-container">
      <div className="chart-header">
        <div className="chart-title">Carbon savings (t)</div>
        <button className="chart-close-btn" onClick={handleClose}>×</button>
      </div>
      <div className="bar-chart-wrapper">
        {isDataEmpty ? (
          <div className="no-data-message" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '300px',
            color: '#666',
            fontSize: '16px',
            textAlign: 'center'
          }}>
            No data available
          </div>
        ) : (
          <Bar data={data} options={options} />
        )}
      </div>
      <div className="chart-legend">
        <div className="legend-item">
          <span className="legend-color week-1"></span>
          <span className="legend-label">Week 1</span>
        </div>
        <div className="legend-item">
          <span className="legend-color week-2"></span>
          <span className="legend-label">Week 2</span>
        </div>
        <div className="legend-item">
          <span className="legend-color week-3"></span>
          <span className="legend-label">Week 3</span>
        </div>
        <div className="legend-item">
          <span className="legend-color week-4"></span>
          <span className="legend-label">Week 4</span>
        </div>
      </div>
    </div>
  );
};

export default BarChart;