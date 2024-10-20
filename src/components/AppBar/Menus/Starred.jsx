import { useState } from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { Box } from '@mui/material';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Check from '@mui/icons-material/Check';

const Starred = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Box>
            <Button
                id="basic-button-starred"
                aria-controls={open ? 'basic-menu-starred' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                endIcon={<ExpandMoreIcon />}
            >
                Starred
            </Button>
            <Menu
                id="basic-menu-starred"
                MenuListProps={{
                    'aria-labelledby': 'basic-button-starred',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem>
                    <ListItemText inset>Single</ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemText inset>1.15</ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemText inset>Double</ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <Check />
                    </ListItemIcon>
                    Custom: 1.2
                </MenuItem>
                <Divider />
                <MenuItem>
                    <ListItemText>Add space before paragraph</ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemText>Add space after paragraph</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem>
                    <ListItemText>Custom spacing...</ListItemText>
                </MenuItem>
            </Menu>

        </Box>
    )
}

export default Starred