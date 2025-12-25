// app/components/admin/DashboardStats.tsx
import { Product } from '../../lib/types';

interface DashboardStatsProps {
  stats: {
    totalProducts: number;
    publishedProducts: number;
    totalRevenue: number;
    totalStock: number;
    totalSales: number;
    avgPrice: number;
  };
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      change: '+12%',
      color: 'bg-blue-500',
      icon: '📦',
      description: 'All products in inventory'
    },
    {
      title: 'Published',
      value: stats.publishedProducts,
      change: '+8%',
      color: 'bg-green-500',
      icon: '🌐',
      description: 'Visible to customers'
    },
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      change: '+23%',
      color: 'bg-purple-500',
      icon: '💰',
      description: 'Total sales revenue'
    },
    {
      title: 'Total Sales',
      value: stats.totalSales,
      change: '+18%',
      color: 'bg-orange-500',
      icon: '🛒',
      description: 'Units sold'
    },
    {
      title: 'Avg Price',
      value: `$${stats.avgPrice.toFixed(2)}`,
      change: '+5%',
      color: 'bg-cyan-500',
      icon: '🏷️',
      description: 'Average product price'
    },
    {
      title: 'Total Stock',
      value: stats.totalStock,
      change: '+3%',
      color: 'bg-pink-500',
      icon: '📊',
      description: 'Units available'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {statCards.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center text-2xl`}>
              {stat.icon}
            </div>
            <span className="text-sm font-semibold text-green-600 bg-green-100 px-2 py-1 rounded">
              {stat.change}
            </span>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
          <p className="text-gray-600 font-medium mb-2">{stat.title}</p>
          <p className="text-gray-500 text-sm">{stat.description}</p>
          
          {/* Progress bar */}
          <div className="mt-4">
            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${stat.color} rounded-full`}
                style={{ width: '75%' }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}