import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import App from './App';

test('renders learn react link', () => {
  const renderApp = () => {
    render(
      <Router>
        <App />
      </Router>
    );
  };
  
  test('renders Lab Link header', () => {
    renderApp();
    const headerElement = screen.getByText(/Lab Link/i);
    expect(headerElement).toBeInTheDocument();
  });
  
  test('renders chatbot interface', () => {
    renderApp();
    const chatPrompt = screen.getByPlaceholderText(/Describe your research interests.../i);
    expect(chatPrompt).toBeInTheDocument();
  });
  
});
