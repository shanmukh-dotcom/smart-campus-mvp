import { NavLink } from 'react-router-dom';
import { Home, Map, HelpCircle, MessageCircle, User } from 'lucide-react';

export default function BottomNav() {
  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Map', path: '/map', icon: Map },
    { name: 'Doubts', path: '/doubts', icon: HelpCircle },
    { name: 'Chat', path: '/chat', icon: MessageCircle },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map(item => (
        <NavLink key={item.path} to={item.path} className={({isActive}) => `bottom-nav-link ${isActive ? 'active' : ''}`} end={item.path === '/'}>
          {({isActive}) => (
            <>
              <div className={`icon-container ${isActive ? 'active-icon' : ''}`}>
                 <item.icon size={24} />
              </div>
              <span>{item.name}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
