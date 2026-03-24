import { useState } from 'react';
import { DB } from '../services/db';
import { GraduationCap, Briefcase, Eye } from 'lucide-react';
import './Login.css';

export default function Login({ onLogin }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('Student');

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = DB.login(code, role);
    if (user) {
      onLogin(user);
    } else {
      setError('Invalid access code. Please try again.');
    }
  };

  if (step === 1) {
    return (
      <div className="login-wrapper">
        <div className="login-container">
          <div className="login-header">
             <div className="logo-icon"><GraduationCap size={32} color="white" /></div>
             <h1>SmartCampus Buddy</h1>
             <p>Your campus, simplified.</p>
          </div>
          <div className="role-cards">
             <div className="role-card" onClick={() => handleRoleSelect('Student')}>
                <div className="rc-icon"><GraduationCap size={24} color="var(--primary)" /></div>
                <div className="rc-info">
                   <h3>Student</h3>
                   <p>Full access to all features</p>
                </div>
             </div>
             <div className="role-card" onClick={() => handleRoleSelect('Faculty')}>
                <div className="rc-icon"><Briefcase size={24} color="var(--primary)" /></div>
                <div className="rc-info">
                   <h3>Faculty</h3>
                   <p>Manage doubts & announcements</p>
                </div>
             </div>
             <div className="role-card" onClick={() => handleRoleSelect('Visitor')}>
                <div className="rc-icon"><Eye size={24} color="var(--primary)" /></div>
                <div className="rc-info">
                   <h3>Visitor</h3>
                   <p>Quick campus navigation</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-card">
           <div className="logo-icon" style={{margin: '0 auto 1.5rem auto'}}><GraduationCap size={32} color="white" /></div>
           <h2 style={{textAlign: 'center', marginBottom: '0.5rem'}}>Enter Access Code</h2>
           <p style={{textAlign: 'center', color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.875rem'}}>
              Joining as {role}
           </p>
           <form onSubmit={handleSubmit}>
             <input 
               type="text" 
               value={code} 
               onChange={(e) => setCode(e.target.value)} 
               placeholder="Access Code"
               className="login-input"
             />
             {error && <p className="login-error">{error}</p>}
             <button type="submit" className="btn btn-primary w-full">Enter App</button>
             <button type="button" onClick={() => setStep(1)} className="btn btn-outline w-full" style={{marginTop: '0.75rem'}}>Back</button>
           </form>
        </div>
      </div>
    </div>
  );
}
