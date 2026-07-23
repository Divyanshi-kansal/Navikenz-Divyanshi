import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import { loginUser } from '../services/services';

function LoginPage({ onViewChange, setView }) {

  const [feedback, setFeedback] = useState({ text: '', isSuccess: false });
  
  const handleLoginData = async (formData) => {
    try {
      setFeedback({ text: 'Connecting to backend...', isSuccess: true });
      
      // 1. API Call sending credentials
      const data = await loginUser(formData);
      console.log("Response from server:", data);

      // 2. Token extraction fallback checks
      let tokenValue = null;
      if (data && data.access_token) {
        tokenValue = data.access_token;
      } else if (data && data.token) {
        tokenValue = data.token;
      }

      if (!tokenValue) {
        setFeedback({
          text: "Login matched but Backend did not send an 'access_token' or 'token' key!",
          isSuccess: false
        });
        return;
      }

      // 3. Save correct values to Local Storage
      localStorage.setItem("userToken", tokenValue);
      localStorage.setItem("username", formData.email || data.username);

      setFeedback({
        text: "Login Successful! Redirecting...",
        isSuccess: true
      });
     
      // 4. Smooth view change
      setTimeout(() => {
        if (onViewChange) {
          onViewChange('chat');
        }
      }, 1500);

    } catch (error) {
      console.error("Login Error Complete Log:", error);
      
      
      const backendMessage = error.response?.data?.detail;
      const networkErrorMessage = error.message; 
      
      setFeedback({
        text: backendMessage 
          ? `Backend Rejected Login: ${JSON.stringify(backendMessage)}` 
          : `Network/Code Error: ${networkErrorMessage || "Check Browser Console (F12)"}`,
        isSuccess: false
      });
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      width: '100vw',
      backgroundColor: '#f4f6f9',
      fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      margin: 0,
      boxSizing: 'border-box'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        padding: '40px 30px',
        borderRadius: '12px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center'
      }}>
        <h2 style={{ margin: '0 0 8px 0', color: '#1a1a1a', fontSize: '28px', fontWeight: '600' }}>
          Welcome Back
        </h2>
        <p style={{ margin: '0 0 24px 0', color: '#666', fontSize: '14px' }}>
          Please sign in to your account
        </p>
        
        <LoginForm onFormSubmit={handleLoginData} />

        {feedback.text && (
          <div style={{
            marginTop: '20px',
            padding: '12px',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '600',
            backgroundColor: feedback.isSuccess ? '#e6f4ea' : '#fce8e6',
            color: feedback.isSuccess ? '#137333' : '#c5221f',
            border: `1px solid ${feedback.isSuccess ? '#34a853' : '#ea4335'}`
          }}>
            {feedback.text}
          </div>
        )}

      </div>
    </div>
  );
}

export default LoginPage;