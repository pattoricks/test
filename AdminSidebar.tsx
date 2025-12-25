// app/components/admin/AdminSidebar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { User } from '../../lib/types';
import {
  MdDashboard,
  MdInventory,
  MdBarChart,
  MdSettings,
  MdLogout,
  MdMenu,
  MdClose,
  MdAdd,
  MdList
} from 'react-icons/md';

interface AdminSidebarProps {
  user: User;
}

export default function AdminSidebar({ user }: AdminSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    {
      title: 'Dashboard',
      icon: <MdDashboard className="w-5 h-5" />,
      path: '/admin',
      active: pathname === '/admin'
    },
    {
      title: 'Products',
      icon: <MdInventory className="w-5 h-5" />,
      children: [
        { title: 'All Products', path: '/admin', icon: <MdList className="w-4 h-4" /> },
        { title: 'Add New', path: '/admin/products/new', icon: <MdAdd className="w-4 h-4" /> }
      ],
      active: pathname.includes('/admin/products')
    },
    {
      title: 'Analytics',
      icon: <MdBarChart className="w-5 h-5" />,
      path: '/admin/analytics',
      active: pathname === '/admin/analytics'
    },
    {
      title: 'Settings',
      icon: <MdSettings className="w-5 h-5" />,
      path: '/admin/settings',
      active: pathname === '/admin/settings'
    }
  ];

  const handleLogout = () => {
    document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    router.push('/login');
    router.refresh();
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-lg"
      >
        {isCollapsed ? <MdClose className="w-6 h-6" /> : <MdMenu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          ${isCollapsed ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 md:relative fixed inset-y-0 left-0 z-40
          bg-gradient-to-b from-gray-900 to-gray-800 text-white
          w-64 transition-transform duration-300 ease-in-out
          shadow-2xl
        `}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">MONTELA</h1>
              <p className="text-gray-400 text-sm">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="font-semibold">{user.name}</h3>
              <p className="text-gray-400 text-sm">{user.email}</p>
              <span className="inline-block mt-1 px-2 py-1 bg-blue-500 bg-opacity-20 text-blue-300 text-xs rounded">
                {user.role.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                {item.children ? (
                  <details className="group">
                    <summary className={`
                      flex items-center justify-between p-3 rounded-lg cursor-pointer
                      ${item.active ? 'bg-blue-900 text-white' : 'hover:bg-gray-700 text-gray-300'}
                    `}>
                      <div className="flex items-center space-x-3">
                        {item.icon}
                        <span className="font-medium">{item.title}</span>
                      </div>
                      <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <ul className="ml-4 mt-2 space-y-1">
                      {item.children.map((child, childIndex) => (
                        <li key={childIndex}>
                          <Link
                            href={child.path}
                            className="flex items-center space-x-3 p-2 rounded-lg text-sm text-gray-400 hover:bg-gray-700 hover:text-white"
                            onClick={() => setIsCollapsed(false)}
                          >
                            {child.icon}
                            <span>{child.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <Link
                    href={item.path}
                    className={`
                      flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200
                      ${item.active ? 'bg-blue-900 text-white' : 'hover:bg-gray-700 text-gray-300'}
                    `}
                    onClick={() => setIsCollapsed(false)}
                  >
                    {item.icon}
                    <span className="font-medium">{item.title}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center space-x-3 w-full p-3 rounded-lg bg-red-900 bg-opacity-20 text-red-300 hover:bg-red-800 hover:bg-opacity-30 transition-colors"
          >
            <MdLogout className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isCollapsed && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsCollapsed(false)}
        />
      )}
    </>
  );
}