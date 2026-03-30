import { useState, useEffect, useRef } from 'react';
import { DB } from '../services/db';
import { Send, Hash, Sparkles, Bot, User, Loader2 } from 'lucide-react';
import './Chat.css';

export default function Chat({ user }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const loadMessages = () => {
    setMessages(DB.read('messages'));
  };

  useEffect(() => {
    loadMessages();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAiTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const text = inputText;
    
    // 1. Add User Message
    DB.add('messages', {
      groupId: 'general',
      authorId: user.id,
      authorName: user.name,
      text: text,
      timestamp: new Date().toISOString(),
      isAi: false
    });
    
    setInputText('');
    loadMessages();

    // 2. Check for @buddy or @ai
    if (text.toLowerCase().includes('@buddy') || text.toLowerCase().includes('@ai')) {
      setIsAiTyping(true);
      setTimeout(() => {
        DB.add('messages', {
          groupId: 'general',
          authorId: 'ai',
          authorName: 'Buddy AI',
          text: `I saw you mentioned me! As an MVP AI, I don't have real answers right now, but I am here to help you navigate SmartCampus.`,
          timestamp: new Date().toISOString(),
          isAi: true
        });
        loadMessages();
        setIsAiTyping(false);
      }, 1500); // 1.5s delay for realistic feel
    }
  };

  return (
    <div className="chat-page-bg">
      <div className="chat-container">
        <div className="chat-sidebar">
            <h3 className="sidebar-title">Study Groups</h3>
            <div className="group-list">
              <div className="group-item active">
                  <div className="group-icon"><Hash size={18} /></div>
                  <div className="group-info">
                    <h4>CSE 3rd Year</h4>
                    <p>General discussion</p>
                  </div>
              </div>
              <div className="group-item">
                  <div className="group-icon"><Hash size={18} /></div>
                  <div className="group-info">
                    <h4>Data Structures</h4>
                    <p>Assignment 2 help</p>
                  </div>
              </div>
            </div>
        </div>

        <div className="chat-main">
            <div className="chat-header">
              <div className="chat-header-info">
                  <h2>CSE 3rd Year</h2>
                  <p>24 members online</p>
              </div>
            </div>
            
            <div className="chat-messages">
              {messages.map((msg, idx) => {
                const isMe = msg.authorId === user.id;
                const showName = !isMe && (idx === 0 || messages[idx-1].authorId !== msg.authorId);
                
                return (
                  <div key={msg.id || idx} className={`message-wrapper ${isMe ? 'mine' : 'theirs'} slide-up-anim`}>
                      {!isMe && (
                        <div className={`avatar-circle ${msg.isAi ? 'ai-avatar' : 'user-avatar'}`}>
                          {msg.isAi ? <Bot size={18} /> : <User size={18} />}
                        </div>
                      )}
                      
                      <div className="message-content">
                        {showName && !isMe && (
                          <div className="message-author">
                            {msg.authorName || 'Student'} 
                            {msg.isAi && <Sparkles size={12} color="#f59e0b" style={{marginLeft:'4px'}}/>}
                          </div>
                        )}
                        <div className={`message-bubble ${msg.isAi ? 'ai-bubble' : isMe ? 'my-bubble' : 'their-bubble'}`}>
                          <p>{msg.text}</p>
                          <span className="message-time">{new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        </div>
                      </div>
                  </div>
                );
              })}
              
              {isAiTyping && (
                <div className="message-wrapper theirs slide-up-anim">
                  <div className="avatar-circle ai-avatar">
                    <Bot size={18} />
                  </div>
                  <div className="message-content">
                    <div className="message-author">Buddy AI <Sparkles size={12} color="#f59e0b" style={{marginLeft:'4px'}}/></div>
                    <div className="message-bubble ai-bubble typing-bubble">
                      <Loader2 size={18} className="spin-anim" color="#0ea5e9" />
                      <span style={{fontSize: '0.85rem', color: '#0ea5e9', fontWeight: '500'}}>Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            <div className="chat-input-area">
              <form onSubmit={handleSend} className="chat-form">
                  <div className="chat-input-wrapper">
                    <input 
                      type="text" 
                      placeholder="Message the group... (Tag @buddy for AI help)" 
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      className="chat-input"
                    />
                    <button type="submit" className="chat-send-btn" disabled={!inputText.trim()}>
                      <Send size={18} />
                    </button>
                  </div>
              </form>
            </div>
        </div>
      </div>
    </div>
  );
}
