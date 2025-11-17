import OpenAI from 'openai';
import {Message, UserProfile, Personality} from '../types';

// Note: In production, you should use environment variables
// and consider using a backend proxy to protect your API key
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || 'your-api-key-here';

class OpenAIService {
  private client: OpenAI;
  private conversationHistory: Array<{role: 'system' | 'user' | 'assistant'; content: string}> = [];
  private userProfile: UserProfile = {
    preferences: [],
    hobbies: [],
    likes: [],
    dislikes: [],
    conversationTopics: [],
  };

  constructor() {
    this.client = new OpenAI({
      apiKey: OPENAI_API_KEY,
    });
  }

  initializeWithPersonality(personality: Personality) {
    this.conversationHistory = [
      {
        role: 'system',
        content: personality.systemPrompt,
      },
    ];
  }

  loadConversationHistory(messages: Message[]) {
    // Convert stored messages to OpenAI format
    this.conversationHistory = [
      this.conversationHistory[0], // Keep system prompt
      ...messages.map(msg => ({
        role: (msg.sender === 'user' ? 'user' : 'assistant') as 'user' | 'assistant',
        content: msg.text,
      })),
    ];
  }

  updateUserProfile(profile: UserProfile) {
    this.userProfile = profile;
  }

  private extractUserInfo(userMessage: string, aiResponse: string) {
    // Simple keyword extraction for user profiling
    const lowerMessage = userMessage.toLowerCase();

    // Extract hobbies
    const hobbyKeywords = ['好き', '趣味', '楽しい', 'やってる', 'している'];
    if (hobbyKeywords.some(keyword => lowerMessage.includes(keyword))) {
      // This is a simple implementation - in production, you might want to use NLP
      const words = userMessage.split(/[、。！？\s]+/);
      this.userProfile.conversationTopics.push(...words.filter(w => w.length > 1));
    }

    // Extract preferences
    if (lowerMessage.includes('好き') || lowerMessage.includes('良い') || lowerMessage.includes('いい')) {
      this.userProfile.likes.push(userMessage);
    }

    if (lowerMessage.includes('嫌い') || lowerMessage.includes('苦手')) {
      this.userProfile.dislikes.push(userMessage);
    }

    return this.userProfile;
  }

  async chat(userMessage: string): Promise<{response: string; updatedProfile: UserProfile}> {
    // Add user message to history
    this.conversationHistory.push({
      role: 'user',
      content: userMessage,
    });

    try {
      // Call OpenAI API with GPT-4
      const completion = await this.client.chat.completions.create({
        model: 'gpt-4', // You can change to gpt-4-turbo or gpt-4o-mini for cost efficiency
        messages: this.conversationHistory,
        max_tokens: 150, // Limit response length for short messages
        temperature: 0.8, // More creative and personality-driven responses
      });

      const aiResponse = completion.choices[0]?.message?.content || 'ごめんね、もう一度言ってくれる？';

      // Add AI response to history
      this.conversationHistory.push({
        role: 'assistant',
        content: aiResponse,
      });

      // Extract and update user profile
      const updatedProfile = this.extractUserInfo(userMessage, aiResponse);

      // Keep conversation history manageable (last 20 messages + system prompt)
      if (this.conversationHistory.length > 21) {
        this.conversationHistory = [
          this.conversationHistory[0], // Keep system prompt
          ...this.conversationHistory.slice(-20), // Keep last 20 messages
        ];
      }

      return {
        response: aiResponse,
        updatedProfile,
      };
    } catch (error) {
      console.error('OpenAI API error:', error);
      throw new Error('会話中にエラーが発生しました');
    }
  }

  getConversationHistory() {
    return this.conversationHistory;
  }

  getUserProfile() {
    return this.userProfile;
  }
}

export default new OpenAIService();
