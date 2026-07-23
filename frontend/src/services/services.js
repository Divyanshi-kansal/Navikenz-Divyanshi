import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

// 1. Create a centralized Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// 2. REQUEST INTERCEPTOR: Automatically attach the token to EVERY secure call
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("userToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 3. RESPONSE INTERCEPTOR: Automatically handle token sync issues (Self-Healing)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginRequest = error.config && error.config.url.includes('/users/signin');

    if (error.response && error.response.status === 401 && !isLoginRequest && localStorage.getItem("userToken")) {
      console.warn("Session expired. Logging out...");
      localStorage.removeItem("userToken");
      window.location.reload(); 
    }
    
    return Promise.reject(error); 
  }
);

// Sign Up 
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/users/signup', userData);
    return response.data; 
  } catch (error) {
    console.error("API Error during signup:", error);
    throw error;
  }
};

// Sign In 
export const loginUser = async (credentials) => {
  try {
    console.log("Sending pure JSON login request to backend for:", credentials.email);
    const response = await api.post('/users/signin', {
      email: credentials.email,
      password: credentials.password
    });
    
    return response.data; 
  } catch (error) {
    console.error("API Error during login:", error);
    throw error;
  }
};

// Fetch Chat History
export const getChatHistory = async (sessionId) => {
  try {

    const guestId = localStorage.getItem("guest_id");

    const response = await api.get(
      `/chat/history/${sessionId}`,
      {
        params: {
          guest_id: guestId
        }
      }
    );

    return response.data.history;

  } catch (error) {
    console.error("API Error fetching chat history:", error);
    throw error;
  }
};

// Send Chat Message
export const sendChatMessage = async (messageText, sessionId) => {
  try {
    const requestBody = {
      message: messageText,
      session_id: sessionId,
      guest_id: localStorage.getItem("guest_id")
    };

    const response = await api.post('/chat/message', requestBody);
    return response.data;
  } catch (error) {
    console.error("API Error sending message:", error);
    throw error;
  }
};


export const getChatSessions = async () => {

    const guestId = localStorage.getItem("guest_id");

    const response = await api.get(
        `/chat/sessions?guest_id=${guestId}`
    );

    return response.data;
};

// Delete Chat Session
export const deleteChatSession = async (sessionId) => {
  try {
    const guestId = localStorage.getItem("guest_id");

    const response = await api.delete(
      `/chat/session/${sessionId}`,
      {
        params: {
          guest_id: guestId
        }
      }
    );

    return response.data;

  } catch (error) {
    console.error("API Error deleting chat:", error);
    throw error;
  }
};