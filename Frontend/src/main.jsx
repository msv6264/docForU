import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DocProvider } from '../context/docContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DocProvider> 
      <App />
    </DocProvider>
  </StrictMode>,
)
