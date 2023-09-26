import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './componets/redux/store.js'
import { Provider } from 'react-redux'
import axios from 'axios'

axios.defaults.baseURL = "https://syncronizabackup-production.up.railway.app/user/api"
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
