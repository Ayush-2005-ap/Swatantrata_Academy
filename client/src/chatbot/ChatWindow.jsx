import { useEffect, useRef, useState } from 'react';
import { X, Send } from 'lucide-react';
import './chatbot.css';

const ChatWindow = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hello! Welcome to Swatantra Academy. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [isOpen]);

  // 🔹 CONNECTED TO BACKEND
  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return;
  
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
  
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
  
    const MIN_TYPING_TIME = 1000; // 👈 professional delay
    const startTime = Date.now();
  
    try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: userMessage.text }),
        });
      
        const data = await res.json();
      
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, MIN_TYPING_TIME - elapsed);
      
        setTimeout(() => {
          const botMessage = {
            id: messages.length + 2,
            text: data.reply || 'Sorry, I could not understand that.',
            sender: 'bot',
            timestamp: new Date(),
          };
      
          setMessages((prev) => [...prev, botMessage]);
          setIsTyping(false);
        }, remaining);
      } catch (error) {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: messages.length + 2,
              text: '⚠️ Server error. Please try again later.',
              sender: 'bot',
              timestamp: new Date(),
            },
          ]);
          setIsTyping(false);
        }, MIN_TYPING_TIME);
      }
      
  };
  

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-24px)] chat-window-enter">
      <div className="bg-white rounded-3xl shadow-2xl flex flex-col h-[600px] overflow-hidden border border-gray-100">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold">Swatantra Assistant</h3>
            <p className="text-blue-100 text-sm">Always here to help</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-blue-500 rounded-lg">
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-3 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-white text-gray-800 border rounded-bl-none'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <span className="text-xs text-gray-400 block mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border px-4 py-3 rounded-2xl shadow-sm">
                <div className="chat-typing-dots">
                  <div className="chat-typing-dot"></div>
                  <div className="chat-typing-dot"></div>
                  <div className="chat-typing-dot"></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t p-4 bg-white">
          <div className="flex items-center space-x-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 border-2 rounded-full focus:border-blue-600"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="p-3 bg-blue-600 text-white rounded-full disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </div>

         
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
