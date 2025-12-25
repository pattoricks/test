// app/components/SalesChart.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  ChartOptions,
  ChartData,
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Product } from '../lib/types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

interface SalesChartProps {
  products: Product[];
}

type ChartType = 'bar' | 'pie' | 'line';

const SalesChart = ({ products }: SalesChartProps) => {
  const [chartType, setChartType] = useState<ChartType>('bar');

  const categories = ['Apple Products', 'Mobile Products', 'Digital Product', 'Home Products'];
  
  const categorySales = categories.map(category => {
    const categoryProducts = products.filter(p => p.category === category);
    return categoryProducts.reduce((sum, p) => sum + p.sales, 0);
  });

  const categoryRevenue = categories.map(category => {
    const categoryProducts = products.filter(p => p.category === category);
    return categoryProducts.reduce((sum, p) => sum + (p.price * p.sales), 0);
  });

  const barData: ChartData<'bar'> = {
    labels: categories,
    datasets: [
      {
        label: 'Units Sold',
        data: categorySales,
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
      },
      {
        label: 'Revenue ($)',
        data: categoryRevenue,
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 1,
      },
    ],
  };

  const pieData: ChartData<'pie'> = {
    labels: categories,
    datasets: [
      {
        data: categoryRevenue,
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(139, 92, 246, 0.7)',
          'rgba(249, 115, 22, 0.7)',
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(16, 185, 129)',
          'rgb(139, 92, 246)',
          'rgb(249, 115, 22)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const lineData: ChartData<'line'> = {
    labels: months,
    datasets: [
      {
        label: 'Total Sales',
        data: months.map((_, i) => {
          const base = products.reduce((sum, p) => sum + p.sales, 0) / 6;
          return Math.floor(base * (0.8 + Math.random() * 0.4));
        }),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Total Revenue ($)',
        data: months.map((_, i) => {
          const base = products.reduce((sum, p) => sum + (p.price * p.sales), 0) / 6;
          return Math.floor(base * (0.8 + Math.random() * 0.4));
        }),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions: ChartOptions<'bar' | 'pie' | 'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Sales Analytics',
      },
    },
  };

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return <Bar data={barData} options={chartOptions} />;
      case 'pie':
        return <Pie data={pieData} options={chartOptions} />;
      case 'line':
        return <Line data={lineData} options={chartOptions} />;
      default:
        return <Bar data={barData} options={chartOptions} />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Sales Analytics</h2>
          <p className="text-gray-600">Visualize your sales data and revenue</p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <div className="inline-flex rounded-lg border border-gray-300 p-1">
            <button
              onClick={() => setChartType('bar')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                chartType === 'bar'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Bar Chart
            </button>
            <button
              onClick={() => setChartType('pie')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                chartType === 'pie'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Pie Chart
            </button>
            <button
              onClick={() => setChartType('line')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                chartType === 'line'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Line Chart
            </button>
          </div>
        </div>
      </div>

      <div className="h-80">
        {renderChart()}
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-blue-800 mb-2">Top Category</h3>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
            <span className="font-bold text-lg">
              {categories[categoryRevenue.indexOf(Math.max(...categoryRevenue))]}
            </span>
          </div>
          <p className="text-blue-600 text-sm mt-1">Highest revenue generator</p>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
          <h3 className="font-semibold text-green-800 mb-2">Total Units Sold</h3>
          <div className="font-bold text-lg text-green-700">
            {categorySales.reduce((a, b) => a + b, 0).toLocaleString()} units
          </div>
          <p className="text-green-600 text-sm mt-1">Across all categories</p>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
          <h3 className="font-semibold text-purple-800 mb-2">Avg. Price per Unit</h3>
          <div className="font-bold text-lg text-purple-700">
            ${(categoryRevenue.reduce((a, b) => a + b, 0) / categorySales.reduce((a, b) => a + b, 1) || 0).toFixed(2)}
          </div>
          <p className="text-purple-600 text-sm mt-1">Average selling price</p>
        </div>
      </div>
    </div>
  );
};

export default SalesChart;