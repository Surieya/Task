import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Table from './components/Table.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
  
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/employees' element={<Table/>} />
         </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)
