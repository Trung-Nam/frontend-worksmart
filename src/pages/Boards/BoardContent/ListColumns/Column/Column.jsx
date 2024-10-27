import Cloud from '@mui/icons-material/Cloud';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentPaste from '@mui/icons-material/ContentPaste';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import { Button, TextField, Tooltip } from '@mui/material';
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

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { toast } from 'react-toastify';

const Column = ({ column, createNewCard }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: column._id, data: { ...column } });

    const dndKitColumnStyles = {
        // touchAction: 'none',
        /**
         * Nếu sử dụng CSS.Transform như doc thì sẽ lỗi kiểu stretch
         * https://github.com/clauderic/dnd-kit/issues/117
         */
        transform: CSS.Translate.toString(transform),
        transition,
        /**
         * Chiều cao phải luôn max 100% vì nếu không sẽ lỗi lúc kéo column ngắn qua một cái column dài thì phải kéo ở khu vực giữa rất khó chịu (demo ở video 32). 
         * Lưu ý lúc này phải kết hợp với {...listeners} nằm ở Box chứ không phải ở div ngoài cùng để tránh trường hợp kéo vào vùng xanh.
         */
        height: '100%',
        opacity: isDragging ? 0.5 : undefined,
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, '_id')


    const [openNewCardForm, setOpenNewCardForm] = useState();
    const toggleOpenNewCardForm = () => setOpenNewCardForm(!openNewCardForm);

    const [newCardTitle, setNewCardTitle] = useState('');

    const addNewCard = async () => {
        if (!newCardTitle) {
            toast.error('Please enter Card title!', { position: 'bottom-right' });
            return;
        }

        // Tạo dữ liệu Card để gọi api
        const newCardData = {
            title: newCardTitle,
            columnId:column._id
        }
        // Gọi API
        await createNewCard(newCardData);

        toggleOpenNewCardForm();
        setNewCardTitle('');
    }


    return (
        // Phải bọc div ở đây vì vấn đề chiều cao column khi thả sẽ có bug kiểu flickering
        <div ref={setNodeRef}
            style={dndKitColumnStyles}
            {...attributes}
        >
            <Box
                {...listeners}
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
                        p: 1.2,
                    }}
                >
                    {!openNewCardForm
                        ? <Box
                            sx={{
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                            <Button
                                sx={{
                                    color: (theme) => theme.palette.mode === 'dark' ? 'white' : 'primary.main'
                                }}
                                startIcon={<PlaylistAddIcon />}
                                onClick={toggleOpenNewCardForm}
                            >
                                Add new card
                            </Button>
                            <Tooltip title="Drag to move">
                                <DragHandleIcon sx={{ cursor: 'pointer' }} />
                            </Tooltip>
                        </Box>
                        : <Box
                            sx={{
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1
                            }}
                        >

                            <TextField
                                label='Enter card title...'
                                type='text'
                                size='small'
                                variant='outlined'
                                autoFocus
                                fullWidth
                                data-no-dnd="true"
                                value={newCardTitle}
                                onChange={(e) => setNewCardTitle(e.target.value)}
                                sx={{
                                    '& label': { color: 'text.primary' },
                                    '& input': {
                                        color: (theme) => theme.palette.mode === 'dark' ? 'white' : 'primary.main',
                                        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : 'white')
                                    },
                                    'label.Mui-focused': { color: (theme) => theme.palette.mode === 'dark' ? 'white' : 'primary.main' },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': { borderColor: (theme) => theme.palette.mode === 'dark' ? 'white' : 'primary.main' },
                                        '&:hover fieldset': { borderColor: (theme) => theme.palette.mode === 'dark' ? 'white' : 'primary.main' },
                                        '&.Mui-focused fieldset': { borderColor: (theme) => theme.palette.mode === 'dark' ? 'white' : 'primary.main' }
                                    },
                                    '& .MuiOutlinedInput-input': {
                                        borderRadius: 1
                                    }
                                }}
                            />

                            <Box
                                sx={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1
                                }}
                            >
                                <Button
                                    onClick={addNewCard}
                                    variant='contained'
                                    color='success'
                                    size='small'
                                    sx={{
                                        color: 'white',
                                        boxShadow: 'none',
                                        border: '0.5px solid',
                                        borderColor: (theme) => theme.palette.success.main,
                                        '&:hover': { bgcolor: (theme) => theme.palette.success.main }
                                    }}
                                >
                                    Add
                                </Button>

                                <Button
                                    variant='contained'
                                    color='error'
                                    size='small'
                                    sx={{
                                        boxShadow: 'none',
                                        border: '0.5px solid',
                                        borderColor: (theme) => theme.palette.error.main,
                                    }}
                                    onClick={toggleOpenNewCardForm}
                                >
                                    Cancel
                                </Button>
                            </Box>
                        </Box>
                    }


                </Box>

            </Box>
        </div>
    )
}

export default Column