import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { LanguageProvider } from './components/Languagecontext'
import Animated_Loader from './components/Loader'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <Animated_Loader>
          <App />
        </Animated_Loader>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
)