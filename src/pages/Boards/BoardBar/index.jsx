import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import DashboardIcon from '@mui/icons-material/Dashboard';
import VpnLockIcon from '@mui/icons-material/VpnLock';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import BoltIcon from '@mui/icons-material/Bolt';
import FilterListIcon from '@mui/icons-material/FilterList';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { Button, Tooltip } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
const MENU_STYLES = {
    color: 'primary.main',
    bgcolor: 'white',
    border: 'none',
    paddingX: '5px',
    borderRadius: '4px',
    '& .MuiSvgIcon-root': {
        color: 'primary.main'
    },
    '&:hover,&:hover .MuiSvgIcon-root': {
        bgcolor: 'primary.50',
        color:'white'
    }
}


const BoardBar = () => {
    return (
        <Box
            sx={{
                width: '100%',
                height: (theme) => theme.workSmart.boardBarHeight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
                paddingX: 2,
                overflowX: 'auto',
                bgcolor: (theme) => theme.palette.mode === 'dark' ? '#34495e' : '#1976d2', 
                borderBottom: '1px solid #00bfa5'
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Chip
                    sx={MENU_STYLES}
                    icon={<DashboardIcon />}
                    label="Trung Nam  Board"
                    clickable
                    onClick={() => { }}
                />
                <Chip
                    sx={MENU_STYLES}
                    icon={<VpnLockIcon />}
                    label="Public/Private Workspace"
                    clickable
                    onClick={() => { }}
                />
                <Chip
                    sx={MENU_STYLES}
                    icon={<AddToDriveIcon />}
                    label="Add to google drive"
                    clickable
                    onClick={() => { }}
                />
                <Chip
                    sx={MENU_STYLES}
                    icon={<BoltIcon />}
                    label="Automation"
                    clickable
                    onClick={() => { }}
                />
                <Chip
                    sx={MENU_STYLES}
                    icon={<FilterListIcon />}
                    label="Filters"
                    clickable
                    onClick={() => { }}
                />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button
                    variant='outlined'
                    startIcon={<PersonAddIcon />}
                    sx={{
                        color:'white',
                        borderColor:'white',
                    }}
                >
                    Invite
                </Button>

                <AvatarGroup
                    max={6}
                    sx={{
                        '& .MuiAvatar-root': {
                            width: 36,
                            height: 36,
                            fontSize: '1rem'
                        }
                    }}
                >
                    <Tooltip title="Trung Nam">
                        <Avatar
                            alt="Trung Nam"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl1npKzFVVt9M_osFZBXwNhlOqLWKD4nQPAQ&s"
                        />
                    </Tooltip>
                    <Tooltip title='Travis Howard'>
                        <Avatar
                            alt="Travis Howard"
                            src='https://vsmall.vn/wp-content/uploads/2024/06/909-hinh-anh-girl-xinh-dep-nhat-lam-hinh-nen-dien-thoai-pc-2.jpg'
                        />
                    </Tooltip>
                    <Tooltip title='Cindy Baker'>
                        <Avatar
                            alt="Cindy Baker"
                            src="https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/474014bom/anh-gai-xinh-cute-de-thuong-hot-girl-2.jpg"
                        />
                    </Tooltip>
                    <Tooltip title='Agnes Walker'>
                        <Avatar
                            alt="Agnes Walker"
                            src="https://top10tphcm.com/wp-content/uploads/2024/04/hinh-anh-gai-xinh-trung-quoc-dep-nhat-31.jpg"

                        />
                    </Tooltip>
                    <Tooltip title='Trevor Henderson'>
                        <Avatar
                            alt="Trevor Henderson"
                            src="https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/01/Hinh-nen-gai-xinh-Trung-Quoc.jpg?fit=373%2C560&ssl=1"
                        />
                    </Tooltip>
                </AvatarGroup>
            </Box>
        </Box>
    )
}

export default BoardBar