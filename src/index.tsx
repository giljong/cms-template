import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import locale from 'antd/es/locale/ko_KR';
import localeEn from 'antd/es/locale/en_US';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RecoilRoot } from 'recoil';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <RecoilRoot>
    <ConfigProvider
      locale={{
        ...locale,
        Pagination: localeEn.Pagination,
      }}
    >
      <App />
    </ConfigProvider>
  </RecoilRoot>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
