import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {ConfigProvider} from "antd";
import fa_IR from "antd/lib/locale/fa_IR";
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from "stylis-plugin-rtl";
import {CacheProvider} from "@emotion/react";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFnsJalali} from "@mui/x-date-pickers/AdapterDateFnsJalali";

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

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
                darkItemBg: '#00022b',
                darkItemColor: '#69b1ff',
                subMenuItemBg:'#69b1ff',
                iconSize:20,
                itemMarginBlock:8,
                darkItemSelectedBg: '#0855b1',
                darkSubMenuItemBg: '#010e54',
                darkItemHoverBg	: '#daeaf7',
                darkItemHoverColor	: '#00022b',
            }
        }
    }}>
        <BrowserRouter>
          <React.StrictMode>
              <CacheProvider value={cacheRtl}>
                  <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
                        <App />
                  </LocalizationProvider>
              </CacheProvider>
          </React.StrictMode>
        </BrowserRouter>
    </ConfigProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
