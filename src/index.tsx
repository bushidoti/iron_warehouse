import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {ConfigProvider} from "antd";
import fa_IR from "antd/lib/locale/fa_IR";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <ConfigProvider locale={fa_IR} direction="rtl" theme={{
        token:{
            colorBgLayout:'rgb(186 230 253)'

        },
        components: {
            Layout: {
                triggerColor:'rgb(14 165 233)',
            },
            Divider: {
                colorSplit: '#69b1ff'
            }
        }
    }}>
        <BrowserRouter>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </BrowserRouter>
    </ConfigProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
