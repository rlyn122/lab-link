import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
dotenv.config({ path: envPath });

// Check for API key in environment
if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
  throw new Error("Missing NEXT_PUBLIC_GEMINI_API_KEY environment variable");
}

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

// Model configuration
const MODEL_NAME = "gemini-2.0-flash";

// Default safety settings for content generation
const defaultSafetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

// Default generation config
const defaultGenerationConfig = {
  temperature: 0.7,
  topK: 40,
  topP: 0.95,
  maxOutputTokens: 2048,
};

/**
 * Get a configured Gemini model instance
 * @param customConfig Optional custom generation configuration
 * @returns The model instance
 */
export function getGeminiModel(customConfig = {}) {
  const model = genAI.getGenerativeModel({
    model: MODEL_NAME,
    generationConfig: {
      ...defaultGenerationConfig,
      ...customConfig,
    },
    safetySettings: defaultSafetySettings,
  });

  return model;
}

/**
 * Generate text from a prompt using Gemini
 * @param prompt The text prompt to send to Gemini
 * @param customConfig Optional custom generation configuration
 * @returns The generated text response
 */
export async function generateText(prompt: string, customConfig = {}) {
  try {
    const model = getGeminiModel(customConfig);
    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating text with Gemini:", error);
    throw error;
  }
}

/**
 * Generate a chat response using Gemini
 * @param history Array of message objects with role and text
 * @param customConfig Optional custom generation configuration
 * @returns The generated chat response
 */
export async function generateChatResponse(
  history: { role: "user" | "model"; text: string }[] | undefined,
  customConfig = {}
) {
  try {
    if (!history) {
      history = [];
    }
    const model = getGeminiModel(customConfig);
    const chat = model.startChat({
      history: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }],
      })),
      generationConfig: {
        ...defaultGenerationConfig,
        ...customConfig,
      },
    });

    const result = await chat.sendMessage("");
    return result.response.text();
  } catch (error) {
    console.error("Error generating chat response with Gemini:", error);
    throw error;
  }
}

/**
 * Generate a structured RAG response with provided context
 * @param query User query
 * @param context Retrieved context information
 * @param customConfig Optional custom generation configuration
 * @returns The generated response incorporating the context
 */
export async function generateRagResponse(
  query: string,
  context: string,
  customConfig = {}
) {
  try {
    const prompt = `
You are a helpful assistant for Lab Link, a platform for connecting researchers and students.
Use ONLY the following information to answer the question.
If you don't know the answer based on this information, say "I don't have enough information to answer this question."

CONTEXT:
${context}

USER QUESTION:
${query}

ANSWER:
`;

    return await generateText(prompt, {
      ...customConfig,
      temperature: 0.3, // Lower temperature for more factual responses
    });
  } catch (error) {
    console.error("Error generating RAG response with Gemini:", error);
    throw error;
  }
}
