import React, { useState } from 'react';
import SignupForm from '../components/SignupForm';
import { registerUser } from '../services/services';

function SignupPage() {
  const [feedback, setFeedback] = useState({ text: '', isSuccess: false });
  
  const handleSignupData = async (formData) => {
    try {
      
      setFeedback({ text: '', isSuccess: false });
      
      const data = await registerUser(formData);
      setFeedback({
        text: `Success! Account created with ID: ${data.id}`,
        isSuccess: true
      });
    } catch (error) {
      
      console.log("Full Axios Error Object:", error);

      let displayMessage = "Registration failed. Please check your inputs.";

      
      if (error.response && error.response.data) {
        const detail = error.response.data.detail;

        if (detail) {
          if (Array.isArray(detail)) {
            
            displayMessage = `Validation Error: ${detail[0]?.msg || "Invalid format"}`;
          } else if (typeof detail === 'string') {
           
            displayMessage = `Registration Failed: ${detail}`;
          } else if (typeof detail === 'object') {
            
            displayMessage = `Error: ${JSON.stringify(detail)}`;
          }
        } else if (error.response.data.message) {
          displayMessage = error.response.data.message;
        }
      } else if (error.message) {
        
        displayMessage = `Network Error: ${error.message}`;
      }

      setFeedback({
        text: displayMessage,
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
          Sign Up Page
        </h2>
        <p style={{ margin: '0 0 24px 0', color: '#666', fontSize: '14px' }}>
          Create your new credentials below:
        </p>
        
        
        <SignupForm onFormSubmit={handleSignupData} />

        
        {feedback.text && (
          <div style={{
            marginTop: '20px',
            padding: '12px',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '600',
            backgroundColor: feedback.isSuccess ? '#e8eaf6' : '#fce8e6',
            color: feedback.isSuccess ? '#3f51b5' : '#c5221f',
            border: `1px solid ${feedback.isSuccess ? '#3f51b5' : '#ea4335'}`
          }}>
            {feedback.text}
          </div>
        )}

      </div>
    </div>
  );
}

export default SignupPage;