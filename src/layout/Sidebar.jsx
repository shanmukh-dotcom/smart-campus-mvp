import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Map, TriangleAlert, Search, HelpCircle, Users, Bell, BookOpen, Sparkles, Menu, LogOut } from 'lucide-react';

export default function Sidebar({ user, onLogout }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { name: 'Navigate Campus', path: '/map', icon: Map },
    { name: 'Report Issue', path: '/issues', icon: TriangleAlert },
    { name: 'Lost & Found', path: '/lost-found', icon: Search },
    { name: 'Doubts', path: '/doubts', icon: HelpCircle },
    { name: 'Crowd Insights', path: '/crowd', icon: Users },
    { name: 'Updates', path: '/updates', icon: Bell },
  ];

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header" style={{display: 'flex', alignItems: 'center', justifyContent: isCollapsed ? 'center' : 'space-between', marginBottom: '1rem'}}>
        {!isCollapsed && <h2 style={{margin: 0}}>FEATURES</h2>}
        <button onClick={() => setIsCollapsed(!isCollapsed)} style={{background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', padding: '0.2rem'}}>
          <Menu size={24} />
        </button>
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
          {!isCollapsed && <span className="badge badge-warning">AI</span>}
        </NavLink>
        
        <div className="sidebar-link premium-link">
          <Sparkles size={20} />
          <span>AI Assistant</span>
          {!isCollapsed && <span className="badge badge-warning">Premium</span>}
        </div>
      </nav>
      
      <div className="sidebar-footer" style={{marginTop: 'auto', padding: '1rem', borderTop: '2px solid var(--border-color)'}}>
         <button onClick={onLogout} className="btn w-full btn-outline" style={{color: 'var(--danger)', borderColor: 'var(--danger)', justifyContent: isCollapsed ? 'center' : 'flex-start', padding: '0.5rem'}}>
            <LogOut size={20} />
            {!isCollapsed && <span style={{marginLeft: '0.5rem'}}>Sign Out</span>}
         </button>
      </div>
    </aside>
  );
}
