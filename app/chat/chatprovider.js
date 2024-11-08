// components/ChatProvider.js
import React, { useState, createContext, useContext } from 'react';


const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

const ChatProvider = ({ children }) => {
  const [recipientEmail, setRecipientEmail] = useState('');

  return (
    <ChatContext.Provider value={{ recipientEmail, setRecipientEmail }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
