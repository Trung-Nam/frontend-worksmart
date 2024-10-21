import { useState } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { Button, Tooltip } from '@mui/material';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import GroupIcon from '@mui/icons-material/Group';
import CommentIcon from '@mui/icons-material/Comment';
import AttachmentIcon from '@mui/icons-material/Attachment';

const COLUMN_HEADER_HEIGHT = '50px';
const COLUMN_FOOTER_HEIGHT = '56px';


const BoardContent = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{
            bgcolor: (theme) => theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
            height: (theme) => theme.workSmart.boardContentHeight,
            p: '10px 0',
        }}>
            <Box sx={{
                bgcolor: 'inherit',
                width: '100%',
                height: '100%',
                display: 'flex',
                overflowX: 'auto',
                overflowY: 'hidden',
                '&::-webkit-scrollbar-track': { m: 2 }
            }}>
                {/* Box column */}
                <Box
                    sx={{
                        minWidth: '300px',
                        maxWidth: '300px',
                        bgcolor: (theme) => theme.palette.mode === 'dark' ? '#333643' : '#ebecf0',
                        ml: 2,
                        borderRadius: '6px',
                        height: 'fit-content',
                        maxHeight: (theme) => `calc(${theme.workSmart.boardContentHeight} - ${theme.spacing(5)})`,

                    }}
                >
                    {/* Box column header */}
                    <Box
                        sx={{
                            height: COLUMN_HEADER_HEIGHT,
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
                            Column title
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
                    {/* Box column list card*/}
                    <Box
                        sx={{
                            p: '0 5px',
                            m: '0 5px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
                            overflowX: 'hidden',
                            overflowY: 'auto',
                            maxHeight: (theme) => `calc(
                            ${theme.workSmart.boardContentHeight} - 
                            ${theme.spacing(5)} -
                            ${COLUMN_HEADER_HEIGHT} - 
                            ${COLUMN_FOOTER_HEIGHT} 
                        )`,
                            '&::-webkit-scrollbar-thumb': {
                                backgroundColor: '#ced0da',
                            },
                            '&::-webkit-scrollbar-thumb:hover': {
                                backgroundColor: '#bfc2cf',
                            },
                        }}
                    >
                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                            overflow: 'unset'
                        }}>
                            <CardMedia
                                sx={{ height: 140 }}
                                image="https://benhvienthammydonga.vn/wp-content/uploads/2022/06/anh-gai-xinh-toc-dai-deo-kinh-2k4.jpg"
                                title="green iguana"
                            />
                            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                                <Typography>Trung Nam Dev</Typography>
                            </CardContent>
                            <CardActions sx={{
                                p: '0 4px 8px 4px',
                            }}>
                                <Button sx={{
                                    color: (theme) => theme.palette.mode === 'dark' ? 'white' : 'primary.main'
                                }} size="small" startIcon={<GroupIcon />}>20</Button>
                                <Button sx={{
                                    color: (theme) => theme.palette.mode === 'dark' ? 'white' : 'primary.main'
                                }} size="small" startIcon={<CommentIcon />}>15</Button>
                                <Button sx={{
                                    color: (theme) => theme.palette.mode === 'dark' ? 'white' : 'primary.main'
                                }} size="small" startIcon={<AttachmentIcon />}>10</Button>
                            </CardActions>
                        </Card>

                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                            overflow: 'unset'
                        }}>
                            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                                <Typography>Card 01</Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                            overflow: 'unset'
                        }}>
                            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                                <Typography>Card 01</Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                            overflow: 'unset'
                        }}>
                            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                                <Typography>Card 01</Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                            overflow: 'unset'
                        }}>
                            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                                <Typography>Card 01</Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                            overflow: 'unset'
                        }}>
                            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                                <Typography>Card 01</Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                            overflow: 'unset'
                        }}>
                            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                                <Typography>Card 01</Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                            overflow: 'unset'
                        }}>
                            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                                <Typography>Card 01</Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                            overflow: 'unset'
                        }}>
                            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                                <Typography>Card 01</Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                            overflow: 'unset'
                        }}>
                            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                                <Typography>Card 01</Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                            overflow: 'unset'
                        }}>
                            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                                <Typography>Card 01</Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                            overflow: 'unset'
                        }}>
                            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                                <Typography>Card 01</Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                            overflow: 'unset'
                        }}>
                            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                                <Typography>Card 01</Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                            overflow: 'unset'
                        }}>
                            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                                <Typography>Card 01</Typography>
                            </CardContent>
                        </Card>
                    </Box>

                    {/* Box column footer */}
                    <Box
                        sx={{
                            height: COLUMN_FOOTER_HEIGHT,
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
                {/* Box column 2*/}
                <Box
                    sx={{
                        minWidth: '300px',
                        maxWidth: '300px',
                        bgcolor: (theme) => theme.palette.mode === 'dark' ? '#333643' : '#ebecf0',
                        ml: 2,
                        borderRadius: '6px',
                        height: 'fit-content',
                        maxHeight: (theme) => `calc(${theme.workSmart.boardContentHeight} - ${theme.spacing(5)})`,

                    }}
                >
                    {/* Box column header */}
                    <Box
                        sx={{
                            height: COLUMN_HEADER_HEIGHT,
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
                            Column title
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
                    {/* Box column list card*/}
                    <Box
                        sx={{
                            p: '0 5px',
                            m: '0 5px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
                            overflowX: 'hidden',
                            overflowY: 'auto',
                            maxHeight: (theme) => `calc(
                            ${theme.workSmart.boardContentHeight} - 
                            ${theme.spacing(5)} -
                            ${COLUMN_HEADER_HEIGHT} - 
                            ${COLUMN_FOOTER_HEIGHT} 
                        )`,
                            '&::-webkit-scrollbar-thumb': {
                                backgroundColor: '#ced0da',
                            },
                            '&::-webkit-scrollbar-thumb:hover': {
                                backgroundColor: '#bfc2cf',
                            },
                        }}
                    >
                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                            overflow: 'unset'
                        }}>
                            <CardMedia
                                sx={{ height: 140 }}
                                image="https://benhvienthammydonga.vn/wp-content/uploads/2022/06/anh-gai-xinh-toc-dai-deo-kinh-2k4.jpg"
                                title="green iguana"
                            />
                            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                                <Typography>Trung Nam Dev</Typography>
                            </CardContent>
                            <CardActions sx={{
                                p: '0 4px 8px 4px'
                            }}>
                                <Button
                                    sx={{
                                        color: (theme) => theme.palette.mode === 'dark' ? 'white' : 'primary.main'
                                    }}
                                    size="small" startIcon={<GroupIcon />}>20</Button>
                                <Button
                                    sx={{
                                        color: (theme) => theme.palette.mode === 'dark' ? 'white' : 'primary.main'
                                    }}
                                    size="small" startIcon={<CommentIcon />}>15</Button>
                                <Button
                                    sx={{
                                        color: (theme) => theme.palette.mode === 'dark' ? 'white' : 'primary.main'
                                    }}
                                    size="small" startIcon={<AttachmentIcon />}>10</Button>
                            </CardActions>
                        </Card>

                        <Card sx={{
                            cursor: 'pointer',
                            boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                            overflow: 'unset'
                        }}>
                            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                                <Typography>Card 01</Typography>
                            </CardContent>
                        </Card>
                    </Box>

                    {/* Box column footer */}
                    <Box
                        sx={{
                            height: COLUMN_FOOTER_HEIGHT,
                            p: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Button
                            sx={{
                                color: (theme) => theme.palette.mode === 'dark' ? 'white' : 'primary.main'
                            }}
                            startIcon={<PlaylistAddIcon />}>Add new card</Button>

                        <Tooltip title="Drag to move">
                            <DragHandleIcon sx={{ cursor: 'pointer' }} />
                        </Tooltip>
                    </Box>

                </Box>
            </Box>

        </Box>
    )
}

export default BoardContent