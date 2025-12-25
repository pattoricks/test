// app/components/Sidebar.tsx
'use client';

import { useState } from 'react';
import { 
  SiApple, 
  SiGooglechrome, 
  SiYoutube,
  SiAndroid,
  SiWindows,
  SiHomeassistant
} from 'react-icons/si';
import { MdOutlineMenu, MdClose } from 'react-icons/md';
import { MenuItem } from '../lib/types';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  
  const menuItems: MenuItem[] = [
    { id: 1, name: 'Home', icon: <SiHomeassistant className="w-5 h-5" />, active: true },
    { id: 2, name: 'YouTube Premium', icon: <SiYoutube className="w-5 h-5" />, active: false },
    { id: 3, name: 'Digital Product', icon: <SiGooglechrome className="w-5 h-5" />, active: false },
    { id: 4, name: 'Apple Products', icon: <SiApple className="w-5 h-5" />, active: false },
    { id: 5, name: 'Mobile Products', icon: <SiAndroid className="w-5 h-5" />, active: false },
    { id: 6, name: 'Home Products', icon: <SiWindows className="w-5 h-5" />, active: false },
  ];

  return (
    <>
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-lg"
      >
        {isCollapsed ? <MdClose className="w-6 h-6" /> : <MdOutlineMenu className="w-6 h-6" />}
      </button>

      <aside className={`
        ${isCollapsed ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 md:relative fixed inset-y-0 left-0 z-40
        bg-gradient-to-b from-blue-900 to-blue-800 text-white
        w-64 transition-transform duration-300 ease-in-out
        shadow-xl
      `}>
        <div className="p-6 border-b border-blue-700">
          <h1 className="text-2xl font-bold">MONTELA</h1>
          <p className="text-blue-200 text-sm mt-1">E-commerce Dashboard</p>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <a 
                  href="#" 
                  className={`
                    flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200
                    ${item.active 
                      ? 'bg-blue-700 text-white shadow-inner' 
                      : 'hover:bg-blue-700 hover:bg-opacity-50 text-blue-100'
                    }
                  `}
                >
                  <span>{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-blue-700">
          <div className="text-center text-blue-300 text-sm">
            <p>© 2024 MONTELA</p>
            <p className="mt-1">All rights reserved</p>
          </div>
        </div>
      </aside>

      {isCollapsed && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsCollapsed(false)}
        />
      )}
    </>
  );
};

export default Sidebar;