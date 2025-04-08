'use client';

import * as React from 'react';
import { Message } from './message';

interface MessageListProps {
  messages: {
    role: 'user' | 'assistant';
    content: string;
  }[];
  isLoading?: boolean;
}


export function MessageList({ messages, isLoading = false }: MessageListProps) {
  
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll when messages change
  React.useEffect(() => {
      scrollToBottom();
  }, [messages]);
    
  
  return (
    <div className="flex flex-col gap-4 self-start">
      {messages.map((message, index) => (
        <Message
          key={index}
          role={message.role}
          content={message.content}
        />
      ))}
      {isLoading && (
        <Message
          role="assistant"
          content=""
          isLoading={true}
        />
      )}

    <div ref={messagesEndRef} />

    </div>
  );
} 