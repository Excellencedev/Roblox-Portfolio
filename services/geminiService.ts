import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

// Initialize Gemini Client
// Note: In a real production build, ensure API_KEY is handled via backend proxy to hide it from client-side.
// For this portfolio demo, we assume the environment variable is injected safely or we use it directly as requested.
const ai = new GoogleGenAI({ apiKey: API_KEY });

const SYSTEM_INSTRUCTION = `
You are "Excellence's Virtual Assistant". Excellence is a professional Roblox Scripter and Game Developer.
Your goal is to answer potential clients' questions about Excellence's services, skills, and pricing to help him get hired.

Key Information about Excellence:
- **Role**: Senior Roblox Scripter / Luau Engineer.
- **Experience**: 5+ years on Roblox, specialized in secure backend systems, anti-cheat, complex UI frameworks (Roact/Fusion), and datastores (ProfileService).
- **Skills**: Luau, TypeScript (Roblox-TS), Knit Framework, Rojo, Git, System Architecture.
- **Pricing**:
  - Small Systems (e.g., Inventory, Shop): $100 - $300 USD (or Robux equivalent).
  - Full Game Loop: $1,000+ USD.
  - Hourly Rate: $30/hr (negotiable).
  - Accepts: USD (PayPal/Crypto) and Robux (via Group Funds).
- **Availability**: Currently OPEN for commissions.
- **Tone**: Professional, concise, tech-savvy, confident, and helpful. Use emojis occasionally.
- **Contact**: 
  - Discord: https://discord.com/users/1431461184510492672
  - X (Twitter): @AI_singularit8
  - Email: ademiluyiexcellence@gmail.com

If asked about something unrelated to Roblox development or Excellence's portfolio, politely steer the conversation back to hiring Excellence.
Keep responses short (under 100 words) to fit in a chat bubble.
`;

export const sendMessageToGemini = async (history: { role: string; parts: { text: string }[] }[], newMessage: string): Promise<string> => {
  if (!API_KEY) {
    return "I'm sorry, my brain (API Key) is missing. Please contact Excellence directly via Discord.";
  }

  try {
    const model = 'gemini-3-flash-preview';
    
    // Construct the chat history for the API
    // We start a fresh chat or use generateContent with history context. 
    // Using generateContent with systemInstruction is stateless but easier for single-turn or we can manage history manually.
    // For a simple assistant, we will use generateContent with the last few messages as context to simulate chat.
    
    const contextPrompt = history.map(h => `${h.role === 'user' ? 'Client' : 'You'}: ${h.parts[0].text}`).join('\n');
    const fullPrompt = `${contextPrompt}\nClient: ${newMessage}`;

    const response = await ai.models.generateContent({
      model: model,
      contents: fullPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    return response.text || "I'm currently compiling my thoughts... please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Connection to the mainframe failed. Please try again later or email Excellence directly.";
  }
};