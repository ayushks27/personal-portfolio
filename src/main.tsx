import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ClerkProvider } from '@clerk/react'
import { dark } from '@clerk/themes'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key in environment variables.")
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY} 
      appearance={{ 
        baseTheme: dark,
        elements: {
          modalBackdrop: "flex items-center justify-center min-h-screen py-8",
          modalContent: "m-auto !static !translate-y-0"
        }
      }}
    >
      <App />
    </ClerkProvider>
  </StrictMode>,
)
