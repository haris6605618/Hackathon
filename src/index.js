import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
// REACT ROUTER DOM
import { BrowserRouter } from "react-router-dom"
// Bootstrap
import "bootstrap/dist/js/bootstrap.bundle";
import { ConfigProvider } from 'antd';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Quicksand"
        }
      }}
    >
    <App />
    </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
