import { useState, useEffect } from 'react';
import { DB } from '../services/db';
import { Activity } from 'lucide-react';
import './CrowdInsights.css';

export default function CrowdInsights() {
  const [locations, setLocations] = useState([]);
  const [insights, setInsights] = useState([]);

  const loadData = () => {
    setLocations(DB.read('locations'));
    setInsights(DB.read('crowdInsights'));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleVote = (locationId, level) => {
    DB.add('crowdInsights', {
      locationId: locationId,
      level,
      timestamp: new Date().toISOString()
    });
    loadData();
  };

  const getCrowdLevel = (locationId) => {
    const locInsights = insights.filter(i => i.locationId === locationId);
    if (locInsights.length === 0) return 'unknown';
    // Get the most recent
    return locInsights[locInsights.length - 1].level;
  };

  return (
    <div className="crowd-container">
      <div className="page-hero" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1555529733-0e370560ec87?auto=format&fit=crop&w=1200&q=80")'}}>
         <div>
            <h1>Crowd Insights</h1>
            <p>Know where the crowd is before you head out.</p>
         </div>
      </div>
      
      <div className="crowd-info-card">
         <h3><Activity size={20} color="var(--primary)" /> Campus Crowd Status</h3>
         <p>Help others by reporting how crowded these locations are right now.</p>
      </div>

      <div className="locations-list">
         {locations.map(loc => {
           const currentLevel = getCrowdLevel(loc.id);
           
           return (
             <div key={loc.id} className="crowd-loc-card">
                <div className="loc-info">
                   <h4>{loc.name}</h4>
                   <p style={{fontSize: '0.85rem', color: 'var(--text-muted)'}}>{loc.building}</p>
                </div>
                
                <div className="crowd-status">
                   <div className="crowd-bar-container">
                      <div className="crowd-bar-header">
                         <span className="status-text">
                           {currentLevel === 'high' ? 'High Crowd' : 
                            currentLevel === 'medium' ? 'Moderate Crowd' : 
                            currentLevel === 'low' ? 'Not Crowded' : 'No Data'}
                         </span>
                         <span className={`status-pct ${currentLevel}`}>
                           {currentLevel === 'high' ? '92%' : 
                            currentLevel === 'medium' ? '58%' : 
                            currentLevel === 'low' ? '24%' : '0%'}
                         </span>
                      </div>
                      <div className="crowd-bar-bg">
                         <div 
                            className={`crowd-bar-fill ${currentLevel}`} 
                            style={{width: currentLevel === 'high' ? '92%' : currentLevel === 'medium' ? '58%' : currentLevel === 'low' ? '24%' : '0%'}}
                         ></div>
                      </div>
                   </div>
                   
                   <div className="vote-buttons">
                      <span style={{fontSize: '0.75rem', color: 'var(--text-muted)', marginRight: '0.5rem'}}>Update:</span>
                      <button className={`btn-vote low ${currentLevel==='low'?'active':''}`} onClick={() => handleVote(loc.id, 'low')}>Low</button>
                      <button className={`btn-vote medium ${currentLevel==='medium'?'active':''}`} onClick={() => handleVote(loc.id, 'medium')}>Medium</button>
                      <button className={`btn-vote high ${currentLevel==='high'?'active':''}`} onClick={() => handleVote(loc.id, 'high')}>High</button>
                   </div>
                </div>
             </div>
           );
         })}
      </div>
    </div>
  );
}
