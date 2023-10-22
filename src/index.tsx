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
        components: {
            Layout: {
                triggerColor:'rgb(14 165 233)',
                bodyBg:'#daeaf7',
                headerBg:'#4fa5d8',
                siderBg:'#00022b',
                footerBg:'#4fa5d8',
            },
            Divider: {
                colorSplit: '#69b1ff'
            },
            Menu: {
                colorBgContainer: '#69b1ff',
                darkItemBg: '#69b1ff',
                darkItemColor: '#69b1ff',
                darkSubMenuItemBg:'#010e54',
                darkItemSelectedBg: '#0855b1',
                darkItemHoverBg	: '#daeaf7',
                darkItemHoverColor	: '#00022b',
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
