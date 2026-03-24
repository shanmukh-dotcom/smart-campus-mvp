import { useState, useEffect } from 'react';
import { DB } from '../services/db';
import { Camera, Send, AlertTriangle } from 'lucide-react';
import './Issues.css';

export default function Issues({ user }) {
  const [issues, setIssues] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const loadIssues = () => {
    setIssues([...DB.read('issues')].reverse()); // Show newest first
  };

  useEffect(() => {
    loadIssues();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) return;
    DB.add('issues', {
      title,
      description,
      status: 'open',
      authorId: user.id,
      createdAt: new Date().toISOString()
    });
    setTitle('');
    setDescription('');
    loadIssues();
  };

  return (
    <div className="issues-container">
      <div className="page-hero" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80")'}}>
         <div>
            <h1>Report Issue</h1>
            <p>Help keep our campus clean and functional.</p>
         </div>
      </div>

      <div className="report-form-card">
        <h3>Submit New Issue</h3>
        <p>Help keep our campus clean and functional.</p>
        <form onSubmit={handleSubmit} className="issue-form">
           <input 
             type="text" 
             placeholder="Issue Title (e.g. Broken AC in Lab 1)" 
             value={title} 
             onChange={(e) => setTitle(e.target.value)} 
             className="form-input"
             required
           />
           <textarea 
             placeholder="Describe the issue in detail..." 
             value={description} 
             onChange={(e) => setDescription(e.target.value)} 
             className="form-textarea"
             rows="4"
             required
           ></textarea>
           
           <div className="form-actions">
              <button type="button" className="btn btn-outline flex-1">
                 <Camera size={18} /> Add Photo
              </button>
              <button type="submit" className="btn btn-primary flex-2">
                 <Send size={18} /> Submit Issue
              </button>
           </div>
        </form>
      </div>

      <div className="issues-list-section">
         <h3>Recent Issues</h3>
         <div className="issues-list">
            {issues.map(issue => (
              <div key={issue.id} className="issue-card">
                 <div className="issue-icon" style={{backgroundColor: issue.status === 'open' ? '#fef3c7' : '#dcfce3'}}>
                    <AlertTriangle size={20} color={issue.status === 'open' ? 'var(--warning)' : 'var(--success)'} />
                 </div>
                 <div className="issue-info">
                    <div className="issue-header">
                       <h4>{issue.title}</h4>
                       <span className={`status-badge ${issue.status}`}>{issue.status}</span>
                    </div>
                    <p>{issue.description}</p>
                    <span className="issue-date">{new Date(issue.createdAt).toLocaleDateString()}</span>
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
}
