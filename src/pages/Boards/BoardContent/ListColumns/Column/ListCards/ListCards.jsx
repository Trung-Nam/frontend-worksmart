import Box from '@mui/material/Box';
import CardItem from './CardItem/CardItem';



const ListCards = () => {
    return (
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
                    ${theme.workSmart.columnHeaderHeight} - 
                    ${theme.workSmart.columnFooterHeight} 
                 )`,
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#ced0da',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: '#bfc2cf',
                },
            }}
        >
            <CardItem temporaryHideMedia={false}/>
            <CardItem temporaryHideMedia={true}/>
            <CardItem temporaryHideMedia={true}/>
            <CardItem temporaryHideMedia={true}/>
        </Box>
    )
}

export default ListCards