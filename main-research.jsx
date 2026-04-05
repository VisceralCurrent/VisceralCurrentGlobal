import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './ResearchApp.jsx'

const rootElement = document.getElementById('root-app');
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(<App />);
}