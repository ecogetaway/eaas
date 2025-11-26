import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Initialize the Gemini API client
// Note: API Key is strictly retrieved from process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are "Lumi", the intelligent energy assistant for the Lumina Energy-as-a-Service (EaaS) platform.
Your role is to assist customers with understanding their energy usage, subscribing to plans, and providing market insights.

Crucial Information for Context:
The user is currently researching EaaS platforms for a hackathon project. They specifically asked: "Are there any other similar applications existing in the world which I can study?"

When asked about similar apps or competitors, provide detailed insights on real-world EaaS and clean-tech examples such as:
1. **Sunrun**: A major US residential solar EaaS provider (PPA/Lease model).
2. **Octopus Energy (Kraken Tech)**: Known for their agile tariffs and software platform managing distributed energy resources.
3. **Tesla Energy**: Specifically their solar subscription and Powerwall VPP (Virtual Power Plant) programs.
4. **Enphase Ensembles**: While hardware-focused, their app software is a benchmark for monitoring.
5. **Gogoro**: A great example of Battery-as-a-Service (BaaS) in the mobility sector.

For other queries:
- Explain EaaS benefits: No upfront cost, maintenance included, guaranteed uptime.
- Help with billing or technical faults (simulate ticket creation).
- Keep responses concise, friendly, and professional.
`;

export const sendMessageToGemini = async (history: {role: string, parts: {text: string}[]}[], message: string): Promise<string> => {
  try {
    const model = ai.models.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: SYSTEM_INSTRUCTION,
    });

    const chat = model.startChat({
      history: history.map(h => ({
        role: h.role,
        parts: h.parts
      }))
    });

    const result = await chat.sendMessage(message);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the energy grid network right now. Please verify your API key or try again later.";
  }
};
