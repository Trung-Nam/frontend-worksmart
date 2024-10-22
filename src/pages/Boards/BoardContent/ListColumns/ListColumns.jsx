import Box from '@mui/material/Box';
import Column from './Column/Column';
import { Button } from '@mui/material';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';

const ListColumns = ({ columns }) => {
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
                    <Column key={column._id} column={column} />
                ))}

                {/* Box add new column */}
                <Box
                    sx={{
                        minWidth: '200px',
                        maxWidth: '200px',
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
            </Box>
        </SortableContext>
    )
}

export default ListColumns