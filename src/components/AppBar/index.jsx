import Box from '@mui/material/Box';
import ModeSelect from '~/components/ModeSelect';
import AppsIcon from '@mui/icons-material/Apps';
import InsightsIcon from '@mui/icons-material/Insights';
import { Button, TextField, Typography } from '@mui/material';
import Workspaces from './Menus/Workspaces';
import Recent from './Menus/Recent';
import Starred from './Menus/Starred';
import Templates from './Menus/Templates';
import AddIcon from '@mui/icons-material/Add';
import Badge from '@mui/material/Badge';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Tooltip from '@mui/material/Tooltip';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Profiles from './Menus/Profiles';
const AppBar = () => {
    return (
        <Box px={2} sx={{
            width: '100%',
            height: (theme) => theme.workSmart.appBarHeight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
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

                <Workspaces />
                <Recent />
                <Starred />
                <Templates />

                <Button variant='outlined'>
                    <AddIcon />
                </Button>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TextField id='outlined-search' label='Search...' type='search' size='small' />
                <ModeSelect />
                <Tooltip title="Notifications">
                    <Badge color="secondary" variant="dot" sx={{ cursor: 'pointer' }}>
                        <NotificationsNoneIcon />
                    </Badge>
                </Tooltip>
                <Tooltip title="Help">
                    <HelpOutlineIcon sx={{ cursor: 'pointer' }} />
                </Tooltip>
                <Profiles/>
            </Box>
        </Box>
    )
}

export default AppBar