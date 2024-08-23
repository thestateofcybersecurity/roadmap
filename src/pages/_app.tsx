import React from 'react';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Layout from '../components/Layout';
import { store } from '../redux/store';
import '../styles/globals.css';

import VCISORoadmap from '../pages/vciso-roadmap'; // Importing the new vCISO Roadmap page

const theme = createTheme({
  palette: {
    primary: {
      main: '#1e3a8a',
    },
    secondary: {
      main: '#10b981',
    },
    background: {
      default: '#f3f4f6',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  // Optionally, you can conditionally render the VCISORoadmap if needed based on props or other logic.
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          {/* Rendering the main component */}
          <Component {...pageProps} />
          {/* Optionally rendering the vCISO Roadmap */}
          {/* You can conditionally render it based on the route or other conditions */}
          {/* <VCISORoadmap /> */}
        </Layout>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
