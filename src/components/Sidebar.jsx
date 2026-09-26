import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, Layers, Clock, Activity, Hash, Code2, Terminal } from 'lucide-react';
import { URLS } from '../constants/urls';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const links = [
    { to: "/docs/getting-started", icon: <BookOpen className="w-5 h-5 mr-3" />, text: "Getting Started" },
    { to: "/docs/timer", icon: <Clock className="w-5 h-5 mr-3" />, text: "@Timer" },
    { to: "/docs/gauge", icon: <Activity className="w-5 h-5 mr-3" />, text: "@Gauge" },
    { to: "/docs/counter", icon: <Hash className="w-5 h-5 mr-3" />, text: "@Counter" },
    { to: "/docs/spel", icon: <Code2 className="w-5 h-5 mr-3" />, text: "SpEL Tags" },
    { to: "/docs/custom-logger", icon: <Terminal className="w-5 h-5 mr-3" />, text: "Custom Logger" },
    { to: "/docs/architecture", icon: <Layers className="w-5 h-5 mr-3" />, text: "Architecture" },
  ];

  return (
    <>
      <div className={`fixed inset-0 bg-gray-800/50 z-20 lg:hidden ${isOpen ? 'block' : 'hidden'}`} onClick={toggleSidebar} />
      <aside className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 w-64 z-30 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:block ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <img src={URLS.LOGO} alt="smf4j Logo" className="w-10 h-10 mr-3 object-contain rounded" />
          <span className="text-xl font-bold text-indigo-600">SMF4J</span>
        </div>
        <nav className="p-4 space-y-2">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">Documentation</div>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => { if(window.innerWidth < 1024) toggleSidebar() }}
              className={({ isActive }) =>
                `flex items-center px-3 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              {link.icon}
              {link.text}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
