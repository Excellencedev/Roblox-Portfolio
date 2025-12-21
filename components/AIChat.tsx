import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Loader2 } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi! I'm Excellence's AI Assistant. Ask me about my skills, pricing, or availability! 🤖" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg = inputValue.trim();
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      // Prepare history for context (simplified for this demo)
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const reply = await sendMessageToGemini(history, userMsg);
      setMessages(prev => [...prev, { role: 'model', text: reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Error communicating with the server.", isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* Chat Window */}
      {isOpen && (
        <div className="pointer-events-auto bg-roblox-card border border-roblox-accent/20 shadow-2xl rounded-2xl w-80 sm:w-96 mb-4 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-roblox-dark to-slate-900 p-4 border-b border-white/5 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-roblox-accent/20 p-1.5 rounded-lg">
                <Bot size={20} className="text-roblox-accent" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white font-display">Virtual Manager</h3>
                <p className="text-xs text-roblox-muted">Powered by Gemini 3</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-4 bg-roblox-card/95 backdrop-blur-sm">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-roblox-accent text-roblox-dark font-medium rounded-br-none' 
                      : 'bg-white/5 text-gray-200 border border-white/5 rounded-bl-none'
                  } ${msg.isError ? 'bg-red-500/10 border-red-500/50 text-red-200' : ''}`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/5 rounded-2xl px-4 py-3 rounded-bl-none flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 bg-roblox-accent/50 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-roblox-accent/50 rounded-full animate-bounce delay-100"></span>
                  <span className="w-1.5 h-1.5 bg-roblox-accent/50 rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-roblox-dark border-t border-white/5 flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about pricing..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-roblox-accent/50 transition-colors placeholder:text-gray-600"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !inputValue.trim()}
              className="bg-roblox-accent text-roblox-dark p-2.5 rounded-xl hover:bg-white transition-all disabled:opacity-50 disabled:hover:bg-roblox-accent"
            >
              {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto bg-roblox-accent hover:bg-white text-roblox-dark p-4 rounded-full shadow-[0_0_20px_rgba(137,180,250,0.3)] transition-all hover:scale-105 active:scale-95 group"
      >
        {isOpen ? (
          <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
        ) : (
          <MessageSquare size={24} />
        )}
      </button>
    </div>
  );
};

export default AIChat;