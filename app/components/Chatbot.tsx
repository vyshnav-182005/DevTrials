'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatbotProps {
  workerId?: string;
  language?: string;
}

export default function Chatbot({ workerId, language = 'en' }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // Get workerId from localStorage if not provided
  const actualWorkerId = workerId || (typeof window !== 'undefined' ? localStorage.getItem('workerId') : null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const openHandler = () => setIsOpen(true);
    const closeHandler = () => setIsOpen(false);
    window.addEventListener('openChat', openHandler as EventListener);
    window.addEventListener('closeChat', closeHandler as EventListener);
    return () => {
      window.removeEventListener('openChat', openHandler as EventListener);
      window.removeEventListener('closeChat', closeHandler as EventListener);
    };
  }, []);

  const sendMessage = async () => {
    if (!inputMessage.trim() || !actualWorkerId) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          worker_id: actualWorkerId,
          session_id: sessionId,
          language,
        }),
      });

      const data = await response.json();
      const reply =
        typeof data.response === 'string' && data.response.trim()
          ? data.response
          : data.error || 'Sorry, I could not answer that right now. Please try again.';

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: reply,
        isBot: true,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I\'m having trouble connecting. Please try again.',
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!actualWorkerId) return null; // Don't show chatbot if not logged in

  // Chat panel is controlled from the header via a window event 'openChat'.
  // When closed we render nothing (header contains the trigger button).
  if (!isOpen) return null;

  return (
    <div className="fixed top-16 right-0 z-50 h-[calc(100vh-4rem)] w-[min(100vw,22rem)] sm:w-[22rem] lg:w-[26rem]">
      <div className="h-full flex flex-col bg-zinc-950/95 text-white shadow-2xl shadow-black/40 border-l border-zinc-800/80 backdrop-blur-xl rounded-l-3xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-purple-600 to-pink-500 text-white p-4 flex justify-between items-center">
          <h3 className="font-semibold">SwiftShield Support</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/90 hover:text-white"
            aria-label="Close chat"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 text-white">
          {messages.length === 0 && (
            <div className="text-center text-zinc-300 mt-8">
              <p className="text-sm leading-6">Hi! I&apos;m here to help with your SwiftShield policy questions.</p>
              <p className="text-xs mt-2 text-zinc-400">Ask me about coverage, payouts, or claims.</p>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                  message.isBot
                    ? 'bg-white/10 text-white border border-white/10'
                    : 'bg-blue-600 text-white'
                }`}
              >
                <div className="whitespace-pre-wrap">{message.text}</div>
                <div className={`text-xs mt-1 ${message.isBot ? 'text-zinc-400' : 'text-blue-100'}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white/10 px-3 py-2 rounded-lg border border-white/10">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-zinc-300 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-zinc-300 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-zinc-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/10 bg-zinc-950/95">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your question..."
              className="flex-1 px-3 py-2 border border-white/15 rounded-lg bg-white/5 focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm text-white placeholder:text-zinc-500"
              disabled={isTyping}
            />
            <button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="bg-white/15 hover:bg-white/20 disabled:bg-white/10 text-white px-4 py-2 rounded-lg transition-colors border border-white/10"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
