import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { ServerProvider } from './Context/ServerContext'
import './index.scss'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('app'))
root.render(
  <React.StrictMode>
    <HashRouter>
      <ServerProvider>
        <App />
      </ServerProvider>
    </HashRouter>
  </React.StrictMode>
)
