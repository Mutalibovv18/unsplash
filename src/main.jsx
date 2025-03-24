import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// global context provider
import { GlobalContextProvider } from './context/GlobalContext.jsx'
// react-toatify
import { ToastContainer,  } from 'react-toastify';

createRoot(document.getElementById('root')).render(

    <GlobalContextProvider>
        <App/>
        <ToastContainer position='bottom-right'/>
    </GlobalContextProvider>
 
)
