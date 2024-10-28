import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import App from '~/App.jsx'
import theme from '~/theme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ConfirmProvider } from "material-ui-confirm";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <ConfirmProvider
        defaultOptions={{
          confirmationButtonProps: { color: 'error', variant: 'outlined' },
          cancelButtonProps: { color: 'inherit' },
          allowClose: false
        }}
      >
        <CssBaseline />
        <App />
        <ToastContainer position='bottom-left' theme="colored" />
      </ConfirmProvider>
    </ThemeProvider>

  </StrictMode>,
)
