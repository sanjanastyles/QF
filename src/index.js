import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './FrontEnd/App';

import { AuthProvider } from './FrontEnd/context/AuthProvider.js';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SocketContextProvider } from './FrontEnd/QF/context/socket.js';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <SocketContextProvider>

        <Router>
          <ToastContainer />
          <App />
        </Router>
      </SocketContextProvider>
    </AuthProvider>
  </React.StrictMode >

);


