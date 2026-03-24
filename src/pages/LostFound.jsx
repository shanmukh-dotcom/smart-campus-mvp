import { useState, useEffect } from 'react';
import { DB } from '../services/db';
import { Plus } from 'lucide-react';
import './LostFound.css';

export default function LostFound({ user }) {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'lost', 'found'
  
  const [showForm, setShowForm] = useState(false);
  const [type, setType] = useState('lost');
  const [item, setItemName] = useState('');
  const [description, setDescription] = useState('');

  const loadItems = () => {
    setItems([...DB.read('lost_found')].reverse());
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!item || !description) return;
    DB.add('lost_found', {
      type,
      item,
      description,
      contact: user.name,
      createdAt: new Date().toISOString()
    });
    setItemName('');
    setDescription('');
    setShowForm(false);
    loadItems();
  };

  const filteredItems = items.filter(i => filter === 'all' || i.type === filter);

  return (
    <div className="lf-container">
      <div className="page-hero" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80")'}}>
         <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem'}}>
            <div>
               <h1>Lost & Found</h1>
               <p style={{margin: 0}}>Find what you lost. Return what you found.</p>
            </div>
            <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
               <Plus size={18} /> {showForm ? 'Cancel' : 'Report Item'}
            </button>
         </div>
      </div>

      {showForm && (
        <div className="lf-form-card">
          <h3>Report an Item</h3>
          <form onSubmit={handleSubmit} className="lf-form">
             <div className="type-toggle">
                <button type="button" className={`toggle-btn ${type === 'lost' ? 'active lost' : ''}`} onClick={() => setType('lost')}>I Lost Something</button>
                <button type="button" className={`toggle-btn ${type === 'found' ? 'active found' : ''}`} onClick={() => setType('found')}>I Found Something</button>
             </div>
             <input type="text" placeholder="Item Name (e.g. Blue Umbrella)" value={item} onChange={(e) => setItemName(e.target.value)} className="form-input" required />
             <textarea placeholder="Description & where it was lost/found..." value={description} onChange={(e) => setDescription(e.target.value)} className="form-textarea" rows="3" required></textarea>
             <button type="submit" className="btn btn-primary w-full" style={{justifyContent: 'center'}}>Submit Report</button>
          </form>
        </div>
      )}

      <div className="lf-filters">
         <button className={`filter-chip ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
         <button className={`filter-chip ${filter === 'lost' ? 'active' : ''}`} onClick={() => setFilter('lost')}>Lost Items</button>
         <button className={`filter-chip ${filter === 'found' ? 'active' : ''}`} onClick={() => setFilter('found')}>Found Items</button>
      </div>

      <div className="lf-list">
         {filteredItems.map(lf => (
           <div key={lf.id} className="lf-card">
              <div className="lf-header">
                 <span className={`lf-badge ${lf.type}`}>{lf.type.toUpperCase()}</span>
                 <span className="lf-date">{new Date(lf.createdAt).toLocaleDateString()}</span>
              </div>
              <h4 className="lf-title">{lf.item}</h4>
              <p className="lf-desc">{lf.description}</p>
              <div className="lf-contact">
                 <span>Contact: <strong>{lf.contact}</strong></span>
              </div>
           </div>
         ))}
         {filteredItems.length === 0 && <p className="text-muted" style={{gridColumn: '1 / -1', textAlign: 'center', padding: '2rem 0'}}>No items found.</p>}
      </div>
    </div>
  );
}
