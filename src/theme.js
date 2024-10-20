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
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.main,
          fontSize: '0.875rem'
        })
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.main,
          fontSize: '0.875rem',
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.light,
          },
          '&:hover': {
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.main,
            },
          },
          '& fieldset': {
            borderWidth: '1px !important'
          }
        }),
      },
    },

  },
});

export default theme;