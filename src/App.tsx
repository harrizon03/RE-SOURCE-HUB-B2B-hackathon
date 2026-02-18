import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';

import { InjectMaterial } from './pages/InjectMaterial';
import { Login } from './pages/Login';
import { DataExplorer } from './pages/DataExplorer';
import { Settings } from './pages/Settings';

function AppContent() {
  const location = useLocation();
  const isInjectPage = location.pathname === '/inject';
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="min-h-screen bg-slate-900">
      {!isLoginPage && <Navbar />}
      {!isInjectPage && !isLoginPage && <Sidebar />}
      <main className={isLoginPage ? '' : isInjectPage ? 'pt-16' : 'pt-16 pl-64'}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/inject" element={<InjectMaterial />} />
          <Route path="/data" element={<DataExplorer />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
}



function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
