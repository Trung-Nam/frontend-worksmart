import { deepOrange, teal, cyan, orange } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
// Create a theme instance.
const theme = createTheme({
  workSmart: {
    appBarHeight: '58px',
    boardBarHeight: '60px'
  },
  colorSchemes: {
    light: {
      palette: {
        primary: teal,
        secondary: deepOrange
      }
    },
    dark: {
      palette: {
        primary: cyan,
        secondary: orange
      }
    },
  }
});

export default theme;