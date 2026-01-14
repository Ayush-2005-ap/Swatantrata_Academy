import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import './chatbot.css';

const ChatIcon = ({ isOpen, onToggle, hasUnreadMessage }) => {
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFirstLoad(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <button
      onClick={onToggle}
      className={`fixed bottom-6 right-6 hover:cursor-pointer z-40 transition-all duration-300 ${
        isFirstLoad ? 'chatbot-icon-pop' : !isOpen ? 'chat-icon-jump' : ''
      } ${isOpen ? 'scale-110' : 'hover:scale-110'}`}
      aria-label="Open chat"
    >
      <div className={`relative ${!isOpen ? 'chat-icon-glow' : ''}`}>
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 ${
            isOpen
              ? 'bg-blue-600 text-white'
              : 'bg-gradient-to-br from-blue-600 to-blue-700 text-white hover:shadow-2xl'
          }`}
        >
          <MessageCircle size={28} />
        </div>

        {hasUnreadMessage && !isOpen && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
        )}

        <div
          className={`absolute inset-0 rounded-full border-2 border-blue-500 transition-opacity duration-500 ${
            !isOpen && !isFirstLoad ? 'chat-icon-pulse opacity-0' : 'opacity-0'
          }`}
        ></div>
      </div>
    </button>
  );
};

export default ChatIcon;
