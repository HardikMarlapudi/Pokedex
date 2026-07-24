import React from 'react';
import { createRoot } from 'react-dom/client'
import Pokedex from './components/Pokedex.jsx';
import './styles/Pokedex.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Pokedex />
  </React.StrictMode>,
)
