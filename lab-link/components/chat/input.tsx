'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled = false }: ChatInputProps) {
  const [message, setMessage] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Textarea
        value={message}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
        placeholder="Start Chatting with Lab Link..."
        className="flex-1 min-h-[60px]"
        disabled={disabled}
      />
      <Button
        type="submit"
        disabled={!message.trim() || disabled}
        className="self-end"
      >
        Send
      </Button>
    </form>
  );
} 