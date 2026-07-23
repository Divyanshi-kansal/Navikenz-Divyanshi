import React, { useState } from 'react';

function SignupForm({ onFormSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedAge = parseInt(age, 10);
    onFormSubmit({ name, email, password, phone, age: parsedAge });
  };

  
  const inputStyle = {
    padding: '12px 16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '14px',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    transition: 'all 0.2s ease-in-out',
    backgroundColor: '#fafafa'
  };

  const labelStyle = {
    display: 'block', 
    marginBottom: '6px', 
    fontSize: '13px', 
    fontWeight: '600', 
    color: '#444'
  };

  const handleFocus = (e) => {
    e.target.style.border = '1px solid #10b981'; 
    e.target.style.backgroundColor = '#ffffff';
    e.target.style.boxShadow = '0 0 0 3px rgba(79, 70, 229, 0.1)';
  };

  const handleBlur = (e) => {
    e.target.style.border = '1px solid #ccc';
    e.target.style.backgroundColor = '#fafafa';
    e.target.style.boxShadow = 'none';
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
      <div>
        <label style={labelStyle}>Full Name</label>
        <input 
          type="text" 
          placeholder="Enter your full name" 
          value={name}
          onChange={(e) => setName(e.target.value)} 
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={inputStyle}
          required 
        />
      </div>

      <div>
        <label style={labelStyle}>Email Address</label>
        <input 
          type="email" 
          placeholder="Enter your email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={inputStyle}
          required 
        />
      </div>

      <div>
        <label style={labelStyle}>Password</label>
        <input 
          type="password" 
          placeholder="Min 6 characters, no spaces" 
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={inputStyle}
          required 
        />
      </div>

      <div>
        <label style={labelStyle}>Phone Number</label>
        <input 
          type="text" 
          placeholder="10-digit phone number" 
          value={phone}
          onChange={(e) => setPhone(e.target.value)} 
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={inputStyle}
          required 
        />
      </div>

      <div>
        <label style={labelStyle}>Age</label>
        <input 
          type="number" 
          placeholder="Enter your age" 
          value={age}
          onChange={(e) => setAge(e.target.value)} 
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={inputStyle}
          required 
        />
      </div>

      <button 
        type="submit" 
        style={{ 
          padding: '14px', 
          backgroundColor: '#10b981', 
          color: 'white', 
          border: 'none', 
          borderRadius: '6px', 
          fontSize: '16px', 
          fontWeight: '600', 
          cursor: 'pointer',
          transition: 'background-color 0.2s ease',
          marginTop: '8px'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#059669'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#10b981'}
      >
        Register Account
      </button>
    </form>
  );
}

export default SignupForm;