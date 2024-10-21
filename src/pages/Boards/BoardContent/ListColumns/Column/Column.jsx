import Cloud from '@mui/icons-material/Cloud';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentPaste from '@mui/icons-material/ContentPaste';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import { Button, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Fade from '@mui/material/Fade';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import ListCards from './ListCards/ListCards';
import { mapOrder } from '~/utils/sorts';

const Column = ({ column }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, '_id')
    return (
        <Box
            sx={{
                minWidth: '300px',
                maxWidth: '300px',
                bgcolor: (theme) => theme.palette.mode === 'dark' ? '#333643' : '#ebecf0',
                ml: 2,
                borderRadius: '6px',
                height: 'fit-content',
                maxHeight: (theme) => `calc(${theme.workSmart.boardContentHeight} - ${theme.spacing(5)})`,

            }
            }
        >
            {/* Box column header */}
            <Box
                sx={{
                    height: (theme) => theme.workSmart.columnHeaderHeight,
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >
                <Typography
                    variant='h6'
                    sx={{
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        fontSize: '1rem'
                    }}
                >
                    {column?.title}
                </Typography>

                <Box>
                    <Tooltip title="More options">
                        <MoreHorizIcon
                            sx={{
                                color: 'text.primary',
                                cursor: 'pointer'
                            }}
                            id="basic-column-dropdown"
                            aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        />
                    </Tooltip>

                    <Menu
                        id="basic-menu-column-dropdown"
                        MenuListProps={{
                            'aria-labelledby': 'basic-column-dropdown',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Fade}
                    >
                        <MenuItem>
                            <ListItemIcon>
                                <PlaylistAddIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Add new card</ListItemText>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                ⌘N
                            </Typography>
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <ContentCut fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Cut</ListItemText>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                ⌘X
                            </Typography>
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <ContentCopy fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Copy</ListItemText>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                ⌘C
                            </Typography>
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <ContentPaste fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Paste</ListItemText>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                ⌘V
                            </Typography>
                        </MenuItem>
                        <Divider />
                        <MenuItem>
                            <ListItemIcon>
                                <PlaylistRemoveIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Remove this column</ListItemText>
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <Cloud fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Archive this column</ListItemText>
                        </MenuItem>
                    </Menu>
                </Box>
            </Box>

            {/* list card */}
            <ListCards cards={orderedCards} />

            {/* Box column footer */}
            <Box
                sx={{
                    height: (theme) => theme.workSmart.columnFooterHeight,
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >
                <Button sx={{
                    color: (theme) => theme.palette.mode === 'dark' ? 'white' : 'primary.main'
                }} startIcon={<PlaylistAddIcon />}>Add new card</Button>

                <Tooltip title="Drag to move">
                    <DragHandleIcon sx={{ cursor: 'pointer' }} />
                </Tooltip>
            </Box>

        </Box>
    )
}

export default Column