import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import CartProvider from './context/cartContext.jsx'

const ContextExample=createContext()

function ContextExampleProvider(){
  const value='ContextExample'
  return <ContextExample.Provider value={value}></ContextExample.Provider>
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
        <App />
    </CartProvider>
  </React.StrictMode>,
)
