import React from 'react'
import ReactDOM from 'react-dom/client'
import DashboardApp from './DashboardApp.jsx'

const rootElement = document.getElementById('portal-root');
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(<DashboardApp />);
}