import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#031930',
    },
    secondary: {
      main: '#ffffff',
    },
    background: {
      default: '#333333',
      paper: '#424242',
    },
    text: {
      primary: '#ffffff',
    },
    action: {
      hover: '#444444',
    },
    common:{
      black:"#444444",
     }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#031930',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
         
        },
      },
    },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#73c2fb',
    },
    secondary: {
      main: '#4DA9E1',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
    },
    action: {
      hover: '#eeeeee',
    },
    common:{
      black:"#eeeeee",
    }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#73c2fb',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1E1E1E',
          color:'#eeeeee'

        },
      },
    },
  },
});

export { darkTheme, lightTheme };
