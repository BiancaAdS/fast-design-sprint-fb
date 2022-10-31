import React, { useContext, useEffect }  from "react";
import { useNavigate } from 'react-router-dom'

import { AuthContext } from "../../../contexts/Auth/AuthContext";

import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';

import HomeIcon from '@mui/icons-material/Home';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import TaskIcon from '@mui/icons-material/Task';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import LinearWithValueLabel from '../Progress'

import { Container } from './styles';

const drawerWidth = 280;

export const MenuLateral = (props) => {
    const navigate = useNavigate();

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const [open, setOpen] = React.useState(true);
    const [openAtv, setOpenAtv] = React.useState(true);
    const [openPag, setOpenPag] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    const handleClickAtv = () => {
        setOpenAtv(!openAtv);
    };

    const handleClickPag = () => {
        setOpenPag(!openPag);
    };


    function convertToHMS(value) {
        const sec = parseInt(value, 10);
        let hours   = Math.floor(sec / 3600);
        let minutes = Math.floor((sec - (hours * 3600)) / 60);
        let seconds = sec - (hours * 3600) - (minutes * 60); 
        if (hours   < 10) {hours   = "0" + hours;}
        if (minutes < 10) {minutes = "0" + minutes;}
        if (seconds < 10) {seconds = "0" + seconds;}
        return hours + ':' + minutes + ':' + seconds;
    }

    const auth = useContext(AuthContext)

    const handleFinalizar = () => {
        auth.logoutUser()
        navigate(`/`, { replace: true })
    }

    const handleLinkAtv = (indice) => {
        props.setActiveStep(indice)
    }

    const pages = ['Inicio', 'Etapa 1', 'Etapa 2', 'Etapa 3', 'Etapa 4']

    
    const drawer = (
        <div className='fundoMenu'>
            <List>
                <div className='box-home'>
                    <a className='link-home' href='/home'><HomeIcon /></a>
                    {props.home ? '' :  <Typography variant='h6'>Atividades Completas</Typography>}
                   
                </div>
                <Divider light={true} />
                {props.home ? '' :
                        
                    <div className='box-progress'>
                        <LinearWithValueLabel atvsCompleted={props.completedAtv} atvsTitle={props.atvsTotais}></LinearWithValueLabel>
                    </div>}

                    {props.home ? '' : 
                        <div className='time-rest'>
                            <Typography variant='h6'>Tempo Estimado: {convertToHMS(props.tempoEstimado)}</Typography>
                            <Typography variant='h6'>Tempo Restante: {convertToHMS(props.tempoRestante)}</Typography>
                        </div> 
                    }
            </List>
            {props.home ? '' : <Divider light={true} /> }
            <List>
                <ListItemButton onClick={handleClickPag} className='title-macro'>

                    <Typography variant='h6' className='title-macro'>Páginas</Typography>
                    {openPag ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openPag} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {pages.map((text,i) => (
                            <ListItem key={text} className={`${props.pathname === `/etapa${i}` ? 'etapa-atual' : ''}`}>
                                <ListItemButton>
                                    {i === 0 ? 
                                        <a className='link-pages' href={`/home`}>{text}</a> : 
                                        <a className='link-pages' href={`/etapa${i}`}>{text}</a>
                                    }
                                    
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Collapse>


            </List>
            <Divider light={true} />
            <List>
            {props.geral ? <ListItemButton onClick={handleClick} className='title-macro'>

                    <Typography variant='h6' className='title-macro'>Visão Geral</Typography>
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton> : null}
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {props.geral && props.geral.map((text) => (
                            <ListItem key={text}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <TaskIcon sx={{ color: 'gray' }} />
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                    
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Collapse>
            </List>
            {props.home ? '' : <Divider light={true} /> }
                       
            <List>
                {props.atividades ? <ListItemButton onClick={handleClickAtv} className='title-macro'>

                    <Typography variant='h6' className='title-macro'>Atividades da Etapa</Typography>
                    {openAtv ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton> : null}
                <Collapse in={openAtv} timeout="auto" unmountOnExit style={{ textAlign: 'center' }}>
                    <List component="div" disablePadding style={{ textAlign: 'center' }}>
                    {props.atividades && props.atividades.map((text,i) => (
                    <ListItem key={text} className={`${props.activeStep === i ? 'btnAtvAtual' : ''}`} >
                        <ListItemButton style={{ textAlign: 'center', justifyContent: 'center' }}>
                            <button type='button' className={`btn-sair`} style={{ textAlign: 'center' }} onClick={() => handleLinkAtv(i)}>{text}</button>
                        </ListItemButton>
                    </ListItem>
                ))}
                    </List>
                </Collapse>


            </List>
            {props.home ? '' : <Divider light={true} /> }

        </div>
    );

    const stylesMob = {
        homeMob: { display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '15px' },
        h6Mob: { width: '100%', fontSize: '16px', margin: ' 0 10px' },
        progressMob: { margin: '15px', marginLeft: '25px', display: 'flex', justifyContent: 'center', alignItems: 'center' },
        macroMob: { margin: '15px', fontSize: '18px', fontWeight: '700' },
        linkPagesMob: { color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' },
        linkHomeMob: { color: 'white', textDecoration: 'none' },
        btnSairMob: { background: 'transparent', border: '0', color: 'white', margin: '0 5px', cursor: 'pointer', textAlign: 'center' },
        timeRestMob: { display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', h6: { fontSize: '16px' , marginBottom: '10px'} },
        btnAtvAtual: { backgroundColor: '#c1c1c1', button: { color: 'black', fontWeight: '600', textAlign: 'center' } },
        etapaAtual: { backgroundColor: '#c1c1c1', a: { color: 'black', fontWeight: '600' } }
    }

    const drawerMob = (
        <div style={{ backgroundColor: '#394958' }}>
            <List>
                <div style={stylesMob.homeMob}>
                    <a style={stylesMob.linkHomeMob} className='link-home' href='/home'><HomeIcon /></a>
                   {props.home ? '' : <Typography variant='h6' style={stylesMob.h6Mob}>Atividades Completas</Typography>}

                </div>
                <Divider />

                {props.home ? '' :<div style={stylesMob.progressMob}>
                    <LinearWithValueLabel atvsCompleted={props.completedAtv} atvsTitle={props.atvsTotais}></LinearWithValueLabel>
                </div> }

                {props.home ? '' :    <div className='time-rest' style={stylesMob.timeRestMob}>
                        <Typography variant='h6'>Tempo Estimado: {convertToHMS(props.tempoEstimado)}</Typography>
                        <Typography variant='h6'>Tempo Restante: {convertToHMS(props.tempoRestante)}</Typography>
                    </div> }


            </List>
            {props.home ? '' : <Divider light={true} />}
            <List>
                <ListItemButton onClick={handleClickPag} className='title-macro'>

                    <Typography variant='h6' className='title-macro'>Páginas</Typography>
                    {openPag ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openPag} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {pages.map((text, i) => (
                            <ListItem key={text}  className={`${props.pathname === `/etapa${i}` ? stylesMob.etapaAtual : ''}`}>
                                <ListItemButton>
                                    {i === 0 ? 
                                        <a style={stylesMob.linkPagesMob} className='link-pages' href={`/home`}>{text}</a> : 
                                        <a style={stylesMob.linkPagesMob} className='link-pages' href={`/etapa${i}`}>{text}</a>
                                    }
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Collapse>


            </List>
            <Divider light={true}/>
            <List>
            {props.geral ? <ListItemButton onClick={handleClick} className='title-macro'>

                   <Typography variant='h6' className='title-macro'>Visão Geral</Typography>
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton> : ''}
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {props.geral && props.geral.map((text) => (
                            <ListItem key={text}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <TaskIcon sx={{ color: 'gray' }} />
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Collapse>


            </List>
            
            {props.home ? '' : <Divider light={true}/>}
            <List>
            {props.atividades ? <ListItemButton onClick={handleClickAtv} className='title-macro'>

                    <Typography variant='h6' className='title-macro'>Atividades da Etapa</Typography>
                    {openAtv ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>: ''}
                <Collapse in={openAtv} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                    {props.atividades && props.atividades.map((text, i) => (
                    <ListItem key={text} className={`${props.activeStep === i ? stylesMob.btnAtvAtual : ''}`} >
                        <ListItemButton>
                            <ListItemIcon>
                                <AssignmentTurnedInIcon sx={{ color: 'gray' }} />
                            </ListItemIcon>
                            <button type='button' className='btn-sair' style={stylesMob.btnSairMob } onClick={() => handleLinkAtv(i)}>{text}</button>
                        </ListItemButton>
                    </ListItem>
                ))}
                    </List>
                </Collapse>


            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Container>
            <Box sx={{ display: 'flex', height: '100%', width: '100%', padding: '0' }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        ml: { sm: `${drawerWidth}px` },
                        backgroundColor: '#394958'
                    }}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        {props.home ? '' : 
                        <Typography variant="h6" noWrap component="div" className='profile-menu'>
                            {props.nomeEquipe ? props.nomeEquipe : ''} | <button type='button' className='btn-sair' onClick={handleFinalizar}>Sair</button>
                        </Typography>}
                    </Toolbar>

                </AppBar>
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders"
                >
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true,
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: '#394958', color: 'white' },
                            hr: { borderColor: ' #c1c1c1' }
                        }}
                    >
                        {drawerMob}
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                >
                    <Toolbar />
                    {props.children}
                </Box>
            </Box>

        </Container>

    );
}

MenuLateral.propTypes = {
    window: PropTypes.func,
};

