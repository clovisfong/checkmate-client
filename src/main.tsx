import { ThemeProvider } from '@emotion/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import UserDetailsProvider from './components/contextStore/UserDetailsProvider'
import './index.css'
import theme from './theme'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <UserDetailsProvider>
        <App />
      </UserDetailsProvider>
    </ThemeProvider>
  </React.StrictMode>
)
