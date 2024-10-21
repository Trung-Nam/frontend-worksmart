import Box from '@mui/material/Box';
import Column from './Column/Column';
import { Button } from '@mui/material';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
const ListColumns = ({ columns }) => {
    return (
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
    )
}

export default ListColumns