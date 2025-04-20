import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { Toaster } from "react-hot-toast";
import { Provider } from 'react-redux';
import rootReducer from './redux/index.js'
import { configureStore } from '@reduxjs/toolkit'
// rootReducer



const store = configureStore({
  reducer: rootReducer
})
createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <Provider store={store}>

      <BrowserRouter>

        <App />
        <Toaster></Toaster>
      </BrowserRouter>
    </Provider>
  // </StrictMode>,
)
