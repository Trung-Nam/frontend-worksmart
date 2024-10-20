import Box from '@mui/material/Box';
const BoardContent = () => {
    return (
        <Box sx={{
            bgcolor: (theme) => theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
            height: (theme) => `calc(100vh - ${theme.workSmart.appBarHeight} -  ${theme.workSmart.boardBarHeight})`,
            display: 'flex',
            alignItems: 'center',
        }}>
            Board Content
        </Box>
    )
}

export default BoardContent