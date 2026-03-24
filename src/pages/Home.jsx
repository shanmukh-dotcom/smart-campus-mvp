import { useState, useEffect } from 'react';
import { DB } from '../services/db';
import { Sparkles } from 'lucide-react';
import './Home.css';

export default function Home({ user }) {
  const [stats, setStats] = useState({ issues: 0, groups: 0, announcements: 0 });

  useEffect(() => {
    const issues = DB.read('issues');
    const announcements = DB.read('announcements');
    const activeIssues = issues.filter(i => i.status !== 'resolved').length;
    
    // We'll hardcode 3 study groups for now as mock data
    setStats({ issues: activeIssues, groups: 3, announcements: announcements.length });
  }, []);

  return (
    <div className="home-container">
      <header className="home-header">
         <p className="greeting">Good evening,</p>
         <h1>{user?.name.split(' ')[0]} <span role="img" aria-label="wave">👋</span></h1>
         <div className="user-avatar">{user?.name[0]}</div>
      </header>

      <div className="quick-tip">
        <div className="qt-icon"><Sparkles size={16} /> Quick tip</div>
        <p>Use the sidebar to access all features. Tag <strong>@buddy</strong> in any study group to get AI help instantly.</p>
      </div>

      <div className="hero-banner">
        <div className="hero-image" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80")'}}>
        </div>
        <div className="hero-content">
          <h2>Welcome to SmartCampus</h2>
          <p>Your all-in-one campus companion — navigate, connect, and thrive.</p>
        </div>
      </div>

      <div className="stats-grid">
         <div className="stat-card">
            <h3>{stats.issues}</h3>
            <p>Active Issues</p>
         </div>
         <div className="stat-card">
            <h3 style={{color: 'var(--secondary)'}}>{stats.groups}</h3>
            <p>Study Groups</p>
         </div>
         <div className="stat-card">
            <h3 style={{color: 'var(--primary)'}}>{stats.announcements}</h3>
            <p>Announcements</p>
         </div>
      </div>

      <div className="section-header" style={{marginTop: '2rem', marginBottom: '1rem'}}>
        <h3 style={{fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-main)'}}>Recent Updates</h3>
      </div>
      <div className="updates-list" style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
        {DB.read('announcements').map(a => (
          <div key={a.id} className="card">
             <div style={{fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem'}}>{new Date(a.date).toLocaleDateString()}</div>
             <h4 style={{fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--text-main)'}}>{a.title}</h4>
             <p style={{fontSize: '0.9rem', color: 'var(--text-muted)'}}>{a.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
