import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { BookOpen, Clock, Activity, Hash, Code2, Menu, X, ChevronDown } from 'lucide-react';
import GettingStarted from './pages/GettingStarted';
import TimerDocs from './pages/TimerDocs';
import GaugeDocs from './pages/GaugeDocs';
import CounterDocs from './pages/CounterDocs';
import SpELDocs from './pages/SpELDocs';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const links = [
    { to: "/docs/getting-started", icon: <BookOpen className="w-5 h-5 mr-3" />, text: "Getting Started" },
    { to: "/docs/timer", icon: <Clock className="w-5 h-5 mr-3" />, text: "@Timer" },
    { to: "/docs/gauge", icon: <Activity className="w-5 h-5 mr-3" />, text: "@Gauge" },
    { to: "/docs/counter", icon: <Hash className="w-5 h-5 mr-3" />, text: "@Counter" },
    { to: "/docs/spel", icon: <Code2 className="w-5 h-5 mr-3" />, text: "SpEL Tags" },
  ];

  return (
    <>
      <div className={`fixed inset-0 bg-gray-800/50 z-20 lg:hidden ${isOpen ? 'block' : 'hidden'}`} onClick={toggleSidebar} />
      <aside className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 w-64 z-30 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:block ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <span className="text-xl font-bold text-indigo-600">smf4j</span>
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

const Header = ({ toggleSidebar, version, setVersion }) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 z-10 sticky top-0">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="p-2 -ml-2 mr-2 text-gray-500 hover:bg-gray-100 rounded-lg lg:hidden">
          <Menu className="w-6 h-6" />
        </button>
        <div className="hidden lg:flex items-center text-sm font-medium text-gray-500">
          <span>Documentation</span>
          <span className="mx-2">/</span>
          <span className="text-gray-900">v{version}</span>
        </div>
      </div>
      
      <div className="flex items-center">
        <div className="relative inline-block text-left">
          <select 
            value={version} 
            onChange={(e) => setVersion(e.target.value)}
            className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-1.5 pl-3 pr-8 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="0.2.0">v0.2.0 (Latest)</option>
            <option value="0.1.0">v0.1.0</option>
          </select>
          <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>
        <a href="https://github.com/Yubraj-Sahoo" target="_blank" rel="noreferrer" className="ml-4 text-gray-500 hover:text-gray-700">
          GitHub
        </a>
      </div>
    </header>
  );
};

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [version, setVersion] = useState('0.2.0');

  return (
    <Router>
      <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Header toggleSidebar={() => setSidebarOpen(true)} version={version} setVersion={setVersion} />
          
          <main className="flex-1 overflow-y-auto bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <Routes>
                <Route path="/" element={<Navigate to="/docs/getting-started" replace />} />
                <Route path="/docs/getting-started" element={<GettingStarted version={version} />} />
                <Route path="/docs/timer" element={<TimerDocs />} />
                <Route path="/docs/gauge" element={<GaugeDocs />} />
                <Route path="/docs/counter" element={<CounterDocs />} />
                <Route path="/docs/spel" element={<SpELDocs />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
