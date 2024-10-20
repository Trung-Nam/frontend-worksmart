import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import { useColorScheme } from '@mui/material';

const ModeSelect = () => {
    const { mode, setMode } = useColorScheme();

    const handleChange = (event) => {
        setMode(event.target.value);
    };

    // Ensure mode has a fallback value
    const currentMode = mode || 'system';

    return (
        <FormControl size='small'>
            <InputLabel id="label-select-dark-light-mode">Mode</InputLabel>
            <Select
                labelId="label-select-dark-light-mode"
                id="select-dark-light-mode"
                value={currentMode} // Use fallback mode
                label="Mode"
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
                <MenuItem value='system'>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <SettingsBrightnessIcon />System
                    </Box>
                </MenuItem>
            </Select>
        </FormControl>
    );
};

export default ModeSelect;
