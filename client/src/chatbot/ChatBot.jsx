import { useState } from 'react';
import ChatIcon from './ChatIcon';
import ChatWindow from './ChatWindow';
import './chatbot.css';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnreadMessage, setHasUnreadMessage] = useState(true);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHasUnreadMessage(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <ChatIcon isOpen={isOpen} onToggle={handleToggle} hasUnreadMessage={hasUnreadMessage} />
      <ChatWindow isOpen={isOpen} onClose={handleClose} />
    </>
  );
};

export default ChatBot;
