import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#005f73', 
    },
    secondary: {
      main: '#00bcd4', 
    },
    background: {
      default: '#333333', 
      paper: '#424242', 
    },
    text: {
      primary: '#ffffff',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#2196f3', 
          color: '#fff', 
          '&:hover': {
            backgroundColor: '#1976d2', 
          },
        },
      },
    },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#005f73', 
    },
    secondary: {
      main: '#ff6f61', 
    },
    background: {
      default: '#fafafa', 
      paper: '#ffffff', 
    },
    text: {
      primary: '#333333', 
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#2196f3',
          color: '#fff', 
          '&:hover': {
            backgroundColor: '#1976d2',
          },
        },
      },
    },
  },
});

export { darkTheme, lightTheme };
