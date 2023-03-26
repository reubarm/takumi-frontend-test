import { createTheme } from '@mui/material';


const theme = createTheme({
  typography: {
    fontFamily: 'Work Sans, Aria, Helvetica, sans-serif',
  },
  palette: {
    primary: {
      main: '#007BB8',
    },
    secondary: {
      main: '#00AFF0',
    },
    info: {
      main: '#6197BA',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Work Sans, Aria, Helvetica, sans-serif',
          font-style: bold;
          font-display: swap;
          font-weight: 400;
        },
        h1 {
          font-weight: 600!important;
          letter-spacing: -1px;
        }
        h2 {
          font-weight: 600!important;
          letter-spacing: -1px;
        }
      `,
    },
  },
});

export default theme;
