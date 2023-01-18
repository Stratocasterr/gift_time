import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './styles/Start_Window_Style.css'
import './styles/AccountWindow_Style.css'
import './styles/MainSection_Style.css'
import './styles/Messages_system_Style.css'
import './styles/Composers_Style.css'
 import './styles/Present_Style.css'
import './styles/EditPresentsDatabase.css'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);