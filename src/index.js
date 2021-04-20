import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ThemeProvider } from '@material-ui/core/styles';
import Theme from './components/Theme/Theme';
import AppContextProvider from './AppContext';

ReactDOM.render(
  <AppContextProvider>
    <ThemeProvider theme={Theme}>
      <App />
    </ThemeProvider>
  </AppContextProvider>,
  document.getElementById('root')
);

