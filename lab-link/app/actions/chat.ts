'use server';

import { generateChatResponse, generateText} from '@/lib/gemini/client';
import {buildPromptContext} from '@/lib/rag/context-manager';
import { createResearchChatPrompt } from '@/lib/rag/prompt-templates';

//PROCESS MESSAGE AND GENERATE RESPONSE

export async function processMessage(message: string, chatHistory: any[]) {

    
    const context = await buildPromptContext(message, chatHistory);
    const prompt = createResearchChatPrompt(message, context);
    const response = await generateText(prompt);


    console.log(response)

    return response
}

//SAVE CURRENT CHAT SESSION TO DATABASE

export async function saveChat(message: string) {

}

