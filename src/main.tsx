import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { checkAndInitializeClarity } from './utils/clarity'

// Check if user has already consented and initialize Clarity if needed
checkAndInitializeClarity()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
