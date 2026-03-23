import { useState, useEffect } from 'react';
import { DB } from '../services/db';
import { Search, MapPin, Navigation, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Map.css';

export default function CampusMap() {
  const [locations, setLocations] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setLocations(DB.read('locations'));
  }, []);

  const filtered = locations.filter(loc => 
    loc.name.toLowerCase().includes(search.toLowerCase()) || 
    loc.building.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="map-container">
      <div className="page-header">
         <button className="back-btn" onClick={() => navigate(-1)}><ArrowLeft size={18} /></button>
         <h2>Campus Map</h2>
      </div>

      <div className="search-bar">
        <Search size={18} color="var(--text-muted)" />
        <input 
          type="text" 
          placeholder="Search rooms, labs, offices..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="map-view">
         <div className="map-placeholder">
            <MapPin size={32} color="var(--secondary)" style={{marginBottom: '0.5rem'}} />
            <h3 style={{color: 'var(--secondary)'}}>Interactive Map</h3>
            <p>Tap a location below</p>
         </div>
         <button className="btn btn-primary locate-me-btn">
            <Navigation size={16} /> Locate Me
         </button>
      </div>

      <div className="locations-section">
         <h3>Locations</h3>
         <div className="locations-list">
            {filtered.map(loc => (
              <div key={loc.id} className="location-card">
                 <div className="loc-icon"><MapPin size={20} color="var(--secondary)" /></div>
                 <div className="loc-info">
                    <h4>{loc.name}</h4>
                    <p>{loc.building}</p>
                 </div>
                 <button className="btn route-btn">Route</button>
              </div>
            ))}
            {filtered.length === 0 && <p className="text-muted text-center py-4">No locations found.</p>}
         </div>
      </div>
    </div>
  );
}
