import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * AI Advisor Service
 * Handles communication with AI backend for chat functionality
 */
export const aiAdvisorService = {
  /**
   * Send a message to the AI advisor
   * @param {string} userId - User ID
   * @param {string} message - User message
   * @param {Array} history - Chat history
   * @returns {Promise<string>} AI response
   */
  async sendMessage(userId, message, history = []) {
    try {
      // Check if backend endpoint exists, otherwise use placeholder
      const response = await axios.post(
        `${API_BASE_URL}/api/ai-advisor/chat`,
        {
          userId,
          message,
          history: history.map(h => ({
            role: h.role,
            text: h.text
          }))
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 30000, // 30 second timeout
        }
      );

      return response.data.response || response.data.message || 'I received your message.';
    } catch (error) {
      // If endpoint doesn't exist or fails, return a helpful placeholder response
      if (error.response?.status === 404 || error.code === 'ECONNREFUSED') {
        console.warn('AI Advisor endpoint not available, using placeholder response');
        return getPlaceholderResponse(message);
      }
      
      console.error('AI Advisor service error:', error);
      throw new Error('Failed to get AI response. Please try again later.');
    }
  },

  /**
   * Get quick action responses for common queries
   * @param {string} action - Action type (research, savings, issue)
   * @returns {string} Pre-filled message
   */
  getQuickActionMessage(action) {
    const actions = {
      research: "What are similar EaaS apps like Sunrun?",
      savings: "How much CO2 will I save with the Hybrid Freedom plan?",
      issue: "Report a fault with my inverter."
    };
    return actions[action] || actions.research;
  }
};

/**
 * Placeholder response generator when backend is not available
 */
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
  
  if (lowerMessage.includes('savings') || lowerMessage.includes('co2') || lowerMessage.includes('carbon')) {
    return `With the Hybrid Freedom plan (5kW Solar + 5kWh Battery), you can expect:

- **Monthly Savings**: Approximately $50-80 on electricity bills
- **CO₂ Offset**: Around 200-300 kg per month (depending on your location and usage)
- **Payback Period**: Typically 5-7 years
- **Lifetime Savings**: Over $10,000 in 20 years

These estimates are based on average usage patterns. Your actual savings may vary based on your energy consumption and local utility rates.`;
  }
  
  if (lowerMessage.includes('fault') || lowerMessage.includes('issue') || lowerMessage.includes('problem')) {
    return `I've logged your issue report. Our technical team will review it and contact you within 24 hours.

For urgent issues, please call our support hotline at 1-800-ENERGY-HELP or visit the Support section to create a priority ticket.

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

export default aiAdvisorService;

