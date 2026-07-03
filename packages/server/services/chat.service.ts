import { conversationRepository } from '../repositories/conversation.repository';
import OpenAI from 'openai';
import fs from 'fs';

import path from 'path';

import template from '../llm/prompts/chatbot.txt';

const openAIClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const parkInfo = fs.readFileSync(
  path.join(__dirname, '..', 'llm', 'prompts', 'WonderWorld.md'),
  'utf-8'
);
const instructions = template.replace('{{parkInfo}}', parkInfo);

type ChatResponse = {
  // id: string;
  message: string;
};

// Public interface
export const chatService = {
  async sendMessage(
    prompt: string
    // conversationId: string
  ): Promise<ChatResponse> {
    const response = await openAIClient.responses.create({
      model: 'gpt-4o-mini',
      input: prompt,
      instructions,
      temperature: 0.2,
      max_output_tokens: 200,
      // previous_response_id:
      // conversationRepository.getLastResponseId(conversationId),
    });

    // conversationRepository.setLastResponseId(conversationId, response.id);

    return {
      id: response.id,
      text: response.output_text,
    };
  },
};
