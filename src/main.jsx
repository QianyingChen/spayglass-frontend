import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import App from './App.jsx'
import store from './store.js'
// import {I18nextProvider} from 'react-i18next' 


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> 
  <Provider store={store}> 
  {/* <I18nextProvider i18n={myi18n} > */}
    <App />
  {/* </I18nextProvider> */}
  </Provider>
  </React.StrictMode>
)
