import Box from '@mui/material/Box';
const BoardBar = () => {
    return (
        <Box sx={{
            backgroundColor: 'primary.dark',
            width: '100%',
            height: (theme) => theme.workSmart.boardBarHeight,
            display: 'flex',
            alignItems: 'center',
        }}>
            Board Bar
        </Box>
    )
}

export default BoardBar