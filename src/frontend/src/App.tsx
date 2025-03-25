import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChatbotInterface from './components/ChatbotInterface';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-600 text-white p-4">
          <h1 className="text-2xl font-bold">Lab Link</h1>
        </header>
        
        <main className="container mx-auto mt-8 px-4">
          <Routes>
            <Route 
              path="/" 
              element={<ChatbotInterface />} 
            />
            {/* You can add more routes here later */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
