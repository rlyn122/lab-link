'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface MessageProps {
  role: 'user' | 'assistant';
  content: string;
  isLoading?: boolean;
}

export function Message({ role, content, isLoading = false }: MessageProps) {
  return (
    <div className={cn(
      'flex w-full gap-4 p-4',
      role === 'user' ? 'bg-white' : 'bg-gray-100'
    )}>
      <div className="flex-shrink-0">
        {role === 'user' ? (
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
            <span className="text-white text-sm">U</span>
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
            <span className="text-white text-sm">L</span>
          </div>
        )}
      </div>
      <div className="flex-1">
        {isLoading ? (
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
          </div>
        ) : (
          <p className="text-gray-800 whitespace-pre-wrap">{content}</p>
        )}
      </div>
    </div>
  );
} 