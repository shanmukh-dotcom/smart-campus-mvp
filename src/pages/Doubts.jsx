import { useState, useEffect } from 'react';
import { DB } from '../services/db';
import { ThumbsUp, MessageSquare, Star, Send } from 'lucide-react';
import './Doubts.css';

export default function Doubts({ user }) {
  const [doubts, setDoubts] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [isImportant, setIsImportant] = useState(false);

  // For comments
  const [activeDoubt, setActiveDoubt] = useState(null);
  const [commentText, setCommentText] = useState('');

  const loadDoubts = () => {
    setDoubts([...DB.read('posts')].reverse());
  };

  useEffect(() => {
    loadDoubts();
  }, []);

  const handlePost = (e) => {
    e.preventDefault();
    if (!newQuestion) return;
    
    DB.add('posts', {
      question: newQuestion,
      authorId: user.id,
      authorName: user.name, // storing name for simplicity in MVP
      upvotes: 0,
      important: isImportant,
      comments: [],
      createdAt: new Date().toISOString()
    });
    
    setNewQuestion('');
    setIsImportant(false);
    loadDoubts();
  };

  const handleUpvote = (id) => {
    const doubt = doubts.find(d => d.id === id);
    if (!doubt) return;
    DB.update('posts', id, { upvotes: (doubt.upvotes || 0) + 1 });
    loadDoubts();
  };

  const handleAddComment = (e, id) => {
    e.preventDefault();
    if (!commentText) return;
    
    const doubt = doubts.find(d => d.id === id);
    if (!doubt) return;

    const newComment = {
      id: Date.now(),
      authorName: user.name,
      text: commentText,
      createdAt: new Date().toISOString()
    };

    DB.update('posts', id, { comments: [...(doubt.comments || []), newComment] });
    setCommentText('');
    loadDoubts();
  };

  return (
    <div className="doubts-container">
      <div className="page-hero" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80")'}}>
         <div>
            <h1>Doubts & Discussions</h1>
            <p>Collaborate with the campus community.</p>
         </div>
      </div>

      <div className="compose-card">
         <form onSubmit={handlePost}>
            <textarea 
              placeholder="Ask a question to the campus community..." 
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              className="compose-textarea"
              rows="3"
            ></textarea>
            <div className="compose-actions">
               <label className="important-toggle">
                  <input type="checkbox" checked={isImportant} onChange={(e) => setIsImportant(e.target.checked)} />
                  <Star size={16} color={isImportant ? "var(--warning)" : "var(--text-muted)"} fill={isImportant ? "var(--warning)" : "none"} />
                  Mark as Important
               </label>
               <button type="submit" className="btn btn-primary btn-sm">Post</button>
            </div>
         </form>
      </div>

      <div className="doubts-feed">
         {doubts.map(doubt => (
           <div key={doubt.id} className={`doubt-card ${doubt.important ? 'important' : ''}`}>
              <div className="doubt-header">
                 <div className="doubt-avatar">{doubt.authorName ? doubt.authorName[0] : 'U'}</div>
                 <div className="doubt-meta">
                    <span className="author-name">{doubt.authorName || 'Student'}</span>
                    <span className="post-date">{new Date(doubt.createdAt || Date.now()).toLocaleDateString()}</span>
                 </div>
                 {doubt.important && <span className="badge badge-warning" style={{marginLeft: 'auto'}}>Important</span>}
              </div>
              
              <h3 className="doubt-question">{doubt.question}</h3>
              
              <div className="doubt-actions">
                 <button className="action-btn" onClick={() => handleUpvote(doubt.id)}>
                    <ThumbsUp size={16} /> {doubt.upvotes || 0}
                 </button>
                 <button className="action-btn" onClick={() => setActiveDoubt(activeDoubt === doubt.id ? null : doubt.id)}>
                    <MessageSquare size={16} /> {doubt.comments?.length || 0} Comments
                 </button>
              </div>

              {activeDoubt === doubt.id && (
                <div className="comments-section">
                   <div className="comments-list">
                      {doubt.comments?.map(c => (
                        <div key={c.id} className="comment">
                           <strong>{c.authorName}</strong>: {c.text}
                        </div>
                      ))}
                      {(!doubt.comments || doubt.comments.length === 0) && <p className="text-muted" style={{fontSize:'0.85rem'}}>No comments yet. Be the first!</p>}
                   </div>
                   <form className="comment-form" onSubmit={(e) => handleAddComment(e, doubt.id)}>
                      <input 
                        type="text" 
                        placeholder="Write a comment..." 
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className="comment-input"
                      />
                      <button type="submit" className="comment-submit"><Send size={14} color="white" /></button>
                   </form>
                </div>
              )}
           </div>
         ))}
      </div>
    </div>
  );
}
