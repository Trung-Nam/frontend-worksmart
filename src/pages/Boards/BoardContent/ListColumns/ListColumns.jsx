import Box from '@mui/material/Box';
import Column from './Column/Column';
import { Button, TextField } from '@mui/material';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { useState } from 'react';
import { toast } from 'react-toastify';

const ListColumns = ({ columns, createNewColumn, createNewCard, deleteColumnDetails }) => {
    const [openNewColumnForm, setOpenNewColumnForm] = useState();
    const toggleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm);

    const [newColumnTitle, setNewColumnTitle] = useState('');

    const addNewColumn = () => {
        if (!newColumnTitle) {
            toast.error('Please enter column title!');
            return;
        }

        // Tạo dữ liệu Column để gọi api
        const newColumnData = {
            title: newColumnTitle,
        }

        // Gọi API
        createNewColumn(newColumnData);

        toggleOpenNewColumnForm();
        setNewColumnTitle('');
    }
    /**
     * SortableContext yêu cầu item là 1 mảng dạng ['id-1', 'id-2'] chứ không phải [{id:'id-1'}, {id:'id-2'}]
     * Nếu không dùng đúng thì vẫn kéo thả được nhưng không có animation
     * https://github.com/clauderic/dnd-kit/issues/183#issuecomment-812569512
     */

    return (
        <SortableContext items={columns?.map(c => c._id)} strategy={horizontalListSortingStrategy}>
            <Box sx={{
                bgcolor: 'inherit',
                width: '100%',
                height: '100%',
                display: 'flex',
                overflowX: 'auto',
                overflowY: 'hidden',
                '&::-webkit-scrollbar-track': { m: 2 }
            }}>

                {columns?.map((column) => (
                    <Column
                        key={column._id}
                        column={column}
                        createNewCard={createNewCard}
                        deleteColumnDetails={deleteColumnDetails}
                    />
                ))}

                {/* Box add new column */}
                {!openNewColumnForm
                    ? <Box
                        onClick={toggleOpenNewColumnForm}
                        sx={{
                            minWidth: '250px',
                            maxWidth: '250px',
                            mx: 2,
                            borderRadius: '6px',
                            height: 'fit-content',
                            bgcolor: '#ffffff3d'
                        }}
                    >
                        <Button
                            startIcon={<ViewColumnIcon />}
                            sx={{
                                color: 'white',
                                width: '100%',
                                justifyContent: 'center',
                                py: 1
                            }}
                        >
                            Add new column
                        </Button>
                    </Box>
                    : <Box
                        sx={{
                            minWidth: '250px',
                            maxWidth: '250px',
                            mx: 2,
                            p: 1,
                            borderRadius: '6px',
                            height: 'fit-content',
                            bgcolor: '#ffffff3d',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1
                        }}
                    >
                        <TextField
                            label='Enter column title...'
                            type='text'
                            size='small'
                            variant='outlined'
                            autoFocus
                            value={newColumnTitle}
                            onChange={(e) => setNewColumnTitle(e.target.value)}
                            sx={{
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

                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1
                            }}
                        >
                            <Button
                                onClick={addNewColumn}
                                variant='contained'
                                color='success'
                                size='small'
                                sx={{
                                    boxShadow: 'none',
                                    border: '0.5px solid',
                                    borderColor: (theme) => theme.palette.success.main,
                                    '&:hover': { bgcolor: (theme) => theme.palette.success.main }
                                }}
                            >
                                Add Column
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
                                onClick={toggleOpenNewColumnForm}
                            >
                                Cancel
                            </Button>


                        </Box>
                    </Box>
                }

            </Box>
        </SortableContext>
    )
}

export default ListColumns