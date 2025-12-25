// app/components/admin/SalesChart.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Product } from '../../lib/types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface SalesChartProps {
  products: Product[];
}

type ChartType = 'bar' | 'line' | 'pie';

export default function SalesChart({ products }: SalesChartProps) {
  const [chartType, setChartType] = useState<ChartType>('bar');

  // Prepare data
  const categories = ['Apple Products', 'Mobile Products', 'Digital Product', 'Home Products'];
  
  const categorySales = categories.map(category => {
    const categoryProducts = products.filter(p => p.category === category);
    return categoryProducts.reduce((sum, p) => sum + p.sales, 0);
  });

  const categoryRevenue = categories.map(category => {
    const categoryProducts = products.filter(p => p.category === category);
    return categoryProducts.reduce((sum, p) => sum + (p.price * p.sales), 0);
  });

  const categoryProductsCount = categories.map(category => 
    products.filter(p => p.category === category).length
  );

  // Bar Chart Data
  const barData: ChartData<'bar'> = {
    labels: categories,
    datasets: [
      {
        label: 'Units Sold',
        data: categorySales,
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
        borderRadius: 4,
      },
      {
        label: 'Revenue ($)',
        data: categoryRevenue,
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  // Line Chart Data
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const lineData: ChartData<'line'> = {
    labels: months.slice(0, 6),
    datasets: [
      {
        label: 'Monthly Sales',
        data: months.slice(0, 6).map(() => Math.floor(Math.random() * 500) + 200),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Monthly Revenue ($)',
        data: months.slice(0, 6).map(() => Math.floor(Math.random() * 50000) + 20000),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Pie Chart Data
  const pieData: ChartData<'pie'> = {
    labels: categories,
    datasets: [
      {
        data: categoryRevenue,
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(249, 115, 22, 0.8)',
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(16, 185, 129)',
          'rgb(139, 92, 246)',
          'rgb(249, 115, 22)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions: ChartOptions<'bar' | 'line' | 'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
        }
      },
      title: {
        display: true,
        text: 'Sales Analytics',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: (context) => {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== undefined) {
              if (label.includes('Revenue')) {
                label += `$${context.parsed.y.toLocaleString()}`;
              } else {
                label += context.parsed.y.toLocaleString();
              }
            }
            return label;
          }
        }
      }
    },
    scales: chartType !== 'pie' ? {
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false,
        },
        ticks: {
          callback: (value) => {
            if (typeof value === 'number') {
              if (value >= 1000) return `$${(value / 1000).toFixed(0)}k`;
              return `$${value}`;
            }
            return value;
          }
        }
      },
      x: {
        grid: {
          display: false,
        }
      }
    } : undefined,
  };

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return <Bar data={barData} options={chartOptions} />;
      case 'line':
        return <Line data={lineData} options={chartOptions} />;
      case 'pie':
        return <Pie data={pieData} options={chartOptions} />;
      default:
        return <Bar data={barData} options={chartOptions} />;
    }
  };

  // Stats Cards
  const totalRevenue = products.reduce((sum, p) => sum + (p.price * p.sales), 0);
  const totalSales = products.reduce((sum, p) => sum + p.sales, 0);
  const avgOrderValue = totalSales > 0 ? totalRevenue / totalSales : 0;

  return (
    <div>
      {/* Chart Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Sales Performance</h3>
          <p className="text-gray-500 text-sm">Visualize your sales data across different metrics</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setChartType('bar')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              chartType === 'bar'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Bar Chart
          </button>
          <button
            onClick={() => setChartType('line')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              chartType === 'line'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Line Chart
          </button>
          <button
            onClick={() => setChartType('pie')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              chartType === 'pie'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Pie Chart
          </button>
        </div>
      </div>

      {/* Chart Container */}
      <div className="h-[400px] mb-6">
        {renderChart()}
      </div>

      {/* Mini Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Total Revenue</p>
              <p className="text-2xl font-bold text-blue-800 mt-1">
                ${totalRevenue.toLocaleString()}
              </p>
            </div>
            <div className="bg-blue-500 p-3 rounded-full">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
          <div className="mt-2 text-sm text-blue-600">
            <span className="font-semibold">+12.5%</span> from last month
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Total Sales</p>
              <p className="text-2xl font-bold text-green-800 mt-1">
                {totalSales.toLocaleString()} units
              </p>
            </div>
            <div className="bg-green-500 p-3 rounded-full">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
          <div className="mt-2 text-sm text-green-600">
            <span className="font-semibold">+8.2%</span> from last month
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">Avg Order Value</p>
              <p className="text-2xl font-bold text-purple-800 mt-1">
                ${avgOrderValue.toFixed(2)}
              </p>
            </div>
            <div className="bg-purple-500 p-3 rounded-full">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
            </div>
          </div>
          <div className="mt-2 text-sm text-purple-600">
            <span className="font-semibold">+3.7%</span> from last month
          </div>
        </div>
      </div>
    </div>
  );
}