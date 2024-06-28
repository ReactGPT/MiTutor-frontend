import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider, RouterContextProvider } from './context';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

import { PrimeReactProvider } from 'primereact/api';
        
import "primereact/resources/themes/lara-light-cyan/theme.css";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <GoogleOAuthProvider clientId='358728188523-achb1qm8b68uvhr6437hft062u1dmtns.apps.googleusercontent.com'>
        <PrimeReactProvider>
          <RouterContextProvider />
        </PrimeReactProvider>
        </GoogleOAuthProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);