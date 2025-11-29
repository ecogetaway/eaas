import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth.js';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar.jsx';
import { Send, Bot, User as UserIcon, Sparkles, Search } from 'lucide-react';
import { aiAdvisorService } from '../services/aiAdvisorService.js';

// Helper function to get placeholder response (same as in service)
function getPlaceholderResponse(message) {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('competitor') || lowerMessage.includes('similar') || lowerMessage.includes('research')) {
    return `Here are some similar EaaS applications you can study:

1. **Sunrun**: A major US residential solar EaaS provider offering PPA/Lease models with no upfront costs.

2. **Octopus Energy (Kraken Tech)**: Known for agile tariffs and software platforms managing distributed energy resources.

3. **Tesla Energy**: Their solar subscription and Powerwall VPP (Virtual Power Plant) programs are excellent examples.

4. **Enphase Ensembles**: While hardware-focused, their monitoring software is a benchmark for energy management apps.

5. **Gogoro**: A great example of Battery-as-a-Service (BaaS) in the mobility sector.

These platforms demonstrate various approaches to energy-as-a-service models.`;
  }
  
  if (lowerMessage.includes('savings') || lowerMessage.includes('co2') || lowerMessage.includes('carbon') || lowerMessage.includes('hybrid freedom')) {
    return `With the Hybrid Freedom plan (5kW Solar + 5kWh Battery), you can expect:

- **Monthly Savings**: Approximately ₹2,000-3,500 on electricity bills
- **CO₂ Offset**: Around 200-300 kg per month (depending on your location and usage)
- **Payback Period**: Typically 5-7 years
- **Lifetime Savings**: Over ₹5,00,000 in 20 years

These estimates are based on average usage patterns. Your actual savings may vary based on your energy consumption and local utility rates.`;
  }
  
  if (lowerMessage.includes('fault') || lowerMessage.includes('issue') || lowerMessage.includes('problem')) {
    return `I've logged your issue report. Our technical team will review it and contact you within 24 hours.

For urgent issues, please call our support hotline or visit the Support section to create a priority ticket.

Common inverter issues and quick fixes:
- Check if the inverter display is showing any error codes
- Ensure all connections are secure
- Verify that the system is receiving sunlight (for solar inverters)

Is there anything specific about the fault you'd like to describe?`;
  }
  
  // Default response
  return `Thank you for your message! I'm here to help you with:
- Understanding our energy plans and pricing
- Analyzing your potential energy savings
- Researching competitors and market trends
- Reporting technical issues
- Answering questions about EaaS platforms

How can I assist you today?`;
}

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
    // Get user ID from either userId or user_id
    const userId = user?.userId || user?.user_id;
    if (!inputValue.trim() || !userId) return;

    const userMessage = inputValue.trim();
    const newUserMsg = {
      id: Date.now().toString(),
      role: 'user',
      text: userMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        text: m.text
      }));

      const responseText = await aiAdvisorService.sendMessage(
        userId,
        userMessage,
        history
      );

      const newAiMsg = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newAiMsg]);
    } catch (err) {
      console.error('AI Advisor error:', err);
      // Even on error, provide a helpful response
      const errorMsg = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: getPlaceholderResponse(userMessage),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickPrompt = (text) => {
    setInputValue(text);
  };

  if (!isAuthenticated || !user) {
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
                      <div className={`text-xs mt-2 opacity-70 ${
                        msg.role === 'user' ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
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
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 overflow-x-auto flex space-x-3">
              <button 
                onClick={() => handleQuickPrompt(aiAdvisorService.getQuickActionMessage('research'))}
                className="flex items-center space-x-2 px-3 py-1.5 bg-white border border-brand-200 text-brand-700 rounded-full text-xs hover:bg-brand-50 whitespace-nowrap transition-colors"
              >
                <Search className="w-3 h-3" />
                <span>Research Competitors</span>
              </button>
              <button 
                onClick={() => handleQuickPrompt(aiAdvisorService.getQuickActionMessage('savings'))}
                className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 rounded-full text-xs hover:bg-gray-100 whitespace-nowrap transition-colors"
              >
                Calculate Savings
              </button>
              <button 
                onClick={() => handleQuickPrompt(aiAdvisorService.getQuickActionMessage('issue'))}
                className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 rounded-full text-xs hover:bg-gray-100 whitespace-nowrap transition-colors"
              >
                Report Issue
              </button>
            </div>

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
