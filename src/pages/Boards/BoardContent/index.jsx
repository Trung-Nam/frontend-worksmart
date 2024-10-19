import Box from '@mui/material/Box';
const BoardContent = () => {
    return (
        <Box sx={{
            backgroundColor: 'primary.main',
            height: (theme) => `calc(100vh - ${theme.workSmart.appBarHeight} -  ${theme.workSmart.boardBarHeight})`,
            display: 'flex',
            alignItems: 'center',
        }}>
            Board Content
        </Box>
    )
}

export default BoardContent