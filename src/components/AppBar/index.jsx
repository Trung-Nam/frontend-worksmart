import Box from '@mui/material/Box';
import ModeSelect from '~/components/ModeSelect';
import AppsIcon from '@mui/icons-material/Apps';
import InsightsIcon from '@mui/icons-material/Insights';
import { Button, InputAdornment, TextField, Typography } from '@mui/material';
import Workspaces from './Menus/Workspaces';
import Recent from './Menus/Recent';
import Starred from './Menus/Starred';
import Templates from './Menus/Templates';
import Badge from '@mui/material/Badge';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Tooltip from '@mui/material/Tooltip';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Profiles from './Menus/Profiles';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
const AppBar = () => {
    const [searchValue, setSearchValue] = useState('');

    return (
        <Box
            px={2}
            sx={{
                width: '100%',
                height: (theme) => theme.workSmart.appBarHeight, 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
                overflowX: 'auto',
                bgcolor: (theme) => theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0', 
            }}
        >

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <AppsIcon sx={{ color: 'white' }} />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <InsightsIcon sx={{ color: 'white' }} />
                    <Typography
                        variant='span'
                        sx={{
                            fontWeight: 'bold',
                            color: 'white'
                        }}>Work Smart</Typography>
                </Box>

                <Box sx={{
                    display: { xs: 'none', md: 'flex' }, gap: 1
                }}>
                    <Workspaces />
                    <Recent />
                    <Starred />
                    <Templates />
                    <Button
                        variant='outlined'
                        startIcon={<LibraryAddIcon />}
                        sx={{
                            color: 'white',
                            borderColor: 'white',
                            '&:hover': 'none'
                        }}
                    >
                        Create
                    </Button>
                </Box>


            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TextField
                    id='outlined-search'
                    label='Search...'
                    type='text'
                    size='small'
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchIcon sx={{ color: 'white' }} />
                                </InputAdornment>
                            ),
                        },
                    }}
                    sx={{
                        minWidth: '120px',
                        maxWidth: '180px',
                        '& label': { color: 'white' },
                        '& input': { color: 'white' },
                        '& label.Mui-focused': { color: 'white' },
                        '& .MuiOutlinedInput-root':
                        {
                            '& fieldset': {
                                borderColor: 'white'
                            },
                            '&:hover fieldset': {
                                borderColor: 'white'
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'white'
                            },
                        },
                    }}
                />

                <ModeSelect />

                <Tooltip title="Notifications">
                    <Badge color="warning" variant="dot" sx={{ cursor: 'pointer' }}>
                        <NotificationsNoneIcon sx={{ color: 'white' }} />
                    </Badge>
                </Tooltip>
                <Tooltip title="Help">
                    <HelpOutlineIcon sx={{ cursor: 'pointer', color: 'white' }} />
                </Tooltip>
                <Profiles />
            </Box>
        </Box>
    )
}

export default AppBar