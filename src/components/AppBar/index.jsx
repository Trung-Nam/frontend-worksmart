import Box from '@mui/material/Box';
import ModeSelect from '~/components/ModeSelect';
import AppsIcon from '@mui/icons-material/Apps';
import InsightsIcon from '@mui/icons-material/Insights';
import { Button, TextField, Typography } from '@mui/material';
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
const AppBar = () => {
    return (
        <Box px={2} sx={{
            width: '100%',
            height: (theme) => theme.workSmart.appBarHeight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            overflowX: 'auto',
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <AppsIcon sx={{ color: 'primary.main' }} />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <InsightsIcon sx={{ color: 'primary.main' }} />
                    <Typography
                        variant='span'
                        sx={{
                            fontWeight: 'bold',
                            color: 'primary.main'
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
                    >
                        Create
                    </Button>
                </Box>


            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TextField id='outlined-search' label='Search...' type='search' size='small' sx={{ minWidth: '120px' }} />
                <ModeSelect />
                <Tooltip title="Notifications">
                    <Badge color="secondary" variant="dot" sx={{ cursor: 'pointer' }}>
                        <NotificationsNoneIcon sx={{ color: 'primary.main' }} />
                    </Badge>
                </Tooltip>
                <Tooltip title="Help">
                    <HelpOutlineIcon sx={{ cursor: 'pointer', color: 'primary.main' }} />
                </Tooltip>
                <Profiles />
            </Box>
        </Box>
    )
}

export default AppBar