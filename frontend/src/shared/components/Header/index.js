import React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";


const drawerWidth = 240;

const pages = [ 
    'INÍCIO', 
    'ETAPA 1', 
    'ETAPA 2', 
    'ETAPA 3', 
    'ETAPA 4'
];

const caminho = [
    '/',
    '/etapa1',
    '/etapa2',
    '/etapa3',
    '/etapa4',
]

export const Header = (props) => {


    let navigate = useNavigate();

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle}  sx={{ textAlign: "center", backgroundColor: 'primary.main'}}>
            <Typography variant="h6" sx={{ my: 2, color: 'white', fontWeight: 'bold' }}>
                Fast Design Sprint
            </Typography>
            <Divider />
            <List>
                {pages.map((item,i) => (
                    <ListItem key={item} disablePadding >
                        <ListItemButton sx={{ textAlign: "center" }} onClick={() => handleClick(caminho[i])}>
                            <ListItemText>
                                <Button
                                    key={item}
                                    sx={{ color: 'white', fontWeight: 'bold' }}
                                    className={'btn-header'}
                                    onClick={() => handleClick(caminho[i])}
                                >
                                    {item}
                                </Button>
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
    
    const container = window !== undefined ? () => window().document.body : undefined;

    
    const handleClick = ( caminho) => {

        navigate(`../${caminho}`, { replace: true });
    }
   
    return (
        <Box sx={{ display: "flex" }}>
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
                    >
                        Fast Design Sprint
                    </Typography>
                    <Box sx={{ display: { xs: "none", sm: "block" } }}>
                        {pages.map((item, i) => (
                            <Button
                                key={item}
                                sx={{ color: 'white', fontWeight: 'bold' }}
                                className={'btn-header'}
                                onClick={() => handleClick(caminho[i])}
                            >
                            {item}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
            
            <Box component="nav">
                
                <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true
                }}
                sx={{
                    display: { xs: "block", sm: "none" },
                    "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: drawerWidth,
                    backgroundColor: "primary.main"
                    }
                }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    )
}