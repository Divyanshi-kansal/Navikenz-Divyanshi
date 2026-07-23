import React, { useState, useEffect } from "react";
import {
  getChatHistory,
  sendChatMessage,
  getChatSessions,
  deleteChatSession,
} from "../services/services";

import ChatSidebar from "../components/ChatSidebar";
import MessageFeed from "../components/MessageFeed";
import ChatForm from "../components/ChatForm";

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [botTyping, setBotTyping] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("userToken")
  );

  const [currentUsername, setCurrentUsername] = useState(
    localStorage.getItem("username") || ""
  );

  // Create guest id
  useEffect(() => {
    let guestId = localStorage.getItem("guest_id");

    if (!guestId) {
      guestId = crypto.randomUUID();
      localStorage.setItem("guest_id", guestId);
    }
  }, []);

  // Load all chat sessions
  const loadSessions = async () => {
    try {
      const data = await getChatSessions();
      setSessions(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadSessions();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      setIsLocked(false);
      setErrorMessage("");
    }
  }, [isLoggedIn]);

  // Load chat history
  useEffect(() => {
    if (!activeSessionId) {
      setMessages([]);
      return;
    }

    const fetchHistory = async () => {
      setLoading(true);

      try {
        setErrorMessage("");

        const historyData = await getChatHistory(activeSessionId);

        setMessages(historyData || []);
      } catch (error) {
        setErrorMessage("Could not load chat history.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [activeSessionId]);

  // Send Message
  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!inputMessage.trim()) return;

    const temporaryText = inputMessage;

    const targetSessionId =
      activeSessionId || `session_${Date.now()}`;
    setInputMessage("");
    setErrorMessage("");
    // Show user message immediately
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "user",
        message: temporaryText,
      },
    ]);

    // Show typing animation
    setBotTyping(true);
    await new Promise((resolve) => setTimeout(resolve, 50));
    try {
      const result = await sendChatMessage(
        temporaryText,
        targetSessionId
      );

      if (result.status === "auth_required") {
        setBotTyping(false);

        setErrorMessage(result.message);
        setIsLocked(true);
        setInputMessage(temporaryText);

        return;
      }

      // Small delay so typing animation is visible
      await new Promise((resolve) => setTimeout(resolve, 700));

      setBotTyping(false);

      // Add bot reply
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          message:
            result.message ||
            result.reply ||
            "No response",
        },
      ]);

      if (!activeSessionId) {
        setActiveSessionId(targetSessionId);
      }

      await loadSessions();
    } catch (error) {
      setBotTyping(false);

      setInputMessage(temporaryText);

      setErrorMessage("Failed to send message.");
    }
  };

  // Logout
  const handleLogoutAction = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("username");
    localStorage.removeItem("guest_id");

    sessionStorage.clear();

    setIsLoggedIn(false);
    setCurrentUsername("");

    window.location.reload();
  };

  // Delete Chat
  const handleDeleteChat = async (sessionId) => {
    try {
      await deleteChatSession(sessionId);

      if (activeSessionId === sessionId) {
        setActiveSessionId(null);
        setMessages([]);
      }

      await loadSessions();
    } catch (error) {
      console.error(error);
      alert("Failed to delete chat.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#f8f9fa",
        overflow: "hidden",
        fontFamily: '"Segoe UI", Roboto, sans-serif',
      }}
    >
      <ChatSidebar
        sessions={sessions}
        activeSessionId={activeSessionId}
        onSelectSession={setActiveSessionId}
        currentUsername={currentUsername}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogoutAction}
        onDeleteChat={handleDeleteChat}
      />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#ffffff",
        }}
      >
        <div
          style={{
            height: "60px",
            borderBottom: "1px solid #e3e5e8",
            display: "flex",
            alignItems: "center",
            padding: "0 20px",
            fontWeight: "600",
            color: "#313338",
          }}
        >
          {activeSessionId
            ? "Chat Conversation"
            : "✨ How can I help you today?"}
        </div>

        {errorMessage && (
          <div
            style={{
              margin: "10px 24px 0 24px",
              padding: "12px",
              backgroundColor: "#fce8e6",
              color: "#c5221f",
              border: "1px solid #ea4335",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            {errorMessage}
          </div>
        )}

        <MessageFeed
          loading={loading}
          messages={messages}
          activeSessionId={activeSessionId}
          botTyping={botTyping}
        />

        <ChatForm
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          onSendMessage={handleSendMessage}
          errorMessage={errorMessage}
          isLocked={isLocked}
        />
      </div>
    </div>
  );
}

export default ChatPage;