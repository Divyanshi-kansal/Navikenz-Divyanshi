import React, { useEffect, useRef } from "react"; 
import ReactMarkdown from "react-markdown"; 
function MessageFeed({ loading, messages, activeSessionId, botTyping, }) 
{ 
  const bottomRef = useRef(null); 
  // Auto-scroll whenever messages or typing state changes 
  useEffect(() => { 
    bottomRef.current?.scrollIntoView({ 
      behavior: "smooth",
     });
     }, [messages, botTyping]); 
     return ( 
     <div 
     style={{ 
      flex: 1, 
      padding: "24px", 
      overflowY: "auto", 
      display: "flex", 
      flexDirection: "column", 
      gap: "16px", 
    }} > 
    {loading ? ( 
      <div 
      style={{ 
        color: "#666", 
        textAlign: "center",
        marginTop: "20px", 
      }} 
      > 
      Loading conversation history... 
      </div> 
      ) : messages.length === 0 ? ( 
      <div 
      style={{ 
        color: "#949ba4", 
        textAlign: "center", 
        marginTop: "100px", 
        fontSize: "15px", 
      }} 
      > 
      {activeSessionId 
      ? "This thread has no messages." 
      : "Send a prompt below to start a clean new chat session!"} 
      </div> 
      ) : ( 
      <> 
      {/* Chat Messages */} 
      {messages.map((msg, index) => ( 
        <div 
        key={msg.id || index} 
        style={{ 
          display: "flex", 
          justifyContent: 
          msg.sender === "bot" 
          ? "flex-start" 
          : "flex-end",
         }} 
         > 
         <div
          style={{ 
            maxWidth: "70%", 
            padding: "12px 16px",
            borderRadius: "12px", 
            fontSize: "15px", 
            lineHeight: "1.5", 
            backgroundColor: 
             msg.sender === "bot" 
             ? "#f2f3f5" 
             : "#23a55a", 
             color: 
             msg.sender === "bot" 
             ? "#313338" 
             : "#ffffff",
             textAlign: "left", 
             borderBottomLeftRadius: 
             msg.sender === "bot" 
             ? "2px" 
             : "12px", 
             borderBottomRightRadius: 
             msg.sender === "bot" 
             ? "12px" 
             : "2px", 
            }} 
            > 
            <ReactMarkdown 
            components={{
               h1: ({ children }) => ( 
                <h2 style={{ fontSize: "20px", 
                  marginBottom: "10px" 
                }}> 
                {children} 
              </h2> 
              ), 
              h2: ({ children }) => (
                 <h3 style={{ fontSize: "17px",
                   marginBottom: "8px" }}>
                     {children}
                    </h3> 
                    ), 
                  }}
                 > 
                 {msg.message} 
               </ReactMarkdown> 
              </div> 
            </div> 
            ))} 
            {/* Bot Typing Indicator */} 
            {botTyping && (
               <div
                style={{
                   display: "flex",
                   justifyContent: "flex-start", 
                  }}
                 > 
                 <div 
                   style={{ 
                    maxWidth: "70%", 
                    padding: "12px 16px", 
                    borderRadius: "12px", 
                    backgroundColor: "#f2f3f5", 
                    color: "#555", 
                    borderBottomLeftRadius: "2px", 
                    fontStyle: "italic", 
                  }} 
                  > 
                   🤖 Thinking... 
                  </div> 
                </div> 
                )}
                 {/* Auto Scroll Target */} 
                 <div ref={bottomRef}>
                  </div> </> 
                  )} 
                  </div> 
                  ); 
              } 
export default MessageFeed;