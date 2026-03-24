import { useState, useEffect } from 'react';
import { DB } from '../services/db';

export default function Updates() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    setAnnouncements([...DB.read('announcements')].reverse());
  }, []);

  return (
    <div style={{padding: '1.5rem', maxWidth: '800px', margin: '0 auto'}}>
       <div className="page-hero" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1503694978374-8a2fa686963a?auto=format&fit=crop&w=1200&q=80")'}}>
          <div>
             <h1>Campus Updates</h1>
             <p>Latest announcements from administration.</p>
          </div>
       </div>
       <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          {announcements.map(a => (
            <div key={a.id} className="card" style={{backgroundColor: 'white'}}>
               <div style={{fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem'}}>{new Date(a.date).toLocaleDateString()}</div>
               <h4 style={{fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-main)'}}>{a.title}</h4>
               <p style={{fontSize: '0.95rem', color: 'var(--text-muted)'}}>{a.content}</p>
            </div>
          ))}
          {announcements.length === 0 && <p style={{color: 'var(--text-muted)'}}>No new updates right now.</p>}
       </div>
    </div>
  );
}
