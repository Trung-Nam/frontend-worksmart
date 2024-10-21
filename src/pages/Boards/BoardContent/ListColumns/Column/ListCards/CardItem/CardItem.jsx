import AttachmentIcon from '@mui/icons-material/Attachment';
import CommentIcon from '@mui/icons-material/Comment';
import GroupIcon from '@mui/icons-material/Group';
import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

// eslint-disable-next-line react/prop-types
const CardItem = ({ temporaryHideMedia }) => {

    return (
        temporaryHideMedia === true ? (
            <Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset'
            }}>
                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                    <Typography>Card 01</Typography>
                </CardContent>
            </Card>
        ) : (
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
        )
    )
}

export default CardItem;
