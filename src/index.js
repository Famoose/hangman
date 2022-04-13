import React from 'react'
import './index.css'
import App from './App'
import {createRoot} from "react-dom/client";
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'

import {enableOfflinePersistence} from "./lib/FirebaseApp";
enableOfflinePersistence();
import './i18n';
import ServiceWorkerWrapper from "./components/ServiceWorkerWrapper";

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <BrowserRouter>
        <React.StrictMode>
            <App/>
            <ServiceWorkerWrapper/>
        </React.StrictMode>
    </BrowserRouter>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
