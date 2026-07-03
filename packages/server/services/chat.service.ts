import { conversationRepository } from '../repositories/conversation.repository';
import { llmClient } from '../llm/client';

type ChatResponse = {
  id: string;
  message: string;
};

// Public interface
export const chatService = {
  async sendMessage(
    prompt: string,
    conversationId: string
  ): Promise<ChatResponse> {
    const response = await llmClient.generateText({
      model: 'gpt-4o-mini',
      prompt: prompt,
      temperature: 0.2,
      maxTokens: 200,
      previousResponseId:
        conversationRepository.getLastResponseId(conversationId),
    });

    conversationRepository.setLastResponseId(conversationId, response.id);

    return {
      id: response.id,
      message: response.text,
    };
  },
};
