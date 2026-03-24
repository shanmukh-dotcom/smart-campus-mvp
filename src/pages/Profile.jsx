import { useState, useEffect } from 'react';
import { DB } from '../services/db';
import { User, Bell, ChevronRight, Crown, Moon, Sun } from 'lucide-react';
import './Profile.css';

export default function Profile({ user }) {
  const [role, setRole] = useState(user?.role || 'Student');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(document.body.classList.contains('dark-mode'));
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if(newMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    if(user) {
      DB.update('users', user.id, { role: newRole });
    }
  };

  return (
    <div className="profile-container">
      <div className="page-hero" style={{backgroundImage: 'url("/profile_hero.png")'}}>
         <div>
            <h1>Profile Settings</h1>
            <p>Manage your account preferences</p>
         </div>
      </div>

      <div className="profile-header-card">
         <div className="profile-avatar-large">
            {user?.name ? user.name[0] : 'U'}
         </div>
         <h3>{user?.name || 'Alex Kumar'}</h3>
         <p>CSE · 3rd Year</p>
      </div>

      <div className="profile-section">
         <h4>SWITCH ROLE</h4>
         <div className="role-switcher">
            <button className={`role-btn ${role === 'Student' ? 'active' : ''}`} onClick={() => handleRoleChange('Student')}>Student</button>
            <button className={`role-btn ${role === 'Faculty' ? 'active' : ''}`} onClick={() => handleRoleChange('Faculty')}>Faculty</button>
            <button className={`role-btn ${role === 'Visitor' ? 'active' : ''}`} onClick={() => handleRoleChange('Visitor')}>Visitor</button>
         </div>
      </div>

      <div className="premium-banner">
         <div className="pb-content">
            <h4 style={{display: 'flex', alignItems: 'center', gap: '0.4rem'}}>
               <Crown size={18} color="var(--warning)" /> SmartCampus Premium
            </h4>
            <p>Unlock AI assistant, priority support, and more.</p>
            <div className="pb-bottom">
               <span className="price">₹30<span>/month</span></span>
               <button className="btn btn-upgrade">Upgrade</button>
            </div>
         </div>
      </div>

      <div className="settings-list">
         <div className="settings-item" onClick={toggleDarkMode} style={{cursor: 'pointer'}}>
            <div style={{display:'flex', alignItems:'center', gap:'0.75rem'}}>
               {isDarkMode ? <Sun size={20} color="var(--warning)" /> : <Moon size={20} color="var(--primary)" />}
               <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </div>
            <div style={{width: '40px', height: '20px', borderRadius: '10px', background: isDarkMode ? 'var(--primary)' : 'var(--border-color)', position: 'relative', transition: 'background 0.3s'}}>
               <div style={{width: '16px', height: '16px', borderRadius: '50%', background: 'white', position: 'absolute', top: '2px', left: isDarkMode ? '22px' : '2px', transition: 'left 0.3s'}}></div>
            </div>
         </div>
         <div className="settings-item">
            <div style={{display:'flex', alignItems:'center', gap:'0.75rem'}}>
               <User size={20} color="var(--text-muted)" />
               <span>Edit Profile</span>
            </div>
            <ChevronRight size={20} color="var(--text-muted)" />
         </div>
         <div className="settings-item">
            <div style={{display:'flex', alignItems:'center', gap:'0.75rem'}}>
               <Bell size={20} color="var(--text-muted)" />
               <span>Notification Settings</span>
            </div>
            <ChevronRight size={20} color="var(--text-muted)" />
         </div>
      </div>
    </div>
  );
}
