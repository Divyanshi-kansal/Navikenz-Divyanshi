import React, { useState } from 'react';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ChatPage from './pages/ChatPage';

function App() {
  const [currentView, setCurrentView] = useState('signup');

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh', 
      backgroundColor: '#f4f6f9',
      boxSizing: 'border-box'
    }}>
      
      {/* Navigation Top Bar Switcher Container */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '24px 0 10px 0' 
      }}>
        <div style={{
          display: 'flex',
          gap: '12px',
          backgroundColor: '#fff',
          padding: '6px',
          borderRadius: '30px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        }}>
          {/* Sign Up Button */}
          <button 
            onClick={() => setCurrentView('signup')}
            style={{
              padding: '8px 18px',
              borderRadius: '20px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600',
              backgroundColor: currentView === 'signup' ? '#10b981' : 'transparent',
              color: currentView === 'signup' ? 'white' : '#666',
              transition: 'all 0.2s'
            }}
          >
            Sign Up View
          </button>

          {/* Login Button */}
          <button 
            onClick={() => setCurrentView('login')}
            style={{
              padding: '8px 18px',
              borderRadius: '20px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600',
              backgroundColor: currentView === 'login' ? '#10b981' : 'transparent',
              color: currentView === 'login' ? 'white' : '#666',
              transition: 'all 0.2s'
            }}
          >
            Login View
          </button>

          {/* Chat Button */}
          <button 
            onClick={() => setCurrentView('chat')} 
            style={{
              padding: '8px 18px',
              borderRadius: '20px',
              border: 'none',
              fontWeight: '600',
              cursor: 'pointer',
              backgroundColor: currentView === 'chat' ? '#10b981' : 'transparent',
              color: currentView === 'chat' ? 'white' : '#666',
              transition: 'all 0.2s'
            }}
          >
            💬 Chat Interface
          </button>
        </div>
      </div>

      {/* Dynamic View Panel Renderer */}
      <div style={{ flex: 1, display: 'flex',width:"100%",overflow:"hidden" }}>
        {currentView === 'signup' && <SignupPage />}
        {currentView === 'login' && <LoginPage onViewChange={setCurrentView} />}
        {currentView === 'chat' && <ChatPage />}
      </div>

    </div>
  );
}

export default App;