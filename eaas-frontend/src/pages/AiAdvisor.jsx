import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth.js';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar.jsx';
import { Send, Bot, User as UserIcon, Sparkles, Search } from 'lucide-react';
import { aiAdvisorService } from '../services/aiAdvisorService.js';

const AiAdvisor = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      id: '1',
      role: 'model',
      text: "Hello! I'm Lumi. I can help you understand our plans, analyze your energy savings, or provide market research on the EaaS industry. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isTyping) return;

    const newUserMsg = {
      id: Date.now().toString(),
      role: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMsg]);
    const messageToSend = inputValue;
    setInputValue('');
    setIsTyping(true);

    try {
      const responseText = await aiAdvisorService.sendMessage(
        user?.userId,
        messageToSend,
        messages
      );

      const newAiMsg = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newAiMsg]);
    } catch (error) {
      const errorMsg = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: error.message || "I'm having trouble connecting right now. Please try again later.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickPrompt = async (action) => {
    const message = aiAdvisorService.getQuickActionMessage(action);
    
    const newUserMsg = {
      id: Date.now().toString(),
      role: 'user',
      text: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMsg]);
    setIsTyping(true);

    try {
      const responseText = await aiAdvisorService.sendMessage(
        user?.userId,
        message,
        messages
      );

      const newAiMsg = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newAiMsg]);
    } catch (error) {
      const errorMsg = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: error.message || "I'm having trouble connecting right now. Please try again later.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="h-[calc(100vh-12rem)] flex flex-col bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-brand-600 p-4 flex items-center justify-between text-white">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Sparkles className="w-5 h-5 text-brand-100" />
                </div>
                <div>
                  <h3 className="font-bold">Lumi AI Advisor</h3>
                  <p className="text-xs text-brand-100 flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                    Online • Powered by Gemini 2.0
                  </p>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center shrink-0
                      ${msg.role === 'user' ? 'bg-gray-800 ml-3' : 'bg-brand-500 mr-3'}
                    `}>
                      {msg.role === 'user' ? <UserIcon className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                    </div>
                    <div className={`
                      p-4 rounded-2xl shadow-sm whitespace-pre-wrap text-sm leading-relaxed
                      ${msg.role === 'user' 
                        ? 'bg-gray-800 text-white rounded-tr-none' 
                        : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'}
                    `}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-none ml-11 shadow-sm">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Prompts */}
            {messages.length === 1 && (
              <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 overflow-x-auto flex space-x-3">
                <button 
                  onClick={() => handleQuickPrompt('research')}
                  className="flex items-center space-x-2 px-3 py-1.5 bg-white border border-brand-200 text-brand-700 rounded-full text-xs hover:bg-brand-50 whitespace-nowrap transition-colors"
                >
                  <Search className="w-3 h-3" />
                  <span>Research Competitors</span>
                </button>
                <button 
                  onClick={() => handleQuickPrompt('savings')}
                  className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 rounded-full text-xs hover:bg-gray-100 whitespace-nowrap transition-colors"
                >
                  Calculate Savings
                </button>
                <button 
                  onClick={() => handleQuickPrompt('issue')}
                  className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 rounded-full text-xs hover:bg-gray-100 whitespace-nowrap transition-colors"
                >
                  Report Issue
                </button>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                  placeholder="Ask about plans, savings, or market trends..."
                  className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isTyping}
                  className="absolute right-2 p-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 disabled:opacity-50 disabled:hover:bg-brand-600 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AiAdvisor;

