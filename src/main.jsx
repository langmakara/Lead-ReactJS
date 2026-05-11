import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import * as ReactDOM from 'react-dom/client'
import theme from './theme'
import App from './App'
import { BrowserRouter } from 'react-router-dom';

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
)