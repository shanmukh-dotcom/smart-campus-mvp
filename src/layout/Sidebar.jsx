import { NavLink } from 'react-router-dom';
import { Map, TriangleAlert, Search, HelpCircle, Users, Bell, BookOpen, Sparkles } from 'lucide-react';

export default function Sidebar({ user, onLogout }) {
  const navItems = [
    { name: 'Navigate Campus', path: '/map', icon: Map },
    { name: 'Report Issue', path: '/issues', icon: TriangleAlert },
    { name: 'Lost & Found', path: '/lost-found', icon: Search },
    { name: 'Doubts', path: '/doubts', icon: HelpCircle },
    { name: 'Crowd Insights', path: '/crowd', icon: Users },
    { name: 'Updates', path: '/updates', icon: Bell },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>FEATURES</h2>
      </div>
      <nav className="sidebar-nav">
        {navItems.map(item => (
          <NavLink key={item.path} to={item.path} className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <item.icon size={20} />
            <span>{item.name}</span>
          </NavLink>
        ))}
        
        <NavLink to="/chat" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <BookOpen size={20} />
          <span>Study Groups</span>
          <span className="badge badge-warning">AI</span>
        </NavLink>
        
        <div className="sidebar-link premium-link">
          <Sparkles size={20} />
          <span>AI Assistant</span>
          <span className="badge badge-warning">Premium</span>
        </div>
      </nav>
      
      <div className="sidebar-footer" style={{marginTop: 'auto', padding: '1rem', borderTop: '1px solid var(--border-color)'}}>
         <button onClick={onLogout} className="btn w-full" style={{color: 'var(--danger)', justifyContent: 'flex-start', padding: '0.5rem'}}>Sign Out</button>
      </div>
    </aside>
  );
}
