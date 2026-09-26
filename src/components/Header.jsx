import React from 'react';
import { Menu, ChevronDown } from 'lucide-react';
import { VERSIONS } from '../constants/versions';
import { URLS } from '../constants/urls';

const Header = ({ toggleSidebar, version, setVersion }) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 z-10 sticky top-0">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="p-2 -ml-2 mr-2 text-gray-500 hover:bg-gray-100 rounded-lg lg:hidden">
          <Menu className="w-6 h-6" />
        </button>
        <div className="hidden lg:flex items-center text-base font-medium text-gray-500">
          <span>Documentation</span>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Version: {version}</span>
        </div>
      </div>
      
      <div className="flex items-center">
        <span className="text-base font-medium text-gray-900 mr-2">Version:</span>
        <div className="relative inline-block text-left">
          <select 
            value={version} 
            onChange={(e) => setVersion(e.target.value)}
            className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-1.5 pl-3 pr-8 rounded-lg text-base font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            {VERSIONS.map((v) => (
              <option key={v.value} value={v.value}>{v.label}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>
        <a href={URLS.GITHUB_PROJECT} target="_blank" rel="noreferrer" className="ml-4 text-gray-500 hover:text-gray-700">
          GitHub
        </a>
      </div>
    </header>
  );
};

export default Header;
