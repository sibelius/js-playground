import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import {
  StylesProvider,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/styles';
import { RecoilRoot } from 'recoil';

import App from './App';

const theme = createMuiTheme();

const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    line-height: 1.5;
    color: #566b78;
  }
  h2 {
    margin-top: 1em;
    padding-top: 1em;
  }
  h1,
  h2,
  strong {
    color: #333;
  }
  span {
    font-size: 14px;
  }
  p {
    font-size: 14px;
  }
`;

const Root = () => {
  return (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalStyle />
          <RecoilRoot>
            <App />
          </RecoilRoot>
        </ThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  );
};

export default Root;
