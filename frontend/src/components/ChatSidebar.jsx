import React from "react";

function ChatSidebar({
  sessions,
  activeSessionId,
  onSelectSession,
  currentUsername,
  isLoggedIn,
  onLogout,
  onDeleteChat,
}) {
  return (
    <div
      style={{
        width: "300px",
        minWidth: "300px",
        height: "100vh",
        backgroundColor: "#1e1f22",
        color: "#f2f3f5",
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid #2f3136",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "20px",
          borderBottom: "1px solid #2f3136",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          💬 Chat App
        </span>

        <button
          onClick={() => onSelectSession(null)}
          style={{
            background: "#35373c",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            padding: "6px 10px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          + New
        </button>
      </div>

      {/* Chat List */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "15px",
        }}
      >
        <div
          style={{
            color: "#949ba4",
            fontSize: "12px",
            fontWeight: "bold",
            textTransform: "uppercase",
            marginBottom: "15px",
          }}
        >
          Recent Threads
        </div>

        {sessions.length === 0 ? (
          <div
            style={{
              color: "#949ba4",
              textAlign: "center",
              marginTop: "30px",
            }}
          >
            No chats yet
          </div>
        ) : (
          sessions.map((session) => (
            <div
              key={session.session_id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "10px",
              }}
            >
              <div
                onClick={() => onSelectSession(session.session_id)}
                style={{
                  flex: 1,
                  cursor: "pointer",
                  padding: "12px",
                  borderRadius: "8px",
                  background:
                    activeSessionId === session.session_id
                      ? "#35373c"
                      : "#2b2d31",
                  borderLeft:
                    activeSessionId === session.session_id
                      ? "4px solid #23a55a"
                      : "4px solid transparent",
                }}
              >
                <div
                  style={{
                    color: "#fff",
                    fontWeight: "600",
                    marginBottom: "5px",
                  }}
                >
                  💬 Chat
                </div>

                <div
                  style={{
                    color: "#b5bac1",
                    fontSize: "12px",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  {session.title || "New Chat"}
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();

                  if (window.confirm("Delete this chat?")) {
                    onDeleteChat(session.session_id);
                  }
                }}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "18px",
                }}
                title="Delete Chat"
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "15px",
          borderTop: "1px solid #2f3136",
          background: "#111214",
          flexShrink: 0,
        }}
      >
        {isLoggedIn ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                flex: 1,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "#23a55a",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#fff",
                  fontWeight: "bold",
                  flexShrink: 0,
                }}
              >
                {currentUsername.charAt(0).toUpperCase()}
              </div>

              <span
                style={{
                  color: "#fff",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {currentUsername}
              </span>
            </div>

            <button
              onClick={onLogout}
              style={{
                background: "transparent",
                border: "none",
                color: "#ff5d5d",
                cursor: "pointer",
                fontWeight: "600",
                flexShrink: 0,
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              color: "#949ba4",
            }}
          >
            <div
              style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
           }}
           >
              <div
               style={{
                textAlign: "center",
                color: "#949ba4",
                fontSize: "14px",
                }}
              >
                👤 Guest Mode
              </div>

              <button
              onClick={() => window.location.href = "/login"}
              style={{
                background: "#23a55a",
                color: "white",
                border: "none",
                padding: "10px",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "600",
               }}
              >
                Login
             </button>

              <button
                onClick={() => window.location.href = "/signup"}
                  style={{
                    background: "#23a55a",
                    color: "white",
                    border: "none",
                    padding: "10px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "600",
                 }}
                >
                Sign Up
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatSidebar;