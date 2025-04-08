'use client';

import * as React from 'react';
import { MessageList } from '@/components/chat/message-list';
import { ChatInput } from '@/components/chat/input';
import { useState } from 'react';
import { generateText } from '@/lib/gemini/client';

export default function Home() {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (message: string) => {
    setMessages([...messages, { role: 'user', content: message }]);
    setIsLoading(true);
    
    try {
      // TODO: Implement the actual chat response logic here
      const response = await generateText(message);
      
      setMessages(prev => [...prev, { role: 'assistant', content: response as string }]);
    } catch (error) {
      console.error('Error getting response:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, there was an error processing your message.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full pt-10 pl-20 pr-20 pb-2 bg-gray-200 border-2 border-solid">
      <h1 className="text-4xl font-bold p-4 text-center bg-white">Lab Link Chat</h1>
      <div className="flex-1 overflow-hidden bg-white">
        <div className="h-full flex flex-col p-3 ml-20 mr-20">
          <div className="flex-1 overflow-y-auto">
            <MessageList messages={messages } isLoading={isLoading} />
          </div>
          <div className="sticky bottom-0    ">
            <ChatInput onSend={handleSend} disabled={isLoading} />
          </div>
        </div>
      </div>
    </div>

  );
} 