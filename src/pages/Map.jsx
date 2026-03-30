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
         <iframe 
          title="Campus Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.63929062107!2d-122.17252628469275!3d37.42747447982361!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fa53df4bc5beb%3A0x6bba46c9343bed61!2sStanford%20University!5e0!3m2!1sen!2sus!4v1650000000000!5m2!1sen!2sus" 
          width="100%" 
          height="100%" 
          style={{ border: 0, borderRadius: 'var(--radius-lg)' }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
         ></iframe>
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
