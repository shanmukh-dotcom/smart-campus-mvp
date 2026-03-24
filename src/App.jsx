import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Login from './pages/Login';
import Home from './pages/Home';
import CampusMap from './pages/Map';
import Issues from './pages/Issues';
import LostFound from './pages/LostFound';
import Doubts from './pages/Doubts';
import CrowdInsights from './pages/CrowdInsights';
import Profile from './pages/Profile';
import Updates from './pages/Updates';
import Chat from './pages/Chat';
import { DB } from './services/db';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    DB.init();
    setUser(DB.getCurrentUser());
    
    // Apply saved theme preference
    if(localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark-mode');
    }
  }, []);

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <Router>
      <MainLayout user={user} onLogout={() => { DB.logout(); setUser(null); }}>
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/map" element={<CampusMap />} />
          <Route path="/issues" element={<Issues user={user} />} />
          <Route path="/lost-found" element={<LostFound user={user} />} />
          <Route path="/doubts" element={<Doubts user={user} />} />
          <Route path="/crowd" element={<CrowdInsights />} />
          <Route path="/updates" element={<Updates />} />
          <Route path="/chat" element={<Chat user={user} />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}
