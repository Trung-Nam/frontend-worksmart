import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import { Container, useColorScheme } from '@mui/material';


const ModeSelect = () => {
  const { mode, setMode } = useColorScheme();

  const handleChange = (event) => {
    setMode(event.target.value);
  };
  return (

    <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
      <InputLabel id="label-select-dark-light-mode">Mode</InputLabel>
      <Select
        labelId="label-select-dark-light-mode"
        id="select-dark-light-mode"
        value={mode}
        label="mode"
        onChange={handleChange}
      >
        <MenuItem value='dark'>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DarkModeIcon />Dark
          </Box>
        </MenuItem>
        <MenuItem value='light'>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LightModeIcon />Light
          </Box>
        </MenuItem>
        <MenuItem value='dark'>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SettingsBrightnessIcon />System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>

  )
}

function App() {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <Box sx={{
        backgroundColor: 'primary.light',
        width: '100%',
        height: (theme) => theme.workSmart.appBarHeight,
        display: 'flex',
        alignItems: 'center',
      }}>
        <ModeSelect />
      </Box>

      <Box sx={{
        backgroundColor: 'primary.dark',
        width: '100%',
        height: (theme) => theme.workSmart.boardBarHeight,
        display: 'flex',
        alignItems: 'center',
      }}>
        Board Bar
      </Box>

      <Box sx={{
        backgroundColor: 'primary.main',
        height: (theme) => `calc(100vh - ${theme.workSmart.appBarHeight} -  ${theme.workSmart.boardBarHeight})`,
        display: 'flex',
        alignItems: 'center',
      }}>
        Board Content
      </Box>
    </Container>
  )
}

export default App
