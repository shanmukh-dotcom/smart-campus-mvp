import { useState } from 'react';
import { DB } from '../services/db';
import { User, Bell, ChevronRight, Crown } from 'lucide-react';
import './Profile.css';

export default function Profile({ user }) {
  const [role, setRole] = useState(user?.role || 'Student');

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    if(user) {
      DB.update('users', user.id, { role: newRole });
    }
  };

  return (
    <div className="profile-container">
      <div className="page-header">
         <h2>Profile</h2>
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
