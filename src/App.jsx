import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import GettingStarted from './pages/GettingStarted';
import ArchitectureDocs from './pages/ArchitectureDocs';
import TimerDocs from './pages/TimerDocs';
import GaugeDocs from './pages/GaugeDocs';
import CounterDocs from './pages/CounterDocs';
import SpELDocs from './pages/SpELDocs';
import CustomLoggerDocs from './pages/CustomLoggerDocs';
import { DEFAULT_VERSION } from './constants/versions';


function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [version, setVersion] = useState(DEFAULT_VERSION);

  return (
    <Router>
      <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Header toggleSidebar={() => setSidebarOpen(true)} version={version} setVersion={setVersion} />
          
          <main className="flex-1 overflow-y-auto bg-white flex flex-col">
            <div className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <Routes>
                <Route path="/" element={<Navigate to="/docs/getting-started" replace />} />
                <Route path="/docs/getting-started" element={<GettingStarted version={version} />} />
                <Route path="/docs/architecture" element={<ArchitectureDocs />} />
                <Route path="/docs/timer" element={<TimerDocs />} />
                <Route path="/docs/gauge" element={<GaugeDocs />} />
                <Route path="/docs/counter" element={<CounterDocs />} />
                <Route path="/docs/spel" element={<SpELDocs />} />
                <Route path="/docs/custom-logger" element={<CustomLoggerDocs />} />
              </Routes>
            </div>
            <Footer />
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
