import React from 'react';

function ChatForm({ inputMessage, setInputMessage, onSendMessage, errorMessage, isLocked }) {
  return (
    <div style={{ padding: '0 24px 24px 24px', backgroundColor: '#ffffff' }}>
      <form onSubmit={onSendMessage} style={{ display: 'flex', backgroundColor: '#f2f3f5', borderRadius: '8px', padding: '8px 16px', alignItems: 'center' }}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder={isLocked ? "Please log in to unlock chatting..." : "Type your message here..."}
          disabled={isLocked}
          style={{ flex: 1, border: 'none', backgroundColor: 'transparent', outline: 'none', fontSize: '15px', padding: '10px 0', color: '#313338', cursor: isLocked ? 'not-allowed' : 'text' }}
        />
        <button 
          type="submit" 
          disabled={isLocked}
          style={{ 
            backgroundColor: isLocked ? '#949ba4' : '#23a55a', 
            color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: '600', 
            cursor: isLocked ? 'not-allowed' : 'pointer', marginLeft: '12px' 
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatForm;