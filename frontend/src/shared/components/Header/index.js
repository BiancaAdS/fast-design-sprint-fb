import React from "react";
import { Link } from "react-router-dom";

// import { Container } from "./styles";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container  from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';


const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const pages = [ 
    'INÍCIO', 
    'ETAPA 1', 
    'ETAPA 2', 
    'ETAPA 3', 
   'ETAPA 4'
];

export const Header = (props) => {




    const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  }; 
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

    return (
        // <Container>
        
            // <div className="blue-line"></div>

            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                    {/* icon logo aqui */}
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontWeight: 700,
                        color: 'inherit',
                        textDecoration: 'none',
                        }}
                    >
                        Fast Design Sprint
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                        >
                        <MenuIcon />
                        </IconButton>
                        <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                        }}
                        >
                        {pages.map((page) => (
                            <MenuItem key={page} onClick={handleCloseNavMenu}>
                            <Typography textAlign="center">{page}</Typography>
                            </MenuItem>
                        ))}
                        </Menu>
                    </Box>
                    {/* icon logo aqui */}
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontWeight: 700,
                        color: 'inherit',
                        textDecoration: 'none',
                        }}
                    >
                        Fast Design Sprint
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {/* {pages.map((page) => (
                        <Button
                            key={page}
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            {page}
                        </Button>
                        ))} */}
                    </Box>

                    <Box  sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }  }}>
                        {pages.map((page) => (
                            
                            //  <Link key={page} className="link-pages" to={`/`}>{page}</Link>
                            // <div className="page"><Link className="link-page" to='/'>{page}</Link></div>
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block', fontWeight: 'bold' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                    </Toolbar>
                </Container>
                {/* <header className="header-box">

                <div className="content-box">

                    <div className="box-logo">
                        <div className="page-info">
                            <img className="logo-icon" src="" alt="Logo FDS" />
                            <h1 className="text-title">Fast Design Sprint</h1>
                        </div>
                        
                    </div>

                    <div className="box-pages">
                        <div className="page-container">

                            <div className="page"><Link className="link-page" to='/'>INÍCIO</Link></div> 
                            <div className="page"><Link className="link-page" to='/etapa1'>ETAPA 1</Link></div>
                            <div className="page"><Link className="link-page" to='/etapa2'>ETAPA 2</Link></div>
                            <div className="page"><Link className="link-page" to='/etapa3'>ETAPA 3</Link></div>
                            <div className="page"><Link className="link-page" to='/etapa4'>ETAPA 4</Link></div>
                            

                        </div>
                        
                    </div>
                    
                    
                </div>                 



            </header> */}
                </AppBar>




            

         //</Container>
    )
}