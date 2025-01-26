import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { AuthProvider } from "./context/AuthContext";


import './styles/base.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/pages.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
