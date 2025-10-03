import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { CartProvider, SearchProvider } from './components/cart/context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    < Router>
      <CartProvider>
        <SearchProvider>
          <App />
        </SearchProvider>
      </CartProvider>
    </Router>
  </StrictMode>,
)
