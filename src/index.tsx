import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { fetchAllUsers } from './features/user/userSlice';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
store.dispatch(fetchAllUsers())
root.render(
  <Provider store={store}>
      <App />
    </Provider>
);
  


