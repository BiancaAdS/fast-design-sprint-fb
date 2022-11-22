import React from 'react'

import Typography from '@mui/material/Typography';

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { Container } from './styles';


export const FooterAtv = (props) => {

    const handleResetAtvFinalizadas = () => {
        props.setAcabouAtv(false)
        props.handleReset()
    }

    return (
        <Container>
            <div className="box-nextPrev-atv">
                <AppBar position="fixed" sx={{ width: { sm: `calc(100% - 280px)` } , display: "flex", justifyContent: "space-around", alignItems: "center", top: "auto", bottom: 0,  backgroundColor: '#dde0e3' }}>
                    <Toolbar className="box-options">

                        {props.allStepsCompleted() ? (
                            <React.Fragment>
                                {props.setAcabouAtv(true)}
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button className="btn-handleAtvs" onClick={handleResetAtvFinalizadas}>Recomeçar Atividades</Button>
                                { props.handleNextEtapa ? 
                                    <Button className="btn-handleAtvs" onClick={props.handleNextEtapa}>Próxima etapa</Button> :
                                    <Typography variant="h6" sx={{ color: 'black' }}>
                                        Não existem mais etapas. 
                                    </Typography>
                                }
                                
                                </Box>
                            </React.Fragment>
                            ) : (<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Button
                                        color="inherit"
                                        disabled={props.activeStep === 0  || props.isActive}
                                        onClick={props.handleBack}
                                        sx={{ mr: 1 }}
                                        className={`btn-handleAtvs`}
                                        
                                    >
                                        Voltar
                                    </Button>
                                    <div className="title-atv">
                                        <Typography variant="h6" sx={{ color: 'black' }}>
                                            {props.children}
                                        </Typography>
                                    </div>     
                                    <Box sx={{ flex: '1 1 auto' }}/>
                                    {props.activeStep !== props.steps.length &&
                                        (props.completed[props.activeStep] ? (
                                            <>
                                                <Typography variant="caption" sx={{ display: 'inline-block', color: 'black' }} className={`${props.width <= 625  ? 'center' : ''}`}>
                                                    Atividade de <b>{props.steps[props.activeStep]}</b> já foi finalizada
                                                </Typography>
                                                <Button  onClick={props.handleNext} sx={{ mr: 1 }} className={`btn-handleAtvs`} disabled={props.isActive}>
                                                    Próxima Atividade
                                                </Button>
                                            </>
                                            
                                        ) : (
                                        <Button className="btn-handleAtvs" onClick={() => props.handleComplete(props.steps[props.activeStep])} disabled={props.isActive}>
                                            {props.completedSteps() === props.totalSteps() - 1
                                            ? 'Finalizar Etapa'
                                            : 'Próxima Atividade'}
                                        </Button>
                                        ))}
                                </Box>
                            )
                        }
                    </Toolbar>
                </AppBar>
            </div>
        </Container>
    )
}