import { useState, useEffect, useRef } from 'react';
import { DB } from '../services/db';
import { Send, Hash, Sparkles, Bot, User, Loader2, ArrowLeft, MoreVertical } from 'lucide-react';
import './Chat.css';

export default function Chat({ user }) {
  const [studyGroups, setStudyGroups] = useState([]);
  const [activeGroupId, setActiveGroupId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setStudyGroups(DB.read('study_groups'));
  }, []);

  const loadMessages = (groupId) => {
    const allMessages = DB.read('messages');
    setMessages(allMessages.filter(m => m.groupId === groupId));
  };

  useEffect(() => {
    if (activeGroupId) {
      loadMessages(activeGroupId);
    }
  }, [activeGroupId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAiTyping]);

  const getAiResponse = (text) => {
    const query = text.toLowerCase();
    
    if (query.includes('explain')) {
      return `Here's a quick summary based on your discussion:
• Topic: Core concepts being discussed
• Key idea: Understanding the fundamental principles
• Suggestion: Focus on practical differences between methods`;
    } 
    else if (query.includes('next')) {
      return `Based on your discussion so far:
• You've covered basic concepts
• Next step: Practice problems and revise key formulas
• Don't forget the upcoming assignment!`;
    } 
    else if (query.includes('summarize')) {
      return `Summary of discussion:
• Topic introduced and defined
• Key doubts clarified by members
• Next steps identified for revision`;
    } 
    else {
      return `I saw you mentioned me! As an MVP AI Assistant, try asking me to "explain this topic", "what's next", or "summarize".`;
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim() || !activeGroupId) return;

    const text = inputText;
    
    // 1. Add User Message
    DB.add('messages', {
      groupId: activeGroupId,
      authorId: user.id,
      authorName: user.name,
      text: text,
      timestamp: new Date().toISOString(),
      isAi: false
    });
    
    setInputText('');
    loadMessages(activeGroupId);

    // 2. MVP AI Check
    if (text.toLowerCase().includes('@buddy') || text.toLowerCase().includes('@ai')) {
      setIsAiTyping(true);
      
      const aiReply = getAiResponse(text);

      setTimeout(() => {
        DB.add('messages', {
          groupId: activeGroupId,
          authorId: 'ai',
          authorName: 'Buddy AI',
          text: aiReply,
          timestamp: new Date().toISOString(),
          isAi: true
        });
        loadMessages(activeGroupId);
        setIsAiTyping(false);
      }, 1500);
    }
  };

  const activeGroup = studyGroups.find(g => g.id === activeGroupId);

  // ----------------------------------------------------
  // Screen 1: Study Groups List
  // ----------------------------------------------------
  if (!activeGroup) {
    return (
      <div className="study-groups-list">
        {/* Top Banner Hero Section */}
        <div className="groups-hero">
          <div className="groups-hero-overlay">
            <h1>Study Groups</h1>
            <p>Collaborate and learn smarter with Buddy AI</p>
          </div>
        </div>
        
        {/* Scrollable Group List */}
        <div className="groups-container">
          {studyGroups.map(group => (
            <div key={group.id} className="group-card" onClick={() => setActiveGroupId(group.id)}>
              <div className="group-card-icon">
                <Hash size={20} />
              </div>
              <div className="group-card-content">
                <div className="group-card-header">
                  <h3>{group.name}</h3>
                  <span className="members-badge">{group.members_count} members</span>
                </div>
                <p className="group-card-desc">{group.description}</p>
                
                <div className="group-card-footer">
                  <div className="last-message">
                     <span className="truncate">"{group.lastMessage}"</span>
                  </div>
                  {group.active_count > 0 && (
                     <div className="active-indicator">
                        <span className="dot"></span>
                        {group.active_count} active now
                     </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // Screen 2: AI Chat Interface (WhatsApp/ChatGPT style)
  // ----------------------------------------------------
  return (
    <div className="chat-interface-screen">
      {/* Header */}
      <div className="chat-header native-header">
        <button className="back-btn" onClick={() => setActiveGroupId(null)}>
          <ArrowLeft size={22} />
        </button>
        <div className="chat-header-info">
            <h2>{activeGroup.name}</h2>
            <p>{activeGroup.members_count} members • {activeGroup.active_count} active</p>
        </div>
        <button className="more-btn">
          <MoreVertical size={22} color="var(--text-muted)" />
        </button>
      </div>
      
      {/* Messages */}
      <div className="chat-messages">
        <div className="chat-date-divider"><span>Today</span></div>
        
        {messages.length === 0 && (
          <div className="empty-chat-state">
            <Bot size={48} color="#94a3b8" />
            <h3>Start the discussion!</h3>
            <p>Don't forget to tag @buddy or @ai for study help.</p>
          </div>
        )}

        {messages.map((msg, idx) => {
          const isMe = msg.authorId === user.id;
          const showName = !isMe && (idx === 0 || messages[idx-1].authorId !== msg.authorId);
          
          return (
            <div key={msg.id || idx} className={`message-wrapper ${isMe ? 'mine' : 'theirs'} slide-up-anim`}>
                {!isMe && (
                  <div className={`avatar-circle ${msg.isAi ? 'ai-avatar' : 'user-avatar'}`}>
                    {msg.isAi ? <Bot size={18} /> : <span style={{fontSize:'12px', fontWeight:'bold'}}>{msg.authorName?.charAt(0) || 'U'}</span>}
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
                    <div className="msg-text-formatted">
                      {msg.text.split('\n').map((line, i) => <span key={i}>{line}<br/></span>)}
                    </div>
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

      {/* Input */}
      <div className="chat-input-area border-top">
        <form onSubmit={handleSend} className="chat-form">
            <div className="chat-input-wrapper native-input">
              <input 
                type="text" 
                placeholder="Type a message... or tag @buddy for help" 
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
  );
}
