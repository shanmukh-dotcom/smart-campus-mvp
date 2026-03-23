import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import './Layout.css';

export default function MainLayout({ children, user, onLogout }) {
  return (
    <div className="layout-root">
      <Sidebar user={user} onLogout={onLogout} />
      <div className="layout-content">
        <main className="layout-main">
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
