import React, { useState } from 'react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

const ChatbotInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0, 
      text: "Welcome to Lab Link! I can help you find research opportunities at Emory. What are your academic interests?", 
      sender: 'bot'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    // Add user message
    const userMessage: Message = {
      id: messages.length,
      text: inputMessage,
      sender: 'user'
    };

    // Simulate bot response (will be replaced with actual API call)
    const botMessage: Message = {
      id: messages.length + 1,
      text: 'Processing your request...',
      sender: 'bot'
    };

    setMessages([...messages, userMessage, botMessage]);
    setInputMessage('');
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <div className="h-96 overflow-y-auto mb-4 border-b pb-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`mb-2 p-2 rounded-lg max-w-[80%] ${
              message.sender === 'user' 
                ? 'bg-blue-100 ml-auto text-right' 
                : 'bg-gray-100 mr-auto text-left'
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>

      <div className="flex">
        <input 
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Describe your research interests..."
          className="flex-grow p-2 border rounded-l-lg"
        />
        <button 
          onClick={handleSendMessage}
          className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>

      <div className="mt-4">
        <h3 className="text-sm text-gray-600">Suggested Prompts:</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {[
            'I want to do research in machine learning',
            'Looking for computational biology labs',
            'Interested in NLP research'
          ].map((prompt, index) => (
            <button 
              key={index}
              onClick={() => setInputMessage(prompt)}
              className="bg-gray-100 text-sm px-3 py-1 rounded-full hover:bg-gray-200"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatbotInterface;